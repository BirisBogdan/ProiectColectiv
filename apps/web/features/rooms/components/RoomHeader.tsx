import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import type { RoomWithStatus } from "@/features/rooms/types";

export function RoomHeader({ room }: { room: RoomWithStatus }) {
  return (
    <header className="space-y-5 rounded-xl border border-gray-200 p-4 sm:p-6 dark:border-gray-800">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h1 className="break-words text-3xl font-bold">Sala {room.code}</h1>
          <p className="break-words text-gray-600 dark:text-gray-400">{room.buildingName}</p>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-1">
          <StatusBadge status={room.status} until={room.until} />
          <CheckinSignal count={room.activeCheckins} />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">Etaj</dt>
          <dd className="font-medium">{room.floor === 0 ? "Parter" : room.floor}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">Capacitate</dt>
          <dd className="font-medium">{room.capacity} locuri</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">Prize</dt>
          <dd className="font-medium">{room.hasOutlets ? "Da" : "Nu"}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">Proiector</dt>
          <dd className="font-medium">{room.hasProjector ? "Da" : "Nu"}</dd>
        </div>
      </dl>
    </header>
  );
}
