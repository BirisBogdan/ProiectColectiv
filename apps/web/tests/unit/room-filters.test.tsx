import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  RoomFilters,
  validMinCapacity,
  validMinFreeHours,
  withParam,
} from "@/features/rooms/components/RoomFilters";

const navigation = vi.hoisted(() => ({ query: "" }));

vi.mock("next/navigation", () => ({
  usePathname: () => "/rooms",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(navigation.query),
}));

function isChecked(html: string, label: string) {
  return new RegExp(`<input[^>]*checked[^>]*/>${label}`).test(html);
}

function renderAt(query: string) {
  navigation.query = query;
  return renderToStaticMarkup(<RoomFilters />);
}

describe("withParam", () => {
  it("sets a parameter and keeps the others", () => {
    expect(withParam("buildingId=fsega", "outlets", "1")).toBe("buildingId=fsega&outlets=1");
  });

  it("removes a parameter with an empty value instead of sending it", () => {
    expect(withParam("outlets=1&projector=1", "outlets", "")).toBe("projector=1");
    expect(withParam("outlets=1", "outlets", "")).toBe("");
  });

  it("replaces an existing value", () => {
    expect(withParam("minCapacity=5", "minCapacity", "50")).toBe("minCapacity=50");
  });
});

describe("validMinCapacity", () => {
  it.each(["1", "50", " 50 "])("keeps %j", (raw) => {
    expect(validMinCapacity(raw)).toBe(raw.trim());
  });

  it.each(["", "   ", "0", "-5", "abc", null])("drops %j", (raw) => {
    expect(validMinCapacity(raw)).toBe("");
  });
});

describe("validMinFreeHours", () => {
  it.each(["1", "2", "3", " 2 "])("keeps the option %j", (raw) => {
    expect(validMinFreeHours(raw)).toBe(raw.trim());
  });

  it.each(["", "abc", "0", "-1", "4", "1.5", "2.0", null])("falls back to Oricât for %j", (raw) => {
    expect(validMinFreeHours(raw)).toBe("");
  });
});

describe("RoomFilters", () => {
  beforeEach(() => {
    navigation.query = "";
  });

  it("starts with nothing selected on a clean URL", () => {
    const html = renderAt("");
    expect(html).toMatch(/<option value="" selected="">Toate<\/option>/);
    for (const label of ["Doar libere acum", "Prize", "Proiector"]) {
      expect(isChecked(html, label)).toBe(false);
    }
  });

  it.each([
    ["freeOnly=1", "Doar libere acum"],
    ["outlets=1", "Prize"],
    ["projector=1", "Proiector"],
  ])("ticks only the checkbox from %s", (query, label) => {
    const html = renderAt(query);
    for (const other of ["Doar libere acum", "Prize", "Proiector"]) {
      expect(isChecked(html, other)).toBe(other === label);
    }
  });

  it("does not tick a checkbox for a value other than 1", () => {
    expect(isChecked(renderAt("outlets=0"), "Prize")).toBe(false);
  });

  it("restores the capacity and the building from the URL", () => {
    const html = renderAt("buildingId=fsega&minCapacity=50");
    expect(html).toMatch(/<input[^>]*type="number"[^>]*value="50"/);
    expect(html).toMatch(/<option value="fsega" selected="">/);
  });

  it("shows an empty capacity for a value the API ignores", () => {
    expect(renderAt("minCapacity=abc")).toMatch(/<input[^>]*type="number"[^>]*value=""/);
  });

  it("restores the free-for option from the URL", () => {
    expect(renderAt("minFreeHours=2")).toMatch(/<option value="2" selected="">2 ore<\/option>/);
  });

  it.each(["minFreeHours=abc", "minFreeHours=5", ""])("shows Oricât for %j", (query) => {
    expect(renderAt(query)).toMatch(/<option value="" selected="">Oricât<\/option>/);
  });
});
