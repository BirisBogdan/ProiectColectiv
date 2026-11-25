"use client";

import { bucharestNow } from "@/features/rooms/server/time";
import type { ScheduleEntry } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

export function RoomSchedule({ entries, now }: { entries: ScheduleEntry[]; now: Date }) {
  const { day, time } = bucharestNow(now);
  const t = useMessages();

  return (
    <section aria-labelledby="room-schedule-heading" className="space-y-3">
      <h2 id="room-schedule-heading" className="text-base font-semibold">
        {t.schedule.title}
      </h2>
      {entries.length === 0 ? (
        <p className="panel px-4 py-6 text-center text-sm text-fg-muted">{t.schedule.empty}</p>
      ) : (
        <ul className="panel divide-y divide-line overflow-hidden">
          {entries.map((entry, index) => {
            // HH:MM strings are zero-padded; the end of a class is exclusive.
            const isCurrent = entry.day === day && entry.start <= time && time < entry.end;

            return (
              <li
                key={`${entry.roomId}-${entry.day}-${entry.start}-${entry.group}-${index}`}
                aria-current={isCurrent ? "time" : undefined}
                className={`px-4 py-3 text-sm sm:px-5 ${
                  isCurrent ? "bg-surface-2 shadow-[inset_2px_0_0_var(--fg)]" : "text-fg-muted"
                }`}
              >
                <p className="break-words">
                  <span
                    className={`font-mono text-[13px] whitespace-nowrap ${isCurrent ? "font-semibold text-fg" : "text-fg-subtle"}`}
                  >
                    {entry.start}–{entry.end}
                  </span>
                  {" · "}
                  {entry.subject}
                  {" · "}
                  {entry.group}
                </p>
                {isCurrent && (
                  <p className="mt-1.5 inline-flex rounded-sm bg-fg px-1.5 py-px text-[11px] font-semibold text-canvas">
                    {t.schedule.inProgress}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p className="note">
        {t.schedule.timezone} {t.schedule.demo}
      </p>
    </section>
  );
}
