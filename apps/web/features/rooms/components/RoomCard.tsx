"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import type { RoomWithStatus } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

/**
 * Column template shared by the rows and the header in RoomList: room, building · floor,
 * seats, amenities, status. Below `sm` a row collapses to two lines.
 */
export const ROOM_ROW_COLUMNS =
  "sm:grid-cols-[minmax(0,6rem)_minmax(0,1fr)_4.5rem_minmax(0,9rem)_minmax(0,12rem)]";

// On mobile the three cells share one line, so each after the first gets a "·" before it.
const SEPARATOR = "before:mr-1.5 before:content-['·'] sm:before:content-none";

export function RoomCard({ room }: { room: RoomWithStatus }) {
  const t = useMessages();
  const amenities = [room.hasOutlets && t.room.outlets, room.hasProjector && t.room.projector].filter(Boolean);

  return (
    <Link
      href={`/rooms/${room.id}`}
      className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-3 text-sm transition-colors hover:bg-surface-2 focus-visible:relative focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg ${ROOM_ROW_COLUMNS} ${
        room.status === "free" ? "" : "text-fg-muted"
      }`}
    >
      <h2 className="order-1 truncate font-mono text-[15px] font-semibold text-fg sm:order-none">{room.code}</h2>

      {/* One muted line on mobile; separate table cells from `sm` up. */}
      <p className="order-3 col-span-2 flex min-w-0 flex-wrap gap-x-1.5 text-xs text-fg-muted sm:contents sm:text-sm">
        <span className="truncate">
          {room.buildingName} · {room.floor === 0 ? t.room.groundFloor : `${t.room.floor} ${room.floor}`}
        </span>
        <span className={`tabular-nums ${SEPARATOR}`}>{t.room.capacity(room.capacity)}</span>
        <span className={`truncate ${SEPARATOR} ${amenities.length ? "" : "hidden text-fg-subtle sm:inline"}`}>
          {amenities.length ? amenities.join(" · ") : "—"}
        </span>
      </p>

      <div className="order-2 flex min-w-0 flex-col items-end gap-0.5 sm:order-none sm:items-start">
        <StatusBadge status={room.status} until={room.until} />
        <CheckinSignal count={room.activeCheckins} />
      </div>
    </Link>
  );
}
