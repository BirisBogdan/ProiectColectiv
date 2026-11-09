import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckinSignal, checkinLabel } from "@/features/rooms/components/CheckinSignal";
import { RoomCard } from "@/features/rooms/components/RoomCard";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import { isRoomList } from "@/features/rooms/components/RoomList";
import type { RoomWithStatus } from "@/features/rooms/types";

const room: RoomWithStatus = {
  id: "c-510",
  buildingId: "fmi-central",
  code: "C510",
  buildingName: "Clădirea Centrală",
  floor: 5,
  capacity: 40,
  hasOutlets: true,
  hasProjector: true,
  status: "free",
  until: "14:00",
  activeCheckins: 2,
};

describe("checkinLabel", () => {
  it.each([
    [0, ""],
    [1, "1 persoană aici"],
    [2, "2 persoane aici"],
    [19, "19 persoane aici"],
    [20, "20 de persoane aici"],
    [21, "21 de persoane aici"],
  ])("labels %i check-ins as %s", (count, label) => {
    expect(checkinLabel(count)).toBe(label);
  });
});

describe("CheckinSignal", () => {
  it("renders nothing for zero check-ins", () => {
    expect(renderToStaticMarkup(<CheckinSignal count={0} />)).toBe("");
  });

  it.each([
    [1, "1 persoană aici"],
    [2, "2 persoane aici"],
    [20, "20 de persoane aici"],
  ])("shows the label for %i check-ins", (count, label) => {
    const html = renderToStaticMarkup(<CheckinSignal count={count} />);
    expect(html).toContain(`>${label}</span>`);
  });
});

describe("isRoomList check-in count validation", () => {
  it.each([0, 1, 20])("accepts the nonnegative integer %i", (activeCheckins) => {
    expect(isRoomList([{ ...room, activeCheckins }])).toBe(true);
  });

  it.each([-1, 1.5, NaN, Infinity, -Infinity, "2", null, undefined])(
    "rejects an invalid count (%s)",
    (activeCheckins) => {
      expect(isRoomList([{ ...room, activeCheckins }])).toBe(false);
    },
  );

  it("rejects a missing count", () => {
    const missingCount = { ...room };
    Reflect.deleteProperty(missingCount, "activeCheckins");
    expect(isRoomList([missingCount])).toBe(false);
  });

  it("accepts an empty list", () => {
    expect(isRoomList([])).toBe(true);
  });
});

describe.each([
  ["RoomCard", RoomCard],
  ["RoomHeader", RoomHeader],
] as const)("%s check-in signal", (_name, Component) => {
  it.each([
    ["free", "14:00", "Liberă până la 14:00"],
    ["occupied", "12:00", "Ocupată până la 12:00"],
    ["unknown", null, "Stare necunoscută"],
  ] as const)("shows two people alongside the unchanged %s badge", (status, until, label) => {
    const html = renderToStaticMarkup(<Component room={{ ...room, status, until }} />);
    const badge = renderToStaticMarkup(<StatusBadge status={status} until={until} />);

    expect(html).toContain(badge);
    expect(html).toContain(label);
    expect(html).toContain("2 persoane aici");
    if (status === "free") expect(html).not.toContain("Ocupată");
  });

  it("keeps the free badge and hides the signal for zero check-ins", () => {
    const html = renderToStaticMarkup(<Component room={{ ...room, activeCheckins: 0 }} />);

    expect(html).toContain("Liberă până la 14:00");
    expect(html).not.toContain("persoană aici");
    expect(html).not.toContain("persoane aici");
  });
});
