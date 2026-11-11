import { buildings } from "../data/buildings";
import { roomPositions } from "../data/floor-plans";
import type { BuildingFloor, BuildingPlan, PlacedRoom } from "../types";
import { listRooms } from "./list-rooms";

/**
 * The building's rooms grouped by floor (ascending), each room with its grid cell,
 * or null if the building does not exist.
 *
 * Statuses and check-ins come from listRooms, so they are computed in one place only.
 */
export function getBuildingPlan(id: string, now: Date): BuildingPlan | null {
  const building = buildings.find((b) => b.id === id);
  if (!building) return null;

  const byFloor = new Map<number, PlacedRoom[]>();
  for (const room of listRooms({ buildingId: id }, now)) {
    // Every room has a position (checked by building-plan.test.ts); a room without
    // one cannot be drawn, so it is left out rather than placed at a made-up cell.
    const position = roomPositions[room.id];
    if (!position) continue;

    const floorRooms = byFloor.get(room.floor) ?? [];
    floorRooms.push({ ...room, ...position });
    byFloor.set(room.floor, floorRooms);
  }

  const floors: BuildingFloor[] = [...byFloor.entries()]
    .sort(([a], [b]) => a - b)
    .map(([floor, floorRooms]) => ({
      floor,
      rooms: floorRooms.sort((a, b) => a.row - b.row || a.col - b.col),
    }));

  return { building, floors };
}
