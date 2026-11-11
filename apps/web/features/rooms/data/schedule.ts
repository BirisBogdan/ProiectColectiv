import type { ScheduleEntry } from "../types";

// Demo data, not the real FMI timetable. Replaced by the importer (backlog #17).
//
// What the demo covers, so every status can be tried by hand:
//   c-510  busy almost all day on weekdays, back-to-back classes 08:00-16:00
//   c-512  classes with breaks (Mon, Wed, Fri)
//   gamma  two classes a day with a long break (Tue, Thu)
//   2-i, s-12, a-101, l-001  a few classes each
//   5-i, s-10  no classes at all
//
// Odd/even weeks (`weeks`): gamma on Thursday 12:00 only in even weeks; a-101 on Friday has a
// different class at 10:00 (odd weeks) and 12:00 (even weeks).
type Day = ScheduleEntry["day"];

const entry = (
  roomId: string,
  day: Day,
  start: string,
  end: string,
  subject: string,
  group: string,
  weeks?: ScheduleEntry["weeks"],
): ScheduleEntry => ({ roomId, day, start, end, subject, group, ...(weeks ? { weeks } : {}) });

const SDA = "Structuri de date și algoritmi";
const BD = "Baze de date";
const SO = "Sisteme de operare";
const ALG = "Algebră liniară";
const PROG = "Programare orientată pe obiecte";
const ANA = "Analiză matematică";

export const scheduleEntries: ScheduleEntry[] = [
  // c-510: back-to-back, Monday to Friday
  entry("c-510", 1, "08:00", "10:00", SDA, "Seminar 211"),
  entry("c-510", 1, "10:00", "12:00", BD, "Seminar 212"),
  entry("c-510", 1, "12:00", "14:00", SO, "Seminar 213"),
  entry("c-510", 1, "14:00", "16:00", PROG, "Laborator 214"),
  entry("c-510", 2, "08:00", "10:00", ALG, "Seminar 111"),
  entry("c-510", 2, "10:00", "12:00", SDA, "Seminar 212"),
  entry("c-510", 2, "12:00", "14:00", BD, "Seminar 213"),
  entry("c-510", 2, "14:00", "16:00", ANA, "Seminar 112"),
  entry("c-510", 3, "08:00", "10:00", SO, "Seminar 211"),
  entry("c-510", 3, "10:00", "12:00", PROG, "Seminar 212"),
  entry("c-510", 3, "12:00", "14:00", SDA, "Seminar 213"),
  entry("c-510", 3, "14:00", "16:00", BD, "Laborator 214"),
  entry("c-510", 4, "08:00", "10:00", ANA, "Seminar 111"),
  entry("c-510", 4, "10:00", "12:00", ALG, "Seminar 112"),
  entry("c-510", 4, "12:00", "14:00", SO, "Seminar 212"),
  entry("c-510", 4, "14:00", "16:00", SDA, "Seminar 213"),
  entry("c-510", 5, "08:00", "10:00", PROG, "Seminar 211"),
  entry("c-510", 5, "10:00", "12:00", BD, "Seminar 212"),
  entry("c-510", 5, "12:00", "14:00", ANA, "Seminar 112"),
  entry("c-510", 5, "14:00", "16:00", SO, "Laborator 214"),

  // c-512: breaks between classes
  entry("c-512", 1, "10:00", "12:00", BD, "Seminar 221"),
  entry("c-512", 1, "14:00", "16:00", SO, "Seminar 222"),
  entry("c-512", 3, "10:00", "12:00", SDA, "Seminar 221"),
  entry("c-512", 3, "14:00", "16:00", PROG, "Seminar 222"),
  entry("c-512", 5, "10:00", "12:00", ALG, "Seminar 121"),
  entry("c-512", 5, "14:00", "16:00", BD, "Seminar 221"),

  // gamma: large lecture hall, two classes a day
  entry("gamma", 2, "08:00", "10:00", SDA, "Curs anul 2"),
  entry("gamma", 2, "12:00", "14:00", BD, "Curs anul 2"),
  entry("gamma", 4, "08:00", "10:00", SO, "Curs anul 2"),
  entry("gamma", 4, "12:00", "14:00", ANA, "Curs anul 1", "even"),

  // a few classes in the other rooms
  entry("2-i", 1, "10:00", "12:00", ANA, "Curs anul 1"),
  entry("2-i", 3, "10:00", "12:00", ALG, "Curs anul 1"),
  entry("s-12", 1, "12:00", "14:00", BD, "Seminar 231"),
  entry("s-12", 2, "16:00", "18:00", SO, "Seminar 232"),
  entry("a-101", 5, "10:00", "12:00", PROG, "Curs anul 2", "odd"),
  entry("a-101", 5, "12:00", "14:00", SDA, "Curs anul 2", "even"),
  entry("l-001", 4, "16:00", "18:00", BD, "Laborator 241"),
];
