# Repo structure template (modelled on dantze/EcoTrack-Monorepo)

Reference pattern for how ProiectColectiv should organise its agent-facing docs.
Stack-agnostic: only the structure and conventions are copied, not the tech.
Source studied: github.com/dantze/EcoTrack-Monorepo (CLAUDE.md ~950 lines, TODO.md ~6000 lines, 115 items).

## 1. Root files and what each one is for

| File | Role |
|---|---|
| `README.md` | Short human intro (~100 lines). |
| `CLAUDE.md` | The agent's reference for *how the repo works and why*. Long-form, explanatory prose. |
| `TODO.md` | The project's **memory**: every idea, bug, loose end and decision, with permanent IDs. |
| `DEPLOYMENT.md` | Triggers, secrets, runbook. CLAUDE.md points here instead of duplicating. |
| `.claude/skills/<name>/SKILL.md` | Task-specific procedures ("adding an API endpoint", "verify before PR", "auth/security"). Written by the team. |
| `.agents/skills/...` | Third-party/vendored skills (library docs), tracked in `skills-lock.json`. |
| `.github/README.md` | CI/CD diagram (mermaid). |
| `.github/scripts/*.py` | Dependency-free checks that keep the docs honest (see §4). |

## 2. CLAUDE.md layout

Opening line: `This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.`

Sections, in order:
1. **Repository layout** — table `| Dir | Stack | Deploy |`, then prose on how the pieces deploy and *why* they are split that way. Bold the load-bearing facts ("**There is one deployment, named `dev`.**"). List the "N things that hold this up, all easy to undo by accident".
2. **Commands** — one bash block per sub-project: build, test, run one test, lint, typecheck, dev server. Note gotchas (e.g. "`npm run test` is watch mode and never exits, use `test:run`").
3. **Topic deep-dives**, one `##` per subsystem that is easy to break (auth, security flag, DB schema/migrations, concurrency/auditing, logging, backend architecture, frontend architecture, a tricky feature). Each explains the rule, where it lives (file + symbol), and what goes wrong if you change one side only.
4. **Deliberate oddities** — e.g. "Two definitions of 'done', on purpose": when two pieces of code intentionally disagree, say so, name both, and say "do not unify".
5. **Conventions** — bullets: UI language vs code language (there: Romanian user-facing strings, English code/comments), path aliases, names that must not be renamed, and the **TODO.md rules** (repeated from TODO.md itself).
6. **Known gaps** — "Deliberate or unresolved; do not assume these are safe." Each bullet bold-leads with the gap, cites the TODO-NN, and explains the blast radius. Closed gaps stay as `**CLOSED (TODO-NN): ...**` rather than being deleted.

Writing style throughout:
- Explain *why*, not just *what*; history in one sentence when it prevents a regression ("It was in Terraform, and ...").
- Cross-reference TODO IDs inline (`(TODO-71)`) so every claim traces to a decision.
- Name exact files and symbols, so `doc_claims.py` can verify them.
- "Change one and you must change the other" for every mirrored rule.

## 3. TODO.md layout

```
# TODO — <Project>

Backlog of ideas, captured from conversation. **Nothing here is implemented yet**
unless its status says otherwise.

## How to use this file
  (rules, see §3.1)

**Status legend:** `[ ]` not started · `[~]` in progress · `[DONE]` done ·
`[POSTPONED]` deliberately deferred · `[?]` needs a decision first

**Next free ID: TODO-NNN.** (Highest used is TODO-NNN-1.)

---
## Still open — <open> of <total>
The whole of what is left, in one place. Everything not listed here is `[DONE]`.
- **TODO-17** `[POSTPONED]` — All other AI ideas *(F)*
- ...
**Done, but flagged by whoever did it** — not open, but not finished-and-forgotten either:
- **TODO-07** `[DONE — needs your eyes]` — <title> *(B)*

---
## Index
Every item, exactly once, in ID order. The section letter says where the item's full text lives.
| ID | Status | Section | Title |
|---|---|---|---|
| TODO-01 | `[DONE]` | A | Admin section in the web sidebar |

---
## Sections
(small table: **A** Access & admin | **B** Routes | ... | **J** Code health & platform)

---
## Open questions (answer before building the related items)
- **OQ-1 — <question>?** Related to TODO-12, TODO-08. *Current code:* ...

---
## A. <Section name>
*One-line description of what belongs here.*

### TODO-01 `[DONE]` <Title>
...
```

### 3.1 The rules ("How to use this file")
- **Never delete or cross out an item.** Mark it `[DONE]` and leave the text intact.
- IDs are permanent names, referenced in conversation ("do TODO-07"). Never renumber, never reuse.
- New items go at the **end of the topical section** they belong to, with the next free ID. So IDs are not contiguous within a section; that is expected.
- **Anything found open goes in here, always.** A loose end noticed during other work (gap, stale comment, deferred cleanup, out-of-scope thing, follow-up from another agent) gets an item saying what was found, why it was not done, and what deciding it needs. "Reporting a finding is not recording it." Chat replies scroll away; TODO.md is the memory.
- **Adding an item or changing its status is two edits**: the item heading, and its Index row (plus the Still open list if it crossed that line). Take the next free ID from the items, not from the "Next free ID" line.
- Retired sections are kept with a note saying where their items went (there: "I. Found while doing something else" was redistributed, the preamble kept).

### 3.2 Anatomy of an item
Heading format (machine-checked): ``### TODO-NN `[STATUS]` Title``

Open item body:
1. What is wrong / wanted, with evidence (a grep, an endpoint, a symptom).
2. *Italic provenance paragraph:* where it was found and **why it was not done** then.
3. **What deciding it needs:** the decision or prerequisite, and a suggested starting point.

Done item body: keep the original request, then append **Done.** with what changed (files, endpoints, tests), what was deliberately not carried over and where that went (another TODO), and **Still to do:** pointing at follow-up IDs. `####` subheadings are fine for long items ("What was wrong on the first pass", "Behaviour as it stands"). Verification notes can get their own `###` block when uneven.

Status variants seen: `[ ]`, `[~]`, `[DONE]`, `[DONE — needs your eyes]`, `[POSTPONED]`, `[?]`.

## 4. Enforcement (optional but recommended)
A `repo-hygiene` CI job with **no path filter** runs on every PR and executes small dependency-free Python scripts:
- `todo_index.py`: unique headings; Index lists every ID exactly once; row status/title match the heading verbatim; section letter matches the `## X.` the item sits under; Still open list equals the non-DONE set; counts and Next-free-ID line agree with the items.
- `doc_claims.py`: every repo path named in CLAUDE.md and skills still exists, and pinned config values match the property files. TODO.md is excluded (it names deleted files on purpose).
Each script's docstring records the incident that justified it.

## 5. Skills (`.claude/skills/<name>/SKILL.md`)
Frontmatter `name` + `description`, where the description says exactly *when* to use it ("Use before committing, pushing, or opening a PR ... Use it instead of guessing"). Body: numbered steps, "work in this order", which tests to extend, what fails silently if a step is skipped. Typical set: `verify` (maps changed paths to the CI checks to run), one per risky change type (api-endpoint, auth-security, data-layer, UI kit).

## 6. Starter checklist for ProiectColectiv
- [ ] `CLAUDE.md` with sections 1–6 from §2 (start small: layout, commands, conventions incl. TODO rules, known gaps).
- [ ] `TODO.md` skeleton from §3 with sections A–… for our domains, Next free ID: TODO-01.
- [ ] `.claude/skills/verify/SKILL.md` once CI exists.
- [ ] Later: `todo_index.py` + a no-path-filter hygiene workflow.
