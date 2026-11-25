"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoomNotFound from "@/app/(app)/rooms/not-found";
import { CheckinButton } from "@/features/rooms/components/CheckinButton";
import { DayStrip, DayStripAxis } from "@/features/rooms/components/DayStrip";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import { RoomSchedule } from "@/features/rooms/components/RoomSchedule";
import { bucharestNow } from "@/features/rooms/server/time";
import type { RoomDetail } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

type DetailState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; detail: RoomDetail; now: Date };

function RoomDetailContent({ id }: { id: string }) {
  const t = useMessages();
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
    <div className="space-y-4">
      {/* The list is beside the room (desktop) or under its sheet (phone), so this link is
          only for keyboard and screen reader users. */}
      <Link href="/rooms" className="link sr-only text-sm focus:not-sr-only focus:inline-block">
        {t.room.back}
      </Link>

      {state.status === "loading" && <p role="status" className="note">{t.room.loading}</p>}

      {state.status === "error" && (
        <div className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p role="alert" className="text-sm text-fg-muted">{t.room.error}</p>
          <button
            type="button"
            onClick={() => {
              setState({ status: "loading" });
              setAttempt((value) => value + 1);
            }}
            className="btn-secondary"
          >
            {t.rooms.retry}
          </button>
        </div>
      )}

      {state.status === "ready" && (
        <>
          <RoomHeader room={state.detail.room} />
          <div className="space-y-1.5 px-1">
            <DayStripAxis />
            <DayStrip
              busy={state.detail.today}
              now={bucharestNow(state.now).time}
              status={state.detail.room.status}
              until={state.detail.room.until}
              className="h-2.5"
            />
          </div>
          <CheckinButton roomId={id} onChange={() => setAttempt((value) => value + 1)} />
          <RoomSchedule entries={state.detail.today} now={state.now} />
          <Link href={`/rooms/${encodeURIComponent(id)}/week`} className="link inline-block text-sm">
            {t.room.viewWeek}
          </Link>
          <p className="note">
            {t.room.updated}
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
