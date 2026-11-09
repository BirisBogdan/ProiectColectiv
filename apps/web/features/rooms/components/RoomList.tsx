"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomCard } from "@/features/rooms/components/RoomCard";
import type { RoomWithStatus } from "@/features/rooms/types";

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
        <p>Se încarcă sălile…</p>
        <div aria-hidden className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="h-36 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div role="alert" className="space-y-3">
        <p>Nu am putut încărca sălile.</p>
        <button
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Reîncearcă
        </button>
      </div>
    );
  }

  return (
    <>
      {refreshFailed && (
        <p role="status" className="text-sm text-red-700 dark:text-red-400">
          Nu am putut actualiza lista.
        </p>
      )}
      {rooms.length === 0 ? (
        <p>Nicio sală nu se potrivește filtrelor.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </>
  );
}
