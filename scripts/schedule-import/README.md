# schedule-import

Python timetable importer for Module A (StudyRoom Finder). One adapter per faculty behind a
common interface; see CLAUDE.md §3.3. Nothing is implemented yet (TODO-17).

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows; on macOS/Linux: . .venv/bin/activate
pip install -r requirements-dev.txt
python -m schedule_import --faculty fmi --dry-run
pytest
```
