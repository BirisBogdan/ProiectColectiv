import type { RoomFilters } from "./list-rooms";

export type { RoomFilters };

/**
 * Parses URL search parameters into a strongly-typed RoomFilters object.
 * Invalid or missing parameters are ignored rather than throwing errors.
 */
export function parseFilters(searchParams: URLSearchParams): RoomFilters {
  const filters: RoomFilters = {};

  const buildingId = searchParams.get("buildingId")?.trim();
  if (buildingId) {
    filters.buildingId = buildingId;
  }

  const rawMinCapacity = searchParams.get("minCapacity")?.trim();
  if (rawMinCapacity) {
    const minCapacity = Number(rawMinCapacity);
    if (Number.isFinite(minCapacity) && minCapacity > 0) {
      filters.minCapacity = minCapacity;
    }
  }

  const rawMinFreeHours = searchParams.get("minFreeHours")?.trim();
  if (rawMinFreeHours) {
    const minFreeHours = Number(rawMinFreeHours);
    if (Number.isFinite(minFreeHours) && minFreeHours > 0) {
      filters.minFreeHours = minFreeHours;
    }
  }

  if (searchParams.get("outlets") === "1") {
    filters.outlets = true;
  }

  if (searchParams.get("projector") === "1") {
    filters.projector = true;
  }

  if (searchParams.get("freeOnly") === "1") {
    filters.freeOnly = true;
  }

  return filters;
}
