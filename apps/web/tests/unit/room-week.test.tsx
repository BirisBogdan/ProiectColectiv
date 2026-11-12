import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RoomWeek } from "@/features/rooms/components/RoomWeek";
import type { RoomWeek as RoomWeekData } from "@/features/rooms/server/get-week";

function week(overrides: Partial<RoomWeekData> = {}): RoomWeekData {
  return {
    roomId: "c-510",
    code: "C510",
    buildingName: "Clădirea Centrală",
    days: Array.from({ length: 7 }, (_, index) => ({
      day: (index + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7,
      entries: [],
      freeSlots: [],
    })),
    ...overrides,
  };
}

describe("RoomWeek", () => {
  it("renders weekdays in order and marks today", () => {
    const html = renderToStaticMarkup(<RoomWeek week={week()} today={3} />);
    expect(html.indexOf("Luni")).toBeLessThan(html.indexOf("Marți"));
    expect(html.indexOf("Marți")).toBeLessThan(html.indexOf("Miercuri"));
    expect(html).toContain("Miercuri<span class=\"ml-2 text-sm font-normal\">(Azi)</span>");
  });

  it("hides empty weekend days and shows weekend days with entries", () => {
    const emptyWeekend = renderToStaticMarkup(<RoomWeek week={week()} today={1} />);
    expect(emptyWeekend).not.toContain("Sâmbătă");
    expect(emptyWeekend).not.toContain("Duminică");

    const withWeekend = week();
    withWeekend.days[6] = {
      ...withWeekend.days[6],
      entries: [
        {
          roomId: "c-510",
          day: 7,
          start: "10:00",
          end: "12:00",
          subject: "Baze de date",
          group: "Seminar 211",
        },
      ],
    };
    const html = renderToStaticMarkup(<RoomWeek week={withWeekend} today={1} />);
    expect(html).toContain("Duminică");
  });

  it("renders classes and free intervals in time order", () => {
    const data = week();
    data.days[0] = {
      ...data.days[0],
      entries: [
        {
          roomId: "c-510",
          day: 1,
          start: "14:00",
          end: "16:00",
          subject: "Sisteme de operare",
          group: "Seminar 212",
        },
      ],
      freeSlots: [{ start: "08:00", end: "14:00" }, { start: "16:00", end: "20:00" }],
    };
    const html = renderToStaticMarkup(<RoomWeek week={data} today={1} />);
    expect(html).toContain("Liberă 08:00–14:00");
    expect(html).toContain("14:00–16:00</span> · Sisteme de operare · Seminar 212");
    expect(html.indexOf("Liberă 08:00")).toBeLessThan(html.indexOf("Sisteme de operare"));
  });
});
