import type { RoomStatus, TimeRange } from "@/features/rooms/types";

// The strip covers the teaching day, 08:00–20:00 Romanian time.
const DAY_START = 8 * 60;
const DAY_END = 20 * 60;
export const DAY_STRIP_HOURS = ["08", "11", "14", "17", "20"];

function minutes(time: string): number {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
}

function offset(mins: number): number {
  const clamped = Math.min(Math.max(mins, DAY_START), DAY_END);
  return ((clamped - DAY_START) / (DAY_END - DAY_START)) * 100;
}

function span(from: number, to: number) {
  return { left: `${offset(from)}%`, width: `${offset(to) - offset(from)}%` };
}

/**
 * Today at a glance: grey blocks are classes, green is the free window from now until
 * the next class, the white tick is now. Decorative: the status text says the same thing.
 */
export function DayStrip({
  busy,
  now,
  status,
  until,
  className = "",
}: {
  busy: TimeRange[];
  now: string; // "HH:MM", Romanian time
  status: RoomStatus;
  until: string | null;
  className?: string;
}) {
  const current = minutes(now);
  const nowVisible = current >= DAY_START && current <= DAY_END;
  const freeEnd = status === "free" ? (until ? minutes(until) : DAY_END) : null;

  return (
    <div aria-hidden className={`relative h-1.5 rounded-sm bg-surface-3 ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        {busy.map(({ start, end }) => (
          <span
            key={`${start}-${end}`}
            className="absolute inset-y-0 bg-fg-subtle/50"
            style={span(minutes(start), minutes(end))}
          />
        ))}
        {nowVisible && freeEnd !== null && freeEnd > current && (
          <span className="absolute inset-y-0 bg-free/45" style={span(current, freeEnd)} />
        )}
      </div>
      {nowVisible && (
        <span
          className="absolute -inset-y-0.5 w-0.5 rounded-full bg-fg"
          style={{ left: `${offset(current)}%` }}
        />
      )}
    </div>
  );
}

/** Hour labels to put above a DayStrip. */
export function DayStripAxis() {
  return (
    <div aria-hidden className="flex justify-between font-mono text-[10px] text-fg-subtle">
      {DAY_STRIP_HOURS.map((hour) => (
        <span key={hour}>{hour}</span>
      ))}
    </div>
  );
}
