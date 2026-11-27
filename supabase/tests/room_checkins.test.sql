-- TODO-33: pgTAP tests for room_checkins, checkin_room, checkout and room_checkin_counts,
-- mirroring apps/web/tests/unit/checkins.test.ts. now() is fixed inside a transaction,
-- so the expiry tests insert rows with created_at in the past instead of waiting.

begin;

create extension if not exists pgtap with schema extensions;

select plan(32);

-- Two users for the "one person, one room" rule.
insert into auth.users (id, aud, role, email) values
  ('11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'ana@stud.ubbcluj.ro'),
  ('22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'dan@stud.ubbcluj.ro');

-- Schema ------------------------------------------------------------------------------

select has_table('public', 'room_checkins', 'room_checkins exists');

select results_eq(
  $$select relrowsecurity from pg_class where oid = 'public.room_checkins'::regclass$$,
  array[true],
  'RLS is enabled on room_checkins'
);

select columns_are(
  'public',
  'room_checkin_counts',
  array['room_id', 'active_count'],
  'room_checkin_counts exposes only room_id and active_count, never user_id'
);

select throws_ok(
  $$insert into public.room_checkins (room_id, created_at, expires_at)
    values ('c-510', now(), now())$$,
  '23514',
  null,
  'expires_at must be after created_at'
);

select throws_ok(
  $$insert into public.room_checkins (room_id, created_at, expires_at, ended_at)
    values ('c-510', now(), now() + interval '2 hours', now() - interval '1 minute')$$,
  '23514',
  null,
  'ended_at cannot be before created_at'
);

select throws_ok(
  $$insert into public.room_checkins (room_id, expires_at)
    values ('nu-exista', now() + interval '2 hours')$$,
  '23503',
  null,
  'a check-in for an unknown room is rejected by the foreign key'
);

-- checkin_room as anon (addCheckin, POST /api/rooms/[id]/checkins) ---------------------

set local role anon;

select results_eq(
  $$select room_id, created_at = now(), expires_at - created_at
    from public.checkin_room('c-510')$$,
  $$values ('c-510'::text, true, interval '2 hours')$$,
  'checkin_room returns the check-in with a 2 hour expiry'
);

select results_eq(
  $$select count(distinct id)::int from (
      select id from public.checkin_room('c-510')
      union all
      select id from public.checkin_room('c-510')
    ) t$$,
  array[2],
  'every check-in gets its own id'
);

select throws_ok(
  $$select * from public.checkin_room('nu-exista')$$,
  'P0002',
  'Room not found',
  'checkin_room rejects an unknown room (404 in the API)'
);

select is_empty(
  'select * from public.room_checkins',
  'anon cannot read room_checkins directly'
);

select throws_ok(
  $$insert into public.room_checkins (room_id, expires_at) values ('c-510', now() + interval '2 hours')$$,
  '42501',
  null,
  'anon cannot insert into room_checkins directly'
);

select throws_ok(
  $$update public.room_checkins set ended_at = now()$$,
  '42501',
  null,
  'anon cannot update room_checkins directly'
);

select throws_ok(
  $$delete from public.room_checkins$$,
  '42501',
  null,
  'anon cannot delete from room_checkins directly'
);

select throws_ok(
  'select * from public.room_checkin_counts',
  '42501',
  null,
  'anon cannot read room_checkin_counts (it would leak the room catalog)'
);

-- countActiveCheckins: per room, rooms kept separate, empty rooms are 0 -----------------
-- Read as authenticated without a user id: the same rights a signed-in client will have.

set local role authenticated;

select public.checkin_room('c-512');
select public.checkin_room('c-512');

select results_eq(
  $$select room_id, active_count from public.room_checkin_counts
    where room_id in ('c-510', 'c-512', 'l-001') order by room_id$$,
  $$values ('c-510'::text, 3), ('c-512'::text, 2), ('l-001'::text, 0)$$,
  'room_checkin_counts counts per room and keeps rooms separate'
);

select results_eq(
  'select count(*)::int from public.room_checkin_counts',
  'select count(*)::int from public.rooms',
  'room_checkin_counts has a row for every room'
);

set local role postgres;

select results_eq(
  $$select count(*)::int from public.room_checkins where user_id is not null$$,
  array[0],
  'check-ins without sign-in have no user_id'
);

-- Expiry at exactly 2 hours (exclusive, like isActive in TypeScript) --------------------

delete from public.room_checkins;
insert into public.room_checkins (room_id, created_at, expires_at)
values ('c-510', now() - interval '1 hour 59 minutes', now() + interval '1 minute');

select results_eq(
  $$select active_count from public.room_checkin_counts where room_id = 'c-510'$$,
  array[1],
  'a check-in made 1h59m ago still counts'
);

delete from public.room_checkins;
insert into public.room_checkins (room_id, created_at, expires_at)
values ('c-510', now() - interval '2 hours', now());

select results_eq(
  $$select active_count from public.room_checkin_counts where room_id = 'c-510'$$,
  array[0],
  'a check-in made exactly 2 hours ago no longer counts'
);

-- checkout (removeCheckin, DELETE /api/checkins/[id]) -----------------------------------

set local role anon;

create temporary table t_checkin on commit drop as
  select id from public.checkin_room('l-001');

set local role authenticated;
select results_eq(
  $$select active_count from public.room_checkin_counts where room_id = 'l-001'$$,
  array[1],
  'the new check-in counts before checkout'
);
set local role anon;

select is(
  public.checkout((select id from t_checkin)),
  true,
  'anon can check out an anonymous check-in by its id'
);

set local role authenticated;
select results_eq(
  $$select active_count from public.room_checkin_counts where room_id = 'l-001'$$,
  array[0],
  'an ended check-in no longer counts'
);
set local role anon;

select is(
  public.checkout((select id from t_checkin)),
  false,
  'checkout returns false the second time'
);

select is(
  public.checkout('00000000-0000-0000-0000-000000000000'),
  false,
  'checkout returns false for an unknown id'
);

set local role postgres;
insert into public.room_checkins (id, room_id, created_at, expires_at)
values ('33333333-3333-3333-3333-333333333333', 'c-510', now() - interval '2 hours', now());
set local role anon;

select is(
  public.checkout('33333333-3333-3333-3333-333333333333'),
  false,
  'checkout returns false for an expired check-in'
);

-- One person, one room (signed in) -----------------------------------------------------

set local role authenticated;
set local request.jwt.claims = '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';

create temporary table t_ana on commit drop as
  select id from public.checkin_room('c-510');
select public.checkin_room('c-512');

select results_eq(
  $$select room_id, ended_at is not null from public.room_checkins order by created_at, ended_at nulls last$$,
  $$values ('c-510'::text, true), ('c-512'::text, false)$$,
  'a new check-in ends the same person''s previous one, and they can read their own rows'
);

select results_eq(
  $$select count(*)::int from public.room_checkins where user_id = '11111111-1111-1111-1111-111111111111'$$,
  array[2],
  'signed-in check-ins are stored with the user id'
);

set local request.jwt.claims = '{"sub": "22222222-2222-2222-2222-222222222222", "role": "authenticated"}';

select is_empty(
  'select * from public.room_checkins',
  'another user cannot read someone else''s check-ins'
);

set local role postgres;
create temporary table t_ana_active on commit drop as
  select id from public.room_checkins
  where user_id = '11111111-1111-1111-1111-111111111111' and ended_at is null;
grant select on t_ana_active to authenticated;
set local role authenticated;

select is(
  public.checkout((select id from t_ana_active)),
  false,
  'another user cannot check someone else out'
);

select public.checkin_room('c-510');

select results_eq(
  $$select room_id, active_count from public.room_checkin_counts
    where room_id in ('c-510', 'c-512') order by room_id$$,
  $$values ('c-510'::text, 1), ('c-512'::text, 1)$$,
  'two people in two rooms are counted separately'
);

-- Check-ins never change the room status (CLAUDE.md §4) --------------------------------

set local role postgres;
set local request.jwt.claims = '{}';
delete from public.room_checkins;

create temporary table t_status_before on commit drop as
  select status, until from public.room_status('c-510', now());

select public.checkin_room('c-510');
select public.checkin_room('c-510');

select results_eq(
  $$select status, until from public.room_status('c-510', now())$$,
  'select status, until from t_status_before',
  'check-ins change the count but never room_status'
);

select results_eq(
  $$select active_count from public.room_checkin_counts where room_id = 'c-510'$$,
  array[2],
  'the two check-ins are counted'
);

select * from finish();

rollback;
