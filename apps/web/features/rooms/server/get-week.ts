import { buildings } from "../data/buildings";
import { rooms } from "../data/rooms";
import { scheduleEntries } from "../data/schedule";
import type { ScheduleEntry } from "../types";

export interface FreeSlot {
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

export interface RoomWeekDay {
  day: ScheduleEntry["day"];
  entries: ScheduleEntry[];
  freeSlots: FreeSlot[];
}

export interface RoomWeek {
  roomId: string;
  code: string;
  buildingName: string;
  days: RoomWeekDay[]; // mereu 7 zile, de luni (1) până duminică (7)
}

// The window in which we look for free time. Outside it the faculty has no classes,
// so "free" there would not help anyone.
const DAY_START = "08:00";
const DAY_END = "20:00";

const DAYS: ScheduleEntry["day"][] = [1, 2, 3, 4, 5, 6, 7];

export function freeSlots(entries: ScheduleEntry[]): FreeSlot[] {
  const sorted = entries
    .filter((e) => e.end > e.start)
    .slice() // do not reorder the caller's array
    .sort((a, b) => a.start.localeCompare(b.start));

  const slots: FreeSlot[] = [];
  let cursor = DAY_START; // everything before `cursor` is already accounted for

  for (const e of sorted) {
    if (e.end <= cursor) continue; // before the window, or inside a block we already merged
    if (e.start > cursor) {
      const end = e.start < DAY_END ? e.start : DAY_END;
      slots.push({ start: cursor, end });
    }
    if (e.end > cursor) cursor = e.end;
    if (cursor >= DAY_END) break;
  }

  if (cursor < DAY_END) slots.push({ start: cursor, end: DAY_END });
  return slots;
}

/** The whole week of a room (7 days, with free slots), or null if the room does not exist. */
export function getRoomWeek(id: string): RoomWeek | null {
  const room = rooms.find((r) => r.id === id);
  if (!room) return null;

  const building = buildings.find((b) => b.id === room.buildingId);
  const roomEntries = scheduleEntries.filter((e) => e.roomId === room.id);

  const days = DAYS.map((day) => {
    const entries = roomEntries
      .filter((e) => e.day === day)
      .sort((a, b) => a.start.localeCompare(b.start));
    return { day, entries, freeSlots: freeSlots(entries) };
  });

  return {
    roomId: room.id,
    code: room.code,
    buildingName: building?.name ?? "",
    days,
  };
}
