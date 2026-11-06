import type { Checkin } from "../types";

// Temporary in-memory storage for the demo: check-ins are lost on restart and are
// anonymous. Supabase replaces this later (backlog #08, #22).

export const CHECKIN_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

// Kept on globalThis, not in a module-level variable: Next.js may bundle every route
// handler separately, and each bundle would otherwise get its own copy of the store
// (a check-in made through one route would be invisible to the others).
const globalStore = globalThis as typeof globalThis & { __ubbCheckins?: Map<string, Checkin> };

function store(): Map<string, Checkin> {
  globalStore.__ubbCheckins ??= new Map();
  return globalStore.__ubbCheckins;
}

function isActive(checkin: Checkin, now: Date): boolean {
  // Expiry is exclusive: a check-in made exactly 2 hours ago no longer counts.
  return new Date(checkin.expiresAt).getTime() > now.getTime();
}

function purgeExpired(now: Date): void {
  const checkins = store();
  for (const [id, checkin] of checkins) {
    if (!isActive(checkin, now)) checkins.delete(id);
  }
}

export function addCheckin(roomId: string, now: Date): Checkin {
  purgeExpired(now);
  const checkin: Checkin = {
    id: crypto.randomUUID(),
    roomId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CHECKIN_TTL_MS).toISOString(),
  };
  store().set(checkin.id, checkin);
  return checkin;
}

/** Returns false if the check-in does not exist or has already expired. */
export function removeCheckin(id: string, now: Date): boolean {
  const checkin = store().get(id);
  if (!checkin) return false;
  store().delete(id);
  return isActive(checkin, now);
}

export function countActiveCheckins(roomId: string, now: Date): number {
  let count = 0;
  for (const checkin of store().values()) {
    if (checkin.roomId === roomId && isActive(checkin, now)) count++;
  }
  return count;
}

/** Tests only. */
export function resetCheckins(): void {
  store().clear();
}
