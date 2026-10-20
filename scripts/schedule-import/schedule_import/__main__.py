"""CLI entry point: python -m schedule_import --faculty fmi --dry-run"""

import argparse
import sys


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="schedule_import")
    parser.add_argument("--faculty", required=True, help="faculty adapter to run, e.g. fmi")
    parser.add_argument("--dry-run", action="store_true", help="print rows, write nothing")
    args = parser.parse_args(argv)
    print(f"No adapter for '{args.faculty}' yet (TODO-17).", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
