"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import type { RoomWithStatus } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

export function RoomCard({ room }: { room: RoomWithStatus }) {
  const t = useMessages();
  return (
    <Link
      href={`/rooms/${room.id}`}
      className="block rounded-xl border border-gray-200 p-4 transition hover:border-blue-500 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-800"
    >
      <article className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">{room.code}</h2>
            <p className="truncate text-sm text-gray-600 dark:text-gray-400">
              {room.buildingName} · {room.floor === 0 ? t.room.groundFloor : `${t.room.floor} ${room.floor}`}
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-1">
            <StatusBadge status={room.status} until={room.until} />
            <CheckinSignal count={room.activeCheckins} />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
          <span>{t.room.capacity(room.capacity)}</span>
          {room.hasOutlets && <span>{t.room.outlets}</span>}
          {room.hasProjector && <span>{t.room.projector}</span>}
        </div>
      </article>
    </Link>
  );
}
