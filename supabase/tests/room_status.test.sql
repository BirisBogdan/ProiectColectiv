-- TODO-18: pgTAP tests for room_schedule RLS, constraints and room_status(p_room_id, p_at)
-- mirroring every test case in apps/web/tests/unit/status.test.ts.

begin;

create extension if not exists pgtap with schema extensions;

select plan(32);

-- 1-5: RLS on room_schedule (anon cannot read/write; authenticated can read, cannot insert/update/delete)
set local role anon;

select is_empty(
  'select * from public.room_schedule',
  'anon cannot read room_schedule'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211')$$,
  '42501',
  null,
  'anon cannot insert into room_schedule'
);

set local role authenticated;

select isnt_empty(
  'select * from public.room_schedule',
  'authenticated can read room_schedule'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211')$$,
  '42501',
  null,
  'authenticated cannot insert into room_schedule'
);

delete from public.room_schedule;

select results_eq(
  'select count(*)::int from public.room_schedule',
  array[10],
  'authenticated cannot delete from room_schedule (all 10 seeded rows remain)'
);

-- 6-11: Check and foreign-key constraints on room_schedule
set local role postgres;

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('c-510', 1, '12:00', '10:00', 'Baze de date', 'Seminar 211')$$,
  '23514',
  null,
  'start_time > end_time is rejected'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('c-510', 1, '10:00', '10:00', 'Baze de date', 'Seminar 211')$$,
  '23514',
  null,
  'start_time = end_time is rejected'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('c-510', 0, '10:00', '12:00', 'Baze de date', 'Seminar 211')$$,
  '23514',
  null,
  'day = 0 is rejected'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('c-510', 8, '10:00', '12:00', 'Baze de date', 'Seminar 211')$$,
  '23514',
  null,
  'day = 8 is rejected'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name, parity) values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211', 'invalid')$$,
  '23514',
  null,
  'invalid parity is rejected'
);

select throws_ok(
  $$insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values ('missing-room', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211')$$,
  '23503',
  null,
  'schedule entry for non-existent room is rejected by foreign key'
);

-- Start with a clean schedule to test each computeStatus scenario deterministically.
-- 2026-11-02 is a Monday; Romania is on winter time (UTC+2) then.

-- Case 1: is occupied until the end of the current entry
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '12:00'::text)$$,
  'is occupied until the end of the current entry'
);

-- Case 2: is occupied exactly at the start time
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:00:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '12:00'::text)$$,
  'is occupied exactly at the start time'
);

-- Case 3: is free exactly at the end time when nothing follows
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T12:00:00+02:00'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'is free exactly at the end time when nothing follows'
);

-- Case 4: joins back-to-back entries into one chain
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values
  ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211'),
  ('c-510', 1, '12:00', '14:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '14:00'::text)$$,
  'joins back-to-back entries into one chain'
);

-- Case 5: joins a chain of three and ignores the order of the input
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values
  ('c-510', 1, '14:00', '16:00', 'Baze de date', 'Seminar 211'),
  ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211'),
  ('c-510', 1, '12:00', '14:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T11:00:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '16:00'::text)$$,
  'joins a chain of three and ignores the order of the input'
);

-- Case 6: handles overlapping entries (several groups in the same slot)
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values
  ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211'),
  ('c-510', 1, '10:00', '14:00', 'Baze de date', 'Curs anul 2');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '14:00'::text)$$,
  'handles overlapping entries (several groups in the same slot)'
);

-- Case 7: does not join entries separated by a gap
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values
  ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211'),
  ('c-510', 1, '13:00', '15:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T11:00:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '12:00'::text)$$,
  'does not join entries separated by a gap'
);

-- Case 8: is free until the next entry during a break
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values
  ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211'),
  ('c-510', 1, '14:00', '16:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T12:30:00+02:00'::timestamptz)$$,
  $$values ('free'::text, '14:00'::text)$$,
  'is free until the next entry during a break'
);

-- Case 9: is free until the first entry before the day starts
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T07:30:00+02:00'::timestamptz)$$,
  $$values ('free'::text, '10:00'::text)$$,
  'is free until the first entry before the day starts'
);

-- Case 10: is free for the rest of the day after the last entry
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T18:00:00+02:00'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'is free for the rest of the day after the last entry'
);

-- Case 11: is free all day when there are no entries for that day
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 2, '10:00', '12:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'is free all day when there are no entries for that day'
);

-- Case 12: is free on a weekend
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-07T10:30:00+02:00'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'is free on a weekend'
);

-- Case 13: ignores entries of other rooms
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-512', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'ignores entries of other rooms'
);

-- Case 14a & 14b: uses Romanian time, not UTC
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211');

-- 08:30 UTC is 10:30 in Romania in November.
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T08:30:00Z'::timestamptz)$$,
  $$values ('occupied'::text, '12:00'::text)$$,
  'uses Romanian time, not UTC (occupied at 08:30 UTC / 10:30 EET)'
);

-- 10:30 UTC is 12:30 in Romania: the entry is over.
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00Z'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'uses Romanian time, not UTC (free at 10:30 UTC / 12:30 EET)'
);

-- Case 15: follows daylight saving time
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '13:00', '15:00', 'Baze de date', 'Seminar 211');

-- 10:30 UTC on 2026-10-05 (a Monday, still summer time) is 13:30 in Romania (UTC+3).
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-10-05T10:30:00Z'::timestamptz)$$,
  $$values ('occupied'::text, '15:00'::text)$$,
  'follows daylight saving time'
);

-- Case 16: uses the Romanian day when UTC is still on the previous day
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '00:30', '01:30', 'Baze de date', 'Seminar 211');

-- 22:45 UTC on Sunday 2026-11-01 is 00:45 on Monday in Romania.
select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-01T22:45:00Z'::timestamptz)$$,
  $$values ('occupied'::text, '01:30'::text)$$,
  'uses the Romanian day when UTC is still on the previous day'
);

-- Case 17: unknown for a non-existent room
select results_eq(
  $$select status, until from public.room_status('nu-exista', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('unknown'::text, null::text)$$,
  'returns unknown for a non-existent room'
);

-- Case 18: overlapping + back-to-back chain followed by a gap and another entry
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name) values
  ('c-510', 1, '08:00', '10:00', 'SDA', 'Seminar 211'),
  ('c-510', 1, '09:00', '11:00', 'BD', 'Seminar 212'),
  ('c-510', 1, '11:00', '12:00', 'SO', 'Seminar 213'),
  ('c-510', 1, '14:00', '16:00', 'POO', 'Seminar 214');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T08:30:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '12:00'::text)$$,
  'merges overlapping and back-to-back entries (08-10 + 09-11 + 11-12 -> until 12:00) without crossing the 12-14 gap'
);

-- Case 19: parity (odd/even) is accepted and not filtered out yet in room_status (connected in next stage)
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name, parity) values
  ('c-510', 1, '10:00', '12:00', 'SDA', 'Seminar 211', 'odd'),
  ('c-510', 1, '12:00', '14:00', 'BD', 'Seminar 212', 'even');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T10:30:00+02:00'::timestamptz)$$,
  $$values ('occupied'::text, '14:00'::text)$$,
  'treats odd and even parity rows as occupying the room (parity filtering deferred per TODO-18)'
);

-- Case 20: timestamps with non-zero seconds truncate to HH:MM just like TypeScript bucharestNow
delete from public.room_schedule;
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name)
values ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 211');

select results_eq(
  $$select status, until from public.room_status('c-510', '2026-11-02T12:00:45+02:00'::timestamptz)$$,
  $$values ('free'::text, null::text)$$,
  'truncates seconds to minute precision matching TypeScript bucharestNow (12:00:45 -> 12:00)'
);

select * from finish();

rollback;
