"""Shared types. Nothing specific to one faculty belongs here (CLAUDE.md section 3.3)."""

from dataclasses import dataclass
from typing import Literal

# "all" = every week. "odd" / "even" = alternating weeks, counted from the first week of the
# semester (semester week 1 is "odd"). The mapping to calendar dates is not done here.
Parity = Literal["all", "odd", "even"]


@dataclass(frozen=True)
class ScheduleRow:
    """One occupation of one room."""

    room_code: str  # as written in the timetable, e.g. "C310" or "5/I"
    day: int  # 1 = Monday ... 7 = Sunday
    start: str  # "HH:MM", always two digits ("8" becomes "08:00"): computeStatus compares as text
    end: str  # "HH:MM"
    subject: str  # discipline, or the reason of a reservation ("Rezervat curs ...")
    group: str  # formation, e.g. "I3" or "921"; empty for reservations and meetings
    parity: Parity
