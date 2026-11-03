import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/rooms/route";
import { rooms } from "@/features/rooms/data/rooms";
import { listRooms } from "@/features/rooms/server/list-rooms";
import { parseFilters } from "@/features/rooms/server/parse-filters";
import * as statusModule from "@/features/rooms/server/status";
import type { RoomStatus, RoomWithStatus } from "@/features/rooms/types";

// 2026-11-02 is a Monday; Romania is on winter time (UTC+2) then.
const monday = (hhmm: string) => new Date(`2026-11-02T${hhmm}:00+02:00`);

describe("parseFilters", () => {
  it("returns an empty object when no search params are present", () => {
    expect(parseFilters(new URLSearchParams())).toEqual({});
  });

  it("parses valid filter parameters", () => {
    const params = new URLSearchParams(
      "buildingId=fmi-central&minCapacity=50&outlets=1&projector=1&freeOnly=1",
    );
    expect(parseFilters(params)).toEqual({
      buildingId: "fmi-central",
      minCapacity: 50,
      outlets: true,
      projector: true,
      freeOnly: true,
    });
  });

  it("ignores invalid, empty, zero, or negative minCapacity values", () => {
    expect(parseFilters(new URLSearchParams("minCapacity=abc"))).toEqual({});
    expect(parseFilters(new URLSearchParams("minCapacity="))).toEqual({});
    expect(parseFilters(new URLSearchParams("minCapacity=0"))).toEqual({});
    expect(parseFilters(new URLSearchParams("minCapacity=-20"))).toEqual({});
    expect(parseFilters(new URLSearchParams("minCapacity=Infinity"))).toEqual({});
  });

  it("ignores empty buildingId and boolean flags not equal to '1'", () => {
    const params = new URLSearchParams("buildingId=  &outlets=0&projector=true&freeOnly=no");
    expect(parseFilters(params)).toEqual({});
  });
});

describe("listRooms", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns all rooms with buildingName and status when no filters are applied", () => {
    const result = listRooms({}, monday("10:30"));
    expect(result).toHaveLength(rooms.length);
    for (const room of result) {
      expect(room.buildingName).toBeTruthy();
      expect(["free", "occupied", "unknown"]).toContain(room.status);
    }
  });

  it("filters by buildingId", () => {
    const fmiRooms = listRooms({ buildingId: "fmi-central" }, monday("10:30"));
    expect(fmiRooms.length).toBeGreaterThan(0);
    expect(fmiRooms.every((r) => r.buildingId === "fmi-central")).toBe(true);
    expect(fmiRooms.every((r) => r.buildingName === "Clădirea Centrală")).toBe(true);

    const fsegaRooms = listRooms({ buildingId: "fsega" }, monday("10:30"));
    expect(fsegaRooms.length).toBeGreaterThan(0);
    expect(fsegaRooms.every((r) => r.buildingId === "fsega")).toBe(true);
    expect(fsegaRooms.every((r) => r.buildingName === "FSEGA")).toBe(true);
  });

  it("filters by minCapacity", () => {
    const result = listRooms({ minCapacity: 80 }, monday("10:30"));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.capacity >= 80)).toBe(true);
  });

  it("filters by outlets", () => {
    const result = listRooms({ outlets: true }, monday("10:30"));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.hasOutlets)).toBe(true);
  });

  it("filters by projector", () => {
    const result = listRooms({ projector: true }, monday("10:30"));
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.hasProjector)).toBe(true);
  });

  it("filters by freeOnly", () => {
    const statusMap: Record<string, RoomStatus> = {
      "c-510": "occupied",
      "c-512": "free",
      "l-001": "unknown",
    };
    vi.spyOn(statusModule, "computeStatus").mockImplementation((roomId) => ({
      status: statusMap[roomId] ?? "occupied",
      until: null,
    }));

    const result = listRooms({ freeOnly: true }, monday("10:30"));
    expect(result.map((r) => r.id)).toEqual(["c-512"]);
    expect(result.every((r) => r.status === "free")).toBe(true);
  });

  it("applies multiple filters combined", () => {
    const result = listRooms(
      { buildingId: "fmi-central", projector: true, minCapacity: 100 },
      monday("10:30"),
    );
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((r) => r.buildingId === "fmi-central" && r.hasProjector && r.capacity >= 100),
    ).toBe(true);
  });

  it("sorts rooms by status (free -> occupied -> unknown) and then by code", () => {
    const statusByRoom: Record<string, RoomStatus> = {
      "c-510": "occupied", // C510
      "c-512": "free", // C512
      "l-001": "unknown", // L001
      "2-i": "free", // 2/I
      "5-i": "occupied", // 5/I
      gamma: "unknown", // Gamma
      "s-10": "free", // S10
      "s-12": "occupied", // S12
      "a-101": "unknown", // A101
    };

    vi.spyOn(statusModule, "computeStatus").mockImplementation((roomId) => ({
      status: statusByRoom[roomId] ?? "unknown",
      until: null,
    }));

    const result = listRooms({}, monday("10:30"));

    expect(result.map((r) => `${r.status}:${r.code}`)).toEqual([
      "free:2/I",
      "free:C512",
      "free:S10",
      "occupied:5/I",
      "occupied:C510",
      "occupied:S12",
      "unknown:A101",
      "unknown:Gamma",
      "unknown:L001",
    ]);
  });
});

describe("GET /api/rooms", () => {
  it("returns matching rooms for buildingId=fmi-central&projector=1", async () => {
    const req = new NextRequest(
      "http://localhost:3000/api/rooms?buildingId=fmi-central&projector=1",
    );
    const res = GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as RoomWithStatus[];
    expect(data.length).toBeGreaterThan(0);
    expect(data.every((r) => r.buildingId === "fmi-central" && r.hasProjector)).toBe(true);
  });

  it("returns all rooms instead of an error when minCapacity=abc", async () => {
    const req = new NextRequest("http://localhost:3000/api/rooms?minCapacity=abc");
    const res = GET(req);
    expect(res.status).toBe(200);
    const data = (await res.json()) as RoomWithStatus[];
    expect(data).toHaveLength(rooms.length);
  });
});
