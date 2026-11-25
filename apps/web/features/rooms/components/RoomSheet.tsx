"use client";

import { type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useMessages } from "@/lib/i18n/use-locale";

// Same length as the duration-300 transitions below.
const SLIDE_MS = 300;
// Below Tailwind's `lg` the room is a bottom sheet; from `lg` up it is a column beside the list.
const SHEET_QUERY = "(max-width: 1023.98px)";

/**
 * A room's detail: a bottom sheet over the list on phones (half height first, dragged or
 * tapped up to almost full screen), and from `lg` up a column beside the list that slides in
 * from the right. ✕ or Escape close it; on phones also a tap outside or a drag down.
 */
export function RoomSheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const t = useMessages();
  const [expanded, setExpanded] = useState(false);
  const [shown, setShown] = useState(false);
  const dragStart = useRef<number | null>(null);
  const closing = useRef(false);

  // Start off-screen, then slide in on the next frame.
  useEffect(() => {
    if (!window.matchMedia(SHEET_QUERY).matches) {
      // Desktop: the list just narrowed into a column, so bring the room into view and keep
      // the picked row visible in the list's own scroll.
      window.scrollTo({ top: 0 });
      document.querySelector("[data-selected-room]")?.scrollIntoView({ block: "nearest" });
    }
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Slide out first, then leave the room's URL.
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShown(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onClose, reduced ? 0 : SLIDE_MS);
  }, [onClose]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    // On phones the list behind the sheet must not scroll with it. On desktop the room sits
    // beside the list and the page scrolls as usual.
    const previous = document.body.style.overflow;
    if (window.matchMedia(SHEET_QUERY).matches) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [close]);

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    dragStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (dragStart.current === null) return;
    const moved = event.clientY - dragStart.current;
    dragStart.current = null;
    if (Math.abs(moved) < 8)
      setExpanded((value) => !value); // a tap
    else if (moved < 0) setExpanded(true);
    else if (expanded) setExpanded(false);
    else close();
  }

  return (
    <>
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />
      <section
        aria-label={t.rooms.details}
        className={`fixed inset-x-0 bottom-0 z-40 flex flex-col rounded-t-2xl border-t border-line-strong bg-canvas shadow-[0_-8px_24px_rgba(0,0,0,0.5)] transition-[height,translate,opacity] duration-300 ease-out motion-reduce:transition-none lg:static lg:z-auto lg:h-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none ${
          expanded ? "h-[92dvh]" : "h-[62dvh]"
        } ${
          shown
            ? "translate-y-0 lg:translate-x-0 lg:opacity-100"
            : "translate-y-full lg:translate-x-6 lg:translate-y-0 lg:opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-3 pt-1 lg:px-0 lg:pt-0 lg:pb-2">
          <span className="size-8 lg:hidden" />
          <button
            type="button"
            aria-label={t.rooms.expand}
            aria-expanded={expanded}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setExpanded((value) => !value);
              }
            }}
            className="flex h-8 w-20 touch-none items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-fg lg:hidden"
          >
            <span className="h-1 w-9 rounded-full bg-line-strong" />
          </button>
          <button
            type="button"
            aria-label={t.rooms.close}
            onClick={close}
            className="grid size-8 place-items-center rounded-full bg-surface-3 text-sm text-fg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-fg lg:ml-auto"
          >
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-1 pb-8 lg:overflow-visible lg:p-0">
          {children}
        </div>
      </section>
    </>
  );
}
