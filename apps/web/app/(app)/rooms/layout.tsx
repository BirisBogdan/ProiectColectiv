"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, Suspense, useCallback } from "react";
import { RoomFilters } from "@/features/rooms/components/RoomFilters";
import { RoomList } from "@/features/rooms/components/RoomList";
import { RoomSheet } from "@/features/rooms/components/RoomSheet";
import { selectedRoomId, sheetHistory } from "@/features/rooms/room-route";
import { useMessages } from "@/lib/i18n/use-locale";

/**
 * /rooms and /rooms/<id> share one screen: the list stays mounted (it keeps its filters,
 * scroll and refresh). With no room picked the list is full width; picking one splits the
 * screen on desktop (list left, room right) or opens a bottom sheet on phones. Other pages
 * under /rooms (plan, week) render on their own.
 */
export default function RoomsLayout({ children }: { children: ReactNode }) {
  const t = useMessages();
  const pathname = usePathname();
  const router = useRouter();
  const roomId = selectedRoomId(pathname);
  const isBrowser = pathname === "/rooms" || roomId !== null;

  const closeRoom = useCallback(() => {
    // Opened from the list: go back, so Back and the close button agree. Opened from a link:
    // there is nothing to go back to inside the app, so replace with the list.
    if (sheetHistory.openedFromList) {
      sheetHistory.openedFromList = false;
      router.back();
    } else {
      router.replace(`/rooms${window.location.search}`, { scroll: false });
    }
  }, [router]);

  if (!isBrowser) return children;

  return (
    <div
      className={`lg:grid lg:items-start lg:gap-8 ${
        roomId
          ? "lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)]"
          : "lg:grid-cols-1"
      }`}
    >
      {/* With a room open on desktop the list narrows to a column with its own scroll. */}
      <div
        className={`space-y-5 ${
          roomId
            ? "lg:sticky lg:top-22 lg:max-h-[calc(100dvh-7.5rem)] lg:overflow-y-auto lg:pr-1 lg:pb-2"
            : ""
        }`}
      >
        <h1 className="text-2xl font-semibold tracking-tight">{t.rooms.title}</h1>
        <RoomFilters />
        <Suspense
          fallback={
            <p aria-live="polite" className="note">
              {t.rooms.loading}
            </p>
          }
        >
          <RoomList selectedId={roomId} />
        </Suspense>
      </div>

      {/* /rooms/<id>: the room, beside the list on desktop or in a sheet on phones. */}
      {roomId ? (
        <RoomSheet key={roomId} onClose={closeRoom}>
          {children}
        </RoomSheet>
      ) : (
        children
      )}
    </div>
  );
}
