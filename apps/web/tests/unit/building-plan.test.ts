import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/buildings/[id]/plan/route";
import { roomPositions } from "@/features/rooms/data/floor-plans";
import { rooms } from "@/features/rooms/data/rooms";
import { addCheckin, resetCheckins } from "@/features/rooms/server/checkins";
import { getBuildingPlan } from "@/features/rooms/server/get-plan";
import * as statusModule from "@/features/rooms/server/status";
import type { BuildingPlan } from "@/features/rooms/types";

// 2026-11-02 is a Monday; Romania is on winter time (UTC+2) then.
const monday = (hhmm: string) => new Date(`2026-11-02T${hhmm}:00+02:00`);

const params = (id: string) => ({ params: Promise.resolve({ id }) });

describe("roomPositions data", () => {
  it("has a position for every room", () => {
    for (const room of rooms) {
      expect(roomPositions[room.id], room.id).toBeDefined();
    }
  });

  it("only has keys for existing rooms", () => {
    const ids = new Set(rooms.map((r) => r.id));
    for (const id of Object.keys(roomPositions)) {
      expect(ids.has(id), id).toBe(true);
    }
  });

  it("uses rows from 1 and columns between 1 and 3", () => {
    for (const [id, { row, col }] of Object.entries(roomPositions)) {
      expect(Number.isInteger(row) && row >= 1, id).toBe(true);
      expect(Number.isInteger(col) && col >= 1 && col <= 3, id).toBe(true);
    }
  });

  it("never puts two rooms on the same floor in the same cell", () => {
    const seen = new Map<string, string>();
    for (const room of rooms) {
      const { row, col } = roomPositions[room.id];
      const key = `${room.buildingId}/${room.floor}/${row}/${col}`;
      expect(seen.get(key), `${room.id} collides with ${seen.get(key)}`).toBeUndefined();
      seen.set(key, room.id);
    }
  });
});

describe("getBuildingPlan", () => {
  beforeEach(() => {
    resetCheckins();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null for an unknown building", () => {
    expect(getBuildingPlan("nu-exista", monday("10:00"))).toBeNull();
  });

  it("contains only the building's rooms, each exactly once", () => {
    const plan = getBuildingPlan("fmi-central", monday("10:00"))!;
    expect(plan.building.id).toBe("fmi-central");

    const placed = plan.floors.flatMap((f) => f.rooms.map((r) => r.id)).sort();
    const expected = rooms
      .filter((r) => r.buildingId === "fmi-central")
      .map((r) => r.id)
      .sort();
    expect(placed).toEqual(expected);
  });

  it("sorts floors ascending and puts each room on its own floor", () => {
    const plan = getBuildingPlan("fmi-central", monday("10:00"))!;
    expect(plan.floors.map((f) => f.floor)).toEqual([0, 1, 5]);
    for (const floor of plan.floors) {
      expect(floor.rooms.every((r) => r.floor === floor.floor)).toBe(true);
    }
  });

  it("sorts rooms within a floor by row, then column", () => {
    const plan = getBuildingPlan("fsega", monday("10:00"))!;
    for (const floor of plan.floors) {
      const cells = floor.rooms.map((r) => [r.row, r.col]);
      const sorted = [...cells].sort(([ra, ca], [rb, cb]) => ra - rb || ca - cb);
      expect(cells).toEqual(sorted);
    }
  });

  it("carries the position, status and check-ins of each room", () => {
    vi.spyOn(statusModule, "computeStatus").mockImplementation((roomId) =>
      roomId === "c-510" ? { status: "occupied", until: "12:00" } : { status: "free", until: null },
    );
    addCheckin("c-510", monday("09:30"));

    const plan = getBuildingPlan("fmi-central", monday("10:00"))!;
    const c510 = plan.floors.flatMap((f) => f.rooms).find((r) => r.id === "c-510")!;
    expect(c510).toMatchObject({
      ...roomPositions["c-510"],
      status: "occupied",
      until: "12:00",
      activeCheckins: 1,
      buildingName: "Clădirea Centrală",
    });
  });
});

describe("GET /api/buildings/[id]/plan", () => {
  it("returns the plan for an existing building", async () => {
    const res = await GET(
      new Request("http://localhost:3000/api/buildings/fmi-central/plan"),
      params("fmi-central"),
    );
    expect(res.status).toBe(200);
    const plan = (await res.json()) as BuildingPlan;
    expect(plan.building.id).toBe("fmi-central");
    expect(plan.floors.map((f) => f.floor)).toEqual([0, 1, 5]);
  });

  it("returns 404 for an unknown building", async () => {
    const res = await GET(
      new Request("http://localhost:3000/api/buildings/nu-exista/plan"),
      params("nu-exista"),
    );
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Building not found" });
  });
});
