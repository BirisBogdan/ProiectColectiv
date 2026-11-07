import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FIXTURES = ROOT / "tests" / "fixtures"


def run(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        [sys.executable, "-m", "schedule_import", *args],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )


def test_without_from_file_it_stops_and_points_to_oq_8():
    result = run("--faculty", "fmi", "--dry-run")
    assert result.returncode == 2
    assert "OQ-8" in result.stderr
    assert result.stdout == ""


def test_without_dry_run_it_refuses_to_write():
    result = run("--faculty", "fmi", "--from-file", str(FIXTURES / "C310.html"))
    assert result.returncode == 2
    assert "--dry-run" in result.stderr
    assert result.stdout == ""


def test_rows_go_to_stdout_as_json_and_the_summary_to_stderr():
    result = run("--faculty", "fmi", "--dry-run", "--from-file", str(FIXTURES / "C310.html"))
    assert result.returncode == 0
    rows = json.loads(result.stdout)
    assert len(rows) == 59
    assert rows[0] == {
        "room_code": "C310",
        "day": 1,
        "start": "08:00",
        "end": "10:00",
        "subject": "Sofware matematic",
        "group": "M2",
        "parity": "all",
    }
    assert "rows: 59" in result.stderr
    assert "room codes: C310" in result.stderr
    assert "odd 1" in result.stderr and "even 2" in result.stderr


def test_several_files_list_every_room_code():
    files = [str(FIXTURES / n) for n in ("C310.html", "5-I.html", "Virtual.html")]
    result = run("--faculty", "fmi", "--dry-run", "--from-file", files[0], "--from-file", files[1], "--from-file", files[2])
    assert result.returncode == 0
    assert len(json.loads(result.stdout)) == 59 + 68 + 13
    assert "room codes: 5/I, C310, Virtual" in result.stderr


def test_a_file_in_the_wrong_format_fails_with_a_clear_message(tmp_path):
    bad = tmp_path / "bad.html"
    bad.write_text("<html><body>nu e orar</body></html>", encoding="utf-8")
    result = run("--faculty", "fmi", "--dry-run", "--from-file", str(bad))
    assert result.returncode == 1
    assert "room code not found" in result.stderr
    assert "Traceback" not in result.stderr
    assert result.stdout == ""


def test_a_missing_file_fails_with_a_clear_message():
    result = run("--faculty", "fmi", "--dry-run", "--from-file", "nu-exista.html")
    assert result.returncode == 1
    assert "Traceback" not in result.stderr


def test_the_code_makes_no_network_calls():
    forbidden = ("import requests", "urllib", "import socket", "http.client", "httpx", "aiohttp", "playwright", "selenium")
    for path in (ROOT / "schedule_import").rglob("*.py"):
        source = path.read_text(encoding="utf-8")
        for word in forbidden:
            assert word not in source, f"{path.name} mentions {word}"
        assert "apps/web" not in source
