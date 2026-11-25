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
    <section aria-labelledby="room-week-heading" className="space-y-5">
      <div className="space-y-1">
        <h1 id="room-week-heading" className="text-2xl font-semibold tracking-tight">
          {t.week.title(week.code)}
        </h1>
        <p className="text-sm text-fg-muted">{week.buildingName}</p>
        {week.weeks && (
          <p className="inline-flex rounded-sm border border-line-strong px-1.5 py-px text-xs font-medium text-fg-muted">
            {t.week.week} {week.weeks === "odd" ? t.week.odd : t.week.even}
          </p>
        )}
      </div>

      {/* One column per day on wide screens, like a calendar; stacked on phones. */}
      <div className="grid gap-3 lg:auto-cols-fr lg:grid-flow-col">
        {visibleDays.map((day) => {
          const isToday = day.day === today;
          return (
            <section
              key={day.day}
              aria-labelledby={`room-week-day-${day.day}`}
              className={`min-w-0 overflow-hidden rounded-lg border bg-surface ${
                isToday ? "border-line-strong shadow-[inset_0_2px_0_var(--fg)]" : "border-line"
              }`}
            >
              <h2
                id={`room-week-day-${day.day}`}
                className={`border-b border-line px-3 py-2.5 text-sm font-semibold ${
                  isToday ? "bg-surface-2 text-fg" : "text-fg-muted"
                }`}
              >
                {t.days[day.day]}
                {isToday && <span className="ml-2 text-sm font-normal">({t.week.today})</span>}
              </h2>
              <ul className="divide-y divide-line">
                {dayItems(day).map((item) => (
                  <li
                    key={`${item.kind}-${item.start}-${item.end}-${item.kind === "entry" ? item.group : ""}`}
                    className={`px-3 py-2.5 text-[13px] leading-snug break-words ${
                      item.kind === "free" ? "text-free" : "text-fg"
                    }`}
                  >
                    {item.kind === "free" ? (
                      <>{t.week.free(item.start, item.end)}</>
                    ) : (
                      <>
                        <span className="font-mono text-xs whitespace-nowrap text-fg-subtle">
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
