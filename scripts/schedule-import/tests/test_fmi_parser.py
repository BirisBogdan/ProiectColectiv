"""Tests on pages saved from https://www.cs.ubbcluj.ro/files/orar/2026-1/sali/ (see README)."""

import re
from collections import Counter
from pathlib import Path

import pytest

from schedule_import.adapters.base import ParseError
from schedule_import.adapters.fmi import (
    parse_day,
    parse_hours,
    parse_parity,
    parse_room_page,
)
from schedule_import.models import ScheduleRow

FIXTURES = Path(__file__).parent / "fixtures"


def load(name: str) -> list[ScheduleRow]:
    return parse_room_page((FIXTURES / name).read_bytes(), source=name)


@pytest.fixture(scope="module")
def c310() -> list[ScheduleRow]:
    return load("C310.html")


@pytest.fixture(scope="module")
def five_i() -> list[ScheduleRow]:
    return load("5-I.html")


@pytest.fixture(scope="module")
def virtual() -> list[ScheduleRow]:
    return load("Virtual.html")


# --- the real pages -------------------------------------------------------------------------


def test_row_counts(c310, five_i, virtual):
    assert (len(c310), len(five_i), len(virtual)) == (59, 68, 13)


def test_room_code_comes_from_the_heading(c310, five_i, virtual):
    assert {r.room_code for r in c310} == {"C310"}
    assert {r.room_code for r in five_i} == {"5/I"}  # the file is 5-I.html, the timetable says 5/I
    assert {r.room_code for r in virtual} == {"Virtual"}


def test_first_row_checked_field_by_field(c310):
    # Luni | 8-10 | (empty) | 2 Matematica - linia de studiu romana | M2 | Curs | Sofware matematic | ...
    assert c310[0] == ScheduleRow(
        room_code="C310",
        day=1,
        start="08:00",
        end="10:00",
        subject="Sofware matematic",  # the typo is in the faculty's page
        group="M2",
        parity="all",
    )


def test_alternating_weeks_in_c310(c310):
    parity = Counter(r.parity for r in c310)
    assert parity == {"all": 56, "odd": 1, "even": 2}
    (odd,) = [r for r in c310 if r.parity == "odd"]
    assert (odd.day, odd.start, odd.end, odd.group) == (5, "10:00", "12:00", "1021")
    even = sorted((r.group, r.start) for r in c310 if r.parity == "even")
    assert even == [("1022", "10:00"), ("921", "12:00")]


def test_alternating_weeks_in_5_i(five_i):
    assert Counter(r.parity for r in five_i) == {"all": 56, "odd": 6, "even": 6}


def test_every_time_is_hh_mm_and_start_is_before_end(c310, five_i, virtual):
    for row in c310 + five_i + virtual:
        assert re.fullmatch(r"\d\d:\d\d", row.start), row
        assert re.fullmatch(r"\d\d:\d\d", row.end), row
        assert row.start < row.end, row


def test_single_hour_classes_are_read(virtual):
    assert ("19:00", "20:00") in {(r.start, r.end) for r in virtual}


def test_days_are_numbers_one_to_seven(c310, virtual):
    assert Counter(r.day for r in c310) == {4: 16, 2: 13, 3: 13, 1: 11, 5: 6}
    assert Counter(r.day for r in virtual) == {5: 11, 2: 2}


def test_reservations_and_meetings_are_kept_with_an_empty_group(c310, five_i):
    reserved = [r for r in c310 if r.subject.startswith("Rezervat")]
    assert [(r.day, r.start, r.group) for r in reserved] == [(1, "12:00", "")]
    meetings = [r for r in five_i if r.group == ""]
    assert {r.subject for r in meetings} == {"Sedinta Consiliul Facultatii", "Sustineri doctorate"}


def test_text_is_taken_from_inside_the_links(five_i):
    # in the page the discipline is <a href="../disc/...">Introducere in astronomie</a>
    assert "Introducere in astronomie" in {r.subject for r in five_i}
    assert all("<" not in r.subject and "href" not in r.subject for r in five_i)


# --- unknown formats fail loudly --------------------------------------------------------------

HEADER = (
    "<tr><th>Ziua</th><th>Orele</th><th>Frecventa</th><th>Anul</th><th>Formatia</th>"
    "<th>Tipul</th><th>Disciplina</th><th>Cadrul didactic</th></tr>"
)


def page(*body_rows: str, title: str = "Orar: Sala X1") -> bytes:
    return f"<html><body><h1>{title}</h1><table>{HEADER}{''.join(body_rows)}</table></body></html>".encode()


def row(day="Luni", hours="8-10", freq="", year="1 A", group="I1", kind="Curs", subject="SDA", teacher="X"):
    cells = [day, hours, freq, year, group, kind, subject, teacher]
    return "<tr>" + "".join(f"<td>{c or '&nbsp;'}</td>" for c in cells) + "</tr>"


def test_a_page_that_is_not_a_timetable_raises_instead_of_returning_nothing():
    with pytest.raises(ParseError, match="room code not found"):
        parse_room_page(b"<html><body><p>Pagina nu exista</p></body></html>", source="oops.html")


def test_a_page_without_the_table_raises():
    with pytest.raises(ParseError, match="timetable table not found"):
        parse_room_page(b"<html><body><h1>Orar: Sala X1</h1><p>nimic</p></body></html>")


def test_a_changed_header_raises_and_names_the_missing_column():
    html = page().replace(b"<th>Formatia</th>", b"<th>Grupa</th>")
    with pytest.raises(ParseError, match="formatia"):
        parse_room_page(html)


@pytest.mark.parametrize(
    "bad_row, message",
    [
        (row(day="Lunea"), "unknown day"),
        (row(hours="8"), "unknown hours"),
        (row(hours="10-8"), "invalid hours"),
        (row(freq="sapt. 3"), "unknown frequency"),
    ],
)
def test_an_unreadable_row_raises_with_the_row_in_the_message(bad_row, message):
    with pytest.raises(ParseError, match=message) as exc:
        parse_room_page(page(bad_row), source="x.html")
    assert "x.html" in str(exc.value) and "X1" in str(exc.value)


def test_a_short_row_raises():
    with pytest.raises(ParseError, match="cells"):
        parse_room_page(page("<tr><td>Luni</td><td>8-10</td></tr>"))


def test_a_room_with_no_classes_is_valid_and_empty():
    assert parse_room_page(page()) == []


def test_columns_are_found_by_name_not_position():
    html = (
        b"<h1>Orar: Sala X1</h1><table><tr><th>Orele</th><th>Ziua</th><th>Frecventa</th><th>Anul</th>"
        b"<th>Formatia</th><th>Tipul</th><th>Disciplina</th><th>Cadrul didactic</th></tr>"
        b"<tr><td>10-12</td><td>Marti</td><td>sapt. 1</td><td>1</td><td>I1</td><td>Curs</td>"
        b"<td>SDA</td><td>X</td></tr></table>"
    )
    (r,) = parse_room_page(html)
    assert (r.day, r.start, r.end, r.parity, r.subject) == (2, "10:00", "12:00", "odd", "SDA")


def test_the_declared_encoding_is_respected():
    # 0xBA is "ş" in ISO-8859-2; the page declares that charset
    html = (
        b'<html><head><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-2"></head>'
        b"<body><h1>Orar: Sala X1</h1><table>" + HEADER.encode() + row(subject="Ba\xbae").encode("latin-1") + b"</table></body></html>"
    )
    (r,) = parse_room_page(html)
    assert r.subject == "Ba\u015fe"


# --- the small parsers ------------------------------------------------------------------------


def test_parse_day_ignores_accents_and_case():
    assert [parse_day(d) for d in ("Luni", "MARTI", "Sâmbătă", "Duminică")] == [1, 2, 6, 7]


@pytest.mark.parametrize(
    "raw, expected",
    [("8-10", ("08:00", "10:00")), ("19-20", ("19:00", "20:00")), (" 8:30 - 10:00 ", ("08:30", "10:00"))],
)
def test_parse_hours(raw, expected):
    assert parse_hours(raw) == expected


def test_parse_parity():
    assert [parse_parity(v) for v in ("", "\xa0", "sapt. 1", "sapt. 2")] == ["all", "all", "odd", "even"]
