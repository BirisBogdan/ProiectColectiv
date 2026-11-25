"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import { ReportSignal } from "@/features/rooms/components/ReportSignal";
import type { RoomWithStatus } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

const CELL = "border-line px-4 py-3 sm:px-5";

export function RoomHeader({ room }: { room: RoomWithStatus }) {
  const t = useMessages();
  return (
    <header className="panel overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight break-words sm:text-3xl">
            {t.room.room(room.code)}
          </h1>
          <p className="text-sm break-words text-fg-muted">{room.buildingName}</p>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-1 sm:items-end">
          <StatusBadge status={room.status} until={room.until} />
          <CheckinSignal count={room.activeCheckins} />
          <ReportSignal room={room} />
        </div>
      </div>
      <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
        <div className={`${CELL} border-r border-b sm:border-b-0`}>
          <dt className="text-xs text-fg-subtle">{t.room.floor}</dt>
          <dd className="text-sm font-semibold">{room.floor === 0 ? t.room.groundFloor : room.floor}</dd>
        </div>
        <div className={`${CELL} border-b sm:border-r sm:border-b-0`}>
          <dt className="text-xs text-fg-subtle">{t.room.capacityLabel}</dt>
          <dd className="text-sm font-semibold tabular-nums">{t.room.capacity(room.capacity)}</dd>
        </div>
        <div className={`${CELL} border-r`}>
          <dt className="text-xs text-fg-subtle">{t.room.outlets}</dt>
          <dd className={`text-sm font-semibold ${room.hasOutlets ? "" : "text-fg-subtle"}`}>
            {room.hasOutlets ? t.room.yes : t.room.no}
          </dd>
        </div>
        <div className={CELL}>
          <dt className="text-xs text-fg-subtle">{t.room.projector}</dt>
          <dd className={`text-sm font-semibold ${room.hasProjector ? "" : "text-fg-subtle"}`}>
            {room.hasProjector ? t.room.yes : t.room.no}
          </dd>
        </div>
      </dl>
    </header>
  );
}
