# TODO — UBB Campus

**Sprintul curent: StudyRoom Finder, onboarding.** Fișierul conține doar cele 8 taskuri ale sprintului, ca să ne obișnuim cu workflow-ul.

## Cum folosim fișierul

- **Te asignezi singur:** alegi un item liber, îți scrii numele la „Asignat”, îl treci pe `[~]` și faci commit (sau anunți pe grup). Un om, un item.
- Nu ștergi și nu tai itemi. Când e gata: `[DONE]`, plus o propoziție cu ce s-a făcut și linkul la PR.
- Schimbarea statusului înseamnă două editări: titlul itemului și rândul din Index.

**Status:** `[ ]` liber · `[~]` în lucru · `[DONE]` gata

---

## Index

| ID | Status | Parte | Titlu | Asignat |
|---|---|---|---|---|
| TODO-01 | `[~]` | Backend | Fundația: tipuri, date hardcodate și `GET /api/buildings` | Bogdan |
| TODO-02 | `[ ]` | Backend | `GET /api/rooms`: lista sălilor cu filtre | — |
| TODO-03 | `[ ]` | Backend | Motorul de stare: e sala liberă acum? | — |
| TODO-04 | `[ ]` | Backend | Orarul hardcodat și `GET /api/rooms/[id]` | — |
| TODO-05 | `[ ]` | Frontend | Layout, navigare, pagina de start și `StatusBadge` | — |
| TODO-06 | `[ ]` | Frontend | Pagina `/rooms`: lista de săli | — |
| TODO-07 | `[ ]` | Frontend | Pagina `/rooms/[id]`: detaliul unei săli | — |
| TODO-08 | `[ ]` | Frontend | Bara de filtre și checklist-ul de QA | — |

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

## Backend

### TODO-01 `[~]` Fundația: tipuri, date hardcodate și `GET /api/buildings`

**Asignat:** Bogdan · **Val:** 1, intră primul pe `main` · **Branch:** `feat/srf-be1-foundation`

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

### TODO-02 `[ ]` `GET /api/rooms`: lista sălilor cu filtre

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-be2-rooms-list`

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

### TODO-03 `[ ]` Motorul de stare: e sala liberă acum?

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-be3-status`

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

### TODO-04 `[ ]` Orarul hardcodat și `GET /api/rooms/[id]`

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-be4-room-detail`

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

---

## Frontend

### TODO-05 `[ ]` Layout, navigare, pagina de start și `StatusBadge`

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 1, intră primul pe `main` alături de TODO-01 · **Branch:** `feat/srf-fe1-shell`

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

### TODO-06 `[ ]` Pagina `/rooms`: lista de săli

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-fe2-rooms-page`

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

### TODO-07 `[ ]` Pagina `/rooms/[id]`: detaliul unei săli

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-fe3-room-detail`

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

### TODO-08 `[ ]` Bara de filtre și checklist-ul de QA

**Asignat:** _(liber, scrie-ți numele aici)_ · **Val:** 2 · **Branch:** `feat/srf-fe4-filters`

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
