"use client";

import { bucharestNow } from "@/features/rooms/server/time";
import type { ScheduleEntry } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

export function RoomSchedule({ entries, now }: { entries: ScheduleEntry[]; now: Date }) {
  const { day, time } = bucharestNow(now);
  const t = useMessages();

  return (
    <section aria-labelledby="room-schedule-heading" className="space-y-3">
      <h2 id="room-schedule-heading" className="text-xl font-semibold">
        {t.schedule.title}
      </h2>
      {entries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{t.schedule.empty}</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry, index) => {
            // HH:MM strings are zero-padded; the end of a class is exclusive.
            const isCurrent = entry.day === day && entry.start <= time && time < entry.end;

            return (
              <li
                key={`${entry.roomId}-${entry.day}-${entry.start}-${entry.group}-${index}`}
                aria-current={isCurrent ? "time" : undefined}
                className={`rounded-lg border p-4 ${
                  isCurrent
                    ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <p className="break-words">
                  <span className="whitespace-nowrap font-medium">
                    {entry.start}–{entry.end}
                  </span>
                  {" · "}
                  {entry.subject}
                  {" · "}
                  {entry.group}
                </p>
                {isCurrent && (
                  <p className="mt-1 text-sm font-medium text-blue-800 dark:text-blue-200">
                    {t.schedule.inProgress}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t.schedule.timezone} {t.schedule.demo}
      </p>
    </section>
  );
}
