"""python -m schedule_import --faculty fmi --dry-run --from-file <file.html>

Rows go to stdout as JSON, a summary goes to stderr. Nothing is written anywhere.
"""

import argparse
import json
import sys
from collections import Counter
from dataclasses import asdict
from pathlib import Path

from .adapters import ADAPTERS
from .adapters.base import FetchNotAllowed, ImporterError

DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="schedule_import", description="Timetable importer (dry run only)")
    parser.add_argument("--faculty", required=True, choices=sorted(ADAPTERS))
    parser.add_argument("--dry-run", action="store_true", help="required: print rows, write nothing")
    parser.add_argument(
        "--from-file",
        action="append",
        type=Path,
        default=[],
        metavar="FILE",
        help="a saved timetable page; repeat the option for several pages",
    )
    args = parser.parse_args(argv)

    if not args.dry_run:
        print("error: only --dry-run is supported for now; nothing is written anywhere.", file=sys.stderr)
        return 2

    sys.stdout.reconfigure(encoding="utf-8")
    adapter = ADAPTERS[args.faculty](from_files=args.from_file)
    try:
        rows = adapter.parse(adapter.fetch())
    except FetchNotAllowed as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2
    except (ImporterError, OSError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    json.dump([asdict(r) for r in rows], sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")

    per_day = Counter(r.day for r in rows)
    parity = Counter(r.parity for r in rows)
    print(f"rows: {len(rows)}", file=sys.stderr)
    print("per day: " + ", ".join(f"{DAY_NAMES[d - 1]} {per_day[d]}" for d in sorted(per_day)), file=sys.stderr)
    print("parity: " + ", ".join(f"{p} {parity[p]}" for p in sorted(parity)), file=sys.stderr)
    print("room codes: " + ", ".join(sorted({r.room_code for r in rows})), file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
