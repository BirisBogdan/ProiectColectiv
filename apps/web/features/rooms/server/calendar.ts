import { teachingPeriods } from "../data/calendar";
import type { ScheduleEntry } from "../types";
import { bucharestNow } from "./time";

const DAY_MS = 24 * 60 * 60 * 1000;

/** The calendar date in Europe/Bucharest as "YYYY-MM-DD" (not the UTC date). */
function bucharestDate(now: Date): string {
  // The en-CA locale formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Bucharest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Days since 1970-01-01 for a "YYYY-MM-DD" date. Whole days, so no DST problems. */
function dayNumber(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}

/** The day number of the Monday of the week that contains this day number. */
function mondayOf(days: number): number {
  // 1970-01-01 was a Thursday, so (days + 3) % 7 is 0 on Mondays.
  return days - ((days + 3) % 7);
}

/**
 * The teaching week for this moment: 1, 2, 3, ... or null outside the teaching periods
 * (holidays, exam sessions).
 *
 * Weeks start on Monday. Week 1 is the week of the first period's start date, and the
 * count keeps going through the holidays instead of restarting: calendar weeks, so the
 * parity (odd/even) never shifts. Assumption: the faculty counts calendar weeks too.
 * To confirm with the faculty, together with the "sapt. 1 / sapt. 2" mapping (TODO-12).
 */
export function teachingWeek(now: Date): number | null {
  const date = bucharestDate(now);
  const inPeriod = teachingPeriods.some((p) => p.start <= date && date <= p.end);
  if (!inPeriod) return null;

  const firstMonday = mondayOf(dayNumber(teachingPeriods[0].start));
  const thisMonday = mondayOf(dayNumber(date));
  return (thisMonday - firstMonday) / 7 + 1;
}

/**
 * Today's classes in one room, sorted by start time. Entries with `weeks` only count in
 * their odd/even weeks. Outside the teaching periods there are no classes, so the list is empty.
 */
export function entriesToday(roomId: string, entries: ScheduleEntry[], now: Date): ScheduleEntry[] {
  const week = teachingWeek(now);
  if (week === null) return [];

  const { day } = bucharestNow(now);
  const parity = week % 2 === 1 ? "odd" : "even";

  return entries
    .filter((e) => e.roomId === roomId && e.day === day && (!e.weeks || e.weeks === parity))
    .sort((a, b) => a.start.localeCompare(b.start));
}
