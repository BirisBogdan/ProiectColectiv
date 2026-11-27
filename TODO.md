# TODO — UBB Campus

**Sprintul curent: StudyRoom Finder.** Etapa 1 (onboarding, TODO-01..08) e gata; acum lucrăm în paralel la etapa a 2-a (TODO-09..16) și etapa a 3-a (TODO-17..24), fiecare cu 4 itemi de backend și 4 de frontend. Etapa a 4-a (TODO-26..40) duce aplicația pe date reale: orarul importat, check-in-uri în baza de date și rapoarte de probleme, plus extra-urile amânate. Etapa a 5-a (TODO-41..58) pornește al doilea modul, **Cămin / Dorm Manager**: login, codurile de invitație, spălătoria, raportările către administrator, anunțurile, cheltuielile și împrumuturile. Fișierul conține doar itemii sprintului.

## Cum folosim fișierul

- **Te asignezi singur:** alegi un item liber, îți scrii numele la „Asignat”, îl treci pe `[~]` și faci commit (sau anunți pe grup). Un om, un item.
- Nu ștergi și nu tai itemi. Când e gata: `[DONE]`, plus o propoziție cu ce s-a făcut și linkul la PR.
- Schimbarea statusului înseamnă două editări: titlul itemului și rândul din Index.

**Status:** `[ ]` liber · `[~]` în lucru · `[DONE]` gata · `[POSTPONED]` amânat până validăm MVP-ul (nu se începe)

---

## Index

| ID | Status   | Parte | Titlu | Asignat        |
|---|----------|---|---|----------------|
| TODO-01 | `[DONE]` | Backend | Fundația: tipuri, date hardcodate și `GET /api/buildings` | Bogdan         |
| TODO-02 | `[DONE]` | Backend | `GET /api/rooms`: lista sălilor cu filtre | Darius         |
| TODO-03 | `[DONE]` | Backend | Motorul de stare: e sala liberă acum? | Alexia         |
| TODO-04 | `[DONE]` | Backend | Orarul hardcodat și `GET /api/rooms/[id]` | Diana          |
| TODO-05 | `[DONE]` | Frontend | Layout, navigare, pagina de start și `StatusBadge` | Tudor          |
| TODO-06 | `[DONE]` | Frontend | Pagina `/rooms`: lista de săli | Raul           |
| TODO-07 | `[DONE]` | Frontend | Pagina `/rooms/[id]`: detaliul unei săli | Bogdan Buruian |
| TODO-08 | `[DONE]` | Frontend | Bara de filtre și checklist-ul de QA | Bogdan         |
| TODO-09 | `[DONE]` | Backend | Check-in: contractul, stocarea și endpointurile | Diana          |
| TODO-10 | `[DONE]` | Backend | Filtrul „liberă cel puțin N ore” | Luca           |
| TODO-11 | `[DONE]` | Backend | Planul clădirii: date și `GET /api/buildings/[id]/plan` | Luca           |
| TODO-12 | `[DONE]` | Backend | Importerul de orar: parser FMI pe fișiere salvate | Alexia         |
| TODO-13 | `[DONE]` | Frontend | Butonul de check-in pe pagina sălii | Tudor          |
| TODO-14 | `[DONE]` | Frontend | Semnalul „persoane aici” și lista care se actualizează singură | Bogdan Buruian |
| TODO-15 | `[DONE]` | Frontend | Pagina `/rooms/plan`: planul clădirii | Bogdan         |
| TODO-16 | `[DONE]` | Frontend | Filtrul „liberă cel puțin” în UI și QA pentru etapa a 2-a | Bogdan         |
| TODO-17 | `[DONE]` | Backend | Supabase local: prima migrație, RLS și seed pentru săli | Darius         |
| TODO-18 | `[DONE]` | Backend | `room_schedule` și funcția SQL `room_status` | Darius         |
| TODO-19 | `[DONE]` | Backend | Săptămâni pare/impare și perioada de cursuri | Alexia         |
| TODO-20 | `[DONE]` | Backend | `GET /api/rooms/[id]/week`: orarul pe săptămână și intervalele libere | Diana          |
| TODO-21 | `[DONE]` | Frontend | Pagina `/rooms/[id]/week`: orarul pe săptămână | Raul           |
| TODO-22 | `[DONE]` | Frontend | Bazele traducerilor RO / EN | Tudor          |
| TODO-23 | `[DONE]` | Frontend | Aplicație instalabilă: manifest, iconițe și pagină offline | Buruian Bogdan |
| TODO-24 | `[DONE]` | Frontend | Teste end-to-end cu Playwright | Tudor          |
| TODO-25 | `[DONE]` | Frontend | Restul textelor pe `lib/i18n` | Raul           |
| TODO-26 | `[ ]`    | Backend | Importerul FMI descarcă singur orarul | _(liber)_      |
| TODO-27 | `[ ]`    | Backend | Importerul scrie orarul în Supabase, cu loturi și verificări | _(liber)_      |
| TODO-28 | `[ ]`    | Backend | Catalogul real al sălilor FMI | _(liber)_      |
| TODO-29 | `[ ]`    | Backend | Importul automat pe GitHub Actions | _(liber)_      |
| TODO-30 | `[~]`    | Backend | `room_status` în SQL: săptămâni pare/impare și perioada de cursuri | Buruian Bogdan |
| TODO-31 | `[ ]`    | Backend | Aplicația citește sălile și orarul din Supabase | _(liber)_      |
| TODO-32 | `[ ]`    | Backend | Adaptorul FSEGA și sălile FSEGA | _(liber)_      |
| TODO-33 | `[ ]`    | Backend | Tabelul `room_checkins`: check-in-uri care rămân după restart | _(liber)_      |
| TODO-34 | `[ ]`    | Backend | Check-in-ul trece pe baza de date | _(liber)_      |
| TODO-35 | `[ ]`    | Frontend | Check-in-uri live pentru toată lumea | _(liber)_      |
| TODO-36 | `[ ]`    | Backend | Raportarea problemelor dintr-o sală: tabelul și endpointul | _(liber)_      |
| TODO-37 | `[DONE]` | Frontend | „Raportează o problemă” pe pagina sălii | Tudor          |
| TODO-38 | `[POSTPONED]` | Extra | Sălile favorite | _(amânat)_      |
| TODO-39 | `[POSTPONED]` | Extra | Alerta „sala se eliberează în 10 minute” | _(amânat)_      |
| TODO-40 | `[POSTPONED]` | Extra | „Vin la 14:00”: check-in în avans | _(amânat)_      |
| TODO-41 | `[ ]`    | Backend | Login cu `@stud.ubbcluj.ro` și tabelul `profiles` | _(liber)_      |
| TODO-42 | `[ ]`    | Backend | Tabelele căminului, rolurile și datele demo | _(liber)_      |
| TODO-43 | `[ ]`    | Backend | Codurile de invitație: creare, folosire, revocare, plecare din cameră | _(liber)_      |
| TODO-44 | `[ ]`    | Backend | Rezervările la spălătorie, fără suprapuneri | _(liber)_      |
| TODO-45 | `[ ]`    | Backend | Mașinile de spălat: defecte, scoase din uz și semnalate de studenți | _(liber)_      |
| TODO-46 | `[ ]`    | Backend | Raportările administrative: tabelul, poza și statusul | _(liber)_      |
| TODO-47 | `[ ]`    | Backend | Emailul automat către administratorul căminului | _(liber)_      |
| TODO-48 | `[ ]`    | Backend | Anunțurile pe etaj sau cămin: tabelul și regulile | _(liber)_      |
| TODO-49 | `[ ]`    | Backend | Cheltuielile pe cameră: tabelele și balanțele | _(liber)_      |
| TODO-50 | `[ ]`    | Backend | Împrumutul de obiecte între vecini: cererile și răspunsurile | _(liber)_      |
| TODO-51 | `[ ]`    | Frontend | Pagina de login și pagina `/dorm` cu „Intră cu un cod” | _(liber)_      |
| TODO-52 | `[ ]`    | Frontend | Spălătoria: grila de sloturi, rezervarea și starea mașinilor | _(liber)_      |
| TODO-53 | `[ ]`    | Frontend | Formularul de raportare și „Rapoartele mele” | _(liber)_      |
| TODO-54 | `[ ]`    | Frontend | Anunțurile: lista, formularul și „Trimite pe WhatsApp” | _(liber)_      |
| TODO-55 | `[ ]`    | Frontend | Cheltuielile pe cameră: adăugare și „cine cui datorează” | _(liber)_      |
| TODO-56 | `[ ]`    | Frontend | Împrumuturile între vecini: cereri și oferte | _(liber)_      |
| TODO-57 | `[ ]`    | Frontend | Reminderul înainte de spălătorie și QA pentru etapa a 5-a | _(liber)_      |
| TODO-58 | `[POSTPONED]` | Extra | Sincronizarea anunțurilor cu grupurile de WhatsApp | _(amânat)_      |

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

## Etapa a 4-a (TODO-26..40)

Demo-ul e gata: listă cu filtre, pagina sălii, check-in, săptămâna, planul și engleza. Ce lipsește ca să devină produs: **date reale** (orarul și sălile importate de pe site-urile facultăților și ținute în baza de date), **check-in-uri care rămân** (salvate în baza de date și văzute live de toată lumea) și **raportarea problemelor** dintr-o sală. Extra-urile (favorite, alerta „se eliberează în 10 minute”, check-in în avans) sunt scrise ca itemi, dar rămân `[POSTPONED]` până validăm MVP-ul (CLAUDE.md). Workflow-ul și regulile sunt cele de mai sus.

**Atenție la numere:** itemii de aici au tot numerotarea sprintului. Fiecare spune ce item din backlog acoperă (de ex. TODO-32 de aici e backlog #28, FSEGA).

### Ce trebuie înainte, în afara etapei

Etapa asta trece aplicația de pe fișierele TypeScript pe Supabase, așa că are nevoie de lucruri care nu sunt itemi aici:

- **Proiectul Supabase `dev`** (backlog #04). Fără el, importul automat (TODO-29) și trecerea aplicației pe baza de date (TODO-31) merg doar local.
- **Login cu `@stud.ubbcluj.ro`** (backlog #08). Fără el, check-in-urile și rapoartele sunt anonime și oricine poate apăsa de mai multe ori. TODO-33, 34 și 36 sunt gândite să meargă și înainte, cu `user_id` gol, dar regula „un check-in activ de om” vine abia cu login-ul.
- **Răspunsul la OQ-8** (de unde luăm orarul FMI și dacă avem voie să-l descărcăm automat). Blochează doar TODO-26 și TODO-29.

### Fișiere și regula anti-conflicte

| TODO | Parte | Fișiere proprii |
|---|---|---|
| TODO-26 | Backend | `scripts/schedule-import/schedule_import/adapters/fmi.py` (doar `fetch`), `schedule_import/fetch.py`, `__main__.py` |
| TODO-27 | Backend | Migrația `schedule_import_batches` din `supabase/`, `scripts/schedule-import/schedule_import/load.py`, `requirements.txt` |
| TODO-28 | Backend | `scripts/schedule-import/catalog/fmi-rooms.csv`, `schedule_import/catalog.py`, migrația pentru coloanele noi din `rooms` |
| TODO-29 | Backend | `.github/workflows/import.yml`, `scripts/schedule-import/README.md` |
| TODO-30 | Backend | Migrația `teaching_periods` și noua versiune a `room_status` din `supabase/`, `supabase/tests/room_status.test.sql` |
| TODO-31 | Backend | `apps/web/lib/supabase/server.ts`, `features/rooms/server/` (`list-rooms.ts`, `get-room.ts`, `get-week.ts`, `get-plan.ts`), `features/rooms/data/` |
| TODO-32 | Backend | `scripts/schedule-import/schedule_import/adapters/fsega.py`, `catalog/fsega-rooms.csv`, fixture-urile și testele FSEGA |
| TODO-33 | Backend | Migrația `room_checkins` din `supabase/`, `supabase/tests/room_checkins.test.sql` |
| TODO-34 | Backend | `features/rooms/server/checkins.ts`, `app/api/rooms/[id]/checkins/`, `app/api/checkins/` |
| TODO-35 | Frontend | `features/rooms/components/RoomList.tsx`, `RoomHeader.tsx`, `CheckinSignal.tsx`, `CheckinButton.tsx`, `features/rooms/hooks/useLiveCheckins.ts` |
| TODO-36 | Backend | Migrația `room_reports` din `supabase/`, `supabase/tests/room_reports.test.sql`, `features/rooms/server/reports.ts`, `app/api/rooms/[id]/reports/` |
| TODO-37 | Frontend | `features/rooms/components/ReportProblem.tsx`, `ReportSignal.tsx`, `app/(app)/rooms/[id]/page.tsx` |
| TODO-38 | Extra | `room_favourites` (migrație + teste), `features/rooms/components/FavouriteButton.tsx` |
| TODO-39 | Extra | `room_free_alerts` (migrație + teste), `supabase/functions/room-free-alerts/`, `features/rooms/components/FreeAlertButton.tsx` |
| TODO-40 | Extra | `room_checkins` (coloana `planned_for`), `features/rooms/components/PlannedCheckin.tsx` |

Căile din `features/`, `app/` și `lib/` sunt relative la `apps/web/`.

**Excepții planificate:**

- **`features/rooms/types.ts`:** în etapa asta îl modifică doar TODO-36 (câmpul `recentReports`), iar mai târziu TODO-40 (`plannedCheckins`). Se adaugă câmpuri, nu se schimbă cele existente: contractul cu frontendul rămâne.
- **`database.types.ts`:** fiecare item cu migrație îl regenerează. La conflict, regenerezi din nou după rebase, nu rezolvi de mână.
- **`CLAUDE.md`:** TODO-27, 29 și 31 actualizează nota de status, §2 și §6. La conflict, păstrați ambele modificări.

### Dependențe și ordinea de merge

| TODO | Poate porni | Trebuie să aștepte |
|---|---|---|
| TODO-28, 30, 33, 36 | imediat | nimic (doar Supabase local) |
| TODO-26 | după OQ-8 | răspunsul la OQ-8 |
| TODO-27 | imediat, pe fixture-uri | TODO-28 pe `main` (codurile de săli se verifică pe catalog) |
| TODO-29 | după TODO-26 și 27 | proiectul `dev` (backlog #04) |
| TODO-31 | imediat | TODO-30 pe `main`, ca baza de date să dea aceeași stare ca TypeScript |
| TODO-32 | după TODO-27 | sursa și formatul orarului FSEGA |
| TODO-34 | după TODO-33 | TODO-31 pe `main` (același client Supabase) |
| TODO-35 | imediat, pe mock | TODO-34 |
| TODO-37 | imediat, pe mock | TODO-36 |
| TODO-38, 39, 40 | `[POSTPONED]` | validarea MVP-ului și login-ul (backlog #08) |

### Ce rămâne deschis după etapa asta

- **Corecțiile de admin** (backlog #18) și **coada de moderare** pentru rapoarte (backlog #15) nu intră aici. Ce trebuie: răspunsul la OQ-4 (cine sunt adminii). Până atunci, rapoartele „orar greșit” din TODO-36 se citesc direct din baza de date.
- **Alertele la importuri eșuate** merg doar ca job roșu în GitHub Actions. Ce trebuie: Sentry (backlog #05).
- **Planul clădirii rămâne schema demo** (OQ-6): TODO-31 citește sălile din baza de date, dar pozițiile din `floor-plans.ts` rămân scrise de mână.

---

## Etapa a 5-a (TODO-41..58): Cămin / Dorm Manager

StudyRoom Finder e gata ca demo, așa că pornim al doilea modul: aplicația pentru studenții din Hașdeu și Economica. Etapa acoperă tot ce scrie despre Modulul C în documentul inițial („UBB Campus: lista de funcționalități”):

- **MVP:** alăturarea la cameră / cămin prin **cod de invitație**, **programarea la spălătorie** (sloturi pe mașină și pe zi, rezervare, anulare, reminder), **raportările administrative** (categorie, poză, status trimis / în lucru / rezolvat) și **emailul generat automat** pentru administrator;
- **mașinile de spălat** ca obiect separat: care sunt, care e defectă, ce se întâmplă cu rezervările când una se strică;
- **anunțurile pe etaj sau cămin** (zgomot, întreruperi de apă), cu butonul „Trimite pe WhatsApp” acum și sincronizarea cu grupurile de WhatsApp mai târziu (TODO-58);
- **cheltuielile pe cameră** și **împrumutul de obiecte între vecini**, din descrierea modulului.

Primul item e **login-ul cu `@stud.ubbcluj.ro`** (backlog #08), pentru că toate celelalte depind de „cine ești”: doar membrii căminului rezervă mașini, un raport are un autor, iar RLS are nevoie de `auth.uid()`.

**Ordinea:** MVP-ul (TODO-41..47 și 51..53, 57) intră primul. Anunțurile, cheltuielile și împrumuturile (TODO-48..50 și 54..56) sunt scrise complet și se pot lua oricând, dar au prioritate mai mică. CLAUDE.md le tratează ca Extra / OQ-7; le-am scos din `[POSTPONED]` la cererea lui Bogdan, pentru că sunt în documentul inițial. Doar sincronizarea cu WhatsApp (TODO-58) rămâne `[POSTPONED]`.

**Atenție la numere:** ca în etapa a 4-a, itemii au numerotarea sprintului, iar fiecare spune ce item din backlog acoperă. În `CLAUDE.md`, `TODO-41`, `TODO-42`, `TODO-44` etc. sunt numere din backlog (de ex. TODO-42 din CLAUDE.md, rezervările, e TODO-44 de aici).

**Unde e codul:** tot ce ține de cămin stă în `apps/web/features/dorm/` și `apps/web/app/(app)/dorm/`. Frontendul vorbește direct cu Supabase (`supabase.rpc(...)` și `select`), fără route handlers noi: regulile stau în baza de date (CLAUDE.md §1). Fiecare item de backend scrie și funcțiile TypeScript tipate din `features/dorm/queries/`, pe care le importă frontendul; până intră, frontendul lucrează pe un mock cu aceeași semnătură.

### Ce trebuie înainte, în afara etapei

Nimic din lista asta nu blochează lucrul local (Supabase local, date demo), dar fiecare blochează pilotul cu studenți reali:

- **Care cămin e pilotul** (Hașdeu sau Economica, ce clădire), câte mașini are și **cât durează un slot** la spălătorie. Până aflăm, `seed.sql` are un cămin demo și constantele sunt marcate „demo” în comentarii.
- **OQ-3: cine e administratorul căminului**, ce email primește rapoartele și dacă primește cont (`dorm_admin`) ca să schimbe statusul. Până atunci, statusul îl schimbă un `dorm_admin` din echipă, iar adresa e una de test.
- **Un cont Resend** cu domeniu verificat, pentru emailurile reale (OTP, rapoarte, remindere). Local, emailurile se văd în Mailpit (`localhost:54324`) sau în consolă.
- **Proiectul Supabase `dev`** (backlog #04), ca să poată intra și alți studenți decât echipa.
- **Consimțământul GDPR la înregistrare** (backlog #49): login-ul deschide conturi reale, deci trebuie înainte de pilot. Nu e item aici, ca să nu blocheze etapa.

### Fișiere și regula anti-conflicte

| TODO | Parte | Fișiere proprii |
|---|---|---|
| TODO-41 | Backend | Migrația `profiles` și hook-ul de domeniu, `supabase/tests/auth.test.sql`, `apps/web/lib/supabase/client.ts`, `apps/web/proxy.ts`, secțiunea `[auth]` din `supabase/config.toml` |
| TODO-42 | Backend | Migrația `dorms`, `dorm_rooms`, `dorm_members`, `laundry_machines`, `user_roles`, `supabase/tests/dorm_core.test.sql`, partea de cămin din `seed.sql`, `features/dorm/types.ts`, `features/dorm/queries/dorm.ts` |
| TODO-43 | Backend | Migrația `dorm_invites` și funcțiile ei, `supabase/tests/dorm_invites.test.sql`, `features/dorm/queries/invites.ts` |
| TODO-44 | Backend | Migrația `laundry_bookings` și funcțiile ei, `supabase/tests/laundry_bookings.test.sql`, `features/dorm/queries/laundry.ts` |
| TODO-45 | Backend | Migrația `laundry_machine_issues` și funcțiile de stare a mașinilor, `supabase/tests/laundry_machines.test.sql`, `features/dorm/queries/machines.ts` |
| TODO-46 | Backend | Migrația `maintenance_reports`, bucket-ul `maintenance-photos`, `supabase/tests/maintenance_reports.test.sql`, `features/dorm/queries/reports.ts` |
| TODO-47 | Backend | `supabase/functions/maintenance-report-email/`, `supabase/functions/_shared/email.ts`, migrația `dorm_admin_contacts` și webhook-ul |
| TODO-48 | Backend | Migrația `announcements`, `supabase/tests/announcements.test.sql`, `features/dorm/queries/announcements.ts` |
| TODO-49 | Backend | Migrația `expenses`, `expense_splits`, `supabase/tests/expenses.test.sql`, `features/dorm/queries/expenses.ts` |
| TODO-50 | Backend | Migrația `loan_requests`, `supabase/tests/loan_requests.test.sql`, `features/dorm/queries/loans.ts` |
| TODO-51 | Frontend | `app/(auth)/login/`, `app/(auth)/auth/callback/`, `app/(app)/dorm/page.tsx`, `features/dorm/components/JoinWithCode.tsx`, `DormHome.tsx`, `InviteButton.tsx` |
| TODO-52 | Frontend | `app/(app)/dorm/laundry/`, `features/dorm/components/LaundryDayGrid.tsx`, `MyBookings.tsx`, `MachineStatus.tsx` |
| TODO-53 | Frontend | `app/(app)/dorm/reports/`, `features/dorm/components/ReportForm.tsx`, `ReportList.tsx`, `ReportStatusBadge.tsx`, `features/dorm/lib/resize-image.ts` |
| TODO-54 | Frontend | `app/(app)/dorm/announcements/`, `features/dorm/components/AnnouncementList.tsx`, `AnnouncementForm.tsx`, `ShareOnWhatsApp.tsx` |
| TODO-55 | Frontend | `app/(app)/dorm/expenses/`, `features/dorm/components/ExpenseForm.tsx`, `BalanceSummary.tsx` |
| TODO-56 | Frontend | `app/(app)/dorm/loans/`, `features/dorm/components/LoanBoard.tsx`, `LoanRequestForm.tsx` |
| TODO-57 | Frontend | `supabase/functions/laundry-reminders/`, migrația pentru coloanele de reminder, `features/dorm/lib/ics.ts`, `docs/qa/dorm-manager.md` |
| TODO-58 | Extra | `docs/whatsapp-sync.md` (întâi doar cercetarea) |

Căile din `features/`, `app/` și `lib/` sunt relative la `apps/web/`.

**Excepții planificate:**

- **`lib/supabase/server.ts`:** îl creează primul care ajunge pe `main` dintre TODO-31 și TODO-41; celălalt îl refolosește.
- **`app/(app)/layout.tsx`:** doar TODO-51 îl modifică (linkul „Cămin”, „Intră în cont” / „Ieși din cont”).
- **`app/(app)/dorm/page.tsx`:** e al lui TODO-51. TODO-52..56 adaugă fiecare câte un link spre pagina lor în `DormHome.tsx`, o singură linie.
- **`lib/i18n/messages.ts`:** fiecare item de frontend își adaugă cheile sub `dorm.<pagina>`. La conflict, păstrați ambele.
- **`features/dorm/types.ts`:** îl creează TODO-42; ceilalți doar adaugă tipuri la final.
- **`supabase/seed.sql`:** partea de cămin e a lui TODO-42; TODO-43 adaugă un cod de invitație demo, TODO-47 o adresă de test, TODO-48..50 câteva rânduri demo, la finalul secțiunii de cămin.
- **`supabase/config.toml`:** TODO-41 (auth), TODO-47 și TODO-57 (funcții). La conflict, păstrați ambele.
- **`database.types.ts`:** fiecare item cu migrație îl regenerează. La conflict, regenerezi după rebase.
- **`CLAUDE.md`:** TODO-41 actualizează nota de status și §3.1, TODO-42 §3.2 și §6, TODO-47 §3.9.

### Dependențe și ordinea de merge

| TODO | Poate porni | Trebuie să aștepte |
|---|---|---|
| TODO-41, 42 | imediat | nimic (doar Supabase local) |
| TODO-43, 44, 46 | după TODO-42 | TODO-42 pe `main` |
| TODO-45 | după TODO-44 | TODO-44 pe `main` (anulează rezervări) |
| TODO-47 | după TODO-46 | TODO-46 pe `main`; Resend și OQ-3 doar pentru emailurile reale |
| TODO-48, 49, 50 | după TODO-42 | TODO-42 pe `main`; prioritate mai mică decât MVP-ul |
| TODO-51 | imediat, pe mock | TODO-41 și TODO-43 |
| TODO-52 | imediat, pe mock | TODO-44 și TODO-45 |
| TODO-53 | imediat, pe mock | TODO-46 |
| TODO-54, 55, 56 | imediat, pe mock | TODO-48, 49, respectiv 50 |
| TODO-57 | după TODO-44 și 47 | rularea QA: toți itemii de MVP pe `main` |
| TODO-58 | `[POSTPONED]` | TODO-48 și TODO-54 folosite o vreme de studenți reali |

### Ce rămâne deschis după etapa asta

- **Notificările push** (backlog #10) nu intră: reminderul la spălătorie e pe email și în calendar (`.ics`). Ce trebuie: VAPID și `device_tokens`.
- **Preferințele de notificare** (backlog #12) nu există încă. Până atunci, reminderul se poate opri per rezervare, iar emailul către administrator nu e o notificare a unui student.
- **Raportarea și blocarea conținutului** (backlog #48) lipsesc: un anunț sau o cerere de împrumut nepotrivită o șterge doar autorul sau `dorm_admin`. Ce trebuie: tabelul `content_reports`.
- **Ștergerea contului** (backlog #50): fiecare tabel nou din etapa asta are `user_id`, deci trebuie adăugat în funcția de ștergere când există.
- **OQ-3 și pilotul** (vezi mai sus): până la răspuns, emailurile merg la o adresă de test și datele căminului sunt demo.

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

### TODO-10 `[DONE]` Filtrul „liberă cel puțin N ore”

**Asignat:** Luca · **Val:** 2 · **Branch:** `feat/srf-be6-be7-free-for-building-plan` (împreună cu TODO-11)

Gata: `isFreeFor` în `free-for.ts`, `minFreeHours` în `list-rooms.ts` și `parse-filters.ts`, cu teste. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/15

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

### TODO-11 `[DONE]` Planul clădirii: date și `GET /api/buildings/[id]/plan`

**Asignat:** Luca · **Val:** 2 · **Branch:** `feat/srf-be6-be7-free-for-building-plan` (împreună cu TODO-10)

Gata: pozițiile demo în `floor-plans.ts`, `getBuildingPlan` și `GET /api/buildings/[id]/plan` (404 pentru clădire inexistentă), cu teste. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/15

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

### TODO-17 `[DONE]` Supabase local: prima migrație, RLS și seed pentru săli

**Asignat:** Darius · **Branch:** `feat/srf-be9-supabase-catalog`

Configurația locală Supabase (`supabase/config.toml`), prima migrație cu tabelele `faculties`, `buildings` și `rooms` + RLS (`select` doar pentru `authenticated`), `supabase/seed.sql`, testele pgTAP în `supabase/tests/rooms_catalog.test.sql` și tipurile `apps/web/lib/supabase/database.types.ts` sunt făcute. PR: _(de completat linkul)_

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

### TODO-18 `[DONE]` `room_schedule` și funcția SQL `room_status`

**Asignat:** Darius · **Branch:** `feat/srf-be10-room-status-sql`

Migrația pentru `room_schedule` cu RLS și funcția SQL `room_status(p_room_id, p_at)` (evaluată în `Europe/Bucharest`, cu `parity` nefolosit încă până la integrarea cu TODO-19), completarea `seed.sql`, testele pgTAP din `supabase/tests/room_status.test.sql` și regenerarea `database.types.ts` sunt făcute. PR: _(de completat linkul)_

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

### TODO-19 `[DONE]` Săptămâni pare/impare și perioada de cursuri

**Asignat:** Alexia · **Branch:** `feat/srf-be11-week-parity`

Orele cu `weeks` ocupă sala doar în săptămânile impare sau pare, iar în afara perioadelor de cursuri (calendar demo) toate sălile sunt `unknown`, nu `free`. Săptămânile se numără calendaristic; de confirmat cu facultatea, împreună cu sensul lui `sapt. 1`. `get-week`, `free-for` și `RoomSchedule` nu țin încă cont de `weeks`. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/19

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

### TODO-20 `[DONE]` `GET /api/rooms/[id]/week`: orarul pe săptămână și intervalele libere

**Asignat:** Diana · **Branch:** `feat/srf-be12-room-week`

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

### TODO-26 `[ ]` Importerul FMI descarcă singur orarul

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be13-importer-fetch` · **Backlog:** #17

#### De ce
Azi importerul citește doar pagini salvate de mână (TODO-12). Ca orarul din aplicație să fie cel real și la zi, trebuie să-l poată lua singur de pe site-ul FMI, fără ca cineva să salveze zeci de pagini în fiecare săptămână.

#### Depinde de
**OQ-8.** Nu începe codul de rețea până nu știm de unde avem voie să luăm orarul (o pagină publică, un export sau un API de la facultate). Dacă facultatea dă un export, adaptorul citește exportul și pasul 2 se schimbă.

#### Ce ai de făcut

1. **`schedule_import/fetch.py`**: o singură funcție pentru cereri HTTP, folosită de toate adaptoarele:
   - un `User-Agent` generic cu numele proiectului, fără emailuri sau nume de persoane;
   - cel mult o cerere pe secundă, timeout de 20 de secunde, 3 încercări cu pauză crescătoare;
   - citește `charset`-ul din pagină (FMI folosește `ISO-8859-2`), nu presupune UTF-8.

2. **`adapters/fmi.py`**, metoda `fetch()`: citește pagina-index a sălilor pentru semestrul curent, ia linkurile spre paginile fiecărei săli și le descarcă. Adresa semestrului (`.../files/orar/2026-1/`) e parametru, nu e scrisă în cod.

3. **`__main__.py`**: fără `--from-file`, programul descarcă. `--dry-run` rămâne obligatoriu până la TODO-27. Opțiunea `--save-raw <dir>` salvează paginile descărcate, ca să putem face fixture-uri noi când se schimbă formatul.

4. **Teste**: rețeaua se înlocuiește cu fixture-urile existente (un server fals sau `monkeypatch`), deci `pytest` rămâne fără internet. Cazuri: index cu linkuri relative, o pagină care dă 404 (eroare clară, nu listă goală), `charset` diferit.

#### Gata când
- [ ] `python -m schedule_import --faculty fmi --dry-run` descarcă orarul real și tipărește același rezumat ca la TODO-12.
- [ ] `pytest` trece fără rețea, local și în CI.
- [ ] În PR: răspunsul la OQ-8 (link sau mesajul de la facultate), câte pagini s-au descărcat și cât a durat. PR revizuit de cine a făcut TODO-12.

### TODO-27 `[ ]` Importerul scrie orarul în Supabase, cu loturi și verificări

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be14-importer-load` · **Backlog:** #17

#### De ce
Un import care șterge orarul și apoi pică la jumătate face toate sălile să pară libere. De aceea fiecare import e un lot nou, care înlocuiește lotul vechi doar dacă trece verificările (CLAUDE.md §3.3). Asta e regula care face importul automat sigur.

#### Depinde de
TODO-28 pe `main` înainte de PR, pentru că verificarea „fiecare cod de sală e cunoscut” citește catalogul. Poți lucra pe fixture-uri și pe Supabase local între timp.

#### Ce ai de făcut

1. **Migrație nouă** `schedule_import_batches`: `id`, `faculty_id`, `created_at timestamptz`, `row_count int`, `status text check (status in ('pending', 'active', 'rejected'))`, `reason text`. În `room_schedule` adaugi `batch_id` cu foreign key. RLS activat; politici de `select` ca la TODO-17, fără politici de scriere.

2. **Funcția SQL** `activate_schedule_batch(p_batch_id)`: într-o singură tranzacție marchează lotul nou `active` și pe cel vechi al aceleiași facultăți `rejected`, apoi șterge rândurile loturilor vechi. Funcția de stare citește doar rândurile lotului `active`.

3. **`schedule_import/load.py`**: scrie rândurile ca lot `pending`, rulează verificările și apelează `activate_schedule_batch` doar dacă trec:
   - numărul de rânduri nu e sub 70% din lotul activ (pragul e constantă, cu comentariu);
   - fiecare `room_code` există în `rooms`; un cod necunoscut respinge lotul și îl scrie în `reason`;
   - un lot respins rămâne în tabel, ca să vedem de ce, iar lotul activ nu se atinge.

4. **`__main__.py`**: `--write` în loc de `--dry-run`. Cheia `service_role` se citește din variabila de mediu `SUPABASE_SERVICE_ROLE_KEY` și nu apare niciodată în log-uri sau în fișiere din repo.

5. **Teste**: pytest pentru verificări (fără bază de date) și pgTAP pentru `activate_schedule_batch`: lotul vechi rămâne activ când cel nou e respins, iar `anon` și `authenticated` nu pot scrie.

6. Regenerează `database.types.ts` și actualizează `CLAUDE.md` (§2 și §6: importerul scrie acum în baza de date).

#### Gata când
- [ ] Pe Supabase local, `--write` cu fixture-urile creează un lot activ, iar `room_status` folosește rândurile lui.
- [ ] Un import cu un cod de sală inventat e respins și orarul rămâne cel vechi (dovada în PR).
- [ ] `pytest` și `supabase test db` trec. PR revizuit de un coleg din cealaltă jumătate.

### TODO-28 `[ ]` Catalogul real al sălilor FMI

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be15-fmi-catalog` · **Backlog:** #16

#### De ce
Orarul spune doar codul sălii. Capacitatea, prizele, proiectorul, clădirea și etajul nu apar nicăieri, iar filtrele depind de ele. Cele 9 săli de acum sunt demo.

#### Depinde de
Nimic din cod. Trebuie cineva care merge prin clădirile FMI (sau primește lista de la facultate). Lista de coduri o dă importerul: rezumatul de la TODO-12 sau TODO-26.

#### Ce ai de făcut

1. **`scripts/schedule-import/catalog/fmi-rooms.csv`**, cu antet: `code,building_id,floor,capacity,has_outlets,has_projector,checked_on,checked_by`. Codul e exact ca în orar (`C310`, `5/I`). O sală neverificată încă are capacitatea goală, nu un număr ghicit.

2. **`schedule_import/catalog.py`**: încarcă CSV-ul în `buildings` și `rooms` cu upsert după `code`. Nu șterge săli: una care dispare din CSV rămâne și se raportează la stderr.

3. **Migrație**: `rooms.capacity` poate fi `null` (necunoscută), dar `check (capacity > 0)` rămâne. Filtrul „capacitate minimă” nu arată sălile cu capacitate necunoscută. Pseudo-sala `Virtual` se exclude din catalog și se ignoră la import, cu comentariu.

4. **Teste**: CSV invalid (coloană lipsă, `capacity = 0`, cod dublat) dă eroare clară; upsert-ul de două ori nu dublează nimic.

#### Gata când
- [ ] CSV-ul acoperă toate codurile găsite de importer, cu `checked_on` completat pentru cel puțin sălile din clădirea centrală.
- [ ] Importul din TODO-27 nu mai respinge niciun cod de sală FMI.
- [ ] Teste verzi. PR revizuit de un coleg din cealaltă jumătate.

### TODO-29 `[ ]` Importul automat pe GitHub Actions

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be16-import-cron` · **Backlog:** #17

#### De ce
Orarul se schimbă în primele săptămâni ale semestrului. Un import pornit de mână se uită; unul pornit în fiecare noapte nu.

#### Depinde de
TODO-26, TODO-27 și proiectul Supabase `dev` (backlog #04). Fără `dev`, nu are unde scrie.

#### Ce ai de făcut

1. **`.github/workflows/import.yml`**: rulează noaptea (de ex. `0 3 * * *`, adică 05:00 sau 06:00 în România) și la cerere (`workflow_dispatch`, cu facultatea ca parametru).
2. Secretele `SUPABASE_URL` și `SUPABASE_SERVICE_ROLE_KEY` stau în GitHub Secrets, separat pentru `dev` și `prod` (environments).
3. Un lot respins face jobul roșu și scrie motivul în rezumatul jobului. Până la Sentry (backlog #05), asta e alerta.
4. Actualizează `scripts/schedule-import/README.md` și §2 din `CLAUDE.md`.

#### Gata când
- [ ] Un run pornit de mână pe `dev` creează un lot activ.
- [ ] Un run cu un prag forțat să pice e roșu, iar orarul din `dev` rămâne neschimbat.
- [ ] PR revizuit de cine a făcut TODO-27.

### TODO-30 `[~]` `room_status` în SQL: săptămâni pare/impare și perioada de cursuri

**Asignat:** Buruian Bogdan · **Branch:** `feat/srf-be17-room-status-parity` · **Backlog:** #19

#### De ce
TODO-18 a lăsat `parity` nefolosit, iar TODO-19 a pus săptămânile și vacanțele doar în TypeScript. Când aplicația trece pe baza de date (TODO-31), funcția SQL trebuie să dea exact aceeași stare, altfel o oră din două în două săptămâni ocupă sala mereu și în vacanță totul apare liber.

#### Depinde de
Nimic. Supabase local și Docker.

#### Ce ai de făcut

1. **Migrație** `teaching_periods` (`start_date date`, `end_date date`, `check (start_date <= end_date)`), cu RLS ca la TODO-17, și aceleași perioade demo ca în `features/rooms/data/calendar.ts` în `seed.sql`.
2. **Funcția** `teaching_week(p_at timestamptz)`, cu aceleași reguli ca `teachingWeek` din `server/calendar.ts` (săptămâni de luni, numărate peste vacanță, `null` în afara perioadelor).
3. **`room_status`**, versiune nouă: în afara perioadelor → `unknown`; altfel ignoră rândurile cu `parity` diferită de săptămâna curentă. Ține și comentariul despre ce a rămas din TODO-18.
4. **Teste pgTAP**: fiecare caz din `tests/unit/calendar.test.ts`, inclusiv granița de zi între UTC și România. În PR, tabelul caz TypeScript → caz SQL, ca la TODO-18.

#### Gata când
- [ ] `supabase test db` trece, iar fiecare caz din `calendar.test.ts` are un test SQL.
- [ ] `room_status` pentru 24 decembrie 2026 întoarce `unknown` pentru orice sală.
- [ ] PR revizuit de cine a făcut TODO-19.

### TODO-31 `[ ]` Aplicația citește sălile și orarul din Supabase

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be18-read-supabase` · **Backlog:** #16, #19, #20

#### De ce
Până nu face pasul ăsta, tot importul de mai sus nu se vede în aplicație: rutele citesc în continuare `features/rooms/data/*.ts`. Contractul din `types.ts` a fost gândit tocmai ca frontendul să nu se schimbe la trecere.

#### Depinde de
TODO-30 pe `main` și un proiect Supabase la care să se conecteze aplicația (local pentru dezvoltare, `dev` pentru preview, backlog #04).

**Decizie de luat în PR, cu echipa:** politicile din TODO-17 lasă doar `authenticated` să citească, iar login-ul (backlog #08) nu există încă. Variantele: (a) catalogul și orarul sunt publice, deci adăugăm `select` și pentru `anon` pe `rooms`, `buildings`, `room_schedule`, `teaching_periods`; (b) rutele citesc pe server cu o cheie de server până la login. Recomandarea: (a), pentru că datele sunt deja publice pe site-ul facultății, iar cheia de server nu ajunge în browser nici așa. Scrie decizia în `CLAUDE.md` §3.2.

#### Ce ai de făcut

1. **`lib/supabase/server.ts`**: clientul de server, cu URL-ul și cheia din variabile de mediu (`.env.local`, exemplu în `.env.example`).
2. **`list-rooms.ts`, `get-room.ts`, `get-week.ts`, `get-plan.ts`**: citesc din Supabase și întorc exact tipurile de acum. Starea vine din `room_status`, nu din `computeStatus`. `computeStatus` rămâne pentru teste și ca referință.
3. **`features/rooms/data/`**: datele demo rămân doar ca fixture-uri pentru teste, cu un comentariu. `floor-plans.ts` rămâne (OQ-6).
4. **Teste**: testele unitare existente trec pe un client fals; un test de integrare marcat separat rulează pe Supabase local.
5. Actualizează `CLAUDE.md` (nota de status și §6: aplicația nu mai citește datele hardcodate) și `README.md` (variabilele de mediu).

#### Gata când
- [ ] Cu Supabase local pornit, `/rooms` arată sălile din baza de date, iar o sală adăugată în `seed.sql` apare fără nicio modificare în `features/`.
- [ ] `curl localhost:3000/api/rooms` are aceeași formă ca înainte (comparația în PR).
- [ ] Lint, typecheck, teste verzi. PR revizuit de un coleg din cealaltă jumătate.

### TODO-32 `[ ]` Adaptorul FSEGA și sălile FSEGA

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be19-fsega-adapter` · **Backlog:** #28

#### De ce
Modulul promite FMI și FSEGA. Până există adaptorul, sălile FSEGA apar `unknown`, niciodată `free` (CLAUDE.md §6).

#### Depinde de
TODO-27 (încărcarea pe loturi) și **sursa orarului FSEGA**: unde e publicat, în ce format și dacă avem voie să-l descărcăm (aceeași întrebare ca OQ-8, pentru FSEGA). Fără răspuns, faci doar pașii 1 și 3, pe pagini salvate de mână.

#### Ce ai de făcut

1. **`adapters/fsega.py`**, cu aceeași interfață ca FMI. Tot ce ține de formatul FSEGA stă doar aici; dacă îți trebuie ceva comun, întâi îl muți în `base.py` într-un PR separat.
2. **`catalog/fsega-rooms.csv`**, în formatul de la TODO-28, cu `faculty_id = 'fsega'`.
3. **Teste** pe 2-3 pagini FSEGA salvate, ca la TODO-12, plus o notă în `scripts/schedule-import/README.md` despre ce e neobișnuit în format.
4. Loturile sunt pe facultate: un import FSEGA eșuat nu atinge orarul FMI (test).

#### Gata când
- [ ] `--faculty fsega --dry-run` tipărește rânduri corecte, verificate manual pe câteva ore.
- [ ] După import, sălile FSEGA au stare calculată, iar cele fără orar rămân `unknown`.
- [ ] PR revizuit de cine a făcut TODO-27.

### TODO-33 `[ ]` Tabelul `room_checkins`: check-in-uri care rămân după restart

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be20-checkins-table` · **Backlog:** #22

#### De ce
Check-in-urile din TODO-09 stau în memorie: se pierd la restart, iar pe Vercel fiecare instanță vede alt număr. Le mutăm în baza de date, cu aceleași reguli (expiră după 2 ore, nu schimbă `status`).

#### Depinde de
Nimic. Supabase local și Docker.

#### Ce ai de făcut

1. **Migrație** `room_checkins`: `id uuid default gen_random_uuid()`, `room_id` cu foreign key, `user_id uuid null references auth.users`, `created_at timestamptz default now()`, `expires_at timestamptz not null`, `ended_at timestamptz null` (check-out manual). `check (expires_at > created_at)`.
2. **Funcții SQL** `checkin_room(p_room_id)` și `checkout(p_checkin_id)`: TTL-ul de 2 ore e într-un singur loc, în funcție. Când `auth.uid()` există, un check-in nou al aceluiași om îl închide pe cel vechi (un om, o sală). Fără login, `user_id` rămâne gol; scrie în comentariu că asta e temporar, până la backlog #08.
3. **View** `room_checkin_counts` (`room_id`, `active_count`): numără doar check-in-urile cu `expires_at > now()` și `ended_at is null`. View-ul nu arată `user_id`: nimeni nu vede cine e în sală, doar câți.
4. **RLS**: nimeni nu citește direct `room_checkins` (doar view-ul și propriile rânduri, când există login); scrierea doar prin funcții.
5. **Adaugă tabelul în funcția de ștergere a contului** când aceasta există (CLAUDE.md §3.10); până atunci, notează-l în backlog #50.
6. **Teste pgTAP**: expirarea exact la 2 ore, check-out-ul, numărarea pe sală, „un om, o sală”, iar `anon` nu vede `user_id`.

#### Gata când
- [ ] `supabase test db` trece, cu aceleași cazuri ca `tests/unit/checkins.test.ts`.
- [ ] În PR: tabelul caz TypeScript → caz SQL.
- [ ] PR revizuit de cine a făcut TODO-09.

### TODO-34 `[ ]` Check-in-ul trece pe baza de date

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be21-checkins-db` · **Backlog:** #22

#### De ce
Cu tabelul din TODO-33 gata, endpointurile trebuie să-l folosească, ca un check-in făcut pe telefon să se vadă pe orice alt dispozitiv și după un deploy.

#### Depinde de
TODO-33 și TODO-31 pe `main` (același client Supabase).

#### Ce ai de făcut

1. **`server/checkins.ts`**: aceleași funcții, dar peste `checkin_room`, `checkout` și `room_checkin_counts`. Dispare stocarea pe `globalThis`; `resetCheckins` rămâne doar în testele cu client fals.
2. **Rutele** `POST /api/rooms/[id]/checkins` și `DELETE /api/checkins/[id]` păstrează exact răspunsurile din tabelul de endpointuri al etapei a 2-a.
3. `activeCheckins` din `list-rooms.ts` și `get-room.ts` vine din view, într-o singură interogare pentru toată lista, nu câte una pe sală.
4. **Teste**: testele existente trec pe clientul fals; un test de integrare pe Supabase local face check-in, repornește serverul și vede check-in-ul.

#### Gata când
- [ ] Un check-in rămâne după `Ctrl+C` și repornirea lui `pnpm dev`.
- [ ] Un check-in făcut dintr-un browser apare în `GET /api/rooms` din alt browser.
- [ ] `status` nu se schimbă din cauza check-in-urilor (testul de la TODO-09 trece). PR revizuit de un coleg din cealaltă jumătate.

### TODO-36 `[ ]` Raportarea problemelor dintr-o sală: tabelul și endpointul

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-be22-room-reports` · **Backlog:** #23 (extins)

#### De ce
Studenții văd primii că proiectorul nu merge, că nu sunt prize sau că orarul arată liber o sală în care se ține curs. Backlog #23 acoperea doar „marcată liberă, dar ocupată”; aici îl extindem la orice problemă a sălii și îl scoatem din `[POSTPONED]`, pentru că fără rapoarte datele greșite din import nu le vede nimeni.

#### Depinde de
Nimic. Supabase local și Docker. Login-ul (backlog #08) face limitarea pe om mai bună, dar nu e necesar pentru primul pas.

#### Ce ai de făcut

1. **Migrație** `room_reports`: `id`, `room_id`, `user_id uuid null`, `kind text check (kind in ('occupied', 'projector', 'outlets', 'wrong_schedule', 'other'))`, `note text check (char_length(note) <= 500)`, `created_at`, `resolved_at null`. RLS: scrierea doar prin funcția de mai jos; nimeni nu citește direct `user_id`.
2. **Funcția** `report_room_problem(p_room_id, p_kind, p_note)`: cel mult un raport de același fel pe sală și pe om la 30 de minute (fără login, pe sală, ca limită grosieră). Pragul e constantă, cu comentariu.
3. **View** `room_recent_reports`: pe sală, câte rapoarte nerezolvate are fiecare `kind` în ultimele 2 ore (`occupied`) sau 14 zile (restul).
4. **`server/reports.ts`** și **`app/api/rooms/[id]/reports/route.ts`**: `POST` cu `{ kind, note? }` → `201`, `400 { "error": "Invalid report" }`, `404 { "error": "Room not found" }`, `429 { "error": "Too many reports" }`.
5. **`types.ts`** (excepția planificată): `recentReports: { kind: RoomReportKind; count: number }[]` în `RoomWithStatus`. Rapoartele **nu** schimbă `status`: ca la check-in, UI-ul arată ambele semnale (CLAUDE.md §4).
6. Rapoartele `wrong_schedule` sunt materia primă pentru corecțiile de admin (backlog #18) și coada de moderare (backlog #15); scrie asta în comentariul tabelului.
7. **Teste** pgTAP (RLS, limita de 30 de minute, view-ul) și Vitest (validarea body-ului și codurile de răspuns).

#### Gata când
- [ ] `curl -X POST -d '{"kind":"projector"}' localhost:3000/api/rooms/c-510/reports` întoarce 201, iar `GET /api/rooms/c-510` arată raportul în `recentReports`.
- [ ] Al doilea raport identic în 30 de minute întoarce 429.
- [ ] `supabase test db` și `pnpm test:run` trec. PR revizuit de cine are TODO-37.


### TODO-41 `[ ]` Login cu `@stud.ubbcluj.ro` și tabelul `profiles`

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be1-auth` · **Backlog:** #08

#### De ce
Tot Modulul C e despre „cine ești”: doar membrii unui cămin rezervă mașinile lui, un raport are un autor, iar un cod de invitație leagă un om de o cameră. RLS are nevoie de `auth.uid()`. În plus, login-ul rezolvă și regula „un check-in activ de om” din etapa a 4-a.

#### Depinde de
Nimic. Supabase local și Docker; emailurile cu codul apar local în Mailpit, fără Resend. Pagina de login e în TODO-51.

#### Ce ai de făcut

1. **`supabase/config.toml`**: email OTP (cod de 6 cifre) și magic link pornite, înregistrarea cu parolă oprită, `site_url` și `additional_redirect_urls` pentru `localhost:3000/auth/callback`.
2. **Hook-ul before-user-created** (CLAUDE.md §3.1): o funcție SQL care respinge orice email care nu se termină exact în `@stud.ubbcluj.ro`, fără să conteze literele mari. Atenție la `x@stud.ubbcluj.ro.evil.com` și `x@ubbcluj.ro`. Configurat în `config.toml`. Verificarea din formular (TODO-51) e doar pentru UX; regula e aici.
3. **Migrație** `profiles`: `id uuid primary key references auth.users on delete cascade`, `display_name text check (char_length(display_name) between 1 and 60)`, `created_at`. Un trigger pe insert în `auth.users` creează rândul, cu `display_name` luat din partea dinainte de `@` (de ex. `ion.popescu`). RLS: fiecare își citește și își modifică doar rândul lui. Colegii de cameră se văd prin funcțiile din TODO-42, nu prin `select` direct.
4. **`lib/supabase/client.ts`** (browser) și **`lib/supabase/server.ts`** (server, cu cookie-uri; dacă TODO-31 l-a creat deja, îl refolosești). Cu `@supabase/ssr`; ești singurul din etapa asta care adaugă dependențe în `apps/web/package.json`.
5. **`proxy.ts`** (în versiunea noastră de Next.js, `middleware.ts` s-a redenumit; citește `AGENTS.md` și ghidul din `node_modules/next/dist/docs/`): reîmprospătează sesiunea și trimite spre `/login?next=...` orice cerere spre `/dorm` fără sesiune. `/rooms` rămâne public.
6. **Teste** pgTAP `supabase/tests/auth.test.sql`: hook-ul acceptă `ion.popescu@stud.ubbcluj.ro` și `ION@STUD.UBBCLUJ.RO`, respinge `x@gmail.com`, `x@ubbcluj.ro` și `x@stud.ubbcluj.ro.evil.com`; trigger-ul creează profilul; un utilizator nu citește profilul altuia.
7. Actualizează nota de status și §3.1 din `CLAUDE.md`.

#### Gata când
- [ ] Local, o înregistrare cu `test@stud.ubbcluj.ro` primește codul în Mailpit (`localhost:54324`), iar una cu `test@gmail.com` e refuzată de hook, nu doar de formular.
- [ ] `/dorm` fără sesiune duce la `/login?next=/dorm`; `/rooms` merge fără login.
- [ ] `supabase test db`, `pnpm lint`, `pnpm typecheck`, `pnpm test:run` trec. PR revizuit de cine are TODO-51.

### TODO-42 `[ ]` Tabelele căminului, rolurile și datele demo

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be2-core-tables` · **Backlog:** #40, #53 (partea de cămin)

#### De ce
Fiecare funcție din modul pornește de la „în ce cămin și în ce cameră stai”. Tabelele astea sunt fundația, la fel ca `rooms` și `buildings` pentru StudyRoom Finder.

#### Depinde de
Nimic. Folosește doar `auth.users`, care există mereu în Supabase, deci poate porni în paralel cu TODO-41.

#### Ce ai de făcut

1. **Migrație** cu tabelele din modelul simplificat (CLAUDE.md §3.2), plus rolurile:
   - `dorms`: `id`, `slug text unique` (de ex. `hasdeu-14`), `name`, `campus text check (campus in ('hasdeu', 'economica'))`, `created_at`;
   - `dorm_rooms`: `id`, `dorm_id`, `number text`, `floor int`, `capacity int check (capacity between 1 and 6)`, `unique (dorm_id, number)`;
   - `dorm_members`: `id`, `user_id`, `dorm_room_id`, `joined_at`, `left_at null`; un singur rând activ pe om (index unic parțial pe `user_id` unde `left_at is null`);
   - `laundry_machines`: `id`, `dorm_id`, `label` (de ex. „Mașina 1, parter”), `kind text check (kind in ('washer', 'dryer'))`, `status text check (status in ('working', 'out_of_order', 'retired')) default 'working'`;
   - `user_roles`: `user_id`, `role text check (role in ('admin', 'dorm_admin'))`, `dorm_id null`, cu `check` că un `dorm_admin` are mereu `dorm_id`. Rolurile nu stau în `user_metadata` (CLAUDE.md §3.1).
2. **Funcții ajutătoare** `security definer stable`, folosite de RLS în toată etapa: `my_dorm_id()`, `my_dorm_room_id()`, `is_dorm_member(p_dorm_id)`, `is_dorm_admin(p_dorm_id)`. Plus `my_roommates()`, care întoarce doar `display_name` pentru colegii activi de cameră.
3. **RLS:** `dorms` se citește de orice utilizator autentificat; `dorm_rooms` și `laundry_machines` doar de membrii căminului; `dorm_members` doar propriile rânduri. **Nicio politică de insert pe `dorm_members`:** intrarea se face doar prin codul de invitație (TODO-43).
4. **`seed.sql`**: un cămin demo (de ex. „Căminul demo, Hașdeu”), 2 etaje × 4 camere, 3 mașini de spălat și un uscător, plus 3 utilizatori demo în `auth.users` (doar local), dintre care unul `dorm_admin`. Scrie în comentariu că datele sunt demo până se alege căminul pilot.
5. **`features/dorm/types.ts`** și **`features/dorm/queries/dorm.ts`**: `getMyDorm()` → căminul, camera, colegii, sau `null` dacă omul nu e membru.
6. **Teste** pgTAP `supabase/tests/dorm_core.test.sql`: un străin nu citește camerele și mașinile; un membru le citește; insert direct în `dorm_members` e refuzat; a doua apartenență activă e refuzată; `my_roommates()` nu întoarce emailuri.
7. Actualizează §3.2 și §6 din `CLAUDE.md` (tabelele de cămin există).

#### Gata când
- [ ] `supabase db reset` încarcă căminul demo, iar ca utilizator demo `getMyDorm()` întoarce camera lui.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-43.

### TODO-43 `[ ]` Codurile de invitație: creare, folosire, revocare, plecare din cameră

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be3-invites` · **Backlog:** #41

#### De ce
E primul punct din MVP: „Creare sau alăturare la cameră / cămin prin cod de invitație”. Codul e singura cale de intrare, ca să nu poată oricine să rezerve mașinile unui cămin în care nu stă (CLAUDE.md §3.8).

#### Depinde de
TODO-42 pe `main`.

#### Ce ai de făcut

1. **Migrație** `dorm_invites`: `id`, `dorm_room_id`, `code text unique`, `created_by`, `expires_at default now() + interval '7 days'`, `max_uses int`, `uses int default 0`, `revoked_at null`, `created_at`. RLS: citește doar cel care l-a creat și `dorm_admin`-ul căminului; nicio scriere directă.
2. **Cine creează coduri** (întrebarea din backlog #41): `dorm_admin`-ul pentru orice cameră din căminul lui, iar un membru activ doar pentru camera lui. Așa, primul om dintr-o cameră primește codul de la administrator, iar colegii lui și-l dau între ei. Scrie decizia în PR; dacă echipa vrea altceva, se schimbă doar funcția.
3. **Funcții SQL:**
   - `create_dorm_invite(p_dorm_room_id)` → codul: 8 caractere aleatorii dintr-un alfabet fără `0/O/1/I/L`, `max_uses` = locurile libere din cameră;
   - `redeem_dorm_invite(p_code)` → camera: într-o singură tranzacție, cu `for update` pe invitație, verifică și întoarce erori distincte: `invalid_code`, `expired`, `revoked`, `used_up`, `room_full`, `already_member`;
   - `revoke_dorm_invite(p_code)`: doar creatorul sau `dorm_admin`;
   - `leave_dorm_room()`: pune `left_at` pe apartenența activă și anulează rezervările viitoare de la spălătorie (după TODO-44; până atunci, un comentariu `TODO`).
4. **`features/dorm/queries/invites.ts`**: wrapper-e tipate, cu erorile ca tip union, ca frontendul să arate mesajul potrivit.
5. **`seed.sql`**: un cod demo valid, de ex. `DEMO2026`, scris și în comentariu.
6. **Teste** pgTAP `supabase/tests/dorm_invites.test.sql`: fiecare eroare de mai sus, codul revocat nu mai merge, camera plină refuză, `leave_dorm_room()` permite apoi un alt cod.

#### Gata când
- [ ] Un utilizator demo fără cameră intră cu `DEMO2026` și `getMyDorm()` îl arată în cameră; al doilea `redeem` dă `already_member`.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-51.

### TODO-44 `[ ]` Rezervările la spălătorie, fără suprapuneri

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be4-laundry-bookings` · **Backlog:** #42

#### De ce
E motivul principal pentru care un student din cămin ar instala aplicația: azi rezervarea se face pe o foaie lipită pe ușă sau pe grupul de WhatsApp. Regula „două rezervări nu se suprapun pe aceeași mașină” trebuie să țină și când doi oameni apasă în aceeași secundă, deci stă în baza de date (CLAUDE.md §3.7).

#### Depinde de
TODO-42 pe `main`.

#### Ce ai de făcut

1. **Migrație** `laundry_bookings`: `id`, `machine_id`, `user_id`, `starts_at`, `ends_at`, `status text check (status in ('active', 'cancelled'))`, `cancel_reason text null`, `created_at`, `cancelled_at`; `check (ends_at > starts_at)`. **Exclusion constraint** (cu `btree_gist`): `exclude using gist (machine_id with =, tstzrange(starts_at, ends_at, '[)') with &&) where (status = 'active')`.
2. **Regulile, ca și constante cu comentariu „demo”** până aflăm de la căminul pilot: slot de 90 de minute, program 07:00–23:00 ora României, rezervare cu cel mult 7 zile înainte, cel mult 2 rezervări viitoare active de om.
3. **Funcții SQL:**
   - `book_laundry_slot(p_machine_id, p_starts_at)`: doar membrii căminului mașinii, doar pe o mașină `working`, doar la începutul unui slot, nu în trecut. Erori distincte: `not_member`, `machine_unavailable`, `invalid_slot`, `slot_taken` (prinsă din exclusion constraint), `too_many_bookings`;
   - `cancel_laundry_booking(p_booking_id)`: doar rezervarea ta, doar înainte să înceapă;
   - `laundry_day(p_dorm_id, p_date)`: pentru fiecare mașină, sloturile zilei cu starea `free`, `booked`, `mine` sau `past`. **Nu întoarce cine a rezervat**: colegii văd doar că slotul e ocupat.
4. **RLS:** fiecare își vede doar rezervările lui; grila vine din `laundry_day`. Nicio scriere directă.
5. Completează `leave_dorm_room()` din TODO-43 ca să anuleze rezervările viitoare.
6. **`features/dorm/queries/laundry.ts`**: `getLaundryDay`, `bookSlot`, `cancelBooking`, `getMyBookings`.
7. **Teste** pgTAP `supabase/tests/laundry_bookings.test.sql`: suprapunerea e refuzată chiar și la insert direct cu `service_role`; un slot anulat se poate rezerva din nou; un străin nu poate rezerva; limita de 2; ziua cu schimbarea orei (ultima duminică din octombrie) are sloturile corecte.

#### Gata când
- [ ] Doi utilizatori demo care rezervă același slot: unul primește rezervarea, celălalt `slot_taken`.
- [ ] `laundry_day` pentru azi arată sloturile trecute ca `past` și nu conține niciun `user_id`.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-52.

### TODO-45 `[ ]` Mașinile de spălat: defecte, scoase din uz și semnalate de studenți

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be5-laundry-machines` · **Backlog:** #42 (extins)

#### De ce
O programare nu ajută dacă mașina e stricată de o săptămână. Studenții trebuie să poată spune „mașina 2 nu merge”, administratorul trebuie să o poată scoate din programare, iar cine avea rezervare pe ea trebuie să afle.

#### Depinde de
TODO-44 pe `main`, pentru că anulează rezervări.

#### Ce ai de făcut

1. **Migrație** `laundry_machine_issues`: `id`, `machine_id`, `user_id`, `kind text check (kind in ('not_working', 'leaking', 'door_stuck', 'other'))`, `note text check (char_length(note) <= 300)`, `created_at`, `resolved_at null`.
2. **Funcții SQL:**
   - `report_machine_issue(p_machine_id, p_kind, p_note)`: orice membru al căminului; cel mult o semnalare deschisă de om pe mașină;
   - `set_machine_status(p_machine_id, p_status)`: doar `dorm_admin`. Trecerea pe `out_of_order` sau `retired` anulează rezervările viitoare, cu `cancel_reason = 'machine_out_of_order'`, și închide semnalările deschise când revine pe `working`;
   - `add_laundry_machine(p_label, p_kind)` și `rename_laundry_machine(...)`: doar `dorm_admin`, ca administratorul să-și țină singur lista la zi.
3. **Regula automată, ca și constantă:** de la 3 semnalări `not_working` de la oameni diferiți în 24 de ore, mașina apare cu avertismentul „Posibil defectă” în `laundry_day`, dar rămâne rezervabilă până o trece `dorm_admin` pe `out_of_order`. Așa un singur om nu poate bloca o mașină.
4. Opțional, o semnalare `not_working` creează și un raport administrativ (TODO-46) cu categoria „spălătorie”, dacă TODO-46 e pe `main`. Altfel, notează în PR.
5. **`features/dorm/queries/machines.ts`**: wrapper-e tipate.
6. **Teste** pgTAP `supabase/tests/laundry_machines.test.sql`: un student nu poate schimba statusul; `out_of_order` anulează rezervările viitoare și nu le atinge pe cele trecute; pragul de 3; o mașină `out_of_order` nu se poate rezerva.

#### Gata când
- [ ] Ca `dorm_admin` demo, trecerea unei mașini pe `out_of_order` anulează rezervările viitoare, iar ele apar cu motivul în `getMyBookings()` al proprietarului.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-52.

### TODO-46 `[ ]` Raportările administrative: tabelul, poza și statusul

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be6-maintenance-reports` · **Backlog:** #43

#### De ce
MVP: „Raportări administrative: formular cu categorie, poză și status (trimis, în lucru, rezolvat)”. Azi o chiuvetă spartă se raportează la administrație pe hârtie sau deloc, iar studentul nu știe dacă s-a întâmplat ceva.

#### Depinde de
TODO-42 pe `main`.

#### Ce ai de făcut

1. **Migrație** `maintenance_reports`: `id`, `dorm_id`, `dorm_room_id null` (null pentru spațiile comune), `user_id`, `category text check (category in ('plumbing', 'electrical', 'heating', 'furniture', 'internet', 'laundry', 'cleaning', 'other'))`, `description text check (char_length(description) between 10 and 1000)`, `location text null check (char_length(location) <= 200)` (de ex. „baia de la etajul 2”), `photo_path text null`, `status text check (status in ('sent', 'in_progress', 'resolved')) default 'sent'`, `created_at`, `status_changed_at`, `resolved_at null`.
2. **Bucket privat** `maintenance-photos`, cu calea `{dorm_id}/{report_id}.jpg`, maxim 5 MB, doar `image/jpeg`, `image/png`, `image/webp`. RLS pe `storage.objects`: urcă doar autorul raportului, citesc autorul și `dorm_admin`. Curățarea EXIF se face în browser, în TODO-53 (CLAUDE.md §5).
3. **Funcții SQL:**
   - `create_maintenance_report(p_category, p_description, p_location, p_in_my_room)`: căminul și camera se iau din apartenența activă, nu din parametri; cel mult 5 rapoarte de om pe zi;
   - `attach_report_photo(p_report_id, p_path)`: doar autorul, doar dacă fișierul există în bucket;
   - `set_report_status(p_report_id, p_status)`: doar `dorm_admin`-ul căminului; tranzițiile permise sunt `sent → in_progress → resolved` și `sent → resolved`.
4. **Cine vede ce:** autorul își vede rapoartele, `dorm_admin` le vede pe toate din căminul lui. Ceilalți locatari nu le văd în MVP, pentru că un raport poate conține detalii despre o cameră anume.
5. **`features/dorm/queries/reports.ts`**: `createReport` (raport, apoi upload, apoi `attach_report_photo`, toate într-o funcție), `getMyReports`, `getDormReports` (pentru `dorm_admin`), `setReportStatus`.
6. **Teste** pgTAP `supabase/tests/maintenance_reports.test.sql`: un străin nu vede rapoartele; un student nu schimbă statusul; tranziția `resolved → sent` e refuzată; limita de 5 pe zi; politicile bucket-ului.

#### Gata când
- [ ] Ca utilizator demo, un raport cu poză apare în `getMyReports()` cu statusul `sent`; ca `dorm_admin`, îl treci pe `in_progress`, iar autorul vede schimbarea.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-53.

### TODO-47 `[ ]` Emailul automat către administratorul căminului

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be7-report-email` · **Backlog:** #44

#### De ce
MVP: „Email pentru administrator generat automat din raport”. Administratorul nu trebuie să instaleze aplicația ca să afle de o problemă: primește un email clar, cu tot ce îi trebuie.

#### Depinde de
TODO-46 pe `main`. Local merge fără Resend (emailul se scrie în consolă). Pentru emailuri reale: contul Resend și răspunsul la OQ-3.

#### Ce ai de făcut

1. **Migrație** `dorm_admin_contacts`: `dorm_id`, `email`, `name null`. **Fără nicio politică pentru clienți**: o citește doar Edge Function-ul, cu `service_role`. Adresa e configurare, nu se introduce din aplicație (CLAUDE.md §3.9). În `seed.sql`, o adresă de test.
2. **`supabase/functions/_shared/email.ts`**: `sendEmail({ to, subject, html, text })` prin Resend; fără `RESEND_API_KEY`, scrie emailul în consolă și întoarce „trimis”. TODO-57 îl refolosește.
3. **`supabase/functions/maintenance-report-email/`**: pornit de un Database Webhook la insert în `maintenance_reports` (sau la `attach_report_photo`, ca să prindă și poza; alege și scrie de ce în PR):
   - subiect: „[UBB Campus] Raport nou: Instalații sanitare, camera 214, Căminul X”;
   - corp, în română, HTML și text simplu: categoria, descrierea, locul, camera, data și ora (ora României), numele afișat al autorului și un link semnat spre poză, valabil 7 zile. **Fără emailul studentului**, până se decide altfel la OQ-3;
   - coloanele `emailed_at` și `email_error` în `maintenance_reports` (în migrația ta), ca să se vadă ce nu a plecat.
4. **Fără spam:** dacă în ultimele 2 ore a plecat deja un email pentru aceeași categorie și aceeași cameră (sau același loc comun), nu trimite altul; scrie motivul în `email_error`. Pragul e constantă, cu comentariu.
5. **Teste** Deno pentru funcțiile pure: textul emailului (cu și fără poză, cameră sau spațiu comun) și regula anti-spam.
6. Actualizează §3.9 din `CLAUDE.md`.

#### Gata când
- [ ] Local, un raport nou face ca emailul să apară în consola funcției (sau în Mailpit), cu toate câmpurile și linkul spre poză.
- [ ] Al doilea raport identic în 2 ore nu mai trimite email și are motivul în `email_error`.
- [ ] Testele Deno și `supabase test db` trec. PR revizuit de cine are TODO-46.

### TODO-48 `[ ]` Anunțurile pe etaj sau cămin: tabelul și regulile

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be8-announcements` · **Backlog:** #45

#### De ce
Din documentul inițial: „Anunțuri pe etaj sau cămin (zgomot, întreruperi de apă)”. Azi asta se pierde pe grupurile de WhatsApp. Le facem în aplicație, dar gândite de la început ca să poată fi sincronizate mai târziu cu WhatsApp (TODO-58).

#### Depinde de
TODO-42 pe `main`. Prioritate mai mică decât MVP-ul.

#### Ce ai de făcut

1. **Migrație** `announcements`: `id`, `dorm_id`, `floor int null` (null = tot căminul), `author_id`, `category text check (category in ('noise', 'water', 'electricity', 'heating', 'event', 'lost_found', 'other'))`, `title text check (char_length(title) between 3 and 100)`, `body text check (char_length(body) <= 1000)`, `is_official boolean default false`, `expires_at` (implicit 7 zile, maxim 30), `created_at`, `deleted_at null`. Plus, pentru TODO-58: `source text check (source in ('app', 'whatsapp')) default 'app'` și `external_id text null unique`. Scrie în comentariu de ce există.
2. **Cine postează:** orice membru, pe etajul lui sau pe tot căminul; doar `dorm_admin` poate pune `is_official = true` („Anunț oficial”). Cel mult 3 anunțuri de om pe zi.
3. **Funcții SQL:** `post_announcement(...)`, `delete_announcement(p_id)` (autorul sau `dorm_admin`, ștergere logică), `dorm_announcements(p_floor_only boolean)`: anunțurile neexpirate din căminul tău, cele oficiale primele, apoi cele mai noi. Autorul apare doar cu `display_name`.
4. **RLS:** citesc doar membrii căminului; nicio scriere directă.
5. **`features/dorm/queries/announcements.ts`** și câteva anunțuri demo în `seed.sql`.
6. **Teste** pgTAP `supabase/tests/announcements.test.sql`: un străin nu le vede, un student nu poate pune `is_official`, cele expirate și șterse nu apar, limita de 3 pe zi.

#### Gata când
- [ ] Ca utilizator demo vezi anunțurile demo ale căminului, iar unul nou pe etajul tău apare primul după cele oficiale.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-54.

### TODO-49 `[ ]` Cheltuielile pe cameră: tabelele și balanțele

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be9-expenses` · **Backlog:** #46

#### De ce
Din descrierea modulului: „gestionarea cheltuielilor pe cameră”. Colegii de cameră împart detergentul, hârtia igienică sau un frigider și vor să știe cine cui datorează. **Aplicația doar notează; banii nu trec prin ea**, la fel ca la plata în bani din Modulul B (CLAUDE.md §3.5).

#### Depinde de
TODO-42 pe `main`. Prioritate mai mică decât MVP-ul.

#### Ce ai de făcut

1. **Migrație** `expenses`: `id`, `dorm_room_id`, `paid_by`, `amount_cents int check (amount_cents > 0)`, `description text check (char_length(description) between 2 and 120)`, `spent_on date`, `created_by`, `created_at`, `deleted_at null`. Și `expense_splits`: `expense_id`, `user_id`, `share_cents int`, cu suma părților egală cu `amount_cents` (verificată în funcție). Plus `settlements`: `id`, `dorm_room_id`, `from_user`, `to_user`, `amount_cents`, `created_at` („i-am dat banii”). Toate în lei, în bani (cenți), ca să nu existe erori de rotunjire.
2. **Funcții SQL:** `add_expense(p_amount_cents, p_description, p_spent_on, p_paid_by, p_split_between uuid[])` (împărțire egală; restul de câțiva bani merge la cel care a plătit), `delete_expense(p_id)` (doar cine a creat-o, în 48 de ore), `record_settlement(...)`, `room_balances()`: cât are de dat sau de primit fiecare coleg. **Balanța se calculează, nu se stochează.**
3. **Când pleacă cineva din cameră** (`leave_dorm_room()`), cheltuielile lui rămân, iar balanța lui se vede în continuare de colegi; scrie asta în comentariu.
4. **RLS:** doar colegii activi de cameră citesc; nicio scriere directă.
5. **`features/dorm/queries/expenses.ts`** și câteva cheltuieli demo în `seed.sql`.
6. **Teste** pgTAP `supabase/tests/expenses.test.sql`: cineva din altă cameră nu vede nimic, împărțirea la 3 a 10 lei dă 334 + 333 + 333 de bani, balanțele au suma 0, o plată de decontare le aduce la 0.

#### Gata când
- [ ] Cu 3 colegi demo, o cheltuială de 30 de lei plătită de unul arată `+20 lei` la el și `-10 lei` la ceilalți doi.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-55.

### TODO-50 `[ ]` Împrumutul de obiecte între vecini: cererile și răspunsurile

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-be10-loans` · **Backlog:** #47

#### De ce
Din descrierea modulului: „împrumutul de obiecte între vecini”. Un fier de călcat, un uscător de rufe sau o tigaie se găsesc mereu la cineva pe etaj, doar că nu știi la cine.

#### Depinde de
TODO-42 pe `main`. Prioritate mai mică decât MVP-ul.

#### Ce ai de făcut

1. **Migrație** `loan_requests`: `id`, `dorm_id`, `floor int null`, `requester_id`, `item text check (char_length(item) between 2 and 80)`, `note text null check (char_length(note) <= 300)`, `needed_until timestamptz null`, `status text check (status in ('open', 'accepted', 'returned', 'cancelled', 'expired')) default 'open'`, `lender_id null`, `created_at`, `accepted_at`, `returned_at`. O cerere deschisă expiră după 3 zile.
2. **Funcții SQL:** `ask_to_borrow(...)`, `offer_to_lend(p_request_id)` (primul care se oferă o acceptă; nu poți să-ți împrumuți ție), `mark_returned(p_request_id)` (confirmă proprietarul obiectului, adică `lender_id`), `cancel_loan_request(p_request_id)`, `dorm_loan_board()`: cererile deschise din cămin, cele de pe etajul tău primele.
3. **Ce vede fiecare:** cererile deschise le vede tot căminul, cu `display_name`; o cerere acceptată o văd doar cei doi. Pentru predare, cei doi văd numărul camerei celuilalt, nimic altceva.
4. Cel mult 3 cereri deschise de om.
5. **`features/dorm/queries/loans.ts`** și câteva cereri demo în `seed.sql`.
6. **Teste** pgTAP `supabase/tests/loan_requests.test.sql`: un străin nu vede cererile, doi oameni care se oferă în același timp (unul câștigă), doar `lender_id` poate marca returnarea, cererile expirate nu apar.

#### Gata când
- [ ] Ca doi utilizatori demo: unul cere un fier de călcat, celălalt se oferă, primul vede camera celui care împrumută, iar al doilea marchează returnarea.
- [ ] `supabase test db` și `pnpm typecheck` trec. PR revizuit de cine are TODO-56.

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

### TODO-13 `[DONE]` Butonul de check-in pe pagina sălii

**Asignat:** Tudor · **Val:** 2 · **Branch:** `feat/srf-fe5-checkin-button`

Gata în [PR #16](https://github.com/BirisBogdan/ProiectColectiv/pull/16): butonul „Sunt aici” / „Am plecat” pe pagina sălii, cu check-in-ul ținut în `localStorage`.

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

### TODO-14 `[DONE]` Semnalul „persoane aici” și lista care se actualizează singură

**Asignat:** Bogdan Buruian · **Val:** 2 · **Branch:** `feat/srf-fe6-live-signal`

Gata: `CheckinSignal` în listă și pe pagina sălii, plus lista reîmprospătată la 60 de secunde, în PR #10 și PR #14.

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

### TODO-15 `[DONE]` Pagina `/rooms/plan`: planul clădirii

**Asignat:** Bogdan · **Val:** 2 · **Branch:** `feat/srf-fe7-plan-page`

Gata: `/rooms/plan` arată sălile pe etaje (`FloorPlan`), cu clădirea în URL, reîmprospătare la 60 de secunde și linkul „Plan” în header; fiind un segment static, nu mai cade în `/rooms/[id]` („Sala nu există”). PR: _(de completat linkul)_

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

### TODO-16 `[DONE]` Filtrul „liberă cel puțin” în UI și QA pentru etapa a 2-a

**Asignat:** Bogdan · **Val:** 2, ultimul pe `main` pentru rularea QA · **Branch:** `feat/srf-fe8-free-for-filter`

Gata: selectul „Liberă cel puțin” scrie `minFreeHours` în URL, iar `docs/qa/studyroom-onboarding.md` are secțiunile etapei a 2-a, rulate o dată (rezultatele sunt în tabelul de la final). PR: _(de completat linkul)_

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

### TODO-21 `[DONE]` Pagina `/rooms/[id]/week`: orarul pe săptămână

**Asignat:** Raul · **Branch:** `feat/srf-fe9-room-week`

Gata: `RoomWeek` și pagina `/rooms/[id]/week`, cu linkul „Vezi toată săptămâna” din pagina sălii. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/23

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

### TODO-22 `[DONE]` Bazele traducerilor RO / EN

**Asignat:** Tudor · **Branch:** `feat/srf-fe10-i18n`

Gata în [PR #17](https://github.com/BirisBogdan/ProiectColectiv/pull/17): `lib/i18n` cu mesaje RO/EN tipate, `LanguageSwitcher` pe pagina de start și traducerea pentru `StatusBadge`, pagina de start și `not-found`. Restul textelor e în TODO-25.

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

### TODO-23 `[DONE]` Aplicație instalabilă: manifest, iconițe și pagină offline

**Asignat:** Buruian Bogdan · **Branch:** `feat/srf-fe11-pwa`

Manifest, iconițe, pagina offline și service worker-ul (fără cache pentru /api/*, înregistrat doar în producție) sunt făcute, cu teste. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/21

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

### TODO-24 `[DONE]` Teste end-to-end cu Playwright

**Asignat:** Tudor · **Branch:** `feat/srf-fe12-playwright`

Gata: `pnpm test:e2e` rulează cu Playwright parcursurile din `docs/qa/studyroom-onboarding.md` (desktop și telefon) pe build-ul de producție, iar jobul `e2e` din CI le rulează la fiecare PR. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/25

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

### TODO-25 `[DONE]` Restul textelor pe `lib/i18n`

**Asignat:** Raul · **Branch:** `feat/srf-fe13-i18n-rest`

Gata: textele din header, `/rooms`, `/rooms/[id]`, `/rooms/plan` și componentele sălilor vin din `useMessages()`; `LanguageSwitcher` e în header. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/23

#### De ce
TODO-22 a construit mecanismul de traduceri și l-a folosit doar în `StatusBadge`, pe pagina de start și pe `not-found.tsx`, ca să nu intre în conflict cu etapa a 2-a. Până se mută și restul, în engleză aplicația e jumătate în română. A apărut ca item nou din TODO-22, pasul 6.

#### Depinde de
TODO-22 pe `main`. Ca să nu existe conflicte, pornește după ce itemii care ating aceleași fișiere sunt pe `main`: TODO-13, TODO-15, TODO-16 și TODO-21.

#### Ce ai de făcut

1. Mută pe `useMessages()` textele din (relativ la `apps/web/`):
   - `app/(app)/layout.tsx` (header, linkul „Săli”, linkul „Plan” după TODO-15);
   - `app/(app)/rooms/page.tsx`, `app/(app)/rooms/[id]/page.tsx`;
   - `features/rooms/components/`: `RoomCard`, `RoomList`, `RoomFilters`, `RoomHeader`, `RoomSchedule`, `CheckinSignal` (inclusiv `checkinLabel`), `CheckinButton` (din TODO-13), `FloorPlan` (din TODO-15) și `RoomWeek` (din TODO-21), dacă există deja;
   - `metadata` din `app/layout.tsx` rămâne în română: e randat pe server, unde limba e mereu `ro`.
2. Pune `LanguageSwitcher` și în header-ul din `app/(app)/layout.tsx`, ca limba să se poată schimba de pe orice pagină.
3. Textele românești rămân identice, ca testele existente să treacă neschimbate. Pentru funcțiile pure cu text (de ex. `checkinLabel`), primește mesajele ca parametru sau păstrează varianta română și adaugă una în engleză în `messages.ts`.
4. Teste: în `tests/unit/i18n.test.ts`, verificarea că ambele limbi au aceleași chei acoperă automat cheile noi; adaugă cazuri pentru mesajele cu valori noi.

#### Gata când
- [ ] Cu „EN” ales, `/rooms`, `/rooms/{id}` și header-ul sunt în engleză; în română arată exact ca înainte.
- [ ] Niciun text vizibil scris direct în componentele de mai sus (`grep` după diacritice în `app/` și `features/` găsește doar comentarii și `metadata`).
- [ ] În consolă nu apar erori de hidratare. Lint, typecheck, teste verzi; PR revizuit de un coleg din cealaltă jumătate.

### TODO-35 `[ ]` Check-in-uri live pentru toată lumea

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/srf-fe14-live-checkins` · **Backlog:** #20, #22

#### De ce
Azi lista se reîncarcă o dată pe minut (TODO-14), iar check-in-ul „meu” e ținut în `localStorage`. Cu check-in-urile în baza de date, numărul de oameni dintr-o sală se poate schimba pe ecran în aceeași secundă pentru toți, fără să bombardăm serverul.

#### Depinde de
TODO-34. Până e gata, lucrezi pe un mock al canalului Realtime.

#### Ce ai de făcut

1. **`features/rooms/hooks/useLiveCheckins.ts`**: se abonează prin Supabase Realtime la schimbările din `room_checkins` și actualizează `activeCheckins` din lista deja încărcată. Canalul transmite doar `room_id`, niciodată `user_id`; dacă RLS din TODO-33 nu permite asta, folosește un canal de broadcast trimis de funcțiile SQL și spune în PR.
2. **`RoomList.tsx`**, **`RoomHeader.tsx`**, **`CheckinSignal.tsx`**: folosesc hook-ul. Reîncărcarea de 60 de secunde rămâne ca rezervă (pentru stare și când Realtime nu e conectat), cu un comentariu.
3. **`CheckinButton.tsx`**: după login (backlog #08), check-in-ul „meu” vine de la server; până atunci, `localStorage` rămâne, cu comentariul actualizat.
4. Fără erori de hidratare și fără abonamente rămase deschise la schimbarea paginii (cleanup în `useEffect`).
5. **Teste** Vitest cu un canal fals: un eveniment crește numărul pe cardul potrivit și pe niciun altul; dezabonarea la unmount.

#### Gata când
- [ ] Două browsere deschise pe `/rooms`: check-in-ul din primul apare în al doilea în cel mult 2 secunde, fără refresh (video sau GIF în PR).
- [ ] Cu Realtime oprit, lista se actualizează în continuare la un minut.
- [ ] Lint, typecheck, teste verzi. PR revizuit de cine a făcut TODO-34.

### TODO-37 `[DONE]` „Raportează o problemă” pe pagina sălii

**Asignat:** Tudor · **Branch:** `feat/srf-fe15-report-problem` · **Backlog:** #23 (extins)

Gata: `ReportProblem` și `ReportSignal` pe pagina sălii, pe card și în header, în română și engleză. Butonul apare abia când API-ul trimite `recentReports`, adică după TODO-36; verificarea cap-coadă (raport real pe `/rooms/c-510`, apoi pe card) se face în PR-ul lui TODO-36. PR: https://github.com/BirisBogdan/ProiectColectiv/pull/26

#### De ce
Raportul trebuie să coste un student două atingeri, altfel nu-l face nimeni. Iar ceilalți trebuie să-l vadă înainte să meargă până la sală.

#### Depinde de
TODO-36 pentru endpoint. Până atunci, lucrezi pe un mock.

#### Ce ai de făcut

1. **`ReportProblem.tsx`**: un buton „Raportează o problemă” pe `/rooms/[id]`, care deschide o listă cu tipurile din TODO-36 (Sala e ocupată, Proiectorul nu merge, Nu sunt prize, Orarul e greșit, Altceva) și o notă opțională. După trimitere, un mesaj de mulțumire; la 429, „Ai raportat deja asta”.
2. **`ReportSignal.tsx`**: pe card și în header-ul sălii, lângă `CheckinSignal`, de ex. „Proiector raportat defect (2)” sau „Raportată ocupată acum 15 min”. Nu schimbă `StatusBadge`: „liberă după orar” și „raportată ocupată” se văd împreună.
3. Toate textele noi prin `lib/i18n`, în română și engleză.
4. Accesibil de pe telefon: butoane de cel puțin 44px, focus vizibil, lista se închide cu `Esc`.
5. **Teste** Vitest: trimiterea fiecărui tip, nota peste 500 de caractere, mesajul la 429, semnalul pe card.
6. Adaugă parcursul în `docs/qa/studyroom-onboarding.md`.

#### Gata când
- [ ] Un raport făcut pe `/rooms/c-510` apare pe cardul sălii din `/rooms` (screenshot în PR, în ambele limbi).
- [ ] `StatusBadge` nu se schimbă după un raport.
- [ ] Lint, typecheck, teste verzi. PR revizuit de cine a făcut TODO-36.


### TODO-51 `[ ]` Pagina de login și pagina `/dorm` cu „Intră cu un cod”

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe1-login-and-join` · **Backlog:** #08, #41

#### De ce
E ușa de intrare în modul: te loghezi cu emailul de student, introduci codul primit de la administrator sau de la un coleg și ajungi în camera ta.

#### Depinde de
TODO-41 (login) și TODO-43 (coduri). Până intră, lucrezi pe mock-uri cu aceeași semnătură ca `features/dorm/queries/`.

#### Ce ai de făcut

1. **`app/(auth)/login/page.tsx`**: un câmp de email, cu verificarea `@stud.ubbcluj.ro` în formular (mesaj: „Folosește adresa de student, …@stud.ubbcluj.ro”), apoi câmpul pentru codul de 6 cifre. Linkul din email merge și el, prin **`app/(auth)/auth/callback/route.ts`**. După login te duce la `next` din URL (doar căi interne, care încep cu `/`), altfel la `/dorm`. Scoate verificarea emailului într-o funcție pură, `isStudentEmail(email)`.
2. **`app/(app)/layout.tsx`** (excepția planificată): linkul „Cămin” spre `/dorm`, plus „Intră în cont” sau „Ieși din cont”.
3. **`app/(app)/dorm/page.tsx`**:
   - **fără cameră:** `JoinWithCode.tsx`, cu un câmp care acceptă codul cu litere mici sau cu spații și îl normalizează. Fiecare eroare din TODO-43 are mesajul ei: „Codul nu există”, „Codul a expirat, cere unul nou”, „Camera e plină” etc.;
   - **cu cameră:** `DormHome.tsx`, cu numele căminului, camera, colegii (doar numele afișate) și câte un card spre Spălătorie, Raportări, Anunțuri, Cheltuieli și Împrumuturi (cardurile apar pe măsură ce intră paginile lor);
   - **`InviteButton.tsx`**: „Invită un coleg” creează un cod, îl arată mare, cu butonul „Copiază” și data expirării;
   - „Părăsește camera”, cu o confirmare în pagină (nu `window.confirm`), care spune că rezervările viitoare se anulează.
4. Textele în `lib/i18n/messages.ts`, sub `dorm.home` și `auth`.
5. **Teste** Vitest: `isStudentEmail` (literele mari, domeniile false din TODO-41), normalizarea codului, mesajul pentru fiecare eroare, `next` extern ignorat.

#### Gata când
- [ ] Cu Supabase local: login cu codul din Mailpit, apoi `DEMO2026` te duce în camera demo; refresh-ul păstrează sesiunea.
- [ ] Un cod greșit și unul expirat arată mesajele corecte. Fără scroll orizontal la 375px; screenshot-uri în PR.
- [ ] Niciun mock rămas. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-43.

### TODO-52 `[ ]` Spălătoria: grila de sloturi, rezervarea și starea mașinilor

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe2-laundry` · **Backlog:** #42

#### De ce
E ecranul pe care studenții îl vor deschide cel mai des: „când e liberă o mașină azi?”, din două atingeri.

#### Depinde de
TODO-44 (rezervări) și TODO-45 (starea mașinilor). Până intră, lucrezi pe mock-uri.

#### Ce ai de făcut

1. **`app/(app)/dorm/laundry/page.tsx`**: în partea de sus, „Rezervările mele” (`MyBookings.tsx`), cu ora, mașina, butonul „Anulează” și, pentru cele anulate de administrator, motivul („Mașina a fost scoasă din uz”). Sub ele, alegerea zilei (azi și următoarele 6), salvată în URL (`?day=2026-11-25`).
2. **`LaundryDayGrid.tsx`**: pentru ziua aleasă, sloturile fiecărei mașini. Pe telefon, o mașină pe rând (alegi mașina dintr-o listă de butoane), cu sloturile una sub alta; pe ecran lat, mașinile în coloane. Fiecare slot se înțelege din text, nu doar din culoare: „Liber”, „Ocupat”, „Rezervarea ta”, „Trecut”.
3. **Rezervarea:** atingi un slot liber → confirmarea în pagină („Mașina 1, azi 18:00–19:30”) → „Rezervă”. Pe `slot_taken`: „Cineva tocmai a rezervat slotul” și grila se reîncarcă. Pe `too_many_bookings`: „Ai deja 2 rezervări viitoare”.
4. **`MachineStatus.tsx`**: lângă fiecare mașină, „Defectă” (din `out_of_order`, fără sloturi rezervabile) sau „Posibil defectă” (avertismentul din TODO-45), plus butonul „Semnalează o problemă” (alegi ce nu merge și, opțional, o notă). Pentru `dorm_admin`: „Scoate din uz” și „Repune în funcțiune”, cu o confirmare care spune câte rezervări se anulează.
5. Grila se reîncarcă la 60 de secunde și când revii în tab, fără să clipească (ca în `RoomList.tsx`).
6. Textele în `lib/i18n/messages.ts`, sub `dorm.laundry`.
7. **Teste** Vitest pe funcțiile pure: eticheta slotului, mesajul pentru fiecare eroare, formatarea orei în ora României (inclusiv ziua cu schimbarea orei).

#### Gata când
- [ ] Ca doi utilizatori demo în două browsere: unul rezervă, celălalt vede slotul „Ocupat” după reîncărcare, iar dacă apasă pe el în același timp primește mesajul corect.
- [ ] Ca `dorm_admin`, „Scoate din uz” face mașina „Defectă”, iar rezervarea celuilalt apare anulată, cu motivul.
- [ ] Fără scroll orizontal la 375px; screenshot-uri în PR. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-44.

### TODO-53 `[ ]` Formularul de raportare și „Rapoartele mele”

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe3-reports` · **Backlog:** #43

#### De ce
Raportul trebuie să se poată face în 30 de secunde, de pe telefon, cu o poză făcută pe loc. Iar studentul trebuie să vadă după aceea dacă problema e „în lucru” sau „rezolvată”.

#### Depinde de
TODO-46. Până intră, lucrezi pe un mock.

#### Ce ai de făcut

1. **`app/(app)/dorm/reports/new/page.tsx`** cu **`ReportForm.tsx`**: categoria (butoane mari, cu text: „Instalații sanitare”, „Electricitate”, „Căldură”, „Mobilier”, „Internet”, „Spălătorie”, „Curățenie”, „Altceva”), „În camera mea” sau „Spațiu comun” (cu câmpul de loc), descrierea și o poză opțională (`<input type="file" accept="image/*" capture="environment">`).
2. **`features/dorm/lib/resize-image.ts`**: înainte de upload, poza se micșorează la maxim 1600 px și se recodează ca JPEG printr-un `canvas`. Asta scoate și datele EXIF, inclusiv locația GPS (CLAUDE.md §5). Scrie regula într-un comentariu.
3. **`app/(app)/dorm/reports/page.tsx`** cu **`ReportList.tsx`** și **`ReportStatusBadge.tsx`**: rapoartele tale, cele mai noi primele, cu „Trimis”, „În lucru” sau „Rezolvat” scris, nu doar colorat, și data ultimei schimbări.
4. **Pentru `dorm_admin`:** pe aceeași pagină, „Toate rapoartele căminului”, cu filtru pe status și butoanele pentru tranzițiile permise („Începe lucrul”, „Marchează rezolvat”).
5. După trimitere: „Raportul a fost trimis administratorului” și lista ta. Dacă poza nu a urcat, raportul rămâne trimis și apare „Poza nu a putut fi atașată”, cu „Reîncearcă”.
6. Textele în `lib/i18n/messages.ts`, sub `dorm.reports`.
7. **Teste** Vitest: validarea formularului (descrierea de minim 10 caractere), eticheta fiecărui status, tranzițiile arătate pentru fiecare status.

#### Gata când
- [ ] De pe un telefon real (sau DevTools), un raport cu poză ajunge în lista ta ca „Trimis”, iar poza din bucket nu mai are EXIF (verifică cu `exiftool` și pune rezultatul în PR).
- [ ] Ca `dorm_admin`, „Marchează rezolvat” schimbă statusul și la autor. Screenshot-uri în PR, la 375px.
- [ ] Niciun mock rămas. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-46.

### TODO-54 `[ ]` Anunțurile: lista, formularul și „Trimite pe WhatsApp”

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe4-announcements` · **Backlog:** #45

#### De ce
Partea vizibilă a lui TODO-48. Butonul „Trimite pe WhatsApp” e primul pas spre WhatsApp: azi toată lumea e pe grupul căminului, așa că un anunț scris în aplicație trebuie să ajungă ușor și acolo, fără nicio integrare cu WhatsApp.

#### Depinde de
TODO-48. Până intră, lucrezi pe un mock. Prioritate mai mică decât MVP-ul.

#### Ce ai de făcut

1. **`app/(app)/dorm/announcements/page.tsx`** cu **`AnnouncementList.tsx`**: filtrul „Etajul meu” / „Tot căminul”, anunțurile oficiale primele cu eticheta „Oficial”, apoi celelalte, cu categoria, titlul, textul, autorul și „acum 2 ore”. Autorul și `dorm_admin` văd „Șterge”.
2. **`AnnouncementForm.tsx`**: categoria, etajul sau tot căminul, titlul, textul, cât rămâne vizibil (1, 3, 7 zile); `dorm_admin` are și bifa „Anunț oficial”.
3. **`ShareOnWhatsApp.tsx`**: pe fiecare anunț, un link `https://wa.me/?text=...` cu titlul, textul și numele căminului, codat corect (`encodeURIComponent`). Pe telefon deschide WhatsApp, pe desktop WhatsApp Web. Nu trimite nimic de la noi și nu are nevoie de niciun cont.
4. Un card „Anunțuri” în `DormHome.tsx` (excepția planificată), cu numărul de anunțuri noi de azi.
5. Textele în `lib/i18n/messages.ts`, sub `dorm.announcements`.
6. **Teste** Vitest: textul trimis pe WhatsApp (diacritice, `&`, linii noi), ordinea oficial → nou, „acum N ore”.

#### Gata când
- [ ] Un anunț nou apare în listă, iar „Trimite pe WhatsApp” deschide WhatsApp cu textul complet, cu diacritice.
- [ ] Un anunț expirat nu mai apare. Screenshot-uri în PR, la 375px.
- [ ] Niciun mock rămas. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-48.

### TODO-55 `[ ]` Cheltuielile pe cameră: adăugare și „cine cui datorează”

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe5-expenses` · **Backlog:** #46

#### De ce
Partea vizibilă a lui TODO-49: la final de lună, fiecare vede dintr-o privire cât are de dat și cui.

#### Depinde de
TODO-49. Până intră, lucrezi pe un mock. Prioritate mai mică decât MVP-ul.

#### Ce ai de făcut

1. **`app/(app)/dorm/expenses/page.tsx`**: sus, **`BalanceSummary.tsx`**: „Ai de primit 20 lei” sau „Ai de dat 10 lei lui Ion”, cu butonul „I-am dat banii” (decontare), apoi lista cheltuielilor, cele mai noi primele.
2. **`ExpenseForm.tsx`**: suma în lei (acceptă `12,50` și `12.50`), descrierea, data, cine a plătit și între cine se împarte (implicit toți colegii de cameră).
3. Textul de sub titlu: „Aplicația doar notează cheltuielile. Banii îi dați între voi.”
4. Un card „Cheltuieli” în `DormHome.tsx`, cu balanța ta.
5. Textele în `lib/i18n/messages.ts`, sub `dorm.expenses`.
6. **Teste** Vitest: parsarea sumei (`12,50`, `12.5`, `abc`, `0`), formatarea în lei, textul balanței (de primit, de dat, la zi).

#### Gata când
- [ ] Cu 3 colegi demo, o cheltuială adăugată de unul apare la toți, cu balanțele corecte; o decontare le aduce la zero.
- [ ] Screenshot-uri în PR, la 375px. Niciun mock rămas. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-49.

### TODO-56 `[ ]` Împrumuturile între vecini: cereri și oferte

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe6-loans` · **Backlog:** #47

#### De ce
Partea vizibilă a lui TODO-50: „Are cineva un fier de călcat?” pus o dată în aplicație, nu pe trei grupuri.

#### Depinde de
TODO-50. Până intră, lucrezi pe un mock. Prioritate mai mică decât MVP-ul.

#### Ce ai de făcut

1. **`app/(app)/dorm/loans/page.tsx`** cu **`LoanBoard.tsx`**: cererile deschise din cămin, cele de pe etajul tău primele, fiecare cu butonul „Îl am eu”. Sub ele, „Cererile mele” și „Ce am împrumutat altora”, cu statusul scris.
2. **`LoanRequestForm.tsx`**: obiectul, o notă și până când îți trebuie.
3. După ce cineva se oferă, cei doi văd camera celuilalt („Ion, camera 214”); cel care a dat obiectul are butonul „Mi l-a dat înapoi”.
4. Un card „Împrumuturi” în `DormHome.tsx`, cu numărul de cereri deschise pe etajul tău.
5. Textele în `lib/i18n/messages.ts`, sub `dorm.loans`.
6. **Teste** Vitest: eticheta fiecărui status și ce butoane apar pentru cel care cere și pentru cel care dă.

#### Gata când
- [ ] Cu doi utilizatori demo: cererea apare la celălalt, „Îl am eu” o acceptă, iar „Mi l-a dat înapoi” o închide.
- [ ] Screenshot-uri în PR, la 375px. Niciun mock rămas. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-50.

### TODO-57 `[ ]` Reminderul înainte de spălătorie și QA pentru etapa a 5-a

**Asignat:** _(liber, scrie-ți numele aici)_ · **Branch:** `feat/dorm-fe7-reminders-qa` · **Backlog:** #42

#### De ce
Reminderul e ultimul punct din „Programare la spălătorie” din MVP: un slot uitat e un slot pierdut pentru toată lumea. Și, ca la TODO-08 și TODO-16, cineva verifică la final că tot modulul merge cap-coadă.

#### Depinde de
TODO-44 și TODO-47 (`_shared/email.ts`). Rularea QA are nevoie de toți itemii de MVP pe `main`.

#### Ce ai de făcut

1. **Migrație**: coloanele `remind boolean default true` și `reminder_sent_at null` în `laundry_bookings`.
2. **`supabase/functions/laundry-reminders/`**: pornită la 5 minute (`pg_cron` + `pg_net`, sau programarea din Supabase), trimite un email („Ai mașina 1 la 18:00, peste 30 de minute”) pentru rezervările active cu `remind = true`, care încep în următoarele 30 de minute și nu au `reminder_sent_at`. Pune `reminder_sent_at` în aceeași tranzacție, ca un reminder să nu plece de două ori.
3. **În `MyBookings.tsx`** (de la TODO-52): bifa „Trimite-mi un email cu 30 de minute înainte” pe fiecare rezervare și butonul „Adaugă în calendar”, care descarcă un fișier `.ics` făcut în browser (**`features/dorm/lib/ics.ts`**, fără bibliotecă nouă), cu alarmă cu 30 de minute înainte.
4. **`docs/qa/dorm-manager.md`**: checklist manual, cu rezultatele așteptate: login (email bun, email greșit, link din email), cod de invitație (bun, greșit, expirat, cameră plină), plecarea din cameră, spălătoria (rezervare, conflict, limită, anulare, mașină defectă), reminderul, raportul cu poză și schimbarea statusului, emailul către administrator, anunțurile și WhatsApp, cheltuielile, împrumuturile, 375px și un telefon real.
5. După ce toți itemii de MVP sunt pe `main`, rulezi checklist-ul o dată. Ce e stricat devine item în `TODO.md` sau problemă pe GitHub, nu doar mesaj pe grup.
6. **Teste** Vitest pentru `ics.ts` (ora în UTC corectă și pentru ziua cu schimbarea orei, caracterele speciale) și Deno pentru selecția rezervărilor din funcție.

#### Gata când
- [ ] Local, o rezervare peste 25 de minute primește un singur email, iar una cu bifa scoasă niciunul.
- [ ] Fișierul `.ics` se deschide corect în Google Calendar și în calendarul de pe telefon, la ora corectă.
- [ ] Checklist-ul e în repo și rulat o dată, cu rezultatele în PR sau într-un issue. Lint, typecheck, teste verzi; PR revizuit de cine are TODO-44.

---

## Extra `[POSTPONED]`

Extra-uri din lista de funcționalități, scrise ca itemi ca să nu le pierdem. **Nu le începeți** până nu validăm MVP-ul cu studenți reali (CLAUDE.md: „Extras are `[POSTPONED]` until the MVP is validated”). Toate au nevoie de login (backlog #08), pentru că sunt ale unui om anume. Când pornesc, se scriu în detaliu ca ceilalți itemi și se împart în backend și frontend, dacă e nevoie.

### TODO-38 `[POSTPONED]` Sălile favorite

**Asignat:** _(amânat)_ · **Backlog:** #27

#### De ce
Majoritatea studenților învață în aceleași 2-3 săli. O stea pe sală și un filtru „Favorite” le scurtează căutarea la o privire.

#### Depinde de
Validarea MVP-ului, login-ul (backlog #08) și TODO-31.

#### Ce ai de făcut
1. Tabel `room_favourites` (`user_id`, `room_id`, primary key pe ambele), cu RLS: fiecare vede și modifică doar rândurile lui; test pgTAP; adăugat în funcția de ștergere a contului (backlog #50).
2. `FavouriteButton.tsx` pe card și pe pagina sălii; filtrul `favourites=1` în `/api/rooms` și în `RoomFilters`.
3. Opțional, „sala preferată” afișată pe pagina de start.

#### Gata când
- [ ] Favoritele rămân după logout și login pe alt dispozitiv; nimeni nu vede favoritele altcuiva (test pgTAP).

### TODO-39 `[POSTPONED]` Alerta „sala se eliberează în 10 minute”

**Asignat:** _(amânat)_ · **Backlog:** #24

#### De ce
Când toate sălile bune sunt ocupate, studentul vrea să afle când se eliberează una, fără să tot reîncarce pagina.

#### Depinde de
Validarea MVP-ului, login-ul (backlog #08), notificările Web Push (backlog #11) și preferințele de notificare (backlog #12), plus orarul real (TODO-31).

#### Ce ai de făcut
1. Tabel `room_free_alerts` (`user_id`, `room_id`, `created_at`, `expires_at`), cu RLS și test pgTAP; o alertă se șterge singură după ce s-a trimis sau după 12 ore.
2. Funcție programată (Edge Function cu cron, la fiecare 5 minute): pentru fiecare alertă, dacă `room_status` spune că sala devine liberă în 10 minute, trimite notificarea prin funcția comună din backlog #12, nu direct.
3. `FreeAlertButton.tsx` pe pagina unei săli ocupate: „Anunță-mă când se eliberează”.

#### Gata când
- [ ] O alertă pusă pe o sală ocupată până la 12:00 trimite o singură notificare între 11:50 și 11:55, iar un utilizator cu notificările oprite nu primește nimic.

### TODO-40 `[POSTPONED]` „Vin la 14:00”: check-in în avans

**Asignat:** _(amânat)_ · **Backlog:** #38

#### De ce
Un grup care vrea să învețe împreună la 14:00 ar vrea să le spună celorlalți că sala va fi folosită. Sălile sunt ale facultății, deci asta poate fi doar un semnal, nu o rezervare (backlog #38).

#### Depinde de
Validarea MVP-ului, login-ul (backlog #08) și TODO-33/34.

#### Ce ai de făcut
1. Coloana `planned_for timestamptz null` în `room_checkins`: un check-in în avans, cel mult cu 24 de ore înainte, doar într-un interval liber după orar. La `planned_for` devine check-in obișnuit, cu aceeași expirare.
2. `plannedCheckins` în `RoomWithStatus` și `PlannedCheckin.tsx` pe pagina sălii: „3 persoane plănuiesc să vină la 14:00”.
3. Textul spune clar că nu e o rezervare. `status` nu se schimbă, ca la check-in (CLAUDE.md §4).

#### Gata când
- [ ] Un check-in în avans apare pe pagina sălii pentru toți, devine check-in obișnuit la ora aleasă și nu poate fi pus peste o oră din orar.

### TODO-58 `[POSTPONED]` Sincronizarea anunțurilor cu grupurile de WhatsApp

**Asignat:** _(amânat)_ · **Backlog:** #45 (extins)

#### De ce
Căminele își țin deja anunțurile pe grupuri de WhatsApp. Ideal, un anunț din aplicație ajunge singur pe grup și invers, ca studenții să nu fie nevoiți să urmărească două locuri. `announcements` (TODO-48) are deja `source` și `external_id` pentru asta.

#### Depinde de
TODO-48 și TODO-54 folosite o vreme de studenți reali, ca să știm dacă e nevoie. Și de ce permite WhatsApp: API-ul oficial (WhatsApp Business / Cloud API) e făcut pentru conversații între o firmă și un client și, din câte știm, nu poate citi sau posta în grupurile obișnuite. Bibliotecile neoficiale care se dau drept un telefon încalcă termenii WhatsApp și pot duce la blocarea numărului, deci nu le folosim.

#### Ce ai de făcut
1. **Întâi cercetarea**, în `docs/whatsapp-sync.md`: ce permite azi API-ul oficial (grupuri, Comunități, Canale), cât costă, ce aprobare cere de la Meta și ce variante legale rămân (de ex. un Canal WhatsApp al căminului în care postează un bot, sau doar butonul „Trimite pe WhatsApp” din TODO-54).
2. Doar dacă cercetarea găsește o cale legală: o Edge Function care trimite anunțurile oficiale (`is_official = true`) în acel canal, cu `external_id` salvat, ca să nu plece de două ori. Sensul invers (din WhatsApp în aplicație) se decide separat.

#### Gata când
- [ ] `docs/whatsapp-sync.md` e în repo, cu recomandarea și sursele, iar echipa a decis pe baza lui dacă itemul pornește sau se închide.
