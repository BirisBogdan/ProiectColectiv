import type { RoomWeek as RoomWeekData, RoomWeekDay } from "@/features/rooms/server/get-week";
import { useMessages } from "@/lib/i18n/use-locale";

type RoomWeekProps = {
  week: RoomWeekData;
  today: number;
};

type DayItem =
  | { kind: "entry"; start: string; end: string; subject: string; group: string }
  | { kind: "free"; start: string; end: string };

function dayItems(day: RoomWeekDay): DayItem[] {
  return [
    ...day.entries.map((entry) => ({
      kind: "entry" as const,
      start: entry.start,
      end: entry.end,
      subject: entry.subject,
      group: entry.group,
    })),
    ...day.freeSlots.map((slot) => ({ kind: "free" as const, ...slot })),
  ].sort((a, b) => a.start.localeCompare(b.start) || (a.kind === "free" ? -1 : 1));
}

export function RoomWeek({ week, today }: RoomWeekProps) {
  const t = useMessages();
  const visibleDays = week.days.filter(
    (day) => day.day <= 5 || day.entries.length > 0,
  );

  return (
    <section aria-labelledby="room-week-heading" className="space-y-4">
      <div>
        <h1 id="room-week-heading" className="text-2xl font-semibold">
          {t.week.title(week.code)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{week.buildingName}</p>
        {week.weeks && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t.week.week} {week.weeks === "odd" ? t.week.odd : t.week.even}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {visibleDays.map((day) => {
          const isToday = day.day === today;
          return (
            <section
              key={day.day}
              aria-labelledby={`room-week-day-${day.day}`}
              className={`rounded-lg border p-4 ${
                isToday
                  ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <h2 id={`room-week-day-${day.day}`} className="font-semibold">
                {t.days[day.day]}
                {isToday && <span className="ml-2 text-sm font-normal">({t.week.today})</span>}
              </h2>
              <ul className="mt-3 space-y-2">
                {dayItems(day).map((item) => (
                  <li
                    key={`${item.kind}-${item.start}-${item.end}-${item.kind === "entry" ? item.group : ""}`}
                    className={
                      item.kind === "free"
                        ? "text-sm text-gray-600 dark:text-gray-400"
                        : undefined
                    }
                  >
                    {item.kind === "free" ? (
                      <>{t.week.free(item.start, item.end)}</>
                    ) : (
                      <>
                        <span className="whitespace-nowrap font-medium">
                          {item.start}–{item.end}
                        </span>
                        {" · "}
                        {item.subject}
                        {" · "}
                        {item.group}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
