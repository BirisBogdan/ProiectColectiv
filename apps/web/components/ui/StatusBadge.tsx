"use client";

import type { RoomStatus } from "@/features/rooms/types";
import type { Messages } from "@/lib/i18n/messages";
import { useMessages } from "@/lib/i18n/use-locale";

const STYLES: Record<RoomStatus, string> = {
  free: "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200",
  occupied: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  unknown: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
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
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STYLES[status]}`}
    >
      {label(t.status, status, until)}
    </span>
  );
}
