import { describe, expect, it } from "vitest";
import { bucharestNow } from "@/features/rooms/server/time";

describe("bucharestNow", () => {
  it("applies UTC+2 in winter", () => {
    expect(bucharestNow(new Date("2026-11-02T10:30:00Z"))).toEqual({ day: 1, time: "12:30" });
  });

  it("applies UTC+3 in summer", () => {
    expect(bucharestNow(new Date("2026-06-15T10:30:00Z"))).toEqual({ day: 1, time: "13:30" });
  });

  it("rolls over to the Bucharest day, not the UTC one", () => {
    expect(bucharestNow(new Date("2026-11-01T22:30:00Z"))).toEqual({ day: 1, time: "00:30" });
  });

  it("maps Sunday to 7", () => {
    expect(bucharestNow(new Date("2026-11-01T10:00:00Z")).day).toBe(7);
  });
});
