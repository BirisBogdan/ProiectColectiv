"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import { DayStrip } from "@/features/rooms/components/DayStrip";
import { ReportSignal } from "@/features/rooms/components/ReportSignal";
import { sheetHistory } from "@/features/rooms/room-route";
import type { RoomWithStatus, TimeRange } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

/**
 * Columns from `lg` up, shared with the header in RoomList: room, building · floor, seats,
 * amenities, today's strip, status. Below `lg`, or when compact, a row stacks into three lines.
 */
export const ROOM_ROW_COLUMNS =
  "lg:grid-cols-[minmax(0,5.5rem)_minmax(0,1.4fr)_4.5rem_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,11.5rem)]";

export function RoomCard({
  room,
  query = "",
  now,
  selected = false,
  replace = false,
  compact = false,
}: {
  room: RoomWithStatus & { today?: TimeRange[] };
  query?: string; // the list's filters, kept in the room's URL so the list stays as it was
  now?: string; // "HH:MM" Romanian time; with room.today, draws the day strip
  selected?: boolean;
  replace?: boolean; // switching rooms while one is open should not stack history entries
  compact?: boolean; // stacked even on wide screens, for the narrow list beside an open room
}) {
  const t = useMessages();
  // Classes for the wide, one-row-per-room layout; dropped when the row is compact.
  const wide = (classes: string) => (compact ? "" : classes);
  const location = `${room.buildingName} · ${
    room.floor === 0 ? t.room.groundFloor : `${t.room.floor} ${room.floor}`
  }`;
  const amenities = [
    room.hasOutlets && t.room.outlets,
    room.hasProjector && t.room.projector,
  ].filter(Boolean);

  return (
    <Link
      href={`/rooms/${room.id}${query ? `?${query}` : ""}`}
      replace={replace}
      scroll={false} // the list stays where it was under the opened room
      aria-current={selected ? "page" : undefined}
      data-selected-room={selected || undefined}
      onClick={() => {
        // A replace keeps whatever the first open set: going back must still leave the room.
        if (!replace) sheetHistory.openedFromList = true;
      }}
      className={`block px-4 py-3 transition-colors focus-visible:relative focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg ${
        selected ? "bg-surface-2 shadow-[inset_2px_0_0_var(--fg)]" : "hover:bg-surface-2"
      }`}
    >
      <article
        className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 ${wide(`lg:gap-x-5 ${ROOM_ROW_COLUMNS}`)} ${
          room.status === "free" ? "" : "opacity-65"
        }`}
      >
        <h2 className="truncate font-mono text-[15px] font-semibold">{room.code}</h2>

        <div
          className={`flex min-w-0 flex-col items-end gap-0.5 ${wide("lg:order-last lg:items-start")}`}
        >
          <StatusBadge status={room.status} until={room.until} />
          <CheckinSignal count={room.activeCheckins} />
          <ReportSignal room={room} />
        </div>

        {/* Compact rows: one muted line. Wide rows put the same facts in their own columns. */}
        <p className={`order-last col-span-2 truncate text-xs text-fg-subtle ${wide("lg:hidden")}`}>
          {[location, t.room.capacity(room.capacity), ...amenities].join(" · ")}
        </p>
        {!compact && (
          <>
            <span className="hidden truncate text-sm text-fg-muted lg:block">{location}</span>
            <span className="hidden text-sm text-fg-muted tabular-nums lg:block">
              {t.room.capacity(room.capacity)}
            </span>
            <span
              className={`hidden truncate text-sm lg:block ${amenities.length ? "text-fg-muted" : "text-fg-subtle"}`}
            >
              {amenities.length ? amenities.join(" · ") : "—"}
            </span>
          </>
        )}

        <div className={`col-span-2 ${wide("lg:col-span-1")}`}>
          {room.today && now && (
            <DayStrip busy={room.today} now={now} status={room.status} until={room.until} />
          )}
        </div>
      </article>
    </Link>
  );
}
