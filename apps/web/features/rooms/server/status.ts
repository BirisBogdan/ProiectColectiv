import type { ScheduleEntry, StatusResult } from "../types";
import { bucharestNow } from "./time";

/**
 * Is the room free right now? Pure function: same input, same output.
 *
 * Times are "HH:MM" with two digits, so comparing them as strings is the same as
 * comparing them as times ("09:00" < "10:00").
 *
 * Not covered yet (needs the real data): week parity (pară/impară), semester dates,
 * admin overrides, check-ins. See backlog #19.
 */
export function computeStatus(
  roomId: string,
  entries: ScheduleEntry[],
  now: Date,
): StatusResult {
  const { day, time } = bucharestNow(now);

  const today = entries
    .filter((e) => e.roomId === roomId && e.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));

  // Occupied: some entry covers the current time (end is exclusive).
  const current = today.filter((e) => e.start <= time && time < e.end);
  if (current.length > 0) {
    // Back-to-back (or overlapping) entries form one chain: "occupied until 14:00"
    // for 10:00-12:00 followed by 12:00-14:00.
    let until = current.reduce((max, e) => (e.end > max ? e.end : max), current[0].end);
    let extended = true;
    while (extended) {
      extended = false;
      for (const e of today) {
        if (e.start <= until && e.end > until) {
          until = e.end;
          extended = true;
        }
      }
    }
    return { status: "occupied", until };
  }

  // Free: until the next entry today, or for the rest of the day.
  const next = today.find((e) => e.start > time);
  return { status: "free", until: next ? next.start : null };
}
