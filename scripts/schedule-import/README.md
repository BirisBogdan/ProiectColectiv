# schedule-import

Programul Python care citește orarul unei facultăți și îl transformă în rânduri `ScheduleRow`
(TODO-12 din `TODO.md`, backlog #17). Câte un adaptor pe facultate, în `schedule_import/adapters/`;
tot ce ține de formatul FMI stă doar în `adapters/fmi.py`. Acum există doar FMI, iar FSEGA vine separat (backlog #28).

**Nu face nicio cerere de rețea și nu scrie nicăieri.** Citește o pagină salvată de tine din browser și tipărește
rândurile. Dacă avem voie să citim paginile automat e încă o întrebare deschisă (OQ-8).

## Cum îl rulezi

Ai nevoie de Python 3.12.

```bash
cd scripts/schedule-import
python -m venv .venv
. .venv/bin/activate            # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt

python -m schedule_import --faculty fmi --dry-run --from-file tests/fixtures/C310.html
python -m pytest
```

- Rândurile ies ca JSON la stdout, iar la stderr un rezumat: câte rânduri, câte pe zi, paritatea și codurile de săli.
- `--from-file` se poate repeta, pentru mai multe pagini.
- Fără `--from-file`, programul se oprește cu un mesaj care trimite la OQ-8. Fără `--dry-run` refuză să ruleze.
- Coduri de ieșire: `0` ok, `1` pagină în format necunoscut sau fișier lipsă, `2` folosire greșită sau cerere de rețea.

## Ce iese

`ScheduleRow(room_code, day, start, end, subject, group, parity)`:
`day` e 1 (luni) până la 7, `start` și `end` sunt mereu `"HH:MM"` cu două cifre (`8` devine `"08:00"`, pentru că `computeStatus`
le compară ca text), iar `parity` e `"all"`, `"odd"` sau `"even"`.

O pagină sau un rând pe care nu le înțelege dau o **eroare clară**, nu o listă goală: un import eșuat păstrează ultimul
orar bun, dar un import pe jumătate citit l-ar strica.

## De unde sunt fixture-urile

Salvate manual din Chrome („Webpage, HTML only"), pe **7 noiembrie 2026**, din orarul FMI pe 2026-2027, semestrul I:

- `tests/fixtures/C310.html` ← `https://www.cs.ubbcluj.ro/files/orar/2026-1/sali/C310.html`
- `tests/fixtures/5-I.html` ← `https://www.cs.ubbcluj.ro/files/orar/2026-1/sali/5-I.html`
- `tests/fixtures/Virtual.html` ← `https://www.cs.ubbcluj.ro/files/orar/2026-1/sali/Virtual.html`

Sunt HTML-ul original (cu `charset=ISO-8859-2`), nemodificat. Orarul se schimbă, deci testele sunt legate de aceste fișiere, nu de site.

## Ce e neobișnuit în format

- Câte o pagină pe sală. Codul sălii e în titlu (`Orar: Sala 5/I`), nu în numele fișierului (`5-I.html`).
- Ziua e text fără diacritice (`Luni`, `Marti`), orele sunt fără minute (`8-10`, `19-20`), iar orele de o singură oră există.
- Frecvența e goală (`&nbsp;`) pentru „în fiecare săptămână", altfel `sapt. 1` sau `sapt. 2`.
- Aproape fiecare celulă conține un link; textul e în interiorul lui.
- Același interval apare pe mai multe rânduri când un curs e comun mai multor formații.
- Unele rânduri nu sunt cursuri: `Rezervat curs ...`, `Sedinta Consiliul Facultatii`, `Sustineri doctorate`. Au anul, formația și tipul goale.
- `Virtual` e tratată ca sală, deși nu e una fizică.
- Textul vine din pagină, cu greșelile lui (`Sofware matematic`).

## Ce nu e sigur încă

- **Paritatea:** am presupus că `sapt. 1` este săptămâna 1, 3, 5... a semestrului (`odd`) și `sapt. 2` este 2, 4, 6... (`even`). De confirmat cu facultatea.
- Am verificat parserul pe 3 din cele aproximativ 79 de pagini de sală. Celelalte pot avea cazuri pe care nu le-am văzut; atunci programul dă eroare, nu le ignoră.
- `ScheduleRow` nu păstrează tipul orei (curs, seminar, laborator) și nici profesorul, cum cere TODO-12. Dacă ne trebuie, se adaugă.
- Orele FSEGA din sălile clădirii FSEGA lipsesc până există adaptorul FSEGA, deci acele săli pot părea libere.
