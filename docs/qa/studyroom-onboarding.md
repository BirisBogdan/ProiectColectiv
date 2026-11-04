# QA: StudyRoom Finder (sprintul de onboarding)

Checklist manual, de rulat după ce toate cele 8 PR-uri din `TODO.md` sunt pe `main`.

**Pregătire:** `git checkout main && git pull`, `pnpm install`, `pnpm dev`, apoi deschide <http://localhost:3000>.

Rezultatele de mai jos sunt pentru datele demo din `features/rooms/data/rooms.ts`. Dacă datele se schimbă, actualizează și checklist-ul. Starea (liberă / ocupată) depinde de zi și de oră, așa că notează când ai rulat testul.

## Pagina de start

- [ ] `/` arată titlul, propoziția și butonul „Vezi sălile libere”.
- [ ] Butonul duce la `/rooms?freeOnly=1`, iar „Doar libere acum” e bifat.

## Lista de săli

- [ ] `/rooms` fără filtre arată toate cele 9 săli, întâi cele libere.
- [ ] Fiecare card are cod, clădire, etaj, stare și capacitate.

## Fiecare filtru separat

Pornește de fiecare dată de la `/rooms`.

- [ ] Clădire „Clădirea Centrală” → `?buildingId=fmi-central`: C510, C512, L001, 2/I, 5/I, Gamma.
- [ ] Clădire „FSEGA” → `?buildingId=fsega`: S10, S12, A101.
- [ ] Capacitate minimă 100 → `?minCapacity=100`: 2/I, Gamma, A101.
- [ ] Prize → `?outlets=1`: C510, C512, L001, Gamma, S12.
- [ ] Proiector → `?projector=1`: C510, 2/I, Gamma, S12, A101.
- [ ] Doar libere acum → `?freeOnly=1`: nicio sală ocupată sau necunoscută în listă.

## Filtre combinate

- [ ] Prize + Proiector: C510, Gamma, S12.
- [ ] FSEGA + capacitate minimă 50: A101.
- [ ] FSEGA + capacitate minimă 500: „Nicio sală nu se potrivește filtrelor.”
- [ ] Debifarea unui filtru îl scoate din URL (fără `outlets=0`); ceilalți parametri rămân.
- [ ] Golirea capacității scoate `minCapacity` din URL.

## Resetează și URL-ul

- [ ] „Resetează” lasă URL-ul `/rooms`, golește controalele și arată toate sălile.
- [ ] Refresh pe `/rooms?buildingId=fsega&minCapacity=50` păstrează filtrele afișate și lista filtrată.
- [ ] Linkul copiat într-o fereastră incognito deschide aceeași căutare.
- [ ] Schimbarea filtrelor nu mută pagina în sus (scroll) și nu adaugă intrări în istoric: „Înapoi” părăsește `/rooms`.
- [ ] `/rooms?minCapacity=abc` arată toate sălile și câmpul gol, fără eroare.
- [ ] `/rooms?buildingId=nu-exista` arată „Clădire necunoscută” și lista goală; „Resetează” repară pagina.

## Detaliul unei săli

- [ ] Card → `/rooms/{id}` deschide sala corectă, cu orarul de azi.
- [ ] „← Înapoi la săli” duce la `/rooms`.
- [ ] O sală cu ore azi are ora în desfășurare evidențiată; o sală fără ore arată „Nicio oră programată azi.”
- [ ] Sală inexistentă: `/rooms/nu-exista` arată „Sala nu există” cu link înapoi, nu o eroare.

## Stări de eroare

- [ ] Cu serverul oprit, lista arată „Nu am putut încărca sălile.”, iar „Reîncearcă” merge după repornire.
- [ ] Cu serverul oprit, un refresh pe detaliu arată eroarea cu „Reîncearcă”.

## Telefon

- [ ] Lățime 375px (DevTools): fără scroll orizontal pe `/`, `/rooms`, `/rooms/c-510`.
- [ ] Filtrele stau pe două rânduri la 375px, iar cardurile pe o coloană.
- [ ] Pe un telefon real: filtrele se pot atinge ușor, iar capacitatea deschide tastatura numerică.

## Ce faci cu ce găsești

Tot ce e stricat devine o problemă pe GitHub sau un item în `TODO.md`, nu doar un mesaj pe grup.

## Rezultate

Copiază tabelul în comentariul PR-ului sau într-un issue, la fiecare rulare.

| Data și ora | Commit | Browser / telefon | Rezultat | Probleme găsite |
| ----------- | ------ | ----------------- | -------- | --------------- |
|             |        |                   |          |                 |
