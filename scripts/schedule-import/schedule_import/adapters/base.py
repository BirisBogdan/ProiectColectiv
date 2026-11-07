"""The interface every faculty adapter implements."""

from abc import ABC, abstractmethod
from dataclasses import dataclass

from ..models import ScheduleRow


class ImporterError(Exception):
    """Base class for errors the command line reports without a traceback."""


class ParseError(ImporterError):
    """The input is not in the format the adapter knows. Never swallowed: a wrong page must not
    turn into an empty timetable."""


class FetchNotAllowed(ImporterError):
    """Raised instead of fetching anything from the network."""


@dataclass(frozen=True)
class RawPage:
    name: str  # where it came from, for error messages
    content: bytes  # the bytes as saved; the HTML declares its own encoding


class Adapter(ABC):
    faculty: str

    @abstractmethod
    def fetch(self) -> list[RawPage]:
        """Get the raw pages."""

    @abstractmethod
    def parse(self, raw: list[RawPage]) -> list[ScheduleRow]:
        """Turn raw pages into rows. Raises ParseError on a format it does not know."""
