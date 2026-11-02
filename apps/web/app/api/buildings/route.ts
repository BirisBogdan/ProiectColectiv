import { NextResponse } from "next/server";
import { buildings } from "@/features/rooms/data/buildings";

export function GET() {
  return NextResponse.json(buildings);
}
