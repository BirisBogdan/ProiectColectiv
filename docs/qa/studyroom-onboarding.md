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

## Etapa a 2-a: check-in

- [ ] Pe `/rooms/c-510`, „Sunt aici” arată „Ești aici până la HH:MM” (peste 2 ore, ora României), iar „1 persoană aici” apare fără refresh.
- [ ] Refresh pe pagina sălii păstrează check-in-ul; „Am plecat” îl scoate și semnalul dispare.
- [ ] Pe `/rooms/c-512`, cu check-in activ în C510: „Ai deja check-in în altă sală”, cu link spre C510 și fără „Sunt aici”.
- [ ] Numărul de persoane e același în listă, pe pagina sălii și pe plan.
- [ ] O sală liberă cu check-in rămâne „Liberă” (verde), cu „N persoane aici” lângă, nu în locul stării.

## Etapa a 2-a: reîmprospătare

- [ ] Un check-in dat din alt tab (sau cu `curl -X POST localhost:3000/api/rooms/c-512/checkins`) apare în listă și pe plan în cel mult 60 de secunde, fără refresh și fără să clipească lista.
- [ ] Cu serverul oprit, lista și planul deja afișate rămân pe ecran, cu „Nu am putut actualiza lista.” / „Nu am putut actualiza planul.”; mesajul dispare după repornire.

## Etapa a 2-a: planul clădirii

- [ ] Header-ul are „Săli” și „Plan”; „Plan” duce la `/rooms/plan`, nu la „Sala nu există”.
- [ ] `/rooms/plan` arată Clădirea Centrală: Parter (L001, Gamma), Etaj 1 (2/I, 5/I), Etaj 5 (C510, C512), cu „Schemă orientativă, nu planul real al clădirii.”
- [ ] Alegerea „FSEGA” schimbă URL-ul în `?buildingId=fsega` și arată Etaj 1: S10, S12, A101; refresh-ul păstrează clădirea.
- [ ] Fiecare sală are cod, stare scrisă în text și, dacă e cazul, „N persoane aici”; click deschide `/rooms/{id}`.
- [ ] `/rooms/plan?buildingId=nu-exista` arată „Clădirea nu există.” cu link spre prima clădire, nu o eroare.
- [ ] La 375px planul are 3 coloane, fără scroll orizontal; textele lungi trec pe rândul următor.

## Etapa a 2-a: filtrul „Liberă cel puțin”

- [ ] Opțiunile sunt „Oricât”, „1 oră”, „2 ore”, „3 ore”; implicit „Oricât”, fără parametru în URL.
- [ ] „2 ore” → `?minFreeHours=2`: nicio sală ocupată, necunoscută sau care se ocupă în mai puțin de 2 ore. Rulează și în timpul zilei (luni–vineri, 08:00–20:00), noaptea toate sălile sunt libere până dimineața și trec filtrul.
- [ ] Combinat cu clădirea și cu „Prize”, toți parametrii rămân în URL; înapoi la „Oricât” scoate doar `minFreeHours`.
- [ ] Refresh pe `/rooms?minFreeHours=2` păstrează „2 ore”; linkul copiat deschide aceeași căutare.
- [ ] `/rooms?minFreeHours=abc` arată „Oricât” și toate sălile, fără eroare.
- [ ] „Resetează” scoate și `minFreeHours`.

## Telefon

- [ ] Lățime 375px (DevTools): fără scroll orizontal pe `/`, `/rooms`, `/rooms/c-510`, `/rooms/plan`.
- [ ] Filtrele stau pe două rânduri la 375px, iar cardurile pe o coloană.
- [ ] Pe un telefon real: filtrele se pot atinge ușor, iar capacitatea deschide tastatura numerică.

## Ce faci cu ce găsești

Tot ce e stricat devine o problemă pe GitHub sau un item în `TODO.md`, nu doar un mesaj pe grup.

## Rezultate

Copiază tabelul în comentariul PR-ului sau într-un issue, la fiecare rulare.

| Data și ora | Commit | Browser / telefon | Rezultat | Probleme găsite |
| ----------- | ------ | ----------------- | -------- | --------------- |
| 2026-11-12 00:45 (noaptea) | `a1e381e` + TODO-15/16 necomise | Chromium (desktop și 375px emulat) | Plan, filtrul nou, check-in pe plan și 375px: trec. Neverificat: telefon real, server oprit, efectul filtrului în timpul zilei (noaptea toate sălile trec). | Niciuna |
