"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomCard } from "@/features/rooms/components/RoomCard";
import type { RoomWithStatus } from "@/features/rooms/types";

type LoadState = "loading" | "success" | "error";

export function RoomList() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [rooms, setRooms] = useState<RoomWithStatus[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const request = new AbortController();

    async function loadRooms() {
      setState("loading");
      try {
        const response = await fetch(`/api/rooms${query ? `?${query}` : ""}`, {
          signal: request.signal,
        });
        if (!response.ok) throw new Error("Unable to fetch rooms");

        const loaded: RoomWithStatus[] = await response.json();
        if (!request.signal.aborted) {
          setRooms(loaded);
          setState("success");
        }
      } catch {
        if (!request.signal.aborted) setState("error");
      }
    }

    void loadRooms();
    return () => request.abort();
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

  if (rooms.length === 0) {
    return <p>Nicio sală nu se potrivește filtrelor.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
