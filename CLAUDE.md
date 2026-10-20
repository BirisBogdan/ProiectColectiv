# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Status: planning draft.** No code exists yet. Every path, command and rule below is the *intended* shape of the repo, agreed before scaffolding (TODO-01). When the scaffold lands, make this file true or change it; never leave a claim here that the code contradicts. `TODO.md` is the backlog and the project's memory; read it before starting any piece of work.

UBB Campus is a PWA for Babeș-Bolyai students with a shared core (account, profile, notifications, search, admin) and three modules:

- **A. StudyRoom Finder**: which seminar/lecture rooms in FMI (later FSEGA) are free right now, computed from the imported faculty timetable plus student check-ins.
- **B. Tutor / Skill-Swap**: senior students help juniors on hard subjects (SDA, Baze de Date, SO), paid in points, swapped hours, or money settled *outside* the app.
- **C. Dorm Manager**: for Hașdeu and Economica residents: laundry booking, maintenance reports to the administrator, later room expenses, announcements and lending items between neighbours.

Each module has an **MVP** and an **Extra** list. Extras are `[POSTPONED]` in TODO.md until the MVP is validated; do not build them early.

---

## 1. Repository layout

| Dir | Stack | Deploy |
|---|---|---|
| `apps/web/` | Next.js (App Router) + TypeScript + Tailwind, installable PWA | Vercel |
| `supabase/migrations/` | PostgreSQL schema, RLS policies, functions, as timestamped SQL | `supabase db push` from CI |
| `supabase/functions/` | Supabase Edge Functions (Deno/TS): notifications, emails, scheduled jobs | `supabase functions deploy` from CI |
| `supabase/seed.sql` | Faculties, buildings, FMI rooms, dorms, laundry machines, demo users | local + dev only |
| `scripts/schedule-import/` | Python (BeautifulSoup / Playwright) timetable importer, one adapter per faculty | GitHub Actions cron |
| `.github/workflows/` | CI (lint, typecheck, tests, hygiene) and the import cron | — |
| `.github/scripts/` | Dependency-free Python checks for the docs (`todo_index.py`, `doc_claims.py`) | — |
| `.claude/skills/` | Team-written procedures (`verify`, `data-layer`, `auth-security`) | — |

Suggested tree inside `apps/web/`:

```
apps/web/
  app/
    (auth)/login/            # OTP / magic-link sign-in
    (app)/rooms/             # Module A
    (app)/tutors/            # Module B
    (app)/dorm/              # Module C
    (app)/search/            # global search
    (app)/settings/
    admin/                   # admin panel, role-gated
    api/                     # Next.js route handlers (thin; heavy logic lives in Postgres or Edge Functions)
  components/ui/             # shared UI kit
  features/rooms|tutors|dorm|core/   # module code: queries, hooks, components
  lib/supabase/              # browser + server clients, generated types
  lib/i18n/                  # RO / EN messages
  public/manifest.webmanifest, sw.js
  tests/unit/ (Vitest)  tests/e2e/ (Playwright)
```

How it hangs together, and why:

- **Supabase is the backend.** Auth, Postgres, Realtime (chat, room status), Storage (photos). We do not write our own API server for the MVP. Business rules that must hold no matter who calls (invite codes, booking overlaps, point balances) live **in the database** as constraints, RLS policies or SQL functions, not only in React code, because the browser talks to Postgres directly.
- **Next.js route handlers and Edge Functions are for things the database cannot do**: sending email (Resend), Web Push, calling external sites, cron work.
- **The timetable importer is a separate Python program** because scraping is a different job with a different failure mode: it can break when a faculty changes its site, and when it does the app must keep working on the last good import plus admin corrections (§3.3).
- **Two environments**, `dev` and `prod`, each a Supabase project plus a Vercel environment (TODO-04). Preview deployments use `dev`.

Things that hold this up, all easy to undo by accident:
1. **RLS is enabled on every table**, including lookup tables. A table without a policy is a public table. (TODO-52)
2. **The `@stud.ubbcluj.ro` restriction is enforced server-side** (auth hook), not only by the login form. (TODO-08)
3. **No money moves through the app.** The "money" exchange type is a label on an agreement, nothing more. (TODO-32)
4. **Generated DB types are committed** (`apps/web/lib/supabase/database.types.ts`) and regenerated with every migration.

## 2. Commands

Planned; confirm when TODO-01 lands. Package manager: pnpm (OQ-5).

```bash
# whole repo
pnpm install
pnpm lint            # eslint
pnpm typecheck       # tsc --noEmit
pnpm test:run        # Vitest once. `pnpm test` is watch mode and never exits, do not use it in CI or from an agent
pnpm test:e2e        # Playwright, needs `pnpm dev` and local Supabase running

# web app
pnpm --filter web dev
pnpm --filter web vitest run path/to/file.test.ts   # one test

# database (Supabase CLI, Docker required)
supabase start                       # local stack
supabase migration new <name>        # new SQL migration
supabase db reset                    # re-apply migrations + seed.sql
supabase gen types typescript --local > apps/web/lib/supabase/database.types.ts
supabase test db                     # pgTAP tests for RLS and constraints

# timetable importer
cd scripts/schedule-import
python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
python -m schedule_import --faculty fmi --dry-run     # print rows, write nothing
```

## 3. Subsystems that are easy to break

### 3.1 Authentication and roles
- Sign-in is email OTP / magic link via Supabase Auth, **only for `@stud.ubbcluj.ro`** (TODO-08). The check lives in a Supabase *before-user-created* auth hook; the login form check is convenience only. Changing one without the other either locks students out or lets anyone in.
- Roles: `student` (default), `admin`, and per-dorm `dorm_admin` (OQ-3). Roles live in a table read by RLS, never in client-editable `user_metadata`.
- A `profiles` row is created by a trigger on `auth.users` insert. If you add a required profile column, the trigger must fill it, or sign-up breaks.

### 3.2 Database, migrations and RLS
- Schema changes only through `supabase/migrations/`. Never edit the dev/prod schema from the dashboard; the next `db push` will not know about it.
- Every new table ships in the same migration with: `enable row level security`, its policies, and a pgTAP test proving a stranger cannot read or write it (TODO-52).
- Simplified model from the spec: `users, profiles, faculties` · `rooms, room_schedule, room_checkins, room_reports` · `subjects, tutor_offers, help_requests, sessions, reviews, point_transactions, messages` · `dorms, dorm_rooms, dorm_members, laundry_machines, laundry_bookings, expenses, expense_splits, maintenance_reports, loan_requests` · `notifications, device_tokens`. It is missing tables the features need (blocks, content reports, consents, notification preferences, buildings, …); see TODO-53.

### 3.3 Timetable import (Module A)
- `scripts/schedule-import/` has one **adapter per faculty** behind a common interface (`fetch() -> raw`, `parse(raw) -> list[ScheduleRow]`). FMI first (TODO-17); FSEGA is a separate adapter (TODO-28). Faculty formats differ and change without notice, so never put faculty-specific parsing in the shared code.
- An import writes a new batch and swaps it in only if it passes sanity checks (row count not far below the previous import, every room code known). A failed or suspicious import **keeps the last good batch** and alerts (Sentry), it never empties `room_schedule`.
- **Admin overrides win over imported rows** (TODO-18). They live in their own table and are never overwritten by an import. If you merge them into `room_schedule`, the next import silently erases admins' corrections.

### 3.4 Room status (Module A)
- Status (`free` / `occupied` / `free until HH:MM`) is **computed at read time** from schedule + overrides + live check-ins + recent reports (TODO-19). It is not a stored column; a stored status goes stale the minute a class ends.
- Time is evaluated in `Europe/Bucharest`. Store `timestamptz`, compare in that zone. Week parity (săptămână pară/impară) and semester dates come from the import, not from guesswork.
- Check-ins expire (default 2 h, TODO-22). A check-in without expiry makes a room look busy forever.

### 3.5 Points ledger (Module B)
- `point_transactions` is **append-only**. A balance is the sum of a user's rows, never a column someone can update. Corrections are new compensating rows.
- Points are earned when a session is marked completed by **both** sides (or by the learner), spent when it is booked. The exact rule is OQ-2; whatever it is, it lives in one SQL function, not in the UI.
- "Money" sessions record only that the parties agreed to settle outside the app. No amounts, no payment links (risk: legal + security).

### 3.6 Chat (Module B)
- `messages` is read through Supabase Realtime with RLS limiting rows to the two participants. Blocking (TODO-48) must be enforced in the insert policy, not just hidden in the UI.

### 3.7 Laundry booking (Module C)
- No two active bookings may overlap on the same machine: a Postgres **exclusion constraint** on `(machine_id, tstzrange(start, end))` where status is active (TODO-42). The UI's greyed-out slots are a hint; the constraint is the rule.
- Only members of the machine's dorm may book (RLS via `dorm_members`).

### 3.8 Dorm membership and invite codes (Module C)
- Joining a room/dorm is by invite code only (TODO-41). Codes are random, single-dorm, expiring and revocable; redeeming one is a SQL function so the rules hold for every client.

### 3.9 Notifications and email
- Web Push via VAPID keys + `device_tokens`; email via Resend. Both sent from Edge Functions, never from the browser.
- Every notification goes through one function that checks the user's per-module preferences (TODO-12). Calling Resend or Push directly skips the opt-out, which is also a GDPR problem.
- The maintenance-report email to the dorm administrator (TODO-44) is generated from the report; the recipient address per dorm is configuration, not user input.

### 3.10 Privacy, moderation, GDPR
- Explicit consent at sign-up, recorded with version and timestamp (TODO-49). Changing the policy text means a new version and re-consent.
- Account deletion (TODO-50) must remove or anonymise the user's rows in **every** table. Any new table holding user data adds itself to the deletion function in the same PR.
- Reporting and blocking exist from day one for chat, reviews and posts (TODO-48), not as an Extra.

## 4. Deliberate oddities

- **Two answers to "is this room free?", on purpose.** The timetable says a room is free; a student report says it is occupied. The UI shows the computed status *with* the live signal ("free per timetable, 2 people checked in"). Do not collapse them into one boolean; the disagreement is the information.
- **Three exchange types, but only one is a ledger.** Points are tracked; hours and money are agreements recorded for reputation only. Do not unify them into one "price" field.

## 5. Conventions

- **Language:** user-facing strings in Romanian and English via `lib/i18n` (Romanian is the default). Code, identifiers, comments, commits and these docs in English.
- Table and column names: `snake_case`, plural tables, as in the spec model. Do not rename spec tables without a TODO item; other docs and the team refer to them by name.
- Path alias `@/` → `apps/web/`.
- Timestamps are `timestamptz`; display in `Europe/Bucharest`.
- Photos go to Supabase Storage in per-feature buckets with RLS; strip EXIF before upload.
- **TODO.md rules** (repeated from TODO.md):
  - Never delete or cross out an item; mark it `[DONE]` and keep the text.
  - IDs are permanent; never renumber or reuse. New items go at the end of their section with the next free ID.
  - Anything found open during other work goes into TODO.md, with why it was not done and what deciding it needs. Reporting it in chat is not recording it.
  - Changing an item is two edits: the heading and its Index row (plus the Still open list).

## 6. Known gaps

Deliberate or unresolved; do not assume these are safe.

- **Nothing is built yet (TODO-01).** Every command above is a plan.
- **Data model is incomplete (TODO-53).** Blocks, content reports, consents, notification preferences, buildings, roles and announcements have no tables yet.
- **Only FMI's timetable format is targeted (TODO-17, TODO-28).** FSEGA rooms will show as "unknown", not "free", until its adapter exists; never default an unknown room to free.
- **Who the dorm administrator is, and their email, is unknown (OQ-3, TODO-44).**
- **Expenses and loans are in the data model but not in the feature list (OQ-7, TODO-46, TODO-47).**
- **Points rules are undecided (OQ-2, TODO-32).** Until decided, do not award points automatically.
