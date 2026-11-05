import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CheckinSignal, checkinLabel } from "@/features/rooms/components/CheckinSignal";

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
