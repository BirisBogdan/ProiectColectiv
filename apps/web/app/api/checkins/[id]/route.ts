import { NextResponse } from "next/server";
import { removeCheckin } from "@/features/rooms/server/checkins";

export const dynamic = "force-dynamic";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!removeCheckin(id, new Date())) {
    return NextResponse.json({ error: "Check-in not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
