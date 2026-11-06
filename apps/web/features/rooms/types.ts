export type RoomStatus = "free" | "occupied" | "unknown";

export interface Building {
  id: string; // ex. "fmi-central"
  name: string; // ex. "Clădirea Centrală"
  faculty: "FMI" | "FSEGA";
  address: string;
}

export interface Room {
  id: string; // ex. "c-510"
  buildingId: string;
  code: string; // codul din orar, ex. "C510"
  floor: number;
  capacity: number;
  hasOutlets: boolean; // prize
  hasProjector: boolean;
}

export interface ScheduleEntry {
  roomId: string;
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1 = luni ... 7 = duminică
  start: string; // "HH:MM", ora României
  end: string; // "HH:MM"
  subject: string; // ex. "Structuri de date și algoritmi"
  group: string; // ex. "Seminar 211"
}

export interface StatusResult {
  status: RoomStatus;
  until: string | null; // "HH:MM": ocupată până la / liberă până la; null = toată ziua
}

export interface RoomWithStatus extends Room, StatusResult {
  buildingName: string;
  activeCheckins: number; // câte check-in-uri neexpirate are sala acum
}

export interface RoomDetail {
  room: RoomWithStatus;
  today: ScheduleEntry[]; // sortate după start
}

export interface Checkin {
  id: string;
  roomId: string;
  createdAt: string; // ISO 8601
  expiresAt: string; // ISO 8601
}

export interface PlacedRoom extends RoomWithStatus {
  row: number; // de la 1
  col: number; // de la 1 la 3
}

export interface BuildingFloor {
  floor: number;
  rooms: PlacedRoom[];
}

export interface BuildingPlan {
  building: Building;
  floors: BuildingFloor[]; // sortate crescător după floor
}
