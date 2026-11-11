import { describe, expect, it } from "vitest";
import { computeStatus } from "@/features/rooms/server/status";
import type { ScheduleEntry } from "@/features/rooms/types";

// 2026-11-02 is a Monday; Romania is on winter time (UTC+2) then.
const monday = (hhmm: string) => new Date(`2026-11-02T${hhmm}:00+02:00`);

function entry(
  start: string,
  end: string,
  overrides: Partial<ScheduleEntry> = {},
): ScheduleEntry {
  return {
    roomId: "c-510",
    day: 1,
    start,
    end,
    subject: "Baze de date",
    group: "Seminar 211",
    ...overrides,
  };
}

describe("computeStatus", () => {
  it("is occupied until the end of the current entry", () => {
    const entries = [entry("10:00", "12:00")];
    expect(computeStatus("c-510", entries, monday("10:30"))).toEqual({
      status: "occupied",
      until: "12:00",
    });
  });

  it("is occupied exactly at the start time", () => {
    const entries = [entry("10:00", "12:00")];
    expect(computeStatus("c-510", entries, monday("10:00")).status).toBe("occupied");
  });

  it("is free exactly at the end time when nothing follows", () => {
    const entries = [entry("10:00", "12:00")];
    expect(computeStatus("c-510", entries, monday("12:00"))).toEqual({
      status: "free",
      until: null,
    });
  });

  it("joins back-to-back entries into one chain", () => {
    const entries = [entry("10:00", "12:00"), entry("12:00", "14:00")];
    expect(computeStatus("c-510", entries, monday("10:30"))).toEqual({
      status: "occupied",
      until: "14:00",
    });
  });

  it("joins a chain of three and ignores the order of the input", () => {
    const entries = [entry("14:00", "16:00"), entry("10:00", "12:00"), entry("12:00", "14:00")];
    expect(computeStatus("c-510", entries, monday("11:00"))).toEqual({
      status: "occupied",
      until: "16:00",
    });
  });

  it("handles overlapping entries (several groups in the same slot)", () => {
    const entries = [entry("10:00", "12:00"), entry("10:00", "14:00", { group: "Curs anul 2" })];
    expect(computeStatus("c-510", entries, monday("10:30"))).toEqual({
      status: "occupied",
      until: "14:00",
    });
  });

  it("does not join entries separated by a gap", () => {
    const entries = [entry("10:00", "12:00"), entry("13:00", "15:00")];
    expect(computeStatus("c-510", entries, monday("11:00"))).toEqual({
      status: "occupied",
      until: "12:00",
    });
  });

  it("is free until the next entry during a break", () => {
    const entries = [entry("10:00", "12:00"), entry("14:00", "16:00")];
    expect(computeStatus("c-510", entries, monday("12:30"))).toEqual({
      status: "free",
      until: "14:00",
    });
  });

  it("is free until the first entry before the day starts", () => {
    const entries = [entry("10:00", "12:00")];
    expect(computeStatus("c-510", entries, monday("07:30"))).toEqual({
      status: "free",
      until: "10:00",
    });
  });

  it("is free for the rest of the day after the last entry", () => {
    const entries = [entry("10:00", "12:00")];
    expect(computeStatus("c-510", entries, monday("18:00"))).toEqual({
      status: "free",
      until: null,
    });
  });

  it("is free all day when there are no entries for that day", () => {
    const entries = [entry("10:00", "12:00", { day: 2 })];
    expect(computeStatus("c-510", entries, monday("10:30"))).toEqual({
      status: "free",
      until: null,
    });
  });

  it("is free on a weekend", () => {
    const entries = [entry("10:00", "12:00")];
    const saturday = new Date("2026-11-07T10:30:00+02:00");
    expect(computeStatus("c-510", entries, saturday)).toEqual({
      status: "free",
      until: null,
    });
  });

  it("ignores entries of other rooms", () => {
    const entries = [entry("10:00", "12:00", { roomId: "c-512" })];
    expect(computeStatus("c-510", entries, monday("10:30"))).toEqual({
      status: "free",
      until: null,
    });
  });

  it("uses Romanian time, not UTC", () => {
    const entries = [entry("10:00", "12:00")];
    // 08:30 UTC is 10:30 in Romania in November.
    expect(computeStatus("c-510", entries, new Date("2026-11-02T08:30:00Z"))).toEqual({
      status: "occupied",
      until: "12:00",
    });
    // 10:30 UTC is 12:30 in Romania: the entry is over.
    expect(computeStatus("c-510", entries, new Date("2026-11-02T10:30:00Z")).status).toBe("free");
  });

  it("follows daylight saving time", () => {
    const entries = [entry("13:00", "15:00")];
    // 10:30 UTC on 2026-10-05 (a Monday, still summer time) is 13:30 in Romania (UTC+3).
    expect(computeStatus("c-510", entries, new Date("2026-10-05T10:30:00Z"))).toEqual({
      status: "occupied",
      until: "15:00",
    });
  });

  it("uses the Romanian day when UTC is still on the previous day", () => {
    const entries = [entry("00:30", "01:30")];
    // 22:45 UTC on Sunday 2026-11-01 is 00:45 on Monday in Romania.
    expect(computeStatus("c-510", entries, new Date("2026-11-01T22:45:00Z"))).toEqual({
      status: "occupied",
      until: "01:30",
    });
  });
});

describe("computeStatus: teaching periods and week parity", () => {
  it("is unknown on 24 December, even with a class that day (Thursday)", () => {
    const entries = [entry("10:00", "12:00", { day: 4 })];
    expect(computeStatus("c-510", entries, new Date("2026-12-24T10:30:00Z"))).toEqual({
      status: "unknown",
      until: null,
    });
  });

  it("is unknown for a room with no classes outside the periods (never free)", () => {
    expect(computeStatus("c-510", [], new Date("2027-02-10T10:30:00Z")).status).toBe("unknown");
  });

  it("the same hour occupies the room one week and leaves it free the next", () => {
    const entries = [entry("10:00", "12:00", { weeks: "odd" })];
    // 12 Oct 2026 is week 3 (odd), 19 Oct 2026 is week 4 (even). Both Mondays; 07:30 UTC is 10:30 in Romania.
    expect(computeStatus("c-510", entries, new Date("2026-10-12T07:30:00Z"))).toEqual({
      status: "occupied",
      until: "12:00",
    });
    expect(computeStatus("c-510", entries, new Date("2026-10-19T07:30:00Z"))).toEqual({
      status: "free",
      until: null,
    });
  });
});
