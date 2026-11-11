import type { StatusResult } from "../types";
import { bucharestNow } from "./time";

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Will the room stay free for at least `minHours` from `now`?
 *
 * - `occupied` and `unknown` are never free (an unknown room is never assumed free).
 * - `free` with `until: null` has no more classes today, so it passes.
 * - `free` with `until` passes when the gap from now (Romanian time) to `until` is at
 *   least `minHours`. The limit is inclusive: at 10:00 with `until` 12:00 the room
 *   passes for 2 hours.
 */
export function isFreeFor(result: StatusResult, minHours: number, now: Date): boolean {
  if (result.status !== "free") return false;
  if (result.until === null) return true;

  const freeMinutes = toMinutes(result.until) - toMinutes(bucharestNow(now).time);
  return freeMinutes >= minHours * 60;
}
