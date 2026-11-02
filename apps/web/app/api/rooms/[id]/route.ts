import { NextResponse } from "next/server";
import { getRoomDetail } from "@/features/rooms/server/get-room";

export const dynamic = "force-dynamic"; // status depends on the current time, no caching

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = getRoomDetail(id, new Date());
  if (!detail) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  return NextResponse.json(detail);
}
