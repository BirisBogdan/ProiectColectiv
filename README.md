# UBB Campus

A PWA for Babeș-Bolyai students. The current sprint builds a minimal **StudyRoom Finder**: which rooms are free right now, served by Next.js route handlers over hardcoded demo data.

- `TODO.md`: the 8 tasks of the current sprint and the team workflow.
- `CLAUDE.md`: how the repo is meant to work and why.

Everything lives in `apps/web/` (Next.js + TypeScript + Tailwind), with the FMI timetable importer in `scripts/schedule-import/` and the local database setup in `supabase/`.

## Getting started

Requirements: Node 22+ and pnpm (via `corepack enable`).

```bash
corepack enable
pnpm install
pnpm dev            # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm test:run
```

## Local Supabase (Windows)

Requirements: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) (with WSL 2 backend enabled and running).

1. Start Docker Desktop and wait until the engine is running.
2. From the repository root in PowerShell or Terminal, start the local Supabase stack, apply migrations + seed, and run the pgTAP tests:

```powershell
pnpm dlx supabase start
pnpm dlx supabase db reset
pnpm dlx supabase test db
```

To regenerate TypeScript database types after a schema change:

```powershell
pnpm dlx supabase gen types typescript --local > apps/web/lib/supabase/database.types.ts
```

To stop the local containers when done:

```powershell
pnpm dlx supabase stop
```
