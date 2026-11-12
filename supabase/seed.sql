-- Demo seed data copied from apps/web/features/rooms/data/ (not the real UBB catalog or timetable).
-- Applied automatically by `supabase db reset`.

insert into public.faculties (id, name) values
  ('FMI', 'Facultatea de Matematică și Informatică'),
  ('FSEGA', 'Facultatea de Științe Economice și Gestiunea Afacerilor');

insert into public.buildings (id, name, faculty, address) values
  ('fmi-central', 'Clădirea Centrală', 'FMI', 'Str. Mihail Kogălniceanu 1'),
  ('fsega', 'FSEGA', 'FSEGA', 'Str. Teodor Mihali 58-60');

insert into public.rooms (id, building_id, code, floor, capacity, has_outlets, has_projector) values
  ('c-510', 'fmi-central', 'C510', 5, 40, true, true),
  ('c-512', 'fmi-central', 'C512', 5, 30, true, false),
  ('l-001', 'fmi-central', 'L001', 0, 24, true, false),
  ('2-i', 'fmi-central', '2/I', 1, 100, false, true),
  ('5-i', 'fmi-central', '5/I', 1, 80, false, false),
  ('gamma', 'fmi-central', 'Gamma', 0, 150, true, true),
  ('s-10', 'fsega', 'S10', 1, 20, false, false),
  ('s-12', 'fsega', 'S12', 1, 35, true, true),
  ('a-101', 'fsega', 'A101', 1, 120, false, true);

-- Demo schedule rows (subset of apps/web/features/rooms/data/schedule.ts).
insert into public.room_schedule (room_id, day, start_time, end_time, subject, group_name, parity) values
  ('c-510', 1, '08:00', '10:00', 'Structuri de date și algoritmi', 'Seminar 211', 'all'),
  ('c-510', 1, '10:00', '12:00', 'Baze de date', 'Seminar 212', 'all'),
  ('c-510', 1, '12:00', '14:00', 'Sisteme de operare', 'Seminar 213', 'all'),
  ('c-510', 1, '14:00', '16:00', 'Programare orientată pe obiecte', 'Laborator 214', 'all'),
  ('c-512', 1, '10:00', '12:00', 'Baze de date', 'Seminar 221', 'all'),
  ('c-512', 1, '14:00', '16:00', 'Sisteme de operare', 'Seminar 222', 'all'),
  ('gamma', 4, '08:00', '10:00', 'Sisteme de operare', 'Curs anul 2', 'all'),
  ('gamma', 4, '12:00', '14:00', 'Analiză matematică', 'Curs anul 1', 'even'),
  ('a-101', 5, '10:00', '12:00', 'Programare orientată pe obiecte', 'Curs anul 2', 'odd'),
  ('a-101', 5, '12:00', '14:00', 'Structuri de date și algoritmi', 'Curs anul 2', 'even');
