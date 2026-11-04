import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { RoomWithStatus } from "@/features/rooms/types";

export function RoomCard({ room }: { room: RoomWithStatus }) {
  return (
    <Link
      href={`/rooms/${room.id}`}
      className="block rounded-xl border border-gray-200 p-4 transition hover:border-blue-500 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-800"
    >
      <article className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">{room.code}</h2>
            <p className="truncate text-sm text-gray-600 dark:text-gray-400">
              {room.buildingName} · {room.floor === 0 ? "Parter" : `Etaj ${room.floor}`}
            </p>
          </div>
          <StatusBadge status={room.status} until={room.until} />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
          <span>{room.capacity} locuri</span>
          {room.hasOutlets && <span>Prize</span>}
          {room.hasProjector && <span>Proiector</span>}
        </div>
      </article>
    </Link>
  );
}
