from .base import Adapter
from .fmi import FmiAdapter

# One entry per faculty. FSEGA gets its own adapter later (backlog #28).
ADAPTERS: dict[str, type[Adapter]] = {"fmi": FmiAdapter}
