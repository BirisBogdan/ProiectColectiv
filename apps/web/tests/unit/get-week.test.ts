import { describe, expect, it } from "vitest";
import { scheduleEntries } from "@/features/rooms/data/schedule";
import { freeSlots, getRoomWeek } from "@/features/rooms/server/get-week";
import type { ScheduleEntry } from "@/features/rooms/types";

const at = (start: string, end: string): ScheduleEntry => ({
  roomId: "c-512",
  day: 1,
  start,
  end,
  subject: "Test",
  group: "Seminar 1",
});

describe("freeSlots", () => {
  it("gives the whole window for an empty day", () => {
    expect(freeSlots([])).toEqual([{ start: "08:00", end: "20:00" }]);
  });

  it("finds the gaps between, before and after classes", () => {
    expect(freeSlots([at("10:00", "12:00"), at("14:00", "16:00")])).toEqual([
      { start: "08:00", end: "10:00" },
      { start: "12:00", end: "14:00" },
      { start: "16:00", end: "20:00" },
    ]);
  });

  it("does not leave a gap between back-to-back classes", () => {
    expect(freeSlots([at("08:00", "10:00"), at("10:00", "12:00")])).toEqual([
      { start: "12:00", end: "20:00" },
    ]);
  });

  it("merges overlapping classes", () => {
    expect(freeSlots([at("09:00", "12:00"), at("10:00", "11:00"), at("11:30", "13:00")])).toEqual([
      { start: "08:00", end: "09:00" },
      { start: "13:00", end: "20:00" },
    ]);
  });

  it("leaves no empty slot for a class starting at 08:00", () => {
    expect(freeSlots([at("08:00", "09:00")])).toEqual([{ start: "09:00", end: "20:00" }]);
  });

  it("leaves no empty slot for a class ending at 20:00", () => {
    expect(freeSlots([at("18:00", "20:00")])).toEqual([{ start: "08:00", end: "18:00" }]);
  });

  it("has no free slot when the classes cover the whole window", () => {
    expect(freeSlots([at("08:00", "14:00"), at("14:00", "20:00")])).toEqual([]);
  });

  it("ignores classes outside the window", () => {
    expect(freeSlots([at("06:00", "07:30"), at("20:00", "21:30")])).toEqual([
      { start: "08:00", end: "20:00" },
    ]);
  });

  it("clips a class that sticks out of the window", () => {
    expect(freeSlots([at("07:00", "09:00"), at("19:00", "21:00")])).toEqual([
      { start: "09:00", end: "19:00" },
    ]);
  });

  it("does not depend on the order of the input and does not change it", () => {
    const input = [at("14:00", "16:00"), at("10:00", "12:00")];
    const copy = [...input];
    expect(freeSlots(input)).toEqual([
      { start: "08:00", end: "10:00" },
      { start: "12:00", end: "14:00" },
      { start: "16:00", end: "20:00" },
    ]);
    expect(input).toEqual(copy);
  });

  it("ignores entries with end before or equal to start", () => {
    expect(freeSlots([at("10:00", "10:00"), at("12:00", "11:00")])).toEqual([
      { start: "08:00", end: "20:00" },
    ]);
  });

  it("counts a class that only runs on odd or even weeks as busy", () => {
    // Better to lose a free slot than to send someone to a full room.
    const oddWeeksOnly = { ...at("10:00", "12:00"), weeks: "odd" } as ScheduleEntry;
    expect(freeSlots([oddWeeksOnly])).toEqual([
      { start: "08:00", end: "10:00" },
      { start: "12:00", end: "20:00" },
    ]);
  });
});

describe("getRoomWeek", () => {
  it("returns null for an unknown room id", () => {
    expect(getRoomWeek("nu-exista")).toBeNull();
  });

  it("returns the room, its code and its building name", () => {
    const week = getRoomWeek("c-512");
    expect(week?.roomId).toBe("c-512");
    expect(week?.code).toBe("C512");
    expect(week?.buildingName).toBe("Clădirea Centrală");
    expect(getRoomWeek("s-12")?.buildingName).toBe("FSEGA");
  });

  it("always returns 7 days, Monday to Sunday, even for a room without classes", () => {
    for (const id of ["c-510", "5-i"]) {
      expect(getRoomWeek(id)?.days.map((d) => d.day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    }
  });

  it("gives an empty room the whole window every day", () => {
    const week = getRoomWeek("5-i");
    for (const d of week!.days) {
      expect(d.entries).toEqual([]);
      expect(d.freeSlots).toEqual([{ start: "08:00", end: "20:00" }]);
    }
  });

  it("has only the entries of the requested room, on the right day, sorted by start", () => {
    const week = getRoomWeek("c-510")!;
    for (const d of week.days) {
      expect(d.entries.every((e) => e.roomId === "c-510" && e.day === d.day)).toBe(true);
      const starts = d.entries.map((e) => e.start);
      expect(starts).toEqual([...starts].sort());
    }
    const total = week.days.reduce((sum, d) => sum + d.entries.length, 0);
    expect(total).toBe(scheduleEntries.filter((e) => e.roomId === "c-510").length);
  });

  it("computes the free slots from each day's entries", () => {
    const week = getRoomWeek("c-510")!;
    // c-510 has back-to-back classes 08:00-16:00 on weekdays, nothing on weekends.
    expect(week.days[0].freeSlots).toEqual([{ start: "16:00", end: "20:00" }]);
    expect(week.days[5].freeSlots).toEqual([{ start: "08:00", end: "20:00" }]);
    expect(week.days[6].freeSlots).toEqual([{ start: "08:00", end: "20:00" }]);
  });
});
