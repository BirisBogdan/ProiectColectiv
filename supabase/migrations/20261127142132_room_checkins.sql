-- TODO-33: room_checkins, so check-ins survive a restart and every server instance sees
-- the same count. Same rules as the in-memory store of TODO-09
-- (apps/web/features/rooms/server/checkins.ts): a check-in expires after 2 hours and
-- never changes the room status (CLAUDE.md §4).

create table public.room_checkins (
  id uuid primary key default gen_random_uuid(),
  room_id text not null references public.rooms (id) on delete cascade,
  -- Null until sign-in exists (backlog #08): check-ins are anonymous for now.
  user_id uuid null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  -- Set by a manual check-out, or when the same person checks in somewhere else.
  ended_at timestamptz null,
  constraint room_checkins_expires_after_created check (expires_at > created_at),
  constraint room_checkins_ended_after_created check (ended_at is null or ended_at >= created_at)
);

comment on table public.room_checkins is
  'Live check-ins per room. Holds user data: add it to the account deletion function '
  'when that exists (CLAUDE.md §3.10, backlog #50). Read counts through room_checkin_counts.';

create index room_checkins_active_idx
  on public.room_checkins (room_id, expires_at)
  where ended_at is null;

create index room_checkins_user_active_idx
  on public.room_checkins (user_id)
  where ended_at is null and user_id is not null;

alter table public.room_checkins enable row level security;

-- Nobody reads the table directly, except a signed-in user reading their own rows.
-- Without sign-in auth.uid() is null, so this matches nothing.
create policy "Users can read their own check-ins"
  on public.room_checkins
  for select
  to authenticated
  using (user_id = (select auth.uid()));

-- No insert, update or delete policies: writes go only through the functions below.
-- The privileges are revoked as well, so a direct write fails loudly instead of
-- silently matching no rows.
revoke insert, update, delete, truncate on public.room_checkins from anon, authenticated;

-- Checks in to a room and returns the new check-in (the Checkin shape of TODO-09).
-- Raises P0002 ("Room not found") for an unknown room.
create or replace function public.checkin_room(p_room_id text)
returns table (
  id uuid,
  room_id text,
  created_at timestamptz,
  expires_at timestamptz
)
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  -- The only place the check-in lifetime is defined (CHECKIN_TTL_MS in TypeScript).
  c_ttl constant interval := interval '2 hours';
  v_user uuid := auth.uid();
begin
  if not exists (select 1 from public.rooms r where r.id = p_room_id) then
    raise exception 'Room not found' using errcode = 'P0002';
  end if;

  -- One person, one room: a new check-in ends the person's previous active one.
  -- Without sign-in v_user is null, so anonymous check-ins never end each other.
  -- This is temporary, until sign-in (backlog #08).
  if v_user is not null then
    update public.room_checkins c
    set ended_at = now()
    where c.user_id = v_user
      and c.ended_at is null
      and c.expires_at > now();
  end if;

  return query
  insert into public.room_checkins as c (room_id, user_id, created_at, expires_at)
  values (p_room_id, v_user, now(), now() + c_ttl)
  returning c.id, c.room_id, c.created_at, c.expires_at;
end;
$$;

-- Ends an active check-in. Returns false when it does not exist, has expired or has
-- already ended (like removeCheckin in TypeScript). A check-in that belongs to a
-- signed-in user can only be ended by that user; an anonymous one by whoever has its id.
create or replace function public.checkout(p_checkin_id uuid)
returns boolean
language plpgsql
volatile
security definer
set search_path = ''
as $$
begin
  update public.room_checkins c
  set ended_at = now()
  where c.id = p_checkin_id
    and c.ended_at is null
    and c.expires_at > now()
    and (c.user_id is null or c.user_id = auth.uid());

  return found;
end;
$$;

revoke all on function public.checkin_room(text) from public;
revoke all on function public.checkout(uuid) from public;
grant execute on function public.checkin_room(text) to anon, authenticated;
grant execute on function public.checkout(uuid) to anon, authenticated;

-- How many people are in each room right now. Every room has a row (0 when empty).
-- It shows counts only, never user_id: nobody sees who is in a room.
-- The view runs with its owner's rights on purpose, so it can count rows that RLS
-- hides from the caller. Expiry is exclusive: a check-in made exactly 2 hours ago
-- no longer counts. Like public.rooms, it is readable by authenticated only: granting
-- it to anon would leak the room catalog that rooms' RLS hides from anon.
create view public.room_checkin_counts as
select
  r.id as room_id,
  count(c.id)::int as active_count
from public.rooms r
left join public.room_checkins c
  on c.room_id = r.id
  and c.ended_at is null
  and c.expires_at > now()
group by r.id;

revoke all on public.room_checkin_counts from anon, authenticated;
grant select on public.room_checkin_counts to authenticated;
