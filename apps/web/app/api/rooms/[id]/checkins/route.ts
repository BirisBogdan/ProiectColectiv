import { NextResponse } from "next/server";
import { rooms } from "@/features/rooms/data/rooms";
import { addCheckin } from "@/features/rooms/server/checkins";

export const dynamic = "force-dynamic"; // check-ins change on every call, no caching

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!rooms.some((room) => room.id === id)) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  return NextResponse.json(addCheckin(id, new Date()), { status: 201 });
}
