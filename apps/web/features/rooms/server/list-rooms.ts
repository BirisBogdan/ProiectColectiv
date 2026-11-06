import { buildings } from "../data/buildings";
import { rooms } from "../data/rooms";
import { scheduleEntries } from "../data/schedule";
import type { RoomStatus, RoomWithStatus } from "../types";
import { countActiveCheckins } from "./checkins";
import { computeStatus } from "./status";

export interface RoomFilters {
  buildingId?: string;
  minCapacity?: number;
  outlets?: boolean;
  projector?: boolean;
  freeOnly?: boolean;
}

const STATUS_ORDER: Record<RoomStatus, number> = {
  free: 0,
  occupied: 1,
  unknown: 2,
};

/**
 * Lists rooms enriched with their building name and current status,
 * filtered by the given criteria and sorted by status (free -> occupied -> unknown)
 * then alphabetically by room code.
 */
export function listRooms(filters: RoomFilters, now: Date): RoomWithStatus[] {
  const buildingNames = new Map(buildings.map((b) => [b.id, b.name]));

  return rooms
    .map((room): RoomWithStatus => {
      const { status, until } = computeStatus(room.id, scheduleEntries, now);
      return {
        ...room,
        buildingName: buildingNames.get(room.buildingId) ?? "",
        status,
        until,
        activeCheckins: countActiveCheckins(room.id, now),
      };
    })
    .filter((room) => {
      if (filters.buildingId && room.buildingId !== filters.buildingId) {
        return false;
      }
      if (filters.minCapacity !== undefined && room.capacity < filters.minCapacity) {
        return false;
      }
      if (filters.outlets && !room.hasOutlets) {
        return false;
      }
      if (filters.projector && !room.hasProjector) {
        return false;
      }
      if (filters.freeOnly && room.status !== "free") {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (statusDiff !== 0) {
        return statusDiff;
      }
      return a.code.localeCompare(b.code);
    });
}
