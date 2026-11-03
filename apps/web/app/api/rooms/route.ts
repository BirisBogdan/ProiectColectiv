import { type NextRequest, NextResponse } from "next/server";
import { listRooms } from "@/features/rooms/server/list-rooms";
import { parseFilters } from "@/features/rooms/server/parse-filters";

export const dynamic = "force-dynamic"; // status depends on the current time, no caching

export function GET(req: NextRequest) {
  return NextResponse.json(listRooms(parseFilters(req.nextUrl.searchParams), new Date()));
}
