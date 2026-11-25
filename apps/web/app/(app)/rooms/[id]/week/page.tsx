"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RoomNotFound from "@/app/(app)/rooms/not-found";
import { RoomWeek } from "@/features/rooms/components/RoomWeek";
import { bucharestNow } from "@/features/rooms/server/time";
import type { RoomWeek as RoomWeekData } from "@/features/rooms/server/get-week";
import { useMessages } from "@/lib/i18n/use-locale";

type WeekState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; week: RoomWeekData };

export default function RoomWeekPage() {
  const t = useMessages();
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<WeekState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    const request = new AbortController();

    async function loadWeek() {
      try {
        const response = await fetch(`/api/rooms/${encodeURIComponent(id)}/week`, {
          cache: "no-store",
          signal: request.signal,
        });
        if (disposed || request.signal.aborted) return;
        if (response.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        if (!response.ok) throw new Error("Unable to fetch room week");

        const week: RoomWeekData = await response.json();
        if (!disposed && !request.signal.aborted) setState({ status: "ready", week });
      } catch {
        if (!disposed && !request.signal.aborted) setState({ status: "error" });
      }
    }

    void loadWeek();
    return () => {
      disposed = true;
      request.abort();
    };
  }, [id, attempt]);

  if (state.status === "not-found") return <RoomNotFound />;

  return (
    <div className="space-y-5">
      <Link href={`/rooms/${encodeURIComponent(id)}`} className="link inline-block text-sm">
        {t.week.back}
      </Link>

      {state.status === "loading" && <p role="status" className="note">{t.week.loading}</p>}

      {state.status === "error" && (
        <div className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p role="alert" className="text-sm text-fg-muted">{t.week.error}</p>
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
          <RoomWeek week={state.week} today={bucharestNow(new Date()).day} />
          <p className="note">
            Date demonstrative, nu orarul real.
          </p>
        </>
      )}
    </div>
  );
}
