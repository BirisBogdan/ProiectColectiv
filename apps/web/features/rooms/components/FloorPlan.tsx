import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import type { BuildingPlan } from "@/features/rooms/types";

export function floorTitle(floor: number): string {
  return floor === 0 ? "Parter" : `Etaj ${floor}`;
}

/** Narrow check of a GET /api/buildings/[id]/plan body, so a bad response shows an error, not a crash. */
export function isBuildingPlan(value: unknown): value is BuildingPlan {
  if (typeof value !== "object" || value === null) return false;
  const plan = value as Partial<BuildingPlan>;
  return (
    typeof plan.building?.id === "string" &&
    typeof plan.building.name === "string" &&
    Array.isArray(plan.floors) &&
    plan.floors.every(
      (floor) =>
        Number.isInteger(floor?.floor) &&
        Array.isArray(floor.rooms) &&
        floor.rooms.every(
          (room) =>
            typeof room?.id === "string" &&
            typeof room.code === "string" &&
            Number.isInteger(room.row) &&
            Number.isInteger(room.col) &&
            (room.status === "free" || room.status === "occupied" || room.status === "unknown") &&
            (room.until === null || typeof room.until === "string") &&
            Number.isInteger(room.activeCheckins),
        ),
    )
  );
}

export function FloorPlan({ plan }: { plan: BuildingPlan }) {
  if (plan.floors.length === 0) {
    return <p>Clădirea nu are încă săli în plan.</p>;
  }

  return (
    <div className="space-y-6">
      {plan.floors.map(({ floor, rooms }) => (
        <section key={floor} aria-labelledby={`floor-${floor}`} className="space-y-2">
          <h2 id={`floor-${floor}`} className="text-lg font-semibold">
            {floorTitle(floor)}
          </h2>
          <ul className="grid grid-cols-3 gap-2 rounded-xl border border-dashed border-gray-300 p-2 dark:border-gray-700">
            {rooms.map((room) => (
              <li key={room.id} className="min-w-0" style={{ gridRow: room.row, gridColumn: room.col }}>
                <Link
                  href={`/rooms/${room.id}`}
                  className="flex h-full min-w-0 flex-col items-start gap-1 rounded-lg border border-gray-200 p-2 break-words transition hover:border-blue-500 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-800"
                >
                  <span className="max-w-full font-bold break-words">{room.code}</span>
                  <StatusBadge status={room.status} until={room.until} />
                  <CheckinSignal count={room.activeCheckins} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
