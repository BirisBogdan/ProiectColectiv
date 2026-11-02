import { describe, expect, it } from "vitest";
import { buildings } from "@/features/rooms/data/buildings";
import { rooms } from "@/features/rooms/data/rooms";

describe("demo room data", () => {
  it("has unique room ids", () => {
    const ids = rooms.map((room) => room.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("points every room at an existing building", () => {
    const buildingIds = new Set(buildings.map((building) => building.id));
    for (const room of rooms) {
      expect(buildingIds).toContain(room.buildingId);
    }
  });

  it("has rooms in every building", () => {
    for (const building of buildings) {
      expect(rooms.some((room) => room.buildingId === building.id)).toBe(true);
    }
  });
});
