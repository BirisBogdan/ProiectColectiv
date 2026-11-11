// DEMO data, not the official academic calendar. Replace it with the real calendar of the
// university year when we have it (see "Ce rămâne deschis" in TODO.md).
//
// Dates are "YYYY-MM-DD" in Europe/Bucharest, both ends included. Outside these periods
// (holidays, exam sessions) we know nothing about the rooms, so their status is "unknown".
export interface TeachingPeriod {
  start: string;
  end: string;
}

export const teachingPeriods: TeachingPeriod[] = [
  { start: "2026-09-28", end: "2026-12-20" },
  { start: "2027-01-04", end: "2027-01-17" },
];
