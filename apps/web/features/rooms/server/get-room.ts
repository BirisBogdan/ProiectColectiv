import { buildings } from "../data/buildings";
import { rooms } from "../data/rooms";
import { scheduleEntries } from "../data/schedule";
import type { RoomDetail } from "../types";
import { countActiveCheckins } from "./checkins";
import { entriesToday } from "./calendar";
import { computeStatus } from "./status";

/** The room, its current status and today's classes, or null if the room does not exist. */
export function getRoomDetail(id: string, now: Date): RoomDetail | null {
  const room = rooms.find((r) => r.id === id);
  if (!room) return null;

  const building = buildings.find((b) => b.id === room.buildingId);

  return {
    room: {
      ...room,
      buildingName: building?.name ?? "",
      ...computeStatus(room.id, scheduleEntries, now),
      activeCheckins: countActiveCheckins(room.id, now),
    },
    today: entriesToday(room.id, scheduleEntries, now),
  };
}
