"use client";

import type { RoomStatus } from "@/features/rooms/types";
import type { Messages } from "@/lib/i18n/messages";
import { useMessages } from "@/lib/i18n/use-locale";

// Graphite keeps colour for status only: a dot and coloured text, no filled pill.
const STYLES: Record<RoomStatus, string> = {
  free: "text-free",
  occupied: "text-busy",
  unknown: "text-unknown",
};

function label(t: Messages["status"], status: RoomStatus, until: string | null): string {
  if (status === "unknown") return t.unknown;
  if (status === "free") return until ? t.freeUntil(until) : t.free;
  return until ? t.occupiedUntil(until) : t.occupied;
}

export function StatusBadge({ status, until }: { status: RoomStatus; until: string | null }) {
  const t = useMessages();

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold tabular-nums ${STYLES[status]}`}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
      <span>{label(t.status, status, until)}</span>
    </span>
  );
}
