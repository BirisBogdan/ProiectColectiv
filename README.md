# UBB Campus

A PWA for Babeș-Bolyai students. The current sprint builds a minimal **StudyRoom Finder**: which rooms are free right now, served by Next.js route handlers over hardcoded demo data.

- `TODO.md`: the 8 tasks of the current sprint and the team workflow.
- `TODO-backlog.md`: the full backlog and open questions.
- `CLAUDE.md`: how the repo is meant to work and why.

Everything lives in `apps/web/` (Next.js + TypeScript + Tailwind). Supabase, the timetable importer and the PWA setup come after this sprint.

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
