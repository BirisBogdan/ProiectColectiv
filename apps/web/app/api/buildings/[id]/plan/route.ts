import { NextResponse } from "next/server";
import { getBuildingPlan } from "@/features/rooms/server/get-plan";

export const dynamic = "force-dynamic"; // status depends on the current time, no caching

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = getBuildingPlan(id, new Date());
  if (!plan) {
    return NextResponse.json({ error: "Building not found" }, { status: 404 });
  }
  return NextResponse.json(plan);
}
