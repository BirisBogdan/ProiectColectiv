import { describe, expect, it } from "vitest";
import { buildings } from "@/features/rooms/data/buildings";
import { rooms } from "@/features/rooms/data/rooms";
import { scheduleEntries } from "@/features/rooms/data/schedule";
import { getRoomDetail } from "@/features/rooms/server/get-room";
import { computeStatus } from "@/features/rooms/server/status";

// 2026-11-02 is a Monday; Romania is on winter time (UTC+2) then.
const monday = (hhmm: string) => new Date(`2026-11-02T${hhmm}:00+02:00`);
const tuesday = (hhmm: string) => new Date(`2026-11-03T${hhmm}:00+02:00`);
const saturday = (hhmm: string) => new Date(`2026-11-07T${hhmm}:00+02:00`);

describe("getRoomDetail", () => {
  it("returns null for an unknown room id", () => {
    expect(getRoomDetail("nu-exista", monday("10:00"))).toBeNull();
  });

  it("returns the room with its building name", () => {
    const detail = getRoomDetail("c-510", monday("10:00"));
    expect(detail?.room.code).toBe("C510");
    expect(detail?.room.buildingName).toBe("Clădirea Centrală");

    const fsega = getRoomDetail("s-12", monday("10:00"));
    expect(fsega?.room.buildingName).toBe("FSEGA");
  });

  it("returns only today's entries, sorted by start", () => {
    const detail = getRoomDetail("c-510", monday("10:00"));
    expect(detail?.today.length).toBeGreaterThan(0);
    expect(detail?.today.every((e) => e.roomId === "c-510" && e.day === 1)).toBe(true);
    const starts = detail!.today.map((e) => e.start);
    expect(starts).toEqual([...starts].sort());

    const tue = getRoomDetail("c-510", tuesday("10:00"));
    expect(tue?.today.every((e) => e.day === 2)).toBe(true);
  });

  it("uses the Romanian day, not the UTC one", () => {
    // 22:30 UTC on Sunday is 00:30 on Monday in Romania.
    const detail = getRoomDetail("c-510", new Date("2026-11-01T22:30:00Z"));
    expect(detail?.today.every((e) => e.day === 1)).toBe(true);
  });

  it("has an empty list for a room without classes and on weekends", () => {
    expect(getRoomDetail("5-i", monday("10:00"))?.today).toEqual([]);
    expect(getRoomDetail("c-510", saturday("10:00"))?.today).toEqual([]);
  });

  it("carries the status computed by computeStatus", () => {
    const now = monday("10:30");
    const detail = getRoomDetail("c-512", now);
    const expected = computeStatus("c-512", scheduleEntries, now);
    expect(detail?.room.status).toBe(expected.status);
    expect(detail?.room.until).toBe(expected.until);
  });
});

describe("demo schedule data", () => {
  it("only refers to rooms that exist", () => {
    const roomIds = new Set(rooms.map((r) => r.id));
    for (const e of scheduleEntries) {
      expect(roomIds).toContain(e.roomId);
    }
  });

  it("has well-formed times with start before end", () => {
    for (const e of scheduleEntries) {
      expect(e.start).toMatch(/^\d{2}:\d{2}$/);
      expect(e.end).toMatch(/^\d{2}:\d{2}$/);
      expect(e.start < e.end).toBe(true);
    }
  });

  it("stays within the weekday teaching hours", () => {
    for (const e of scheduleEntries) {
      expect(e.day).toBeGreaterThanOrEqual(1);
      expect(e.day).toBeLessThanOrEqual(5);
      expect(e.start >= "08:00").toBe(true);
      expect(e.end <= "20:00").toBe(true);
    }
  });

  it("has a sensible amount of entries", () => {
    expect(scheduleEntries.length).toBeGreaterThanOrEqual(25);
    expect(scheduleEntries.length).toBeLessThanOrEqual(40);
  });

  it("has every room's building in the buildings list", () => {
    const buildingIds = new Set(buildings.map((b) => b.id));
    for (const r of rooms) expect(buildingIds).toContain(r.buildingId);
  });
});
