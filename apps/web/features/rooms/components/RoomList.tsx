"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ROOM_ROW_COLUMNS, RoomCard } from "@/features/rooms/components/RoomCard";
import { DayStripAxis } from "@/features/rooms/components/DayStrip";
import { bucharestNow } from "@/features/rooms/server/time";
import type { RoomWithStatus, TimeRange } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

type LoadState = "loading" | "success" | "error";
type ListedRoom = RoomWithStatus & { today?: TimeRange[] };

function isTimeRanges(value: unknown): value is TimeRange[] {
  return (
    Array.isArray(value) &&
    value.every(
      (range: unknown) =>
        typeof range === "object" &&
        range !== null &&
        "start" in range &&
        typeof range.start === "string" &&
        "end" in range &&
        typeof range.end === "string",
    )
  );
}

/** The search box filters on this side: by room code or building name, ignoring case. */
export function matchesSearch(room: RoomWithStatus, search: string): boolean {
  const needle = search.trim().toLocaleLowerCase("ro");
  if (!needle) return true;
  return (
    room.code.toLocaleLowerCase("ro").includes(needle) ||
    room.buildingName.toLocaleLowerCase("ro").includes(needle)
  );
}

export function isRoomList(value: unknown): value is ListedRoom[] {
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
        (room.until === null || typeof room.until === "string") &&
        // Optional, so older responses still pass; when present it must be well formed.
        (!("today" in room) || isTimeRanges(room.today)),
    )
  );
}

export function RoomList({ selectedId = null }: { selectedId?: string | null }) {
  const t = useMessages();
  const searchParams = useSearchParams();
  const listQuery = searchParams.toString();
  // "q" is filtered here, so typing in the search box does not refetch.
  const apiParams = new URLSearchParams(searchParams);
  apiParams.delete("q");
  const query = apiParams.toString();
  const search = searchParams.get("q") ?? "";
  const [rooms, setRooms] = useState<ListedRoom[]>([]);
  const [loadedAt, setLoadedAt] = useState<Date | null>(null);
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
        setLoadedAt(new Date());
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
      <div
        role="alert"
        className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3"
      >
        <p className="text-sm text-fg-muted">{t.rooms.error}</p>
        <button
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          className="btn-secondary"
        >
          {t.rooms.retry}
        </button>
      </div>
    );
  }

  const visible = rooms.filter((room) => matchesSearch(room, search));
  const now = loadedAt ? bucharestNow(loadedAt).time : undefined;

  return (
    <>
      {refreshFailed && (
        <p role="status" className="error-text mb-3">
          {t.rooms.refreshError}
        </p>
      )}
      {visible.length === 0 ? (
        <p className="panel px-4 py-8 text-center text-sm text-fg-muted">{t.rooms.empty}</p>
      ) : (
        <div className="panel overflow-hidden">
          <div
            aria-hidden
            className={`hidden items-end gap-x-5 border-b border-line px-4 py-2 text-xs font-medium text-fg-subtle ${
              selectedId === null ? `lg:grid ${ROOM_ROW_COLUMNS}` : ""
            }`}
          >
            <span>{t.rooms.columns.room}</span>
            <span>{t.rooms.columns.location}</span>
            <span>{t.rooms.columns.capacity}</span>
            <span>{t.rooms.columns.amenities}</span>
            <div className="space-y-0.5">
              <span>{t.rooms.columns.today}</span>
              <DayStripAxis />
            </div>
            <span>{t.rooms.columns.status}</span>
          </div>
          <ul className="divide-y divide-line">
            {visible.map((room) => (
              <li key={room.id}>
                <RoomCard
                  room={room}
                  query={listQuery}
                  now={now}
                  selected={room.id === selectedId}
                  replace={selectedId !== null}
                  compact={selectedId !== null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
