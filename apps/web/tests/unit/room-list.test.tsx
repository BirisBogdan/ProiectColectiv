import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { RoomCard } from "@/features/rooms/components/RoomCard";
import { RoomList } from "@/features/rooms/components/RoomList";
import type { RoomWithStatus } from "@/features/rooms/types";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
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
  status: "free",
  until: "14:00",
};

describe("RoomCard", () => {
  it("links to the room and shows its details", () => {
    const html = renderToStaticMarkup(<RoomCard room={room} />);
    expect(html).toContain('href="/rooms/c-510"');
    expect(html).toContain("C510");
    expect(html).toContain("Clădirea Centrală");
    expect(html).toContain("Etaj 5");
    expect(html).toContain("40 locuri");
    expect(html).toContain("Prize");
    expect(html).not.toContain("Proiector");
    expect(html).toContain("Liberă până la 14:00");
  });
});

describe("RoomList", () => {
  it("shows a visible loading state before the request completes", () => {
    const html = renderToStaticMarkup(<RoomList />);
    expect(html).toContain("Se încarcă sălile…");
    expect(html).toContain("animate-pulse");
  });
});
