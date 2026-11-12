-- TODO-17: Rooms catalog (faculties, buildings, rooms) with RLS.

create table public.faculties (
  id text primary key,
  name text not null
);

create table public.buildings (
  id text primary key,
  name text not null,
  faculty text not null references public.faculties (id) on delete restrict,
  address text not null
);

create table public.rooms (
  id text primary key,
  building_id text not null references public.buildings (id) on delete cascade,
  code text unique not null,
  floor integer not null,
  capacity integer not null check (capacity > 0),
  has_outlets boolean not null default false,
  has_projector boolean not null default false
);

alter table public.faculties enable row level security;
alter table public.buildings enable row level security;
alter table public.rooms enable row level security;

-- Read-only access for authenticated users; no write policies exist for client roles.
create policy "Authenticated users can read faculties"
  on public.faculties
  for select
  to authenticated
  using (true);

create policy "Authenticated users can read buildings"
  on public.buildings
  for select
  to authenticated
  using (true);

create policy "Authenticated users can read rooms"
  on public.rooms
  for select
  to authenticated
  using (true);
