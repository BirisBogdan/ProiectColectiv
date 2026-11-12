import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { rooms } from "@/features/rooms/data/rooms";

// The room pages below are client components that only learn a room is missing from the
// API, after the page was already sent with HTTP 200. Checking here makes /rooms/<unknown>
// and /rooms/<unknown>/week answer 404 (with rooms/not-found.tsx) from the server too.
// When rooms move to Supabase, swap the lookup, not the pages.
export default async function RoomLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!rooms.some((room) => room.id === id)) notFound();
  return children;
}
