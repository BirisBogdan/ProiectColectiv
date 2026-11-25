"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal } from "@/features/rooms/components/CheckinSignal";
import type { BuildingPlan } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

export function floorTitle(floor: number, labels = { ground: "Parter", floor: "Etaj" }): string {
  return floor === 0 ? labels.ground : `${labels.floor} ${floor}`;
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
  const t = useMessages();
  if (plan.floors.length === 0) {
    return <p className="panel px-4 py-6 text-center text-sm text-fg-muted">{t.plan.empty}</p>;
  }

  return (
    <div className="space-y-5">
      {plan.floors.map(({ floor, rooms }) => (
        <section key={floor} aria-labelledby={`floor-${floor}`} className="space-y-2">
          <h2 id={`floor-${floor}`} className="text-xs font-medium tracking-wide text-fg-subtle uppercase">
            {floorTitle(floor, { ground: t.room.groundFloor, floor: t.room.floor })}
          </h2>
          <ul className="grid grid-cols-3 gap-1.5 rounded-lg border border-line bg-surface p-1.5">
            {rooms.map((room) => (
              <li key={room.id} className="min-w-0" style={{ gridRow: room.row, gridColumn: room.col }}>
                <Link
                  href={`/rooms/${room.id}`}
                  className={`flex h-full min-h-20 min-w-0 flex-col items-start justify-between gap-1.5 rounded-md border bg-surface-2 p-2.5 break-words transition-colors hover:border-fg-subtle hover:bg-surface-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${
                    room.status === "free" ? "border-free/30" : "border-line"
                  }`}
                >
                  <span className="max-w-full font-mono text-sm font-semibold break-words">{room.code}</span>
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
