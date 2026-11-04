import { Suspense } from "react";
import { RoomFilters } from "@/features/rooms/components/RoomFilters";
import { RoomList } from "@/features/rooms/components/RoomList";

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Săli</h1>
      <RoomFilters />
      <Suspense fallback={<p aria-live="polite">Se încarcă sălile…</p>}>
        <RoomList />
      </Suspense>
    </div>
  );
}
