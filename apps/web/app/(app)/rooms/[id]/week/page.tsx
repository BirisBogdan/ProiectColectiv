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
    <div className="space-y-6">
      <Link href={`/rooms/${encodeURIComponent(id)}`} className="inline-block font-medium underline">
        {t.week.back}
      </Link>

      {state.status === "loading" && <p role="status">{t.week.loading}</p>}

      {state.status === "error" && (
        <div className="space-y-3">
          <p role="alert">{t.week.error}</p>
          <button
            type="button"
            onClick={() => {
              setState({ status: "loading" });
              setAttempt((value) => value + 1);
            }}
            className="rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {t.rooms.retry}
          </button>
        </div>
      )}

      {state.status === "ready" && (
        <>
          <RoomWeek week={state.week} today={bucharestNow(new Date()).day} />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Date demonstrative, nu orarul real.
          </p>
        </>
      )}
    </div>
  );
}
