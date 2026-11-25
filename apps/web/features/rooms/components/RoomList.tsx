"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ROOM_ROW_COLUMNS, RoomCard } from "@/features/rooms/components/RoomCard";
import type { RoomWithStatus } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

type LoadState = "loading" | "success" | "error";

export function isRoomList(value: unknown): value is RoomWithStatus[] {
  return (
    Array.isArray(value) &&
    value.every(
      (room: unknown) =>
        typeof room === "object" &&
        room !== null &&
        "id" in room &&
        typeof room.id === "string" &&
        "buildingId" in room &&
        typeof room.buildingId === "string" &&
        "code" in room &&
        typeof room.code === "string" &&
        "buildingName" in room &&
        typeof room.buildingName === "string" &&
        "floor" in room &&
        Number.isInteger(room.floor) &&
        "capacity" in room &&
        typeof room.capacity === "number" &&
        Number.isFinite(room.capacity) &&
        "hasOutlets" in room &&
        typeof room.hasOutlets === "boolean" &&
        "hasProjector" in room &&
        typeof room.hasProjector === "boolean" &&
        "activeCheckins" in room &&
        typeof room.activeCheckins === "number" &&
        Number.isInteger(room.activeCheckins) &&
        room.activeCheckins >= 0 &&
        "status" in room &&
        (room.status === "free" || room.status === "occupied" || room.status === "unknown") &&
        "until" in room &&
        (room.until === null || typeof room.until === "string"),
    )
  );
}

export function RoomList() {
  const t = useMessages();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [rooms, setRooms] = useState<RoomWithStatus[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [retry, setRetry] = useState(0);
  const [refreshFailed, setRefreshFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let activeRequest: AbortController | null = null;
    let hasLoaded = false;

    async function loadRooms(initial = false) {
      if (initial) {
        setState("loading");
        setRefreshFailed(false);
      }

      // A slow response must not replace a newer refresh or survive a filter change.
      activeRequest?.abort();
      const request = new AbortController();
      activeRequest = request;
      const isActive = () => !disposed && !request.signal.aborted && activeRequest === request;

      try {
        const response = await fetch(`/api/rooms${query ? `?${query}` : ""}`, {
          cache: "no-store",
          signal: request.signal,
        });
        if (!isActive()) return;
        if (!response.ok) throw new Error("Unable to fetch rooms");

        const loaded: unknown = await response.json();
        if (!isActive()) return;
        if (!isRoomList(loaded)) throw new Error("Invalid rooms response");

        hasLoaded = true;
        setRooms(loaded);
        setState("success");
        setRefreshFailed(false);
      } catch {
        if (!isActive()) return;
        if (hasLoaded) setRefreshFailed(true);
        else setState("error");
      }
    }

    void loadRooms(true);
    const interval = setInterval(() => void loadRooms(), 60_000);

    return () => {
      disposed = true;
      clearInterval(interval);
      activeRequest?.abort();
    };
  }, [query, retry]);

  if (state === "loading") {
    return (
      <div aria-live="polite" className="space-y-3">
        <p className="note">{t.rooms.loading}</p>
        <div aria-hidden className="panel divide-y divide-line overflow-hidden">
          {[1, 2, 3, 4].map((skeleton) => (
            <div key={skeleton} className="flex items-center gap-4 px-4 py-3.5">
              <div className="h-4 w-16 animate-pulse rounded bg-surface-3" />
              <div className="h-3 w-40 animate-pulse rounded bg-surface-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div role="alert" className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-fg-muted">{t.rooms.error}</p>
        <button type="button" onClick={() => setRetry((value) => value + 1)} className="btn-secondary">
          {t.rooms.retry}
        </button>
      </div>
    );
  }

  return (
    <>
      {refreshFailed && (
        <p role="status" className="error-text mb-3">
          {t.rooms.refreshError}
        </p>
      )}
      {rooms.length === 0 ? (
        <p className="panel px-4 py-8 text-center text-sm text-fg-muted">{t.rooms.empty}</p>
      ) : (
        <div className="panel overflow-hidden">
          <div
            aria-hidden
            className={`hidden gap-x-4 border-b border-line px-4 py-2 text-xs font-medium text-fg-subtle sm:grid ${ROOM_ROW_COLUMNS}`}
          >
            <span>{t.rooms.columns.room}</span>
            <span>{t.rooms.columns.location}</span>
            <span>{t.rooms.columns.capacity}</span>
            <span>{t.rooms.columns.amenities}</span>
            <span>{t.rooms.columns.status}</span>
          </div>
          <ul className="divide-y divide-line">
            {rooms.map((room) => (
              <li key={room.id}>
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
