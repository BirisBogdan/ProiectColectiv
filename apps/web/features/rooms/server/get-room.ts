import { buildings } from "../data/buildings";
import { rooms } from "../data/rooms";
import { scheduleEntries } from "../data/schedule";
import type { RoomDetail } from "../types";
import { computeStatus } from "./status";
import { bucharestNow } from "./time";

/** The room, its current status and today's classes, or null if the room does not exist. */
export function getRoomDetail(id: string, now: Date): RoomDetail | null {
  const room = rooms.find((r) => r.id === id);
  if (!room) return null;

  const building = buildings.find((b) => b.id === room.buildingId);
  const { day } = bucharestNow(now);

  const today = scheduleEntries
    .filter((e) => e.roomId === room.id && e.day === day)
    .sort((a, b) => a.start.localeCompare(b.start));

  return {
    room: {
      ...room,
      buildingName: building?.name ?? "",
      ...computeStatus(room.id, scheduleEntries, now),
    },
    today,
  };
}
