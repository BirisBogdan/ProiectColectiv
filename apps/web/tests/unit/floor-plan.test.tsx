import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FloorPlan, floorTitle, isBuildingPlan } from "@/features/rooms/components/FloorPlan";
import type { BuildingPlan, PlacedRoom } from "@/features/rooms/types";

function placed(overrides: Partial<PlacedRoom> & Pick<PlacedRoom, "id" | "code" | "floor">): PlacedRoom {
  return {
    buildingId: "fmi-central",
    buildingName: "Clădirea Centrală",
    capacity: 40,
    hasOutlets: false,
    hasProjector: false,
    status: "free",
    until: null,
    activeCheckins: 0,
    row: 1,
    col: 1,
    ...overrides,
  };
}

const plan: BuildingPlan = {
  building: {
    id: "fmi-central",
    name: "Clădirea Centrală",
    faculty: "FMI",
    address: "Str. Mihail Kogălniceanu 1",
  },
  floors: [
    {
      floor: 0,
      rooms: [
        placed({ id: "l-001", code: "L001", floor: 0, status: "occupied", until: "12:00" }),
        placed({ id: "gamma", code: "Gamma", floor: 0, col: 2, activeCheckins: 2 }),
      ],
    },
    {
      floor: 5,
      rooms: [placed({ id: "c-510", code: "C510", floor: 5, row: 2, col: 3, status: "unknown" })],
    },
  ],
};

describe("floorTitle", () => {
  it.each([
    [0, "Parter"],
    [1, "Etaj 1"],
    [5, "Etaj 5"],
  ])("names floor %i %s", (floor, title) => {
    expect(floorTitle(floor)).toBe(title);
  });
});

describe("FloorPlan", () => {
  const html = renderToStaticMarkup(<FloorPlan plan={plan} />);

  it("renders the floors in order, with the ground floor as Parter", () => {
    const parter = html.indexOf(">Parter</h2>");
    const etaj5 = html.indexOf(">Etaj 5</h2>");
    expect(parter).toBeGreaterThan(-1);
    expect(etaj5).toBeGreaterThan(parter);
    expect(html).not.toContain("Etaj 0");
  });

  it("links every room to its own page", () => {
    for (const id of ["l-001", "gamma", "c-510"]) {
      expect(html).toContain(`href="/rooms/${id}"`);
    }
  });

  it("places each room at its grid cell", () => {
    expect(html).toMatch(/style="grid-row:2;grid-column:3"[^]*C510/);
    expect(html).toMatch(/style="grid-row:1;grid-column:2"[^]*Gamma/);
  });

  it("shows the status as text and the check-in signal next to it", () => {
    expect(html).toContain("Ocupată până la 12:00");
    expect(html).toContain("Liberă");
    expect(html).toContain("2 persoane aici");
    expect(html).toContain("Stare necunoscută");
  });

  it("explains an empty plan instead of rendering nothing", () => {
    const empty = renderToStaticMarkup(<FloorPlan plan={{ ...plan, floors: [] }} />);
    expect(empty).toContain("Clădirea nu are încă săli în plan.");
  });
});

describe("isBuildingPlan", () => {
  it("accepts a plan", () => {
    expect(isBuildingPlan(plan)).toBe(true);
  });

  it.each([
    ["null", null],
    ["an error body", { error: "Building not found" }],
    ["floors that are not a list", { ...plan, floors: {} }],
    ["a room without a cell", { ...plan, floors: [{ floor: 0, rooms: [{ ...plan.floors[0].rooms[0], row: undefined }] }] }],
    ["a made-up status", { ...plan, floors: [{ floor: 0, rooms: [{ ...plan.floors[0].rooms[0], status: "maybe" }] }] }],
  ])("rejects %s", (_label, value) => {
    expect(isBuildingPlan(value)).toBe(false);
  });
});
