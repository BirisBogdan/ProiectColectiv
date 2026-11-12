"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import type { RoomWithStatus } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

export function RoomHeader({ room }: { room: RoomWithStatus }) {
  const t = useMessages();
  return (
    <header className="space-y-5 rounded-xl border border-gray-200 p-4 sm:p-6 dark:border-gray-800">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h1 className="break-words text-3xl font-bold">{t.room.room(room.code)}</h1>
          <p className="break-words text-gray-600 dark:text-gray-400">{room.buildingName}</p>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-1">
          <StatusBadge status={room.status} until={room.until} />
          <CheckinSignal count={room.activeCheckins} />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">{t.room.floor}</dt>
          <dd className="font-medium">{room.floor === 0 ? t.room.groundFloor : room.floor}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">{t.room.capacityLabel}</dt>
          <dd className="font-medium">{t.room.capacity(room.capacity)}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">{t.room.outlets}</dt>
          <dd className="font-medium">{room.hasOutlets ? t.room.yes : t.room.no}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">{t.room.projector}</dt>
          <dd className="font-medium">{room.hasProjector ? t.room.yes : t.room.no}</dd>
        </div>
      </dl>
    </header>
  );
}
