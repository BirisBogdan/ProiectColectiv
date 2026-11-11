import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  CheckinButton,
  checkinState,
  parseStoredCheckin,
} from "@/features/rooms/components/CheckinButton";

const now = new Date("2026-11-02T10:00:00Z");

function stored(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    id: "abc",
    roomId: "c-510",
    createdAt: "2026-11-02T09:00:00Z",
    expiresAt: "2026-11-02T11:00:00Z",
    ...overrides,
  });
}

describe("checkinState", () => {
  it("is none without a stored value", () => {
    expect(checkinState(null, "c-510", now)).toBe("none");
    expect(checkinState("", "c-510", now)).toBe("none");
  });

  it.each([
    "{not json",
    "null",
    "42",
    '"text"',
    "[]",
    stored({ id: 1 }),
    stored({ expiresAt: "x" }),
  ])("is none for a broken value: %s", (value) => {
    expect(checkinState(value, "c-510", now)).toBe("none");
  });

  it("is none once the check-in has expired, including exactly at expiry", () => {
    expect(checkinState(stored({ expiresAt: "2026-11-02T09:59:00Z" }), "c-510", now)).toBe("none");
    expect(checkinState(stored({ expiresAt: "2026-11-02T10:00:00Z" }), "c-510", now)).toBe("none");
  });

  it("is here for an active check-in in this room", () => {
    expect(checkinState(stored(), "c-510", now)).toBe("here");
  });

  it("is elsewhere for an active check-in in another room", () => {
    expect(checkinState(stored(), "l-001", now)).toBe("elsewhere");
  });
});

describe("parseStoredCheckin", () => {
  it("returns only the check-in fields", () => {
    expect(parseStoredCheckin(stored({ extra: true }), now)).toEqual({
      id: "abc",
      roomId: "c-510",
      createdAt: "2026-11-02T09:00:00Z",
      expiresAt: "2026-11-02T11:00:00Z",
    });
  });
});

describe("CheckinButton", () => {
  it("renders the check-in button on the server, where localStorage is not read", () => {
    const html = renderToStaticMarkup(<CheckinButton roomId="c-510" onChange={() => {}} />);
    expect(html).toContain(">Sunt aici</button>");
    expect(html).not.toContain("Ești aici");
  });
});
