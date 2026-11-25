"use client";

import type { RoomWithStatus } from "@/features/rooms/types";
import type { Messages } from "@/lib/i18n/messages";
import { messages } from "@/lib/i18n/messages";
import { useMessages } from "@/lib/i18n/use-locale";

// The kinds and the recentReports shape are TODO-36's contract (room_reports.kind).
export const ROOM_REPORT_KINDS = [
  "occupied",
  "projector",
  "outlets",
  "wrong_schedule",
  "other",
] as const;
export type RoomReportKind = (typeof ROOM_REPORT_KINDS)[number];

export interface RecentReport {
  kind: RoomReportKind;
  count: number;
}

function isReportKind(value: unknown): value is RoomReportKind {
  return ROOM_REPORT_KINDS.some((kind) => kind === value);
}

/**
 * The room's recent reports, or null while the API does not send them yet. TODO-36 adds
 * `recentReports` to RoomWithStatus; until then the field is read defensively, so this
 * works before and after that change. Unknown kinds and empty counts are dropped.
 */
export function recentReportsOf(room: RoomWithStatus): RecentReport[] | null {
  const raw: unknown = (room as { recentReports?: unknown }).recentReports;
  if (!Array.isArray(raw)) return null;
  return raw.filter(
    (entry): entry is RecentReport =>
      typeof entry === "object" &&
      entry !== null &&
      isReportKind((entry as RecentReport).kind) &&
      Number.isInteger((entry as RecentReport).count) &&
      (entry as RecentReport).count > 0,
  );
}

/** One line per reported problem, in the order of ROOM_REPORT_KINDS. */
export function reportSignalLabels(
  reports: RecentReport[],
  t: Messages["report"] = messages.ro.report,
): string[] {
  return ROOM_REPORT_KINDS.flatMap((kind) => {
    const count = reports
      .filter((report) => report.kind === kind)
      .reduce((sum, report) => sum + report.count, 0);
    return count > 0 ? [t.signals[kind](count)] : [];
  });
}

/**
 * Next to CheckinSignal. It never replaces StatusBadge: "free per timetable" and "reported
 * occupied" are shown together, because the disagreement is the information (CLAUDE.md §4).
 */
export function ReportSignal({ room }: { room: RoomWithStatus }) {
  const t = useMessages();
  const labels = reportSignalLabels(recentReportsOf(room) ?? [], t.report);
  if (labels.length === 0) return null;

  return (
    <>
      {labels.map((label) => (
        <span key={label} className="text-xs text-busy">
          {label}
        </span>
      ))}
    </>
  );
}
