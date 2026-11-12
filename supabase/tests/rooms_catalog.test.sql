-- TODO-17: pgTAP tests for RLS and constraints on faculties, buildings and rooms.

begin;

create extension if not exists pgtap with schema extensions;

select plan(20);

-- 1-6: anon cannot read and cannot write
set local role anon;

select is_empty(
  'select * from public.faculties',
  'anon cannot read faculties'
);

select is_empty(
  'select * from public.buildings',
  'anon cannot read buildings'
);

select is_empty(
  'select * from public.rooms',
  'anon cannot read rooms'
);

select throws_ok(
  $$insert into public.faculties (id, name) values ('TEST', 'Test Faculty')$$,
  '42501',
  null,
  'anon cannot insert into faculties'
);

select throws_ok(
  $$insert into public.buildings (id, name, faculty, address) values ('test-b', 'Test Building', 'FMI', 'Str. Test 1')$$,
  '42501',
  null,
  'anon cannot insert into buildings'
);

select throws_ok(
  $$insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values ('test-r', 'fmi-central', 'T100', 1, 20, false, false)$$,
  '42501',
  null,
  'anon cannot insert into rooms'
);

-- 7-14: authenticated can read, but cannot insert, update or delete
set local role authenticated;

select results_eq(
  'select id from public.faculties order by id',
  array['FMI', 'FSEGA'],
  'authenticated can read both seeded faculties'
);

select results_eq(
  'select id from public.buildings order by id',
  array['fmi-central', 'fsega'],
  'authenticated can read both seeded buildings'
);

select results_eq(
  'select count(*)::int from public.rooms',
  array[9],
  'authenticated can read all 9 seeded rooms'
);

select throws_ok(
  $$insert into public.faculties (id, name) values ('TEST', 'Test Faculty')$$,
  '42501',
  null,
  'authenticated cannot insert into faculties'
);

select throws_ok(
  $$insert into public.buildings (id, name, faculty, address) values ('test-b', 'Test Building', 'FMI', 'Str. Test 1')$$,
  '42501',
  null,
  'authenticated cannot insert into buildings'
);

select throws_ok(
  $$insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values ('test-r', 'fmi-central', 'T100', 1, 20, false, false)$$,
  '42501',
  null,
  'authenticated cannot insert into rooms'
);

update public.rooms set capacity = 999 where id = 'c-510';
delete from public.rooms where id = 'c-510';

select results_eq(
  $$select capacity from public.rooms where id = 'c-510'$$,
  array[40],
  'authenticated cannot update rooms (capacity remains 40)'
);

select results_eq(
  'select count(*)::int from public.rooms',
  array[9],
  'authenticated cannot delete rooms (count remains 9)'
);

-- 15-20: schema constraints (capacity > 0, unique code, foreign keys)
set local role postgres;

select throws_ok(
  $$insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values ('bad-cap', 'fmi-central', 'BAD0', 1, 0, false, false)$$,
  '23514',
  null,
  'capacity = 0 is rejected by check (capacity > 0)'
);

select throws_ok(
  $$insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values ('neg-cap', 'fmi-central', 'BADNEG', 1, -5, false, false)$$,
  '23514',
  null,
  'negative capacity is rejected by check (capacity > 0)'
);

select throws_ok(
  $$insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values ('dup-code', 'fmi-central', 'C510', 1, 25, false, false)$$,
  '23505',
  null,
  'duplicate room code is rejected by unique constraint'
);

select throws_ok(
  $$insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values ('bad-fk', 'missing-building', 'BADFK', 1, 25, false, false)$$,
  '23503',
  null,
  'room with unknown building_id is rejected by foreign key'
);

select throws_ok(
  $$insert into public.buildings (id, name, faculty, address) values ('bad-b', 'Bad', 'MISSING', 'Str. X')$$,
  '23503',
  null,
  'building with unknown faculty is rejected by foreign key'
);

select results_eq(
  $$select code, floor, capacity, has_outlets, has_projector from public.rooms where id = 'c-510'$$,
  $$values ('C510'::text, 5, 40, true, true)$$,
  'seeded room c-510 matches TypeScript demo data'
);

select * from finish();

rollback;
