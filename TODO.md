# TODO — UBB Campus

**Sprintul curent: StudyRoom Finder.** Etapa 1 (onboarding, TODO-01..08) e gata; acum lucrăm în paralel la etapa a 2-a (TODO-09..16) și etapa a 3-a (TODO-17..24), fiecare cu 4 itemi de backend și 4 de frontend. Fișierul conține doar itemii sprintului.

## Cum folosim fișierul

- **Te asignezi singur:** alegi un item liber, îți scrii numele la „Asignat”, îl treci pe `[~]` și faci commit (sau anunți pe grup). Un om, un item.
- Nu ștergi și nu tai itemi. Când e gata: `[DONE]`, plus o propoziție cu ce s-a făcut și linkul la PR.
- Schimbarea statusului înseamnă două editări: titlul itemului și rândul din Index.

**Status:** `[ ]` liber · `[~]` în lucru · `[DONE]` gata

---

## Index

| ID | Status | Parte | Titlu | Asignat        |
|---|---|---|---|----------------|
| TODO-01 | `[DONE]` | Backend | Fundația: tipuri, date hardcodate și `GET /api/buildings` | Bogdan         |
| TODO-02 | `[DONE]` | Backend | `GET /api/rooms`: lista sălilor cu filtre | Darius         |
| TODO-03 | `[DONE]` | Backend | Motorul de stare: e sala liberă acum? | Alexia         |
| TODO-04 | `[DONE]` | Backend | Orarul hardcodat și `GET /api/rooms/[id]` | Diana          |
| TODO-05 | `[DONE]` | Frontend | Layout, navigare, pagina de start și `StatusBadge` | Tudor          |
| TODO-06 | `[DONE]` | Frontend | Pagina `/rooms`: lista de săli | Raul           |
| TODO-07 | `[DONE]` | Frontend | Pagina `/rooms/[id]`: detaliul unei săli | Bogdan Buruian |
| TODO-08 | `[DONE]` | Frontend | Bara de filtre și checklist-ul de QA | Bogdan         |
| TODO-09 | `[DONE]` | Backend | Check-in: contractul, stocarea și endpointurile | Diana      |
| TODO-10 | `[ ]` | Backend | Filtrul „liberă cel puțin N ore” | _(liber)_      |
| TODO-11 | `[ ]` | Backend | Planul clădirii: date și `GET /api/buildings/[id]/plan` | _(liber)_      |
| TODO-12 | `[DONE]` | Backend | Importerul de orar: parser FMI pe fișiere salvate | Alexia      |
| TODO-13 | `[ ]` | Frontend | Butonul de check-in pe pagina sălii | _(liber)_      |
| TODO-14 | `[DONE]` | Frontend | Semnalul „persoane aici” și lista care se actualizează singură | Bogdan Buruian     |
| TODO-15 | `[ ]` | Frontend | Pagina `/rooms/plan`: planul clădirii | _(liber)_      |
| TODO-16 | `[ ]` | Frontend | Filtrul „liberă cel puțin” în UI și QA pentru etapa a 2-a | _(liber)_      |
| TODO-17 | `[ ]` | Backend | Supabase local: prima migrație, RLS și seed pentru săli | _(liber)_      |
| TODO-18 | `[ ]` | Backend | `room_schedule` și funcția SQL `room_status` | _(liber)_      |
| TODO-19 | `[ ]` | Backend | Săptămâni pare/impare și perioada de cursuri | _(liber)_      |
| TODO-20 | `[ ]` | Backend | `GET /api/rooms/[id]/week`: orarul pe săptămână și intervalele libere | _(liber)_      |
| TODO-21 | `[ ]` | Frontend | Pagina `/rooms/[id]/week`: orarul pe săptămână | _(liber)_      |
| TODO-22 | `[ ]` | Frontend | Bazele traducerilor RO / EN | _(liber)_      |
| TODO-23 | `[ ]` | Frontend | Aplicație instalabilă: manifest, iconițe și pagină offline | _(liber)_      |
| TODO-24 | `[ ]` | Frontend | Teste end-to-end cu Playwright | _(liber)_      |

---

## Despre sprint

Scopul acestui sprint **nu** este produsul final, ci să ne obișnuim cu workflow-ul: branch → cod → test → PR → review → merge. La final avem o versiune minimă de StudyRoom Finder:

- pagina `/rooms`: lista sălilor cu starea „liberă / ocupată până la HH:MM”, plus filtre;
- pagina `/rooms/[id]`: detaliul unei săli cu orarul de azi;
- un backend **hardcodat**: route handlers Next.js (`apps/web/app/api/...`) care citesc date din fișiere TypeScript. Fără Supabase, fără Docker, fără login.

Supabase, importul real de orar, auth și RLS vin după acest sprint. Tipurile și endpointurile de aici sunt gândite astfel încât să putem înlocui datele hardcodate cu Supabase fără să schimbăm frontendul.

### Fișiere și regula anti-conflicte

| TODO | Parte | Fișiere proprii (relativ la `apps/web/`) |
|---|---|---|
| TODO-01 | Backend | `features/rooms/types.ts`, `features/rooms/data/*`, `features/rooms/server/time.ts`, `app/api/buildings/` |
| TODO-02 | Backend | `features/rooms/server/list-rooms.ts`, `parse-filters.ts`, `app/api/rooms/route.ts` |
| TODO-03 | Backend | `features/rooms/server/status.ts` |
| TODO-04 | Backend | `features/rooms/data/schedule.ts`, `features/rooms/server/get-room.ts`, `app/api/rooms/[id]/` |
| TODO-05 | Frontend | `app/(app)/layout.tsx`, `app/page.tsx`, `app/(app)/rooms/not-found.tsx`, `components/ui/StatusBadge.tsx` |
| TODO-06 | Frontend | `app/(app)/rooms/page.tsx`, `features/rooms/components/RoomCard.tsx`, `RoomList.tsx` |
| TODO-07 | Frontend | `app/(app)/rooms/[id]/page.tsx`, `features/rooms/components/RoomSchedule.tsx`, `RoomHeader.tsx` |
| TODO-08 | Frontend | `features/rooms/components/RoomFilters.tsx`, `docs/qa/studyroom-onboarding.md` |

`docs/` e la rădăcina repo-ului. Fiecare își scrie testele în propriul fișier din `apps/web/tests/unit/`.

**Modifici doar fișierele itemului tău.** Dacă ai nevoie să schimbi fișierul altcuiva, scrie-i pe grup sau în PR-ul lui. Doar cine ia TODO-01 modifică `package.json` / `pnpm-lock.yaml`. Singura excepție planificată: integrarea filtrelor din TODO-06 / TODO-08.

### Ordinea de merge

Totul se poate lucra în paralel, dar se integrează în două valuri:

1. **Valul 1 (primele 1-2 zile):** TODO-01 și TODO-05. Sunt mici și restul importă din ele (tipuri, date, `StatusBadge`). Review rapid pe ele.
2. **Valul 2:** TODO-02, TODO-03, TODO-04, TODO-06, TODO-07, TODO-08, în orice ordine. Frontendul lucrează pe date mock până apar endpointurile pe `main` (vezi fiecare TODO).

Până se face merge la TODO-01, poți porni branch-ul tău din branch-ul celui care face TODO-01 (`git checkout -b feat/... origin/feat/srf-be1-...`) și faci `git rebase origin/main` după ce TODO-01 intră pe main.

### Contractul (nu se schimbă fără să anunțați pe grup)

Tipurile din `features/rooms/types.ts` (le scrie TODO-01, exact așa):

```ts
export type RoomStatus = "free" | "occupied" | "unknown";

export interface Building {
  id: string;            // ex. "fmi-central"
  name: string;          // ex. "Clădirea Centrală"
  faculty: "FMI" | "FSEGA";
  address: string;
}

export interface Room {
  id: string;            // ex. "c-510"
  buildingId: string;
  code: string;          // codul din orar, ex. "C510"
  floor: number;
  capacity: number;
  hasOutlets: boolean;   // prize
  hasProjector: boolean;
}

export interface ScheduleEntry {
  roomId: string;
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1 = luni ... 7 = duminică
  start: string;         // "HH:MM", ora României
  end: string;           // "HH:MM"
  subject: string;       // ex. "Structuri de date și algoritmi"
  group: string;         // ex. "Seminar 211"
}

export interface StatusResult {
  status: RoomStatus;
  until: string | null;  // "HH:MM": ocupată până la / liberă până la; null = toată ziua
}

export interface RoomWithStatus extends Room, StatusResult {
  buildingName: string;
}

export interface RoomDetail {
  room: RoomWithStatus;
  today: ScheduleEntry[]; // sortate după start
}
```

Endpointuri (toate `GET`, răspuns JSON):

| Endpoint | Răspuns | Owner |
|---|---|---|
| `/api/buildings` | `Building[]` | TODO-01 |
| `/api/rooms?buildingId=&minCapacity=&outlets=1&projector=1&freeOnly=1` | `RoomWithStatus[]`, întâi cele libere | TODO-02 |
| `/api/rooms/[id]` | `RoomDetail`, sau `404 { "error": "Room not found" }` | TODO-04 |

Funcția de stare (o scrie TODO-03; TODO-01 pune un stub ca să compileze restul):

```ts
// features/rooms/server/status.ts
export function computeStatus(roomId: string, entries: ScheduleEntry[], now: Date): StatusResult
```

### Workflow pentru fiecare item

1. `git checkout main && git pull`
2. `git checkout -b feat/srf-<id>-<nume-scurt>` (ex. `feat/srf-be2-rooms-list`)
3. Lucrezi, rulezi local: `pnpm --filter web dev`, `pnpm lint`, `pnpm typecheck`, `pnpm test:run`.
4. Commit-uri mici, în engleză, cu prefix: `feat(rooms): add GET /api/rooms`, `test(rooms): ...`, `fix(rooms): ...`.
5. `git push -u origin feat/srf-...` și deschizi PR spre `main`. În descriere: link la TODO-ul tău, ce ai făcut, cum se testează, screenshot dacă e UI.
6. Cel puțin **un review** de la alt membru (ideal din cealaltă jumătate: backend revizuiește frontend și invers). CI verde.
7. Merge cu „Squash and merge”, apoi ștergi branch-ul.


Review-ul îl face cineva din cealaltă jumătate (backend revizuiește frontend și invers), ca toată lumea să citească codul altcuiva.

### Reguli scurte

- Cod, identificatori, commit-uri în engleză; textele din UI în română.
- Ora se calculează în `Europe/Bucharest`, nu în fusul orar al serverului (Vercel rulează în UTC).
- O sală despre care nu știm nimic e `unknown`, niciodată `free` (CLAUDE.md §6).
- Datele sunt **demo**, nu orarul real FMI. Orarul real vine prin importer, după acest sprint.

---

## Etapa a 2-a (TODO-09..16)

Ducem StudyRoom Finder mai aproape de MVP: **check-in**, **plan al clădirii**, **filtrul „liberă cel puțin N ore”** și primul pas spre **orarul real**. Filtrele de prize și proiector există deja din etapa 1. Rămânem tot fără Supabase, fără Docker și fără login, iar workflow-ul, regulile scurte și regula „un om, un item” sunt cele de mai sus.

**Atenție la numere:** itemii din acest fișier au numerotarea lor. TODO-16 de aici nu e același lucru cu TODO-16 din backlog; când ne referim la backlog scriem „backlog #22”, ca în cod.

### Fișiere și regula anti-conflicte

| TODO | Parte | Fișiere proprii (relativ la `apps/web/`) |
|---|---|---|
| TODO-09 | Backend | `features/rooms/types.ts`, `features/rooms/server/checkins.ts`, `app/api/rooms/[id]/checkins/`, `app/api/checkins/` |
| TODO-10 | Backend | `features/rooms/server/list-rooms.ts`, `parse-filters.ts`, `free-for.ts` |
| TODO-11 | Backend | `features/rooms/data/floor-plans.ts`, `features/rooms/server/get-plan.ts`, `app/api/buildings/[id]/plan/` |
| TODO-12 | Backend | În afara `apps/web/`: `scripts/schedule-import/`, jobul `importer` din `.github/workflows/ci.yml`, `.gitignore`, nota de status din `CLAUDE.md` |
| TODO-13 | Frontend | `features/rooms/components/CheckinButton.tsx`, `app/(app)/rooms/[id]/page.tsx` |
| TODO-14 | Frontend | `features/rooms/components/CheckinSignal.tsx`, `RoomCard.tsx`, `RoomHeader.tsx`, `RoomList.tsx` |
| TODO-15 | Frontend | `app/(app)/rooms/plan/page.tsx`, `features/rooms/components/FloorPlan.tsx`, `app/(app)/layout.tsx` |
| TODO-16 | Frontend | `features/rooms/components/RoomFilters.tsx`, `docs/qa/studyroom-onboarding.md` |

**O singură excepție planificată:** TODO-09 adaugă câte o linie în `get-room.ts` și `list-rooms.ts` și completează câmpul nou în fixture-urile din `room-detail.test.tsx` și `room-list.test.tsx`, pentru că altfel nu compilează. De aceea intră primul. Nimeni în afară de TODO-09 nu modifică `types.ts`. Niciun item din etapa asta nu are nevoie de dependențe noi în `apps/web`, deci `package.json` și lockfile-ul rămân neatinse.

### Ordinea de merge

1. **Valul 1:** doar TODO-09. Ține PR-ul mic; restul depind de tipurile lui. Anunți pe grup când e pe `main`.
2. **Valul 2:** toți ceilalți, în orice ordine. Frontendul lucrează pe mock-uri până apar endpointurile. TODO-12 nu depinde de nimeni și poate porni imediat.

Dependențe: TODO-13 și TODO-14 → TODO-09 · TODO-15 → TODO-11 · TODO-16 → TODO-10.

### Completări la contract (le scrie TODO-09 în `types.ts`, exact așa)

```ts
export interface RoomWithStatus extends Room, StatusResult {
  buildingName: string;
  activeCheckins: number; // câte check-in-uri neexpirate are sala acum
}

export interface Checkin {
  id: string;
  roomId: string;
  createdAt: string; // ISO 8601
  expiresAt: string; // ISO 8601
}

export interface PlacedRoom extends RoomWithStatus {
  row: number; // de la 1
  col: number; // de la 1 la 3
}

export interface BuildingFloor {
  floor: number;
  rooms: PlacedRoom[];
}

export interface BuildingPlan {
  building: Building;
  floors: BuildingFloor[]; // sortate crescător după floor
}
```

Endpointuri noi:

| Endpoint | Răspuns | Owner |
|---|---|---|
| `POST /api/rooms/[id]/checkins` | `201` cu `Checkin`, sau `404 { "error": "Room not found" }` | TODO-09 |
| `DELETE /api/checkins/[id]` | `204`, sau `404 { "error": "Check-in not found" }` | TODO-09 |
| `GET /api/rooms?...&minFreeHours=2` | parametru nou pentru lista existentă | TODO-10 |
| `GET /api/buildings/[id]/plan` | `BuildingPlan`, sau `404 { "error": "Building not found" }` | TODO-11 |

**Regula care nu se schimbă (CLAUDE.md §4):** check-in-urile **nu** modifică `status`. O sală poate fi „liberă” după orar și să aibă 2 persoane înăuntru, iar UI-ul le arată pe amândouă. Nu le comasați într-o singură stare: tocmai dezacordul dintre ele e informația utilă.

### Ce rămâne deschis după etapa asta

- **Check-in-urile stau în memorie și sunt anonime.** Se pierd la restart, pe Vercel instanțele pot vedea numere diferite, iar oricine poate apăsa de mai multe ori. E acceptabil doar pentru demo. Ce trebuie: Supabase și login (backlog #08, #22).
- **Supabase nu e început**, ca să nu blocăm echipa pe conturi și Docker. Ce trebuie: cele două proiecte (`dev`, `prod`), apoi schema și RLS (backlog #04, #52, #53). E pasul natural pentru etapa următoare.
- **`computeStatus` nu știe de săptămâni pare/impare, semestru, sărbători.** Ce trebuie: datele reale din importer și o decizie despre ce arătăm când nu există orar (backlog #19).
- **Importerul nu descarcă singur și nu scrie nicăieri.** Ce trebuie: răspunsul la OQ-8 (de unde luăm orarul și dacă avem voie să-l descărcăm automat).
- **Planul e o schemă demo, nu planul real.** Ce trebuie: răspunsul la OQ-6 (cine desenează planurile) și lista reală de săli (backlog #16).
- **Locuri libere și dotări la check-in** (backlog #22) nu intră acum, ca să ținem itemii mici. Ce trebuie: să validăm mai întâi check-in-ul simplu.

---

## Etapa a 3-a (TODO-17..24)

Se lucrează în același timp cu etapa a 2-a, așa că itemii ating, pe cât posibil, alte fișiere. Pregătim ce urmează: **baza de date** (doar local), **orarul corect pe săptămâni**, **vederea pe toată săptămâna**, **traducerile**, **instalarea pe telefon** și **testele end-to-end**. Workflow-ul și regulile sunt aceleași, iar în `apps/web/` citește întâi `AGENTS.md`: versiunea noastră de Next.js are diferențe față de ce găsești de obicei pe net.

### Fișiere și regula anti-conflicte

| TODO | Parte | Fișiere proprii |
|---|---|---|
| TODO-17 | Backend | `supabase/` (config, prima migrație, `seed.sql`, teste), `apps/web/lib/supabase/database.types.ts` |
| TODO-18 | Backend | Migrația și testele proprii din `supabase/`; după TODO-17 regenerează `database.types.ts` și completează `seed.sql` |
| TODO-19 | Backend | `apps/web/features/rooms/data/calendar.ts`, `data/schedule.ts`, `server/calendar.ts`, `server/status.ts`, `server/get-room.ts` |
| TODO-20 | Backend | `apps/web/features/rooms/server/get-week.ts`, `apps/web/app/api/rooms/[id]/week/` |
| TODO-21 | Frontend | `apps/web/app/(app)/rooms/[id]/week/`, `apps/web/features/rooms/components/RoomWeek.tsx` |
| TODO-22 | Frontend | `apps/web/lib/i18n/`, `apps/web/components/ui/LanguageSwitcher.tsx`, `components/ui/StatusBadge.tsx`, `app/page.tsx`, `app/(app)/rooms/not-found.tsx` |
| TODO-23 | Frontend | `apps/web/public/`, `apps/web/app/layout.tsx`, `apps/web/next.config.ts`, `apps/web/components/RegisterServiceWorker.tsx` |
| TODO-24 | Frontend | `apps/web/tests/e2e/`, `apps/web/playwright.config.ts`, `package.json` și `apps/web/package.json`, `pnpm-lock.yaml` |

**Excepții planificate, toate de o linie sau două:**

- **TODO-19** adaugă un câmp opțional în `ScheduleEntry` din `types.ts`, după ce TODO-09 e pe `main`.
- **TODO-21** adaugă un link în `app/(app)/rooms/[id]/page.tsx`, după ce TODO-13 e pe `main`.
- **`.github/workflows/ci.yml`:** TODO-12 și TODO-24 adaugă fiecare câte un job separat. Dacă apare conflict, păstrați ambele joburi.
- **`CLAUDE.md`:** TODO-12, 17, 23 și 24 actualizează nota de status și §2. Dacă apare conflict, păstrați ambele modificări.

### Dependențe și ordinea de merge

| TODO | Poate porni | Trebuie să aștepte |
|---|---|---|
| TODO-17, 20, 22, 23, 24 | imediat | nimic |
| TODO-18 | după TODO-17 | TODO-17 pe `main`; între timp poți scrie SQL-ul și testele pe branch-ul lui |
| TODO-19 | imediat | TODO-09 pe `main` înainte de PR, pentru rebase pe `types.ts` și `get-room.ts` |
| TODO-21 | imediat, pe un mock | TODO-20 pentru endpoint și TODO-13 pentru linkul din pagina sălii |

### Ce rămâne deschis după etapa asta

- **Aplicația tot din fișierele TypeScript citește.** Supabase există doar local. Ce trebuie: proiectele `dev` și `prod`, login (backlog #04, #08) și o decizie despre momentul trecerii.
- **Corecțiile de admin nu au tabel încă** (backlog #18). Ce trebuie: răspunsul la OQ-4 (cine sunt adminii).
- **Testele pgTAP rulează doar local**, pentru că în CI ar cere Docker și timp de configurare. Ce trebuie: să le adăugăm în CI când există proiectul `dev`.
- **Doar câteva texte sunt traduse.** Restul componentelor trec pe `lib/i18n` după ce se termină etapa a 2-a, ca să evităm conflictele. Vezi TODO-22.
- **Sărbătorile și sesiunea arată `unknown`, pe baza unui calendar demo.** TODO-19 alege varianta asta pentru că o sală necunoscută nu e niciodată `free`. Ce trebuie: calendarul oficial al anului universitar.

---

## Backend

### TODO-01 `[DONE]` Fundația: tipuri, date hardcodate și `GET /api/buildings`

**Asignat:** Bogdan · **Val:** 1, intră primul pe `main` · **Branch:** `feat/srf-be1-foundation`

Tipurile, sălile și clădirile demo, `bucharestNow`, stub-ul `computeStatus` și `GET /api/buildings` sunt făcute, cu teste. PR: _(de completat linkul)_

#### De ce
Toți ceilalți importă tipurile și datele tale. Cu cât intră mai repede pe `main`, cu atât lucrează ceilalți mai liniștiți. Ține PR-ul mic.

#### Ce ai de făcut

1. **`apps/web/features/rooms/types.ts`**: copiază exact tipurile din secțiunea „Contractul” de mai sus.

2. **`apps/web/features/rooms/data/buildings.ts`**: `export const buildings: Building[]` cu 2 clădiri:
   - `fmi-central`, „Clădirea Centrală”, FMI, „Str. Mihail Kogălniceanu 1”
   - `fsega`, „FSEGA”, FSEGA, „Str. Teodor Mihali 58-60”

3. **`apps/web/features/rooms/data/rooms.ts`**: `export const rooms: Room[]` cu 8-10 săli demo, împărțite pe cele două clădiri, cu capacități între 20 și 150 și combinații diferite de `hasOutlets` / `hasProjector` (ca filtrele să aibă ce filtra). Exemple de coduri: `C510`, `C512`, `L001`, `2/I`, `5/I`, `Gamma`, `S10`. `id` în format kebab-case (`c-510`).

4. **`apps/web/features/rooms/data/schedule.ts`**: doar `export const scheduleEntries: ScheduleEntry[] = [];`. Îl umple TODO-04.

5. **`apps/web/features/rooms/server/time.ts`**: ziua și ora curentă în România, folosite de TODO-03 și TODO-04:
   ```ts
   const TZ = "Europe/Bucharest";
   const DAYS: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

   export function bucharestNow(now: Date): { day: number; time: string } {
     const parts = new Intl.DateTimeFormat("en-GB", {
       timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
     }).formatToParts(now);
     const get = (t: string) => parts.find((p) => p.type === t)!.value;
     return { day: DAYS[get("weekday")], time: `${get("hour")}:${get("minute")}` };
   }
   ```

6. **`apps/web/features/rooms/server/status.ts`**: un **stub** cu semnătura finală, ca să compileze TODO-02 și TODO-04 înainte să fie gata TODO-03:
   ```ts
   import type { ScheduleEntry, StatusResult } from "../types";
   // Stub: real implementation in TODO-03.
   export function computeStatus(_roomId: string, _entries: ScheduleEntry[], _now: Date): StatusResult {
     return { status: "unknown", until: null };
   }
   ```
   După merge, fișierul ăsta îi aparține lui TODO-03; nu-l mai modifica.

7. **`apps/web/app/api/buildings/route.ts`**: `GET` care întoarce `buildings` cu `NextResponse.json(buildings)`.

8. **Test** `apps/web/tests/unit/time.test.ts`: `bucharestNow(new Date("2026-11-02T10:30:00Z"))` → `{ day: 1, time: "12:30" }` (luni, ora de iarnă UTC+2) și un caz în ora de vară (ex. `2026-06-15T10:30:00Z` → `13:30`).

9. Dacă scaffold-ul nu are încă Vitest, adaugă-l tu (`vitest` ca devDependency în `apps/web` și scriptul `test:run`). Doar tu atingi `package.json` în sprintul ăsta.

#### Gata când
- [ ] `curl localhost:3000/api/buildings` întoarce cele 2 clădiri.
- [ ] Toate id-urile de sală sunt unice și fiecare `buildingId` există în `buildings`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test:run` trec.
- [ ] PR revizuit de un coleg din cealaltă jumătate și intrat pe `main`; anunți pe grup că „TODO-01 e pe main”.

### TODO-02 `[DONE]` `GET /api/rooms`: lista sălilor cu filtre

**Asignat:** Darius · **Val:** 2 · **Branch:** `feat/srf-be2-rooms-list`

#### De ce
E endpointul pe care stă pagina principală (TODO-06) și filtrele (TODO-08). Acum citește din fișiere TS; mai târziu va citi din view-ul Supabase `rooms_with_status`, dar răspunsul rămâne la fel.

#### Depinde de
TODO-01 pe `main` (tipuri, `rooms`, `buildings`, `scheduleEntries`, stub-ul `computeStatus`). Nu aștepta TODO-03: cu stub-ul toate sălile ies `unknown`, și e OK pentru dezvoltare.

#### Ce ai de făcut

1. **`apps/web/features/rooms/server/list-rooms.ts`**: o funcție pură, ușor de testat:
   ```ts
   export interface RoomFilters {
     buildingId?: string;
     minCapacity?: number;
     outlets?: boolean;
     projector?: boolean;
     freeOnly?: boolean;
   }
   export function listRooms(filters: RoomFilters, now: Date): RoomWithStatus[]
   ```
   - pentru fiecare sală: `computeStatus(room.id, scheduleEntries, now)` + `buildingName` din `buildings`;
   - aplică filtrele (cele lipsă nu filtrează nimic);
   - `freeOnly` păstrează doar `status === "free"`;
   - sortare: întâi `free`, apoi `occupied`, apoi `unknown`; în cadrul aceleiași stări, după `code`.

2. **`apps/web/features/rooms/server/parse-filters.ts`**: `parseFilters(searchParams: URLSearchParams): RoomFilters`. `outlets=1` → `true`; `minCapacity=abc` sau negativ → ignorat (nu crăpăm pe input prost).

3. **`apps/web/app/api/rooms/route.ts`**:
   ```ts
   export const dynamic = "force-dynamic"; // starea depinde de ora curentă, nu vrem cache
   export function GET(req: NextRequest) {
     return NextResponse.json(listRooms(parseFilters(req.nextUrl.searchParams), new Date()));
   }
   ```

4. **Teste** `apps/web/tests/unit/list-rooms.test.ts`: fiecare filtru separat, două filtre combinate, `parseFilters` cu valori invalide, și ordinea sortării. Pentru sortare poți folosi `vi.mock("@/features/rooms/server/status")` ca să controlezi starea, ca testul să nu depindă de ora la care rulează.

#### Gata când
- [ ] `curl "localhost:3000/api/rooms?buildingId=fmi-central&projector=1"` întoarce doar sălile potrivite.
- [ ] `curl "localhost:3000/api/rooms?minCapacity=abc"` întoarce toate sălile, nu eroare.
- [ ] Testele trec; lint și typecheck verzi.
- [ ] PR revizuit de cine are TODO-06 (consumă endpointul, deci verifică și forma răspunsului).

### TODO-03 `[DONE]` Motorul de stare: e sala liberă acum?

**Asignat:** Alexia · **Val:** 2 · **Branch:** `feat/srf-be3-status`

`computeStatus` calculează starea sălii în ora României, inclusiv orele lipite, cu teste. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/4

#### De ce
E inima aplicației. Acum e o funcție TypeScript; mai târziu devine funcția SQL `room_status` din Postgres, cu aceleași cazuri de test. De aceea testele contează mai mult decât codul.

#### Depinde de
TODO-01 pe `main` (tipuri, `bucharestNow`, stub-ul din `status.ts`). Înlocuiești corpul stub-ului; **semnătura rămâne aceeași**, altfel strici TODO-02 și TODO-04.

#### Ce ai de făcut

1. **`apps/web/features/rooms/server/status.ts`**: implementează
   `computeStatus(roomId: string, entries: ScheduleEntry[], now: Date): StatusResult`
   - ia `{ day, time } = bucharestNow(now)` (din `./time`);
   - păstrează doar intrările cu `roomId` și `day` potrivite, sortate după `start`;
   - dacă o intrare acoperă ora curentă (`start <= time < end`) → `occupied`, `until` = sfârșitul ei. **Ore lipite**: dacă imediat după vine altă oră care începe exact la `end`, `until` e sfârșitul ultimei din lanț (ocupată 10:00-12:00 și 12:00-14:00 → „ocupată până la 14:00”);
   - altfel, dacă mai urmează o oră azi → `free`, `until` = `start`-ul ei;
   - altfel → `free`, `until: null` (liberă tot restul zilei).
   - Comparația `"HH:MM"` ca string merge pentru că formatul are mereu 2 cifre; scrie asta într-un comentariu.

2. **Teste** `apps/web/tests/unit/status.test.ts` cu intrări scrise direct în test (nu din `schedule.ts`, care se poate schimba):
   - în timpul unei ore → `occupied` până la sfârșitul ei;
   - exact la ora de start (10:00) → `occupied`; exact la ora de final (12:00, fără altă oră după) → `free`;
   - ore lipite → `until` = finalul lanțului;
   - pauză între ore → `free` până la următoarea;
   - după ultima oră / zi fără ore / weekend → `free`, `until: null`;
   - intrări pentru altă sală sunt ignorate;
   - fusul orar: `new Date("2026-11-02T08:30:00Z")` e 10:30 în România, nu 08:30.

3. Opțional, dacă ai timp: notează în PR ce lipsește față de varianta reală (paritate săptămână pară/impară, semestru, corecții de admin, check-in). Nu le implementa acum.

#### Gata când
- [ ] Toate cazurile de mai sus au test și trec.
- [ ] Cu TODO-02 pe main, `/api/rooms` arată stări `free` / `occupied`, nu doar `unknown`.
- [ ] Lint și typecheck verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-04 `[DONE]` Orarul hardcodat și `GET /api/rooms/[id]`

**Asignat:** Diana · **Val:** 2 · **Branch:** `feat/srf-be4-room-detail`

Orarul demo, `getRoomDetail` și `GET /api/rooms/[id]` sunt făcute, cu teste. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/5

#### De ce
Fără orar toate sălile sunt libere tot timpul și nu vedem nimic interesant. Datele tale țin locul importerului real, iar endpointul de detaliu alimentează pagina sălii (TODO-07).

#### Depinde de
TODO-01 pe `main`. Folosește `computeStatus` (stub până intră TODO-03; nu-l modifica).

#### Ce ai de făcut

1. **`apps/web/features/rooms/data/schedule.ts`**: completează `scheduleEntries` cu ~25-40 de intrări demo, luni-vineri, între 08:00 și 20:00, pe sălile din `rooms.ts`. Ca să putem testa toate stările în demo:
   - o sală plină aproape toată ziua (ore lipite);
   - o sală cu pauze;
   - o sală fără nicio oră;
   - materii de anul 1-2 (ex. „Structuri de date și algoritmi”, „Baze de date”, „Sisteme de operare”), formații ca „Seminar 211” sau „Curs anul 2”.
   Pune un comentariu sus: `// Demo data, not the real FMI timetable. Replaced by the importer later.`

2. **`apps/web/features/rooms/server/get-room.ts`**: `getRoomDetail(id: string, now: Date): RoomDetail | null`
   - `null` dacă sala nu există;
   - `room`: sala + `buildingName` + rezultatul lui `computeStatus`;
   - `today`: intrările sălii pentru ziua curentă în România (`bucharestNow(now).day`), sortate după `start`.

3. **`apps/web/app/api/rooms/[id]/route.ts`**: `GET`, cu `export const dynamic = "force-dynamic"`. Întoarce `RoomDetail` sau `404` cu `{ "error": "Room not found" }`. Atenție: în Next.js 15 `params` e `Promise`: `{ params }: { params: Promise<{ id: string }> }`, apoi `const { id } = await params`.

4. **Teste** `apps/web/tests/unit/get-room.test.ts`: id inexistent → `null`; `today` conține doar ziua cerută și e sortat; `buildingName` e corect. Plus un test de date: fiecare `roomId` din `scheduleEntries` există în `rooms` și `start < end`.

#### Gata când
- [ ] `curl localhost:3000/api/rooms/c-510` întoarce sala și orarul de azi.
- [ ] `curl -i localhost:3000/api/rooms/nu-exista` întoarce 404.
- [ ] Testele trec; lint și typecheck verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-09 `[DONE]` Check-in: contractul, stocarea și endpointurile

**Asignat:** Diana · **Val:** 1, intră primul pe `main` · **Branch:** `feat/srf-be5-checkins`

#### De ce
Orarul spune ce ar trebui să se întâmple într-o sală; check-in-ul spune ce se întâmplă de fapt. E cerință de MVP (backlog #22). Fără login și fără bază de date îl facem cât mai simplu, dar cu forma pe care o va păstra și după Supabase.

#### Depinde de
Nimic. Ceilalți depind de tine pentru tipuri, așa că ține PR-ul mic.

#### Ce ai de făcut

1. **`apps/web/features/rooms/types.ts`**: adaugă exact completările din secțiunea „Completări la contract”.

2. **`apps/web/features/rooms/server/checkins.ts`**: stocarea în memorie, cu `now` primit ca parametru ca să se poată testa expirarea:
   ```ts
   export const CHECKIN_TTL_MS = 2 * 60 * 60 * 1000; // 2 ore
   export function addCheckin(roomId: string, now: Date): Checkin
   export function removeCheckin(id: string, now: Date): boolean // false dacă nu există sau a expirat
   export function countActiveCheckins(roomId: string, now: Date): number
   export function resetCheckins(): void // doar pentru teste
   ```
   - Ține datele pe `globalThis`, nu într-o variabilă de modul: fiecare route handler poate fi împachetat separat și ar vedea altă copie. Scrie motivul într-un comentariu.
   - Un check-in expirat nu se numără, indiferent dacă a fost sau nu șters. Curăță-le pe cele expirate la fiecare `addCheckin`, ca lista să nu crească la nesfârșit.
   - `id` cu `crypto.randomUUID()`. Nu stoca nimic despre utilizator.
   - Comentariu sus: stocare temporară pentru demo, se pierde la restart, o înlocuiește Supabase.

3. **`apps/web/app/api/rooms/[id]/checkins/route.ts`**: `POST`, fără body, conform tabelului de endpointuri. Verifică sala în `rooms`.

4. **`apps/web/app/api/checkins/[id]/route.ts`**: `DELETE`, conform tabelului. La `204` răspunsul nu are corp: `new NextResponse(null, { status: 204 })`.
   Ambele rute au `export const dynamic = "force-dynamic"`, iar `params` e `Promise`, ca la `app/api/rooms/[id]/route.ts`.

5. **Excepția planificată:** o linie `activeCheckins: countActiveCheckins(room.id, now)` în `get-room.ts` și una în `list-rooms.ts`, plus `activeCheckins: 0` în fixture-urile din `room-detail.test.tsx` și `room-list.test.tsx`. Nu schimba `status`, sortarea sau filtrele.

6. **Teste** `apps/web/tests/unit/checkins.test.ts` (cu `resetCheckins()` în `beforeEach`): numărarea pe sală, două săli separate, expirarea exact la 2 ore (o oră și 59 de minute se numără, 2 ore nu), `removeCheckin` pe id inexistent și pe id expirat, rutele `POST` (201, 404) și `DELETE` (204, 404), și faptul că un check-in schimbă `activeCheckins`, dar nu și `status`.

#### Gata când
- [ ] `curl -X POST localhost:3000/api/rooms/c-510/checkins` întoarce 201, iar `curl localhost:3000/api/rooms/c-510` arată `activeCheckins: 1`.
- [ ] `curl -i -X POST localhost:3000/api/rooms/nu-exista/checkins` întoarce 404.
- [ ] Check-in-ul se vede și în `GET /api/rooms` (dovada că stocarea e comună pentru toate rutele).
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test:run` trec; PR revizuit de un coleg din cealaltă jumătate; anunți pe grup că „TODO-09 e pe main”.

### TODO-10 `[ ]` Filtrul „liberă cel puțin N ore”

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-be6-free-for`

#### De ce
„Liberă” nu ajută dacă sala se ocupă peste 10 minute. Filtrul e în lista de MVP (backlog #20) și e singurul care lipsește din etapa 1.

#### Depinde de
TODO-09 pe `main` (doar ca să eviți un rebase pe `list-rooms.ts`).

#### Ce ai de făcut

1. **`apps/web/features/rooms/server/free-for.ts`**: funcție pură:
   ```ts
   export function isFreeFor(result: StatusResult, minHours: number, now: Date): boolean
   ```
   - `occupied` și `unknown` → `false` (o sală necunoscută nu e niciodată considerată liberă);
   - `free` cu `until: null` (fără alte ore azi) → `true`;
   - `free` cu `until` → minutele dintre `bucharestNow(now).time` și `until` trebuie să fie cel puțin `minHours * 60`. Limita e inclusă: la 10:00, cu `until` 12:00, sala trece pentru 2 ore.

2. **`list-rooms.ts`**: `minFreeHours?: number` în `RoomFilters`, aplicat cu `isFreeFor`. Sortarea rămâne aceeași.

3. **`parse-filters.ts`**: `minFreeHours` după aceleași reguli ca `minCapacity`: număr finit și pozitiv, altfel ignorat.

4. **Teste** `apps/web/tests/unit/free-for.test.ts`: toate cazurile de la pasul 1, inclusiv limita exactă și un minut sub limită, fusul orar (`now` dat în UTC), `parseFilters` cu `abc`, `0`, `-1`, și filtrul combinat cu `buildingId`. Controlează starea cu `vi.mock`, ca în `list-rooms.test.ts`, ca testul să nu depindă de ora la care rulează.

#### Gata când
- [ ] `curl "localhost:3000/api/rooms?minFreeHours=2"` nu întoarce nicio sală ocupată sau una care se ocupă în mai puțin de 2 ore.
- [ ] `curl "localhost:3000/api/rooms?minFreeHours=abc"` întoarce toate sălile, nu eroare.
- [ ] Testele trec; lint și typecheck verzi; PR revizuit de cine are TODO-16.

### TODO-11 `[ ]` Planul clădirii: date și `GET /api/buildings/[id]/plan`

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-be7-building-plan`

#### De ce
„Hartă sau plan al clădirii” e în MVP (backlog #21). Cine desenează planurile reale e încă o întrebare deschisă (OQ-6), așa că pornim de la o schemă pe grilă: fiecare sală are un rând și o coloană pe etajul ei. Dacă primim planuri reale, se schimbă datele și desenul, nu și stările.

#### Depinde de
TODO-09 pe `main` (tipurile `BuildingPlan`, `BuildingFloor`, `PlacedRoom`).

#### Ce ai de făcut

1. **`apps/web/features/rooms/data/floor-plans.ts`**: `export const roomPositions: Record<string, { row: number; col: number }>`, cu o poziție pentru fiecare sală din `rooms.ts`, pe maximum 3 coloane (ca să încapă pe telefon). Comentariu sus: `// Demo layout, not the real floor plan. See OQ-6.`

2. **`apps/web/features/rooms/server/get-plan.ts`**: `getBuildingPlan(id: string, now: Date): BuildingPlan | null`
   - `null` dacă nu există clădirea;
   - refolosește `listRooms({ buildingId: id }, now)`, ca stările și check-in-urile să fie calculate într-un singur loc;
   - grupează pe etaje, sortate crescător; în cadrul etajului, sălile sortate după `row`, apoi `col`.

3. **`apps/web/app/api/buildings/[id]/plan/route.ts`**: `GET` cu `force-dynamic`, `BuildingPlan` sau 404 conform tabelului.

4. **Teste** `apps/web/tests/unit/building-plan.test.ts`:
   - test de date: fiecare sală are poziție, fiecare cheie din `roomPositions` e o sală existentă, `col` e între 1 și 3, două săli de pe același etaj nu au aceeași poziție;
   - clădire inexistentă → `null`;
   - clădirea conține doar sălile ei, iar etajele sunt sortate.

#### Gata când
- [ ] `curl localhost:3000/api/buildings/fmi-central/plan` întoarce etajele 0, 1 și 5, cu sălile și stările lor.
- [ ] `curl -i localhost:3000/api/buildings/nu-exista/plan` întoarce 404.
- [ ] Testele trec; lint și typecheck verzi; PR revizuit de cine are TODO-15.

### TODO-12 `[DONE]` Importerul de orar: parser FMI pe fișiere salvate

**Asignat:** Alexia · **Val:** 2, poate porni imediat · **Branch:** `feat/srf-be8-importer-parser`

Parserul FMI citește pagini de orar salvate manual și scoate rândurile ca JSON, fără rețea, cu teste pe pagini reale și job de CI. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/12

#### De ce
Orarul real e ce transformă demo-ul în produs, iar partea riscantă e formatul paginilor. O verificăm devreme, cu un program Python separat (CLAUDE.md §1 și §3.3), fără să atingem aplicația. Rezultatul ne spune și ce coduri de săli există de fapt, deci ajută la catalogul real (backlog #16).

#### Depinde de
Nimic. **Nu descărca automat** paginile: dacă avem voie și de unde, e OQ-8, încă deschisă. Salvezi manual din browser 2-3 pagini publice ale orarului FMI și le folosești ca fixture-uri.

#### Ce ai de făcut

1. **`scripts/schedule-import/`** (la rădăcina repo-ului), Python 3.12:
   - `requirements.txt` cu `beautifulsoup4` și `pytest`;
   - `schedule_import/models.py`: dataclass-ul `ScheduleRow` cu `room_code`, `day` (1-7), `start`, `end`, `subject`, `group`, `parity` (`"all"`, `"odd"`, `"even"`);
   - `schedule_import/adapters/base.py`: interfața comună `fetch() -> raw` și `parse(raw) -> list[ScheduleRow]`;
   - `schedule_import/adapters/fmi.py`: tot ce ține de formatul FMI stă **doar** aici, în codul comun nu intră nimic specific unei facultăți;
   - `schedule_import/__main__.py`: `python -m schedule_import --faculty fmi --dry-run --from-file <fișier.html>`.

2. **Comportament:**
   - `parse` scoate orele mereu ca `"HH:MM"` cu două cifre (`8` → `"08:00"`), pentru că `computeStatus` le compară ca text;
   - o pagină cu format necunoscut dă o eroare clară, nu o listă goală tăcută;
   - fără `--from-file`, programul se oprește cu un mesaj care trimite la OQ-8;
   - programul nu scrie nicăieri: rândurile ies ca JSON la stdout, iar la stderr un rezumat (câte rânduri, câte pe zi, lista codurilor de săli găsite).

3. **Teste** `scripts/schedule-import/tests/test_fmi_parser.py`, pe fixture-urile din `tests/fixtures/`: numărul de rânduri, un rând verificat manual câmp cu câmp, paritatea, formatul orelor, pagina cu format necunoscut.

4. **Infrastructură:**
   - un job `importer` în `.github/workflows/ci.yml` care instalează dependențele și rulează `pytest`;
   - `.venv/` și `__pycache__/` în `.gitignore`;
   - `README.md` scurt în `scripts/schedule-import/` (cum rulezi, de unde sunt fixture-urile și când au fost salvate);
   - actualizează `CLAUDE.md` (nota de status de sus și §2), ca să spună adevărul despre ce există acum.

#### Gata când
- [ ] Comanda de la pasul 1 pe un fixture real tipărește rânduri corecte, verificate manual pe câteva ore din orar.
- [ ] `pytest` trece local și în CI.
- [ ] Niciun apel de rețea în cod și nicio dependență față de `apps/web`.
- [ ] În PR: lista codurilor de săli găsite și ce a fost ciudat în format (o să ne trebuiască pentru OQ-8 și backlog #16). PR revizuit de un coleg din cealaltă jumătate.

### TODO-17 `[ ]` Supabase local: prima migrație, RLS și seed pentru săli

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be9-supabase-catalog`

#### De ce
Datele hardcodate au o limită. Facem primul pas spre baza de date doar local, fără conturi și fără să schimbăm aplicația, și stabilim de la început regula cea mai importantă a proiectului: fiecare tabel are RLS și un test care o dovedește (CLAUDE.md §3.2).

#### Depinde de
Nimic din etapa a 2-a. Ai nevoie de **Docker Desktop** pe laptop, deci ia itemul doar dacă îl poți instala. Rulezi CLI-ul cu `pnpm dlx supabase`, fără să-l adaugi în `package.json`.

#### Ce ai de făcut

1. `supabase init` în rădăcina repo-ului și `supabase migration new rooms_catalog`.

2. **Migrația** creează `faculties`, `buildings` și `rooms`, cu nume `snake_case` și aceleași date ca tipurile din `types.ts`:
   - `rooms`: `id text primary key`, `building_id` cu foreign key, `code text unique not null`, `floor int`, `capacity int check (capacity > 0)`, `has_outlets boolean`, `has_projector boolean`;
   - **RLS activat pe toate trei, în aceeași migrație**;
   - politici de `select` doar pentru rolul `authenticated`. Nu există politici de scriere, deci niciun client nu poate modifica datele.

3. **`supabase/seed.sql`**: copiază facultățile, clădirile și sălile din `features/rooms/data/`, cu un comentariu că sunt date demo.

4. **Teste pgTAP** în `supabase/tests/rooms_catalog.test.sql`: `anon` nu poate citi și nu poate scrie, `authenticated` poate citi, dar nu poate scrie, iar `capacity = 0` e respins.

5. Generează `apps/web/lib/supabase/database.types.ts` și fă-l commit (CLAUDE.md §1). Aplicația încă nu îl folosește.

6. Actualizează `CLAUDE.md`, ca să spună ce există acum din `supabase/`, și notează în README pașii de pornire pe Windows.

#### Gata când
- [ ] `supabase db reset` aplică migrația și seed-ul fără erori, de la zero.
- [ ] `supabase test db` trece.
- [ ] Niciun fișier din `features/` nu e schimbat, iar `pnpm lint`, `pnpm typecheck`, `pnpm test:run` trec.
- [ ] Un coleg a rulat pașii din README pe laptopul lui. PR revizuit de un coleg din cealaltă jumătate.

### TODO-18 `[ ]` `room_schedule` și funcția SQL `room_status`

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be10-room-status-sql`

#### De ce
Când trecem pe Supabase, regula „e sala liberă?” trebuie să dea același răspuns ca în TypeScript. O mutăm acum, cu aceleași cazuri de test ca în `status.test.ts`, și vedem devreme dacă modelul de date rezistă (backlog #19).

#### Depinde de
TODO-17 și Docker Desktop.

#### Ce ai de făcut

1. **Migrație nouă** pentru `room_schedule`: `room_id`, `day smallint check (day between 1 and 7)`, `start_time time`, `end_time time`, `check (start_time < end_time)`, `subject`, `group_name`, `parity text default 'all' check (parity in ('all', 'odd', 'even'))`. RLS și politici ca la TODO-17. Coloana se numește `group_name` pentru că `group` e cuvânt rezervat în SQL.

2. **Funcția** `room_status(p_room_id text, p_at timestamptz)`, care întoarce `status` și `until`:
   - ziua și ora se calculează cu `p_at at time zone 'Europe/Bucharest'`;
   - aceleași reguli ca `computeStatus`, inclusiv orele lipite, iar `end_time` e exclusiv;
   - o sală inexistentă → `unknown`;
   - `parity` încă nu se folosește. Scrie asta într-un comentariu în funcție și în PR, pentru că tot în etapa următoare se conectează cu TODO-19.

3. **`seed.sql`**: adaugă 5-10 rânduri demo, suficiente pentru cazurile de test.

4. **Teste pgTAP** în `supabase/tests/room_status.test.sql`: fiecare caz din `apps/web/tests/unit/status.test.ts`, inclusiv fusul orar, cu datele inserate în test, plus RLS pentru `room_schedule` ca la TODO-17.

5. Regenerează `database.types.ts`.

#### Gata când
- [ ] `supabase db reset` și `supabase test db` trec.
- [ ] În PR, un tabel cu fiecare caz din `status.test.ts` și testul SQL care îi corespunde.
- [ ] PR revizuit de cine a făcut TODO-17 sau de un coleg din cealaltă jumătate.

### TODO-19 `[ ]` Săptămâni pare/impare și perioada de cursuri

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be11-week-parity`

#### De ce
Azi o oră care se ține din două în două săptămâni ar ocupa sala în fiecare săptămână, iar în vacanță toate sălile apar libere deși nu știm nimic despre ele. Ambele sunt răspunsuri greșite pe care studentul le-ar crede (CLAUDE.md §3.4).

#### Depinde de
TODO-09 pe `main` înainte de PR, ca să faci rebase pe `types.ts` și `get-room.ts`. Semnătura lui `computeStatus` **nu se schimbă**.

#### Ce ai de făcut

1. **`features/rooms/types.ts`** (excepția planificată): în `ScheduleEntry`, `weeks?: "odd" | "even"`. Lipsa câmpului înseamnă în fiecare săptămână.

2. **`features/rooms/data/calendar.ts`**: perioadele de cursuri, ca `"YYYY-MM-DD"`, cu un comentariu că sunt demo, nu calendarul oficial:
   ```ts
   export const teachingPeriods = [
     { start: "2026-09-28", end: "2026-12-20" },
     { start: "2027-01-04", end: "2027-01-17" },
   ];
   ```

3. **`features/rooms/server/calendar.ts`**: funcții pure:
   ```ts
   export function teachingWeek(now: Date): number | null // 1, 2, ...; null în afara perioadelor
   export function entriesToday(roomId: string, entries: ScheduleEntry[], now: Date): ScheduleEntry[]
   ```
   - data se calculează în `Europe/Bucharest`, nu în UTC;
   - săptămânile încep lunea, se numără din prima perioadă și continuă după vacanță;
   - `entriesToday` filtrează după sală, zi și paritate, apoi sortează după `start`.

4. **`server/status.ts`**: în afara perioadelor → `{ status: "unknown", until: null }`; altfel folosește `entriesToday`.

5. **`server/get-room.ts`**: `today` vine din `entriesToday`. **`data/schedule.ts`**: marchează câteva ore cu `weeks`.

6. **Teste** `tests/unit/calendar.test.ts`: prima și ultima zi din perioadă, vacanța, numărarea peste vacanță, granița de zi între UTC și România, ora impară într-o săptămână pară, intrările fără `weeks`. Testele existente trebuie să treacă neschimbate, cu o singură excepție: cazul de oră de vară din `status.test.ts` folosește `2026-06-15`, care iese din perioade, așa că îl muți pe `2026-10-05T10:30:00Z` (tot luni, tot 13:30 în România).

#### Gata când
- [ ] Un test demonstrează că aceeași oră ocupă sala într-o săptămână și o lasă liberă în următoarea.
- [ ] În 24 decembrie 2026 toate sălile sunt `unknown`, iar filtrul „Doar libere acum” nu le arată.
- [ ] Lint, typecheck, teste verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-20 `[ ]` `GET /api/rooms/[id]/week`: orarul pe săptămână și intervalele libere

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be12-room-week`

#### De ce
Studentul nu caută doar o sală acum, ci și una pentru mâine sau joi după-amiază. Endpointul dă TODO-21 tot ce îi trebuie, inclusiv intervalele libere gata calculate.

#### Depinde de
Nimic. Ține tipurile în fișierul tău, nu în `types.ts`.

#### Ce ai de făcut

1. **`features/rooms/server/get-week.ts`**:
   ```ts
   export interface FreeSlot { start: string; end: string }
   export interface RoomWeekDay { day: ScheduleEntry["day"]; entries: ScheduleEntry[]; freeSlots: FreeSlot[] }
   export interface RoomWeek { roomId: string; code: string; buildingName: string; days: RoomWeekDay[] } // mereu 7 zile
   export function freeSlots(entries: ScheduleEntry[]): FreeSlot[]
   export function getRoomWeek(id: string): RoomWeek | null
   ```
   - `freeSlots` calculează golurile dintre 08:00 și 20:00, într-o singură zi. Orele lipite sau suprapuse se unesc.
   - O oră doar din săptămânile pare sau impare (după TODO-19) contează ca ocupată: mai bine pierdem un interval decât să trimitem pe cineva într-o sală plină. Scrie asta într-un comentariu.

2. **`app/api/rooms/[id]/week/route.ts`**: `GET`, cu `RoomWeek` sau `404 { "error": "Room not found" }`, ca la `app/api/rooms/[id]/route.ts`.

3. **Teste** `tests/unit/get-week.test.ts`: zi goală → 08:00-20:00; ore lipite; ore suprapuse; oră la marginea zilei (08:00 sau 20:00), fără interval gol; ore în afara ferestrei; sală inexistentă; mereu 7 zile; intrările doar ale sălii cerute, sortate.

#### Gata când
- [ ] `curl localhost:3000/api/rooms/c-512/week` întoarce 7 zile, cu orele și intervalele libere corecte.
- [ ] `curl -i localhost:3000/api/rooms/nu-exista/week` întoarce 404.
- [ ] Lint, typecheck, teste verzi; PR revizuit de cine are TODO-21.

---

## Frontend

### TODO-05 `[DONE]` Layout, navigare, pagina de start și `StatusBadge`

**Asignat:** Tudor · **Val:** 1, intră primul pe `main` alături de TODO-01 · **Branch:** `feat/srf-fe1-shell`

Layout-ul, pagina de start, `not-found` și `StatusBadge` sunt făcute. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/3

#### De ce
Toate paginile stau în layout-ul tău, iar TODO-06 și TODO-07 folosesc `StatusBadge`. Ține PR-ul mic ca să intre repede.

#### Depinde de
Doar de scaffold. Pentru tipul `RoomStatus` poți porni din branch-ul celui care face TODO-01 sau scrii temporar `type RoomStatus = "free" | "occupied" | "unknown"` și treci pe import din `@/features/rooms/types` după ce TODO-01 e pe main.

#### Ce ai de făcut

1. **`apps/web/components/ui/StatusBadge.tsx`**: `export function StatusBadge({ status, until }: { status: RoomStatus; until: string | null })`
   - `free` + `until` → „Liberă până la 14:00” (verde); `free` fără `until` → „Liberă” (verde);
   - `occupied` → „Ocupată până la 12:00” (roșu);
   - `unknown` → „Stare necunoscută” (gri).
   - Tailwind, pastilă rotunjită; culoarea nu e singurul semnal (textul spune starea), ca să fie lizibil și pentru daltoniști.

2. **`apps/web/app/(app)/layout.tsx`**: layout pentru paginile aplicației: header cu titlul „StudyRoom Finder” (link spre `/`) și un link „Săli” spre `/rooms`; conținutul într-un container centrat (`max-w-3xl mx-auto px-4`). Trebuie să arate bine pe telefon (lățime 375px).

3. **`apps/web/app/page.tsx`**: pagina de start: un titlu, o propoziție („Găsește o sală liberă în FMI pentru a învăța.”) și un buton „Vezi sălile libere” spre `/rooms?freeOnly=1`.

4. **`apps/web/app/(app)/rooms/not-found.tsx`**: „Sala nu există” + link înapoi la `/rooms`. TODO-07 îl folosește prin `notFound()`.

5. Nu modifica `app/layout.tsx` din scaffold decât dacă e nevoie de `lang="ro"` pe `<html>`.

#### Gata când
- [ ] `/` arată pagina de start, butonul duce la `/rooms?freeOnly=1` (poate da 404 până intră TODO-06, e OK).
- [ ] `StatusBadge` arată corect pentru toate cele 4 cazuri (pune un screenshot în PR, ex. randându-le temporar pe pagina de start, și scoate-le înainte de merge).
- [ ] Lint și typecheck verzi; PR revizuit de un coleg din cealaltă jumătate; anunți pe grup că „TODO-05 e pe main”.

### TODO-06 `[DONE]` Pagina `/rooms`: lista de săli

**Asignat:** MonsieurBili · **Val:** 2 · **Branch:** `feat/srf-fe2-rooms-page`

Implementată pagina `/rooms`, lista client-side și cardurile de sală; consumă `GET /api/rooms` și integrează filtrele din URL.

#### De ce
E ecranul principal: studentul deschide aplicația și vede imediat ce săli sunt libere.

#### Depinde de
TODO-05 (`StatusBadge`, layout) și TODO-01 (tipuri) pe `main`. Endpointul `GET /api/rooms` vine din TODO-02: până intră, lucrează cu un array mock `RoomWithStatus[]` în fișierul tău și treci pe `fetch` înainte de PR.

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/RoomCard.tsx`**: card pentru o sală, link spre `/rooms/{id}`:
   - codul sălii mare (`C510`), clădirea și etajul dedesubt;
   - `StatusBadge`;
   - capacitatea („40 locuri”) și iconițe/etichete pentru prize și proiector, doar dacă există.

2. **`apps/web/features/rooms/components/RoomList.tsx`** (`"use client"`):
   - citește query-ul cu `useSearchParams()` și face `fetch("/api/rooms?" + searchParams.toString())` de fiecare dată când se schimbă (așa filtrele din TODO-08 funcționează automat);
   - patru stări vizibile: **se încarcă** (3 carduri schelet sau un text), **eroare** („Nu am putut încărca sălile.” + buton „Reîncearcă”), **listă goală** („Nicio sală nu se potrivește filtrelor.”), **listă**;
   - carduri pe o coloană pe telefon, două pe ecran lat.

3. **`apps/web/app/(app)/rooms/page.tsx`**: titlul „Săli” și `<RoomList />` învelit în `<Suspense>` (cerut de Next.js pentru `useSearchParams`).

4. **Integrarea cu filtrele (TODO-08):** cine intră al doilea pe `main` dintre TODO-06 și TODO-08 adaugă în `page.tsx` cele două linii: `import { RoomFilters } from "@/features/rooms/components/RoomFilters";` și `<RoomFilters />` deasupra listei. E singura modificare planificată într-un fișier comun.

#### Gata când
- [ ] `/rooms` arată sălile de la `/api/rooms`, cu starea corectă.
- [ ] `/rooms?projector=1` (scris de mână în URL) arată doar sălile cu proiector.
- [ ] Cele 4 stări se pot vedea (eroarea, de ex. oprind temporar serverul sau schimbând URL-ul fetch-ului local); screenshot-uri în PR, inclusiv pe lățime de telefon.
- [ ] Niciun mock rămas în cod. Lint și typecheck verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-07 `[DONE]` Pagina `/rooms/[id]`: detaliul unei săli

**Asignat:** Bogdan Buruian · **Val:** 2 · **Branch:** `feat/srf-fe3-room-detail`

Pagina `/rooms/[id]` arată sala și orarul de azi și se reîmprospătează la 60 de secunde. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/6

#### De ce
Când studentul alege o sală vrea să știe cât timp e liberă și ce ore are azi. Aici va apărea mai târziu și butonul de favorite și check-in (tot ale tale).

#### Depinde de
TODO-05 (`StatusBadge`, `not-found`) și TODO-01 (tipuri) pe `main`. Endpointul `GET /api/rooms/[id]` vine din TODO-04: până intră, lucrează cu un obiect mock `RoomDetail` și treci pe `fetch` înainte de PR.

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/RoomSchedule.tsx`**: `RoomSchedule({ entries, now })`: lista orelor de azi, fiecare rând „10:00–12:00 · Baze de date · Seminar 211”. Ora în desfășurare e evidențiată. Fără ore: „Nicio oră programată azi.”

2. **`apps/web/features/rooms/components/RoomHeader.tsx`**: codul sălii, clădirea, etajul, `StatusBadge`, capacitatea, prize, proiector.

3. **`apps/web/app/(app)/rooms/[id]/page.tsx`**:
   - componentă client care face `fetch("/api/rooms/" + id)`; pe 404 afișează „Sala nu există” cu link înapoi (sau, dacă faci pagina server component, folosește `notFound()` din `next/navigation`, care randează `not-found.tsx` din TODO-05);
   - stări de încărcare și eroare, ca la TODO-06;
   - link „← Înapoi la săli” spre `/rooms`;
   - în Next.js 15 `params` e `Promise`; într-o componentă client folosește `useParams()`.

4. Reîmprospătare simplă: refă fetch-ul la fiecare 60 de secunde (`setInterval` în `useEffect`, cu cleanup), ca starea să se schimbe singură când se termină o oră.

#### Gata când
- [ ] Click pe un card din `/rooms` (după TODO-06) deschide pagina corectă; `/rooms/c-510` merge și direct.
- [ ] `/rooms/nu-exista` arată mesajul de sală inexistentă, nu o eroare.
- [ ] O sală cu ore azi și una fără ore arată corect; screenshot-uri în PR, inclusiv pe telefon.
- [ ] Niciun mock rămas. Lint și typecheck verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-08 `[DONE]` Bara de filtre și checklist-ul de QA

**Asignat:** Bogdan · **Val:** 2 · **Branch:** `feat/srf-fe4-filters`

`RoomFilters` salvează filtrele în URL și checklist-ul de QA e în `docs/qa/studyroom-onboarding.md`. Rămân de făcut după TODO-06: integrarea în `page.tsx` și prima rulare a checklist-ului. PR: _(de completat linkul)_

#### De ce
Filtrele fac lista utilă („o sală liberă cu prize, pentru 30 de oameni”). Pentru că sunt salvate în URL, un link trimis unui coleg deschide aceeași căutare. Iar ca om de QA, tu verifici la final că totul merge cap-coadă.

#### Depinde de
TODO-01 (tipuri, `GET /api/buildings`) pe `main`. Nu depinde de TODO-06: componenta ta doar scrie în URL, iar lista din TODO-06 citește din URL.

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/RoomFilters.tsx`** (`"use client"`), exportă `RoomFilters`:
   - select **Clădire** („Toate” + opțiunile din `fetch("/api/buildings")`) → `buildingId`;
   - input numeric **Capacitate minimă** → `minCapacity`;
   - checkbox-uri **Doar libere acum** → `freeOnly=1`, **Prize** → `outlets=1`, **Proiector** → `projector=1`;
   - buton **Resetează** care șterge toți parametrii;
   - starea inițială se citește din `useSearchParams()` (dacă deschizi `/rooms?outlets=1`, checkbox-ul e bifat);
   - la schimbare: `router.replace(pathname + "?" + params, { scroll: false })`. Parametrii goi/nebifați se **șterg** din URL, nu se trimit ca `outlets=0`;
   - pe telefon filtrele stau pe două rânduri, fără scroll orizontal.

2. **Integrarea** cu `app/(app)/rooms/page.tsx` (din TODO-06): cine intră al doilea pe `main` adaugă importul și `<RoomFilters />` deasupra listei (vezi TODO-06, pasul 4).

3. **`docs/qa/studyroom-onboarding.md`** (la rădăcina repo-ului): checklist manual pe care îl rulezi după ce toate cele 8 PR-uri sunt pe `main`:
   - `/` → butonul duce la săli libere;
   - fiecare filtru separat și combinat; Resetează; linkul copiat păstrează filtrele;
   - card → detaliu → înapoi;
   - sală inexistentă;
   - lățime 375px (DevTools) și un telefon real;
   - ce ai găsit stricat devine o problemă pe GitHub (sau un item în `TODO.md`), nu doar un mesaj pe grup.

#### Gata când
- [ ] Bifarea „Prize” schimbă URL-ul în `?outlets=1` și lista se actualizează (după TODO-06).
- [ ] Refresh pe `/rooms?buildingId=fsega&minCapacity=50` păstrează filtrele afișate.
- [ ] Checklist-ul de QA e în repo și l-ai rulat o dată, cu rezultatele în comentariul PR-ului sau într-un issue.
- [ ] Lint și typecheck verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-13 `[ ]` Butonul de check-in pe pagina sălii

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-fe5-checkin-button`

#### De ce
Studentul spune „sunt aici” dintr-un singur gest, iar colegii văd asta imediat. E partea vizibilă din TODO-09.

#### Depinde de
TODO-09 pe `main` pentru tipuri. Dacă endpointurile întârzie, lucrează cu un `fetch` mock-uit și treci pe cel real înainte de PR.

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/CheckinButton.tsx`** (`"use client"`): `CheckinButton({ roomId, onChange }: { roomId: string; onChange: () => void })`
   - Pentru că nu avem login, ține check-in-ul curent în `localStorage` (cheia `ubb.checkin`, valoarea e `Checkin` ca JSON). Dacă `expiresAt` a trecut, e ca și cum n-ar exista. Citește `localStorage` doar în browser, nu la randarea pe server.
   - **Fără check-in activ:** buton „Sunt aici” → `POST /api/rooms/{roomId}/checkins`.
   - **Check-in activ în sala asta:** „Ești aici până la HH:MM” (ora României, cu `bucharestNow(new Date(expiresAt)).time`) și buton „Am plecat” → `DELETE /api/checkins/{id}`. Un 404 la `DELETE` înseamnă că serverul l-a uitat deja, deci îl ștergi și local, fără mesaj de eroare.
   - **Check-in activ în altă sală:** „Ai deja check-in în altă sală” cu link spre ea, fără butonul „Sunt aici”.
   - Butonul e dezactivat cât durează cererea; dacă eșuează: „Nu am putut salva check-in-ul.”
   - După fiecare schimbare reușită, cheamă `onChange`.

2. **`apps/web/app/(app)/rooms/[id]/page.tsx`**: pune `<CheckinButton />` sub `RoomHeader`, cu `onChange={() => setAttempt((value) => value + 1)}`, ca numărul de persoane să se reîncarce fără să apară din nou „Se încarcă”.

3. **Teste** `apps/web/tests/unit/checkin-button.test.tsx`. Proiectul testează componentele cu `renderToStaticMarkup`, fără jsdom, și nu adăugăm dependențe noi. Scoate logica într-o funcție pură exportată (de ex. `checkinState(stored, roomId, now)` → `"none" | "here" | "elsewhere"`) și testeaz-o: fără valoare, JSON stricat, expirat, sala asta, altă sală.

#### Gata când
- [ ] „Sunt aici” → apare „Ești aici până la…”, iar numărul crește fără refresh (în pagină după TODO-14; până atunci verifici `activeCheckins` în `GET /api/rooms/{id}`).
- [ ] Refresh pe pagină păstrează starea; „Am plecat” o scoate și numărul scade.
- [ ] Pe altă sală apare „Ai deja check-in în altă sală”, cu link corect.
- [ ] Screenshot-uri în PR, inclusiv pe telefon. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-09.

### TODO-14 `[ ]` Semnalul „persoane aici” și lista care se actualizează singură

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-fe6-live-signal`

#### De ce
Asta face check-in-ul util: din listă vezi că o sală „liberă” are deja oameni în ea. În plus, azi lista rămâne neschimbată până dai refresh, deci o oră care se termină nu se vede (pagina sălii se reîmprospătează deja la 60 de secunde).

#### Depinde de
TODO-09 pe `main` (câmpul `activeCheckins`).

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/CheckinSignal.tsx`**: `CheckinSignal({ count }: { count: number })`
   - `0` → nu randează nimic;
   - `1` → „1 persoană aici”; `2`-`19` → „N persoane aici”; de la 20 în sus → „20 de persoane aici”. Scoate textul într-o funcție pură exportată, `checkinLabel(count)`.

2. **`RoomCard.tsx`** și **`RoomHeader.tsx`**: afișează `CheckinSignal` lângă `StatusBadge`, nu în locul lui, și **fără să schimbi culoarea sau textul stării** (regula din „Completări la contract”).

3. **`RoomList.tsx`**: refă fetch-ul la fiecare 60 de secunde, cu `cache: "no-store"`:
   - scheletul de încărcare apare doar la prima încărcare și când se schimbă filtrele, nu la reîmprospătare, ca lista să nu clipească;
   - dacă o reîmprospătare eșuează, păstrează lista veche și arată un text mic: „Nu am putut actualiza lista.”; dispare la următoarea reușită;
   - cleanup corect: `clearInterval` și `abort`, plus un răspuns vechi nu are voie să suprascrie unul nou (vezi cum face `rooms/[id]/page.tsx`).

4. **Teste** `apps/web/tests/unit/checkin-signal.test.tsx`: `checkinLabel` pe 1, 2, 19, 20; `count={0}` nu randează nimic; `RoomCard` cu o sală `free` și `activeCheckins: 2` arată **și** „Liberă”, **și** „2 persoane aici”.

#### Gata când
- [ ] După un check-in dat cu `curl` (vezi TODO-09), lista arată semnalul în maximum 60 de secunde, fără refresh și fără să clipească.
- [ ] Cu serverul oprit, lista deja afișată rămâne pe ecran, cu mesajul mic de eroare; revine singură după repornire.
- [ ] Schimbarea filtrelor funcționează ca înainte. Screenshot-uri în PR; lint, typecheck, teste verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-15 `[ ]` Pagina `/rooms/plan`: planul clădirii

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-fe7-plan-page`

#### De ce
Când ești deja în clădire, e mai ușor să vezi pe etaje ce e liber decât să citești o listă. Acoperă cerința „plan al clădirii” din MVP, cu o schemă simplă.

#### Depinde de
TODO-11 pentru endpoint: până intră, lucrează cu un obiect mock `BuildingPlan` și treci pe `fetch` înainte de PR. TODO-09 pentru tipuri.

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/FloorPlan.tsx`**: `FloorPlan({ plan }: { plan: BuildingPlan })`
   - câte o secțiune pe etaj, cu titlul „Parter” sau „Etaj N”;
   - fiecare etaj e o grilă CSS cu 3 coloane, iar sala stă la poziția ei (`style={{ gridRow: room.row, gridColumn: room.col }}`);
   - fiecare sală e un link spre `/rooms/{id}`, cu codul, `StatusBadge` și `CheckinSignal` (din TODO-14; dacă nu e încă pe `main`, adaugă-l după ce intră);
   - starea se înțelege din text, nu doar din culoare; fără scroll orizontal la 375px, textele lungi trec pe rândul următor.

2. **`apps/web/app/(app)/rooms/plan/page.tsx`** (`"use client"`, cu `<Suspense>` pentru `useSearchParams`):
   - select de clădire din `GET /api/buildings`, salvat în URL ca `?buildingId=` (implicit prima clădire);
   - `fetch` la `GET /api/buildings/{id}/plan`, reîmprospătat la 60 de secunde;
   - stările de încărcare, eroare cu „Reîncearcă” și clădire inexistentă, ca la TODO-06;
   - un text vizibil: „Schemă orientativă, nu planul real al clădirii.”

3. **`apps/web/app/(app)/layout.tsx`**: un link „Plan” spre `/rooms/plan`, lângă „Săli”.

4. **Teste** `apps/web/tests/unit/floor-plan.test.tsx`, cu `renderToStaticMarkup`: etajele în ordine și cu titlul corect, parterul scris „Parter”, linkul spre sală, poziția din `style`, starea afișată.

#### Gata când
- [ ] `/rooms/plan` arată etajele primei clădiri; schimbarea clădirii actualizează URL-ul și planul, iar refresh-ul le păstrează.
- [ ] Click pe o sală deschide pagina ei; `/rooms/plan?buildingId=nu-exista` arată un mesaj, nu o eroare.
- [ ] Linkul „Plan” apare în header; screenshot-uri în PR, inclusiv la 375px.
- [ ] Niciun mock rămas. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-11.

### TODO-16 `[ ]` Filtrul „liberă cel puțin” în UI și QA pentru etapa a 2-a

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2, ultimul pe `main` pentru rularea QA · **Branch:** `feat/srf-fe8-free-for-filter`

#### De ce
Filtrul din TODO-10 are nevoie de un control în pagină. Iar ca la TODO-08, cineva verifică la final că toată etapa merge cap-coadă.

#### Depinde de
TODO-10 pentru filtrare; poți scrie componenta și înainte, pentru că ea doar scrie în URL. Rularea QA are nevoie de toți ceilalți itemi pe `main`.

#### Ce ai de făcut

1. **`apps/web/features/rooms/components/RoomFilters.tsx`**: un select **Liberă cel puțin** cu opțiunile „Oricât”, „1 oră”, „2 ore”, „3 ore” → `minFreeHours`:
   - refolosește `setParam`; „Oricât” scoate parametrul din URL;
   - o valoare din URL care nu e în listă (`minFreeHours=abc`) arată „Oricât”;
   - „Resetează” îl șterge deja, verifică doar că e așa;
   - pe telefon rămâne fără scroll orizontal.

2. **`docs/qa/studyroom-onboarding.md`**: secțiuni noi, cu rezultatele așteptate:
   - **Check-in:** „Sunt aici”, refresh, „Am plecat”, altă sală, numărul din listă și de pe pagina sălii; o sală liberă cu check-in rămâne „Liberă”;
   - **Reîmprospătare:** lista se actualizează singură, serverul oprit nu golește lista;
   - **Plan:** schimbarea clădirii, etajele, click pe sală, clădire inexistentă, 375px;
   - **Filtrul nou:** singur și combinat, copiat în link, cu `minFreeHours=abc`.

3. **Teste** în `apps/web/tests/unit/room-filters.test.tsx`: dacă alegerea opțiunii are logică proprie, scoate-o într-o funcție pură exportată, ca `validMinCapacity`, și testeaz-o.

4. După ce toți ceilalți itemi sunt pe `main`, rulezi checklist-ul complet o dată. Ce e stricat devine item în `TODO.md` sau problemă pe GitHub, nu doar mesaj pe grup.

#### Gata când
- [ ] Alegerea „2 ore” schimbă URL-ul în `?minFreeHours=2`, iar lista se actualizează (după TODO-10).
- [ ] Refresh pe `/rooms?minFreeHours=2` păstrează opțiunea aleasă.
- [ ] Checklist-ul e actualizat și rulat o dată, cu rezultatele în PR sau într-un issue.
- [ ] Lint, typecheck, teste verzi; PR revizuit de cine are TODO-10.

### TODO-21 `[ ]` Pagina `/rooms/[id]/week`: orarul pe săptămână

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-fe9-room-week`

#### De ce
Pagina sălii arată doar ziua de azi. De aici studentul își poate planifica săptămâna: vede când are sala ore și când e liberă.

#### Depinde de
TODO-20 pentru endpoint: până intră, lucrezi cu un mock `RoomWeek`, iar tipul îl copiezi temporar. TODO-13 pentru linkul din pagina sălii.

#### Ce ai de făcut

1. **`features/rooms/components/RoomWeek.tsx`**: `RoomWeek({ week, today }: { week: RoomWeek; today: number })`
   - câte un bloc pe zi, de la „Luni” la „Duminică”, pe o coloană. Fără tabel lat, ca să meargă pe telefon;
   - sâmbăta și duminica apar doar dacă au ore;
   - în fiecare zi, orele (`10:00–12:00 · Baze de date · Seminar 211`) și intervalele libere (`Liberă 12:00–14:00`), în ordinea orei;
   - ziua de azi e evidențiată și are textul „Azi”, nu doar altă culoare;
   - dacă `weeks` există (după TODO-19), afișezi „săpt. impară” sau „săpt. pară”. Cine intră al doilea dintre TODO-19 și TODO-21 adaugă eticheta.

2. **`app/(app)/rooms/[id]/week/page.tsx`** (`"use client"`):
   - `fetch` la `/api/rooms/{id}/week`, cu stările de încărcare, eroare cu „Reîncearcă” și sală inexistentă (refolosește `not-found.tsx`), ca în `rooms/[id]/page.tsx`;
   - link „← Înapoi la sală”;
   - ziua de azi vine din `bucharestNow(new Date()).day`;
   - textul „Date demonstrative, nu orarul real.”

3. **Excepția planificată:** în `app/(app)/rooms/[id]/page.tsx`, un link „Vezi toată săptămâna” sub `RoomSchedule`.

4. **Teste** `tests/unit/room-week.test.tsx`, cu `renderToStaticMarkup`: ordinea zilelor, weekend-ul ascuns când e gol și vizibil când are ore, „Azi” pe ziua corectă, orele și intervalele libere.

#### Gata când
- [ ] Din pagina sălii ajungi la săptămâna ei și înapoi.
- [ ] `/rooms/nu-exista/week` arată „Sala nu există”, nu o eroare.
- [ ] Fără scroll orizontal la 375px; screenshot-uri în PR. Niciun mock rămas; lint, typecheck, teste verzi; PR revizuit de cine are TODO-20.

### TODO-22 `[ ]` Bazele traducerilor RO / EN

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-fe10-i18n`

#### De ce
Aplicația trebuie să fie în română și engleză, cu româna implicită (CLAUDE.md §5). Cu cât amânăm, cu atât sunt mai multe texte de mutat. Construim mecanismul și îl dovedim pe câteva fișiere pe care nu le atinge nimeni acum; restul se mută după etapa a 2-a.

#### Depinde de
Nimic. **Nu muta textele din alte componente**, ca să nu intri în conflict cu etapa a 2-a. Fără biblioteci noi.

#### Ce ai de făcut

1. **`lib/i18n/messages.ts`**: `export const messages = { ro: {...}, en: {...} }`, cu tipuri stricte, astfel încât o cheie lipsă dintr-o limbă să fie eroare la `typecheck`. Mesajele cu valori sunt funcții, de exemplu `freeUntil: (time: string) => ...`.

2. **`lib/i18n/use-locale.ts`**: `useLocale()` și `setLocale()`, cu limba păstrată în `localStorage` (`ubb.locale`), citite prin `useSyncExternalStore`. Pe server limba e mereu `ro`, ca să nu apară erori de hidratare. O valoare necunoscută înseamnă `ro`. Când se schimbă limba, actualizează și `document.documentElement.lang`.

3. **`components/ui/LanguageSwitcher.tsx`**: butoane „RO” și „EN”, cu `aria-pressed`.

4. **Folosește traducerile în:** `components/ui/StatusBadge.tsx`, `app/page.tsx` (cu `LanguageSwitcher` pe pagină) și `app/(app)/rooms/not-found.tsx`.
   Textele românești rămân identice, ca testele existente să treacă neschimbate.

5. **Teste** `tests/unit/i18n.test.ts`: ambele limbi au aceleași chei, valoarea necunoscută din `localStorage` devine `ro`, mesajele cu ore sunt corecte în ambele limbi.

6. Notează în PR lista componentelor rămase de mutat și adaug-o ca item nou în `TODO.md`.

#### Gata când
- [ ] Pe `/`, „EN” traduce pagina, iar după refresh limba rămâne aleasă.
- [ ] În engleză, `StatusBadge` din `/rooms` e tradus, iar restul paginii rămâne în română până la mutarea textelor.
- [ ] În consolă nu apar erori de hidratare. Lint, typecheck, teste verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-23 `[ ]` Aplicație instalabilă: manifest, iconițe și pagină offline

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-fe11-pwa`

#### De ce
Studenții o vor folosi de pe telefon, pe hol, între ore. Dacă o pot pune pe ecranul principal, o și deschid (CLAUDE.md §1). Partea delicată e să nu arătăm niciodată o stare veche de sală ca și cum ar fi actuală.

#### Depinde de
Nimic. Citește întâi ghidul pentru PWA din `apps/web/node_modules/next/dist/docs/`.

#### Ce ai de făcut

1. **`public/manifest.webmanifest`**: nume, `start_url: "/rooms"`, `display: "standalone"`, culori, iconițe. **`public/icons/`**: 192×192, 512×512 și o variantă `maskable`, cu un design simplu făcut de voi.

2. **`app/layout.tsx`**: legătura către manifest și metadatele pentru telefon, prin `metadata` și `viewport`.

3. **`public/offline.html`**: pagină simplă: „Nu ai conexiune. Starea sălilor nu poate fi verificată acum.”

4. **`public/sw.js`**: un service worker minim:
   - salvează în cache `offline.html` și iconițele;
   - navigarea merge la rețea, iar `offline.html` apare doar dacă rețeaua pică;
   - **`/api/*` nu se salvează niciodată în cache**, pentru că o stare veche e mai rea decât niciuna. Scrie regula într-un comentariu.

5. **`components/RegisterServiceWorker.tsx`**: înregistrează `sw.js`, doar în producție. **`next.config.ts`**: `Cache-Control: no-cache` pentru `/sw.js`, ca actualizările să ajungă la utilizatori.

6. Actualizează `CLAUDE.md`: fișierele PWA există acum.

#### Gata când
- [ ] Cu `pnpm build` și `pnpm --filter web start`, Chrome DevTools → Application arată manifestul valid și service worker-ul activ.
- [ ] Aplicația se poate instala și se deschide pe `/rooms`.
- [ ] În modul offline, o pagină arată mesajul din `offline.html`, iar în Network/Cache Storage nu apare niciun răspuns de la `/api/`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test:run`, `pnpm build` trec; screenshot-uri în PR; PR revizuit de un coleg din cealaltă jumătate.

### TODO-24 `[ ]` Teste end-to-end cu Playwright

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-fe12-playwright`

#### De ce
Testele unitare nu ne spun dacă paginile merg împreună, iar checklist-ul de QA se rulează de mână. Când intră mulți oameni pe `main` în același weekend, un test automat prinde repede ce s-a stricat.

#### Depinde de
Nimic. Ești **singurul din etapa asta care modifică `package.json` și `pnpm-lock.yaml`**. Dacă altcineva chiar are nevoie de o dependență, vorbiți pe grup.

#### Ce ai de făcut

1. Adaugă `@playwright/test` în `apps/web` și scripturile `test:e2e`, în `apps/web/package.json` și în `package.json` din rădăcină. `vitest.config.ts` caută deja doar în `tests/unit/`, deci nu trebuie schimbat.

2. **`playwright.config.ts`**: doar Chromium, plus un profil de telefon, cu `webServer` care pornește aplicația singur.

3. **`tests/e2e/rooms.spec.ts`**, pe parcursurile din `docs/qa/studyroom-onboarding.md`:
   - `/` → butonul duce la `/rooms?freeOnly=1`;
   - `/rooms` arată cele 9 săli;
   - filtrul Prize → `?outlets=1` și sălile C510, C512, L001, Gamma, S12; Resetează le aduce pe toate înapoi; refresh-ul păstrează filtrele;
   - card → detaliu → înapoi;
   - `/rooms/nu-exista` arată „Sala nu există”;
   - fără scroll orizontal la 375px.

4. **Regula importantă:** nu verifica starea „liberă” sau „ocupată”, pentru că depinde de ora la care rulează testul, iar CI-ul ar pica aleatoriu. Stările sunt acoperite de testele unitare.

5. **`.github/workflows/ci.yml`**: un job separat `e2e` care instalează Chromium și rulează testele, cu raportul salvat ca artefact când pică.

6. Actualizează §2 din `CLAUDE.md`: `pnpm test:e2e` merge acum și nu are nevoie de Supabase.

#### Gata când
- [ ] `pnpm test:e2e` trece local, de cel puțin 3 ori la rând, și în CI.
- [ ] Un test stricat intenționat face CI-ul roșu (dovada în PR, apoi scoți modificarea).
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test:run` trec; PR revizuit de un coleg din cealaltă jumătate.
