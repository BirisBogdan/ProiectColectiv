import type { RoomStatus } from "@/features/rooms/types";

const STYLES: Record<RoomStatus, string> = {
  free: "bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200",
  occupied: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
  unknown: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

function label(status: RoomStatus, until: string | null): string {
  if (status === "unknown") return "Stare necunoscută";
  const base = status === "free" ? "Liberă" : "Ocupată";
  return until ? `${base} până la ${until}` : base;
}

export function StatusBadge({ status, until }: { status: RoomStatus; until: string | null }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${STYLES[status]}`}
    >
      {label(status, until)}
    </span>
  );
}
