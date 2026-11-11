import { describe, expect, it } from "vitest";
import { entriesToday, teachingWeek } from "@/features/rooms/server/calendar";
import { listRooms } from "@/features/rooms/server/list-rooms";
import type { ScheduleEntry } from "@/features/rooms/types";

// Demo periods (data/calendar.ts): 2026-09-28 .. 2026-12-20 and 2027-01-04 .. 2027-01-17.
// Romania is on summer time (UTC+3) until 2026-10-25, then on winter time (UTC+2).

describe("teachingWeek", () => {
  it("counts the first day of the first period as week 1", () => {
    expect(teachingWeek(new Date("2026-09-28T07:00:00Z"))).toBe(1);
  });

  it("counts weeks from Monday to Sunday", () => {
    expect(teachingWeek(new Date("2026-10-04T10:00:00Z"))).toBe(1); // Sunday
    expect(teachingWeek(new Date("2026-10-05T10:00:00Z"))).toBe(2); // Monday
  });

  it("includes the last day of the period", () => {
    expect(teachingWeek(new Date("2026-12-20T10:00:00Z"))).toBe(12);
  });

  it("is null before the first period and during the holiday", () => {
    expect(teachingWeek(new Date("2026-09-27T10:00:00Z"))).toBeNull();
    expect(teachingWeek(new Date("2026-12-21T10:00:00Z"))).toBeNull();
    expect(teachingWeek(new Date("2026-12-24T10:00:00Z"))).toBeNull();
    expect(teachingWeek(new Date("2027-01-03T10:00:00Z"))).toBeNull();
  });

  it("keeps counting after the holiday instead of restarting", () => {
    expect(teachingWeek(new Date("2027-01-04T10:00:00Z"))).toBe(15);
    expect(teachingWeek(new Date("2027-01-17T10:00:00Z"))).toBe(16);
  });

  it("is null after the last period", () => {
    expect(teachingWeek(new Date("2027-01-18T10:00:00Z"))).toBeNull();
  });

  it("uses the date in Romania, not the UTC date (start of the period)", () => {
    // 21:30 UTC on Sunday 27 Sept is already 00:30 on Monday 28 Sept in Romania.
    expect(teachingWeek(new Date("2026-09-27T21:30:00Z"))).toBe(1);
  });

  it("uses the date in Romania, not the UTC date (end of the period)", () => {
    // 22:30 UTC on 20 Dec is already 00:30 on 21 Dec in Romania: the period is over.
    expect(teachingWeek(new Date("2026-12-20T22:30:00Z"))).toBeNull();
    // 21:30 UTC on 20 Dec is still 23:30 on 20 Dec in Romania.
    expect(teachingWeek(new Date("2026-12-20T21:30:00Z"))).toBe(12);
  });
});

function entry(overrides: Partial<ScheduleEntry> = {}): ScheduleEntry {
  return {
    roomId: "c-510",
    day: 1,
    start: "10:00",
    end: "12:00",
    subject: "Baze de date",
    group: "Seminar 211",
    ...overrides,
  };
}

// Mondays: 5 Oct 2026 is week 2 (even), 12 Oct 2026 is week 3 (odd).
const evenMonday = new Date("2026-10-05T10:30:00Z");
const oddMonday = new Date("2026-10-12T10:30:00Z");

describe("entriesToday", () => {
  it("an odd-week class is there in an odd week and gone in the next (even) one", () => {
    const entries = [entry({ weeks: "odd" })];
    expect(entriesToday("c-510", entries, oddMonday)).toHaveLength(1);
    expect(entriesToday("c-510", entries, evenMonday)).toHaveLength(0);
  });

  it("an even-week class is there in an even week and gone in the odd one", () => {
    const entries = [entry({ weeks: "even" })];
    expect(entriesToday("c-510", entries, evenMonday)).toHaveLength(1);
    expect(entriesToday("c-510", entries, oddMonday)).toHaveLength(0);
  });

  it("a class without weeks is there every week", () => {
    const entries = [entry()];
    expect(entriesToday("c-510", entries, evenMonday)).toHaveLength(1);
    expect(entriesToday("c-510", entries, oddMonday)).toHaveLength(1);
  });

  it("keeps only this room and this weekday", () => {
    const entries = [entry(), entry({ roomId: "c-512" }), entry({ day: 2 })];
    expect(entriesToday("c-510", entries, oddMonday)).toEqual([entry()]);
  });

  it("sorts by start time", () => {
    const entries = [entry({ start: "14:00", end: "16:00" }), entry({ start: "08:00", end: "10:00" })];
    expect(entriesToday("c-510", entries, oddMonday).map((e) => e.start)).toEqual(["08:00", "14:00"]);
  });

  it("is empty outside the teaching periods", () => {
    const christmasEve = new Date("2026-12-24T10:00:00Z"); // a Thursday
    expect(entriesToday("c-510", [entry({ day: 4 })], christmasEve)).toEqual([]);
  });
});

describe("24 December 2026 (holiday)", () => {
  const christmasEve = new Date("2026-12-24T10:30:00Z");

  it("every room is unknown", () => {
    const all = listRooms({}, christmasEve);
    expect(all.length).toBeGreaterThan(0);
    expect(all.every((r) => r.status === "unknown")).toBe(true);
  });

  it("the free-now filter shows no room", () => {
    expect(listRooms({ freeOnly: true }, christmasEve)).toEqual([]);
  });
});
