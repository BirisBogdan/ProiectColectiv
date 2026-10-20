# UBB Campus

A PWA for Babeș-Bolyai students with three modules on a shared core:

- **StudyRoom Finder**: which FMI rooms are free right now, from the faculty timetable plus check-ins.
- **Tutor / Skill-Swap**: senior students help juniors on hard subjects.
- **Dorm Manager**: laundry booking and maintenance reports for Hașdeu and Economica.

Nothing is built yet. `CLAUDE.md` explains how the repo is meant to work and `TODO.md` is the backlog.

## Layout

| Dir                        | What                                           |
| -------------------------- | ---------------------------------------------- |
| `apps/web/`                | Next.js + TypeScript + Tailwind PWA            |
| `supabase/`                | Postgres migrations, RLS, seed, Edge Functions |
| `scripts/schedule-import/` | Python timetable importer                      |
| `.github/workflows/`       | CI and the import job                          |

## Getting started

Requirements: Node 22+, pnpm (via `corepack enable`), Python 3.12, and Docker for local Supabase.

```bash
corepack enable
pnpm install
pnpm dev            # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm test:run
```

Local database (needs Docker):

```bash
npx supabase start
npx supabase db reset
```

Timetable importer: see `scripts/schedule-import/README.md`.
