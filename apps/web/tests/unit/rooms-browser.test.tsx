import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DayStrip } from "@/features/rooms/components/DayStrip";
import { isRoomList, matchesSearch } from "@/features/rooms/components/RoomList";
import { selectedRoomId } from "@/features/rooms/room-route";
import { listRooms, listRoomsWithToday } from "@/features/rooms/server/list-rooms";
import type { RoomWithStatus } from "@/features/rooms/types";

const monday = (hhmm: string) => new Date(`2026-11-02T${hhmm}:00+02:00`);

const room: RoomWithStatus = {
  id: "c-510",
  buildingId: "fmi-central",
  code: "C510",
  buildingName: "Clădirea Centrală",
  floor: 5,
  capacity: 40,
  hasOutlets: true,
  hasProjector: false,
  status: "free",
  until: "14:00",
  activeCheckins: 0,
};

describe("selectedRoomId", () => {
  it.each([
    ["/rooms", null],
    ["/rooms/c-510", "c-510"],
    ["/rooms/5%2FI", "5/I"],
    ["/rooms/plan", null],
    ["/rooms/c-510/week", null],
    ["/", null],
  ])("%s -> %s", (pathname, id) => {
    expect(selectedRoomId(pathname)).toBe(id);
  });
});

describe("listRoomsWithToday", () => {
  it("adds today's class times to the same rooms, in the same order", () => {
    const now = monday("10:30");
    const withToday = listRoomsWithToday({}, now);
    expect(withToday.map((r) => r.id)).toEqual(listRooms({}, now).map((r) => r.id));
    const c510 = withToday.find((r) => r.id === "c-510")!;
    expect(c510.today[0]).toEqual({ start: "08:00", end: "10:00" });
    expect(c510.today.every((range) => Object.keys(range).join() === "start,end")).toBe(true);
  });

  it("gives rooms without classes an empty day", () => {
    expect(listRoomsWithToday({}, monday("10:30")).find((r) => r.id === "5-i")?.today).toEqual([]);
  });
});

describe("isRoomList with today", () => {
  it("accepts rows with or without a well-formed today", () => {
    expect(isRoomList([room])).toBe(true);
    expect(isRoomList([{ ...room, today: [{ start: "08:00", end: "10:00" }] }])).toBe(true);
  });

  it.each([[null], ["08:00"], [[{ start: "08:00" }]], [[{ start: 8, end: 10 }]]])(
    "rejects today=%j",
    (today) => {
      expect(isRoomList([{ ...room, today }])).toBe(false);
    },
  );
});

describe("matchesSearch", () => {
  it.each([
    ["", true],
    ["c51", true],
    ["  C510 ", true],
    ["centrală", true],
    ["fsega", false],
  ])("%j -> %s", (search, expected) => {
    expect(matchesSearch(room, search)).toBe(expected);
  });
});

describe("DayStrip", () => {
  it("draws classes, the free window until the next class and the current time", () => {
    const html = renderToStaticMarkup(
      <DayStrip
        busy={[{ start: "08:00", end: "10:00" }]}
        now="11:00"
        status="free"
        until="14:00"
      />,
    );
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("left:0%;width:16.666666666666664%"); // 08:00–10:00 of 08–20
    expect(html).toContain("left:25%;width:25%"); // free 11:00–14:00
    expect(html).toContain('left:25%"'); // now
  });

  it("has no free window when the room is occupied, and no tick outside 08–20", () => {
    const html = renderToStaticMarkup(
      <DayStrip
        busy={[{ start: "20:00", end: "22:00" }]}
        now="21:00"
        status="occupied"
        until="22:00"
      />,
    );
    expect(html).not.toContain("bg-free");
    expect(html).not.toContain('bg-fg"');
  });
});
