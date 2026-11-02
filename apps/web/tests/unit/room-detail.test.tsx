import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import RoomDetailPage from "@/app/(app)/rooms/[id]/page";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import { RoomSchedule } from "@/features/rooms/components/RoomSchedule";
import type { RoomWithStatus, ScheduleEntry } from "@/features/rooms/types";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "c-510" }),
}));

const room: RoomWithStatus = {
  id: "c-510",
  buildingId: "fmi-central",
  code: "C510",
  buildingName: "Clădirea Centrală",
  floor: 5,
  capacity: 40,
  hasOutlets: true,
  hasProjector: false,
  status: "occupied",
  until: "12:00",
};

function entry(overrides: Partial<ScheduleEntry> = {}): ScheduleEntry {
  return {
    roomId: "c-510",
    day: 1,
    start: "10:00",
    end: "12:00",
    subject: "Baze de date",
    group: "Seminar 211",
    ...overrides,
  };
}

function scheduleMarkup(now: string, entries = [entry()]) {
  return renderToStaticMarkup(<RoomSchedule entries={entries} now={new Date(now)} />);
}

describe("RoomHeader", () => {
  it("shows the room code, building, floor and capacity", () => {
    const html = renderToStaticMarkup(<RoomHeader room={room} />);
    expect(html).toContain("Sala C510</h1>");
    expect(html).toContain("Clădirea Centrală");
    expect(html).toMatch(/Etaj<\/dt><dd[^>]*>5<\/dd>/);
    expect(html).toContain("40 locuri");
  });

  it("labels floor zero as the ground floor", () => {
    const html = renderToStaticMarkup(<RoomHeader room={{ ...room, floor: 0 }} />);
    expect(html).toContain("Parter");
  });

  it.each([true, false])("shows both available and missing amenities (%s)", (available) => {
    const html = renderToStaticMarkup(
      <RoomHeader room={{ ...room, hasOutlets: available, hasProjector: available }} />,
    );
    const value = available ? "Da" : "Nu";
    expect(html).toMatch(new RegExp(`Prize</dt><dd[^>]*>${value}</dd>`));
    expect(html).toMatch(new RegExp(`Proiector</dt><dd[^>]*>${value}</dd>`));
  });

  it.each([
    ["free", "14:00", "Liberă până la 14:00"],
    ["free", null, "Liberă"],
    ["occupied", "12:00", "Ocupată până la 12:00"],
    ["unknown", null, "Stare necunoscută"],
  ] as const)("uses StatusBadge for %s, until=%s", (status, until, label) => {
    const html = renderToStaticMarkup(<RoomHeader room={{ ...room, status, until }} />);
    expect(html).toContain(`>${label}</span>`);
  });
});

describe("RoomSchedule", () => {
  it("shows the empty schedule message", () => {
    const html = scheduleMarkup("2026-11-02T08:30:00Z", []);
    expect(html).toContain("Nicio oră programată azi.");
    expect(html).not.toContain("<li");
  });

  it("shows the time range, subject and group for every entry in API order", () => {
    const html = scheduleMarkup("2026-11-02T05:00:00Z", [
      entry(),
      entry({ start: "14:00", end: "16:00", subject: "Sisteme de operare", group: "Seminar 212" }),
    ]);
    expect(html).toMatch(/10:00–12:00<\/span> · Baze de date · Seminar 211/);
    expect(html).toMatch(/14:00–16:00<\/span> · Sisteme de operare · Seminar 212/);
    expect(html.indexOf("Baze de date")).toBeLessThan(html.indexOf("Sisteme de operare"));
  });

  it.each([
    ["before the start", "2026-11-02T07:59:00Z", false],
    ["at the start", "2026-11-02T08:00:00Z", true],
    ["during the class", "2026-11-02T08:30:00Z", true],
    ["at the end", "2026-11-02T10:00:00Z", false],
    ["after the end", "2026-11-02T10:01:00Z", false],
  ])("marks the current class %s using Romanian winter time", (_label, now, active) => {
    const html = scheduleMarkup(now);
    expect(html.includes('aria-current="time"')).toBe(active);
    expect(html.includes("În desfășurare")).toBe(active);
  });

  it("moves the highlight to the next back-to-back class at the shared boundary", () => {
    const html = scheduleMarkup("2026-11-02T10:00:00Z", [
      entry(),
      entry({ start: "12:00", end: "14:00", subject: "Sisteme de operare" }),
    ]);
    const rows = html.match(/<li\b.*?<\/li>/g)!;
    expect(rows).toHaveLength(2);
    expect(rows[0]).not.toContain('aria-current="time"');
    expect(rows[1]).toContain('aria-current="time"');
    expect(rows[1]).toContain("În desfășurare");
  });

  it("does not highlight a class during a break", () => {
    const html = scheduleMarkup("2026-11-02T10:30:00Z", [
      entry(),
      entry({ start: "14:00", end: "16:00" }),
    ]);
    expect(html).not.toContain('aria-current="time"');
  });

  it("uses Romanian summer time instead of the browser timezone", () => {
    const html = scheduleMarkup("2026-06-15T10:30:00Z", [entry({ start: "13:00", end: "15:00" })]);
    expect(html).toContain('aria-current="time"');
  });

  it("uses the Romanian weekday when UTC is still on the previous day", () => {
    const html = scheduleMarkup("2026-11-01T22:45:00Z", [entry({ start: "00:30", end: "01:30" })]);
    expect(html).toContain('aria-current="time"');
  });

  it("does not mark an entry from another day as current", () => {
    const html = scheduleMarkup("2026-11-02T08:30:00Z", [entry({ day: 2 })]);
    expect(html).not.toContain('aria-current="time"');
  });

  it("renders API text safely", () => {
    const html = scheduleMarkup("2026-11-02T08:30:00Z", [
      entry({ subject: "<script>alert('test')</script>" }),
    ]);
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });
});

describe("RoomDetailPage", () => {
  it("renders an accessible loading state and the back link before fetching", () => {
    const html = renderToStaticMarkup(<RoomDetailPage />);
    expect(html).toContain('role="status"');
    expect(html).toContain("Se încarcă detaliile sălii…");
    expect(html).toContain('href="/rooms"');
    expect(html).toContain("← Înapoi la săli");
    expect(html).not.toContain("Sala C510");
  });
});
