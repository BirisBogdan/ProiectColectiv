"use client";

import { Suspense } from "react";
import { RoomFilters } from "@/features/rooms/components/RoomFilters";
import { RoomList } from "@/features/rooms/components/RoomList";
import { useMessages } from "@/lib/i18n/use-locale";

export default function RoomsPage() {
  const t = useMessages();
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">{t.rooms.title}</h1>
      <RoomFilters />
      <Suspense fallback={<p aria-live="polite" className="note">{t.rooms.loading}</p>}>
        <RoomList />
      </Suspense>
    </div>
  );
}
