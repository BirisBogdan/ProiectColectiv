"""FMI adapter. Everything specific to the FMI timetable format lives in this file.

Format (https://www.cs.ubbcluj.ro/files/orar/<semester>/sali/<room>.html), one page per room:
  <h1>Orar: Sala C310</h1>
  a table with the header: Ziua | Orele | Frecventa | Anul | Formatia | Tipul | Disciplina | Cadrul didactic
  - Ziua: "Luni", "Marti", "Miercuri", "Joi", "Vineri" (no diacritics)
  - Orele: "8-10", "19-20" (hours, no minutes)
  - Frecventa: empty (&nbsp;) = every week, "sapt. 1" / "sapt. 2" = alternating weeks
  - most cells hold a link; the text is inside the <a>
"""

import re
import unicodedata
from collections.abc import Sequence
from pathlib import Path

from bs4 import BeautifulSoup

from ..models import Parity, ScheduleRow
from .base import Adapter, FetchNotAllowed, ParseError, RawPage

DAYS = {"luni": 1, "marti": 2, "miercuri": 3, "joi": 4, "vineri": 5, "sambata": 6, "duminica": 7}

# header text (lowercase, no diacritics) -> field name. Found by name, not by position.
COLUMNS = {
    "ziua": "day",
    "orele": "hours",
    "frecventa": "frequency",
    "anul": "year",
    "formatia": "group",
    "tipul": "kind",
    "disciplina": "subject",
    "cadrul didactic": "teacher",
}

NOT_ALLOWED = (
    "Fetching the timetable from the network is not allowed yet: whether we may read the "
    "faculty's pages automatically is still an open question (OQ-8). Save the page from your "
    "browser and pass it with --from-file <file.html>."
)


def _ascii_lower(text: str) -> str:
    stripped = "".join(c for c in unicodedata.normalize("NFKD", text) if not unicodedata.combining(c))
    return stripped.lower()


def _clean(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("\xa0", " ")).strip()


def parse_day(value: str) -> int:
    key = _ascii_lower(_clean(value))
    if key not in DAYS:
        raise ParseError(f"unknown day {value!r}")
    return DAYS[key]


def parse_hours(value: str) -> tuple[str, str]:
    """'8-10' -> ('08:00', '10:00'). Also accepts '8:30-10:00' and an en dash."""
    m = re.fullmatch(r"\s*(\d{1,2})(?::(\d{2}))?\s*[-–—]\s*(\d{1,2})(?::(\d{2}))?\s*", value)
    if not m:
        raise ParseError(f"unknown hours {value!r}")
    h1, m1, h2, m2 = int(m[1]), int(m[2] or 0), int(m[3]), int(m[4] or 0)
    if m1 > 59 or m2 > 59 or not (h1 * 60 + m1 < h2 * 60 + m2 <= 24 * 60):
        raise ParseError(f"invalid hours {value!r}")
    return f"{h1:02d}:{m1:02d}", f"{h2:02d}:{m2:02d}"


def parse_parity(value: str) -> Parity:
    key = _ascii_lower(_clean(value))
    if not key:
        return "all"
    m = re.fullmatch(r"sapt\.?\s*([12])", key)
    if not m:
        raise ParseError(f"unknown frequency {value!r}")
    return "odd" if m[1] == "1" else "even"


def _room_code(soup: BeautifulSoup) -> str:
    h1 = soup.find("h1")
    m = re.fullmatch(r"Orar:\s*Sala\s+(.+)", _clean(h1.get_text())) if h1 else None
    if not m:
        raise ParseError('room code not found (expected a heading like "Orar: Sala C310")')
    return m[1].strip()


def _find_table(soup: BeautifulSoup):
    for table in soup.find_all("table"):
        for tr in table.find_all("tr"):
            names = [_ascii_lower(_clean(c.get_text())) for c in tr.find_all(["th", "td"])]
            if "ziua" in names and "orele" in names:
                missing = sorted(set(COLUMNS) - set(names))
                if missing:
                    raise ParseError(f"timetable header is missing the columns {missing}")
                return table, tr, {i: COLUMNS[n] for i, n in enumerate(names) if n in COLUMNS}
    raise ParseError("timetable table not found (no table with the columns Ziua and Orele)")


def parse_room_page(content: bytes | str, source: str = "") -> list[ScheduleRow]:
    """Parse one room page. Any row that cannot be read raises: a half-read timetable is worse
    than a failed import, because a failed import keeps the last good one."""
    label = source or "page"
    try:
        soup = BeautifulSoup(content, "html.parser")  # given bytes, it reads the declared charset
        room = _room_code(soup)
        table, header, columns = _find_table(soup)
    except ParseError as exc:
        raise ParseError(f"{label}: {exc}") from None

    rows: list[ScheduleRow] = []
    after_header = False
    for tr in table.find_all("tr"):
        if tr is header:
            after_header = True
            continue
        cells = tr.find_all("td")
        if not after_header or not cells:
            continue
        if len(cells) <= max(columns):
            raise ParseError(f"{label} ({room}): a row has {len(cells)} cells, expected {len(columns)}")
        raw = {field: _clean(cells[i].get_text()) for i, field in columns.items()}
        try:
            start, end = parse_hours(raw["hours"])
            rows.append(
                ScheduleRow(
                    room_code=room,
                    day=parse_day(raw["day"]),
                    start=start,
                    end=end,
                    subject=raw["subject"],
                    group=raw["group"],
                    parity=parse_parity(raw["frequency"]),
                )
            )
        except ParseError as exc:
            raise ParseError(f"{label} ({room}): {exc} in the row {list(raw.values())}") from None
    return rows


class FmiAdapter(Adapter):
    faculty = "fmi"

    def __init__(self, from_files: Sequence[Path] = ()):
        self.from_files = [Path(p) for p in from_files]

    def fetch(self) -> list[RawPage]:
        if not self.from_files:
            raise FetchNotAllowed(NOT_ALLOWED)
        return [RawPage(str(p), p.read_bytes()) for p in self.from_files]

    def parse(self, raw: list[RawPage]) -> list[ScheduleRow]:
        rows: list[ScheduleRow] = []
        for page in raw:
            rows += parse_room_page(page.content, source=page.name)
        return rows
