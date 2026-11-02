import type { ScheduleEntry, StatusResult } from "../types";
// Stub: real implementation in TODO-03.
export function computeStatus(
  _roomId: string,
  _entries: ScheduleEntry[],
  _now: Date,
): StatusResult {
  return { status: "unknown", until: null };
}
