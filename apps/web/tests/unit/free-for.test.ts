import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/rooms/route";
import { rooms } from "@/features/rooms/data/rooms";
import { isFreeFor } from "@/features/rooms/server/free-for";
import { listRooms } from "@/features/rooms/server/list-rooms";
import { parseFilters } from "@/features/rooms/server/parse-filters";
import * as statusModule from "@/features/rooms/server/status";
import type { RoomWithStatus, StatusResult } from "@/features/rooms/types";

// 2026-11-02 is a Monday; Romania is on winter time (UTC+2) then.
const monday = (hhmm: string) => new Date(`2026-11-02T${hhmm}:00+02:00`);

describe("isFreeFor", () => {
  it("is false for an occupied room", () => {
    expect(isFreeFor({ status: "occupied", until: "12:00" }, 1, monday("10:00"))).toBe(false);
    expect(isFreeFor({ status: "occupied", until: null }, 1, monday("10:00"))).toBe(false);
  });

  it("is false for an unknown room, never assumed free", () => {
    expect(isFreeFor({ status: "unknown", until: null }, 1, monday("10:00"))).toBe(false);
  });

  it("is true for a room free for the rest of the day", () => {
    expect(isFreeFor({ status: "free", until: null }, 8, monday("10:00"))).toBe(true);
  });

  it("includes the exact limit", () => {
    const free: StatusResult = { status: "free", until: "12:00" };
    expect(isFreeFor(free, 2, monday("10:00"))).toBe(true);
  });

  it("rejects a room free for one minute less than asked", () => {
    const free: StatusResult = { status: "free", until: "12:00" };
    expect(isFreeFor(free, 2, monday("10:01"))).toBe(false);
  });

  it("handles fractional hours", () => {
    const free: StatusResult = { status: "free", until: "11:30" };
    expect(isFreeFor(free, 1.5, monday("10:00"))).toBe(true);
    expect(isFreeFor(free, 1.5, monday("10:15"))).toBe(false);
  });

  it("measures the gap in Romanian time, not UTC", () => {
    // 08:00 UTC is 10:00 in Romania: 2 hours until 12:00, not 4.
    const now = new Date("2026-11-02T08:00:00Z");
    const free: StatusResult = { status: "free", until: "12:00" };
    expect(isFreeFor(free, 2, now)).toBe(true);
    expect(isFreeFor(free, 3, now)).toBe(false);
  });
});

describe("parseFilters minFreeHours", () => {
  it("parses a positive number", () => {
    expect(parseFilters(new URLSearchParams("minFreeHours=2"))).toEqual({ minFreeHours: 2 });
    expect(parseFilters(new URLSearchParams("minFreeHours=1.5"))).toEqual({ minFreeHours: 1.5 });
  });

  it("ignores invalid, empty, zero, negative or infinite values", () => {
    for (const raw of ["abc", "", "0", "-1", "Infinity"]) {
      expect(parseFilters(new URLSearchParams(`minFreeHours=${raw}`))).toEqual({});
    }
  });
});

describe("listRooms with minFreeHours", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const statusByRoom: Record<string, StatusResult> = {
    "c-510": { status: "free", until: "12:00" }, // exactly 2 h at 10:00
    "c-512": { status: "free", until: "11:00" }, // only 1 h
    "l-001": { status: "free", until: null }, // rest of the day
    "2-i": { status: "occupied", until: "14:00" },
    "5-i": { status: "unknown", until: null },
    gamma: { status: "free", until: null },
    "s-10": { status: "free", until: null }, // other building
  };

  function mockStatus() {
    vi.spyOn(statusModule, "computeStatus").mockImplementation(
      (roomId) => statusByRoom[roomId] ?? { status: "unknown", until: null },
    );
  }

  it("keeps only rooms free for at least N hours", () => {
    mockStatus();
    const result = listRooms({ minFreeHours: 2 }, monday("10:00"));
    expect(result.map((r) => r.id).sort()).toEqual(["c-510", "gamma", "l-001", "s-10"]);
  });

  it("combines with buildingId", () => {
    mockStatus();
    const result = listRooms({ buildingId: "fmi-central", minFreeHours: 2 }, monday("10:00"));
    expect(result.map((r) => r.id).sort()).toEqual(["c-510", "gamma", "l-001"]);
    expect(result.every((r) => r.buildingId === "fmi-central")).toBe(true);
  });

  it("keeps the usual sort order", () => {
    mockStatus();
    const result = listRooms({ minFreeHours: 1 }, monday("10:00"));
    const codes = result.map((r) => r.code);
    expect(codes).toEqual([...codes].sort((a, b) => a.localeCompare(b)));
  });
});

describe("GET /api/rooms?minFreeHours", () => {
  it("returns all rooms instead of an error when minFreeHours=abc", async () => {
    const res = GET(new NextRequest("http://localhost:3000/api/rooms?minFreeHours=abc"));
    expect(res.status).toBe(200);
    const data = (await res.json()) as RoomWithStatus[];
    expect(data).toHaveLength(rooms.length);
  });

  it("never returns an occupied or unknown room", async () => {
    const res = GET(new NextRequest("http://localhost:3000/api/rooms?minFreeHours=2"));
    expect(res.status).toBe(200);
    const data = (await res.json()) as RoomWithStatus[];
    expect(data.every((r) => r.status === "free")).toBe(true);
  });
});
