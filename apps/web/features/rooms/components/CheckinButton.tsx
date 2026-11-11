"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { bucharestNow } from "@/features/rooms/server/time";
import type { Checkin } from "@/features/rooms/types";

// No login yet, so the browser remembers its own check-in. Supabase replaces this
// with a per-user row (backlog #08, #22).
export const CHECKIN_STORAGE_KEY = "ubb.checkin";

export type CheckinState = "none" | "here" | "elsewhere";

/** The stored check-in, or null if it is missing, malformed or expired. */
export function parseStoredCheckin(stored: string | null, now: Date): Checkin | null {
  if (!stored) return null;
  let value: unknown;
  try {
    value = JSON.parse(stored);
  } catch {
    return null;
  }
  if (
    typeof value !== "object" ||
    value === null ||
    !("id" in value) ||
    typeof value.id !== "string" ||
    !("roomId" in value) ||
    typeof value.roomId !== "string" ||
    !("createdAt" in value) ||
    typeof value.createdAt !== "string" ||
    !("expiresAt" in value) ||
    typeof value.expiresAt !== "string"
  ) {
    return null;
  }
  const expiresAt = new Date(value.expiresAt).getTime();
  // Same rule as the server: a check-in that expires exactly now no longer counts.
  if (!Number.isFinite(expiresAt) || expiresAt <= now.getTime()) return null;
  return {
    id: value.id,
    roomId: value.roomId,
    createdAt: value.createdAt,
    expiresAt: value.expiresAt,
  };
}

export function checkinState(stored: string | null, roomId: string, now: Date): CheckinState {
  const checkin = parseStoredCheckin(stored, now);
  if (!checkin) return "none";
  return checkin.roomId === roomId ? "here" : "elsewhere";
}

// localStorage as an external store: the "storage" event covers other tabs, the
// listeners set covers writes from this tab, which do not fire that event.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readStored(): string | null {
  try {
    return window.localStorage.getItem(CHECKIN_STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode, disabled site data)
  }
}

function writeStored(checkin: Checkin | null) {
  try {
    if (checkin) window.localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(checkin));
    else window.localStorage.removeItem(CHECKIN_STORAGE_KEY);
  } catch {
    // Nothing to do: the server still has the check-in, it just won't be remembered here.
  }
  listeners.forEach((listener) => listener());
}

// The server never sees localStorage, so it always renders "no check-in".
const serverSnapshot = () => null;

const buttonClass =
  "rounded-lg px-4 py-2 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60";

export function CheckinButton({ roomId, onChange }: { roomId: string; onChange: () => void }) {
  const stored = useSyncExternalStore(subscribe, readStored, serverSnapshot);
  const [now, setNow] = useState(() => new Date());
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  // Re-evaluate expiry once a minute, so an expired check-in disappears by itself.
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const checkin = parseStoredCheckin(stored, now);
  const state = checkinState(stored, roomId, now);

  async function checkIn() {
    setPending(true);
    setFailed(false);
    try {
      const response = await fetch(`/api/rooms/${encodeURIComponent(roomId)}/checkins`, {
        method: "POST",
      });
      if (response.status !== 201) throw new Error("Check-in failed");
      writeStored((await response.json()) as Checkin);
      setNow(new Date());
      onChange();
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  async function leave(current: Checkin) {
    setPending(true);
    setFailed(false);
    try {
      const response = await fetch(`/api/checkins/${encodeURIComponent(current.id)}`, {
        method: "DELETE",
      });
      // 404: the server already forgot it (restart, expiry), so it is gone either way.
      if (response.status !== 204 && response.status !== 404) {
        throw new Error("Check-out failed");
      }
      writeStored(null);
      onChange();
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="space-y-2" aria-label="Check-in">
      {state === "none" && (
        <button
          type="button"
          onClick={() => void checkIn()}
          disabled={pending}
          className={`${buttonClass} bg-blue-700 hover:bg-blue-800`}
        >
          Sunt aici
        </button>
      )}

      {state === "here" && checkin && (
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-medium">
            Ești aici până la {bucharestNow(new Date(checkin.expiresAt)).time}
          </p>
          <button
            type="button"
            onClick={() => void leave(checkin)}
            disabled={pending}
            className={`${buttonClass} bg-gray-700 hover:bg-gray-800`}
          >
            Am plecat
          </button>
        </div>
      )}

      {state === "elsewhere" && checkin && (
        <p>
          Ai deja check-in în altă sală.{" "}
          <Link
            href={`/rooms/${encodeURIComponent(checkin.roomId)}`}
            className="font-medium underline"
          >
            Vezi sala
          </Link>
        </p>
      )}

      {failed && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          Nu am putut salva check-in-ul.
        </p>
      )}
    </section>
  );
}
