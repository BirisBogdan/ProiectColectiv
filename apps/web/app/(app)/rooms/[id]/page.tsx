"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoomNotFound from "@/app/(app)/rooms/not-found";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import { RoomSchedule } from "@/features/rooms/components/RoomSchedule";
import type { RoomDetail } from "@/features/rooms/types";

type DetailState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; detail: RoomDetail; now: Date };

function RoomDetailContent({ id }: { id: string }) {
  const [state, setState] = useState<DetailState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    let activeRequest: AbortController | null = null;

    async function loadRoom() {
      // A slow response must not replace a newer refresh or survive navigation.
      activeRequest?.abort();
      const request = new AbortController();
      activeRequest = request;

      try {
        const response = await fetch(`/api/rooms/${encodeURIComponent(id)}`, {
          cache: "no-store",
          signal: request.signal,
        });

        if (disposed || request.signal.aborted) return;
        if (response.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        if (!response.ok) throw new Error("Unable to fetch room details");

        const detail: RoomDetail = await response.json();
        if (disposed || request.signal.aborted) return;

        setState({ status: "ready", detail, now: new Date() });
      } catch {
        if (!disposed && !request.signal.aborted) setState({ status: "error" });
      }
    }

    void loadRoom();
    const interval = setInterval(() => void loadRoom(), 60_000);

    return () => {
      disposed = true;
      clearInterval(interval);
      activeRequest?.abort();
    };
  }, [id, attempt]);

  if (state.status === "not-found") return <RoomNotFound />;

  return (
    <div className="space-y-6">
      <Link href="/rooms" className="inline-block font-medium underline">
        ← Înapoi la săli
      </Link>

      {state.status === "loading" && <p role="status">Se încarcă detaliile sălii…</p>}

      {state.status === "error" && (
        <div className="space-y-3">
          <p role="alert">Nu am putut încărca detaliile sălii.</p>
          <button
            type="button"
            onClick={() => {
              setState({ status: "loading" });
              setAttempt((value) => value + 1);
            }}
            className="rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Reîncearcă
          </button>
        </div>
      )}

      {state.status === "ready" && (
        <>
          <RoomHeader room={state.detail.room} />
          <RoomSchedule entries={state.detail.today} now={state.now} />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Informațiile se actualizează automat la fiecare 60 de secunde.
          </p>
        </>
      )}
    </div>
  );
}

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Reset the view immediately when navigating between rooms, before fetching.
  return <RoomDetailContent key={id} id={id} />;
}
