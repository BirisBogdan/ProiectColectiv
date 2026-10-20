from schedule_import.__main__ import main


def test_unknown_faculty_exits_nonzero():
    assert main(["--faculty", "fmi", "--dry-run"]) == 1
