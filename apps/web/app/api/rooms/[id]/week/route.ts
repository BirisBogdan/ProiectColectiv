import { NextResponse } from "next/server";
import { getRoomWeek } from "@/features/rooms/server/get-week";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const week = getRoomWeek(id);
  if (!week) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  return NextResponse.json(week);
}
