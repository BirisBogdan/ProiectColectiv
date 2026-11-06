import { beforeEach, describe, expect, it } from "vitest";
import { DELETE } from "@/app/api/checkins/[id]/route";
import { POST } from "@/app/api/rooms/[id]/checkins/route";
import { GET as getRoom } from "@/app/api/rooms/[id]/route";
import { GET as listRoomsRoute } from "@/app/api/rooms/route";
import {
  CHECKIN_TTL_MS,
  addCheckin,
  countActiveCheckins,
  removeCheckin,
  resetCheckins,
} from "@/features/rooms/server/checkins";
import { getRoomDetail } from "@/features/rooms/server/get-room";
import { listRooms } from "@/features/rooms/server/list-rooms";
import { computeStatus } from "@/features/rooms/server/status";
import { scheduleEntries } from "@/features/rooms/data/schedule";
import type { Checkin, RoomDetail, RoomWithStatus } from "@/features/rooms/types";
import { NextRequest } from "next/server";

const NOW = new Date("2026-11-02T10:30:00Z"); // Monday 12:30 in Romania
const MINUTE = 60 * 1000;

function params(id: string) {
  return { params: Promise.resolve({ id }) };
}

function post(roomId: string) {
  return POST(
    new Request(`http://localhost/api/rooms/${roomId}/checkins`, { method: "POST" }),
    params(roomId),
  );
}

function del(id: string) {
  return DELETE(
    new Request(`http://localhost/api/checkins/${id}`, { method: "DELETE" }),
    params(id),
  );
}

beforeEach(() => {
  resetCheckins();
});

describe("countActiveCheckins", () => {
  it("counts check-ins per room", () => {
    addCheckin("c-510", NOW);
    addCheckin("c-510", NOW);
    expect(countActiveCheckins("c-510", NOW)).toBe(2);
  });

  it("keeps rooms separate", () => {
    addCheckin("c-510", NOW);
    addCheckin("c-512", NOW);
    addCheckin("c-512", NOW);
    expect(countActiveCheckins("c-510", NOW)).toBe(1);
    expect(countActiveCheckins("c-512", NOW)).toBe(2);
    expect(countActiveCheckins("l-001", NOW)).toBe(0);
  });

  it("counts a check-in at 1h59m but not at exactly 2h", () => {
    addCheckin("c-510", NOW);
    expect(countActiveCheckins("c-510", new Date(NOW.getTime() + CHECKIN_TTL_MS - MINUTE))).toBe(1);
    expect(countActiveCheckins("c-510", new Date(NOW.getTime() + CHECKIN_TTL_MS))).toBe(0);
  });
});

describe("addCheckin", () => {
  it("returns a Checkin with a unique id and a 2 hour expiry", () => {
    const a = addCheckin("c-510", NOW);
    const b = addCheckin("c-510", NOW);
    expect(a.id).not.toBe(b.id);
    expect(a.roomId).toBe("c-510");
    expect(a.createdAt).toBe(NOW.toISOString());
    expect(a.expiresAt).toBe(new Date(NOW.getTime() + CHECKIN_TTL_MS).toISOString());
    expect(Object.keys(a).sort()).toEqual(["createdAt", "expiresAt", "id", "roomId"]);
  });

  it("purges expired check-ins so the store does not grow forever", () => {
    const old = addCheckin("c-510", NOW);
    const later = new Date(NOW.getTime() + CHECKIN_TTL_MS + MINUTE);
    addCheckin("c-512", later);
    // The expired one is gone from the store, not just hidden from the count.
    expect(removeCheckin(old.id, later)).toBe(false);
    expect((globalThis as { __ubbCheckins?: Map<string, Checkin> }).__ubbCheckins?.size).toBe(1);
  });
});

describe("removeCheckin", () => {
  it("removes an active check-in", () => {
    const checkin = addCheckin("c-510", NOW);
    expect(removeCheckin(checkin.id, NOW)).toBe(true);
    expect(countActiveCheckins("c-510", NOW)).toBe(0);
  });

  it("returns false for an unknown id", () => {
    expect(removeCheckin("nope", NOW)).toBe(false);
  });

  it("returns false for an expired check-in", () => {
    const checkin = addCheckin("c-510", NOW);
    expect(removeCheckin(checkin.id, new Date(NOW.getTime() + CHECKIN_TTL_MS))).toBe(false);
  });

  it("returns false the second time", () => {
    const checkin = addCheckin("c-510", NOW);
    expect(removeCheckin(checkin.id, NOW)).toBe(true);
    expect(removeCheckin(checkin.id, NOW)).toBe(false);
  });
});

describe("POST /api/rooms/[id]/checkins", () => {
  it("returns 201 with the Checkin", async () => {
    const res = await post("c-510");
    expect(res.status).toBe(201);
    const body = (await res.json()) as Checkin;
    expect(body.roomId).toBe("c-510");
    expect(typeof body.id).toBe("string");
    expect(Date.parse(body.expiresAt)).toBeGreaterThan(Date.parse(body.createdAt));
  });

  it("returns 404 for an unknown room and stores nothing", async () => {
    const res = await post("nu-exista");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Room not found" });
    expect(countActiveCheckins("nu-exista", new Date())).toBe(0);
  });

  it("is visible in GET /api/rooms/[id] and GET /api/rooms (shared storage)", async () => {
    await post("c-510");
    const detail = (await (
      await getRoom(new Request("http://localhost/api/rooms/c-510"), params("c-510"))
    ).json()) as RoomDetail;
    expect(detail.room.activeCheckins).toBe(1);

    const list = (await (
      await listRoomsRoute(new NextRequest("http://localhost/api/rooms"))
    ).json()) as RoomWithStatus[];
    expect(list.find((r) => r.id === "c-510")?.activeCheckins).toBe(1);
    expect(list.find((r) => r.id === "c-512")?.activeCheckins).toBe(0);
  });
});

describe("DELETE /api/checkins/[id]", () => {
  it("returns 204 without a body, then 404 on a second delete", async () => {
    const created = (await (await post("c-510")).json()) as Checkin;

    const res = await del(created.id);
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");

    const again = await del(created.id);
    expect(again.status).toBe(404);
    expect(await again.json()).toEqual({ error: "Check-in not found" });
  });

  it("returns 404 for an unknown id", async () => {
    const res = await del("nu-exista");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Check-in not found" });
  });
});

describe("check-ins and status", () => {
  it("change activeCheckins but never status or until", () => {
    const before = getRoomDetail("c-510", NOW)!.room;
    addCheckin("c-510", NOW);
    addCheckin("c-510", NOW);
    const after = getRoomDetail("c-510", NOW)!.room;

    expect(before.activeCheckins).toBe(0);
    expect(after.activeCheckins).toBe(2);
    expect(after.status).toBe(before.status);
    expect(after.until).toBe(before.until);
    expect({ status: after.status, until: after.until }).toEqual(
      computeStatus("c-510", scheduleEntries, NOW),
    );
  });

  it("do not change the order or the filtering of listRooms", () => {
    const ids = (filters: Parameters<typeof listRooms>[0]) =>
      listRooms(filters, NOW).map((r) => r.id);
    const before = { all: ids({}), free: ids({ freeOnly: true }) };
    for (const room of listRooms({}, NOW)) addCheckin(room.id, NOW);
    expect({ all: ids({}), free: ids({ freeOnly: true }) }).toEqual(before);
  });
});
