"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, startTransition, useEffect, useOptimistic, useState } from "react";
import type { Building } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

const FLAG_FILTERS = [
  { param: "freeOnly", key: "freeOnly" },
  { param: "outlets", key: "outlets" },
  { param: "projector", key: "projector" },
] as const;

export const MIN_FREE_HOURS_OPTIONS = [
  { value: "" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
] as const;

const FIELD_CLASS =
  "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:bg-gray-900";

/** Returns the query with `name` set to `value`; an empty value removes the parameter. */
export function withParam(query: string, name: string, value: string): string {
  const params = new URLSearchParams(query);
  if (value) params.set(name, value);
  else params.delete(name);
  return params.toString();
}

/** Keeps a capacity only if the API would apply it (see parseFilters), otherwise "". */
export function validMinCapacity(raw: string | null): string {
  const value = raw?.trim() ?? "";
  const capacity = Number(value);
  return Number.isFinite(capacity) && capacity > 0 ? value : "";
}

/** Keeps a "free for at least" value only if it is one of the options, otherwise "" ("Oricât"). */
export function validMinFreeHours(raw: string | null): string {
  const value = raw?.trim() ?? "";
  return MIN_FREE_HOURS_OPTIONS.some((option) => option.value === value) ? value : "";
}

function RoomFiltersForm() {
  const t = useMessages();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The URL only changes once the navigation finishes. The optimistic copy keeps the
  // controls responsive and stops quick successive changes from overwriting each other.
  const [query, setQuery] = useOptimistic(searchParams.toString());
  const params = new URLSearchParams(query);

  const [buildings, setBuildings] = useState<Building[] | null>(null);
  const [buildingsFailed, setBuildingsFailed] = useState(false);

  useEffect(() => {
    const request = new AbortController();

    async function loadBuildings() {
      try {
        const response = await fetch("/api/buildings", { signal: request.signal });
        if (!response.ok) throw new Error("Unable to fetch buildings");
        const loaded: Building[] = await response.json();
        if (!request.signal.aborted) setBuildings(loaded);
      } catch {
        if (!request.signal.aborted) setBuildingsFailed(true);
      }
    }

    void loadBuildings();
    return () => request.abort();
  }, []);

  function navigate(nextQuery: string) {
    startTransition(() => {
      setQuery(nextQuery);
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    });
  }

  function setParam(name: string, value: string) {
    navigate(withParam(query, name, value));
  }

  const buildingId = params.get("buildingId")?.trim() ?? "";
  // Without its own option the select would show "Toate" while the list is still filtered.
  const buildingNotListed = buildingId && !buildings?.some(({ id }) => id === buildingId);

  return (
    <section aria-labelledby="room-filters-title" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 id="room-filters-title" className="font-semibold">
          {t.filters.title}
        </h2>
        <button
          type="button"
          onClick={() => navigate("")}
          className="rounded-lg px-2 py-1 text-sm font-medium underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {t.filters.reset}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className="min-w-0 space-y-1 text-sm font-medium">
          <span className="block">{t.filters.building}</span>
          <select
            value={buildingId}
            onChange={(event) => setParam("buildingId", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">{t.filters.allBuildings}</option>
            {buildingNotListed && (
              <option value={buildingId}>
                {buildings || buildingsFailed ? t.filters.unknownBuilding : t.filters.loading}
              </option>
            )}
            {buildings?.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </label>

        <label className="min-w-0 space-y-1 text-sm font-medium">
          <span className="block">{t.filters.minCapacity}</span>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={validMinCapacity(params.get("minCapacity"))}
            onChange={(event) => setParam("minCapacity", validMinCapacity(event.target.value))}
            className={FIELD_CLASS}
          />
        </label>

        <label className="min-w-0 space-y-1 text-sm font-medium">
          <span className="block">{t.filters.minFreeHours}</span>
          <select
            value={validMinFreeHours(params.get("minFreeHours"))}
            onChange={(event) => setParam("minFreeHours", validMinFreeHours(event.target.value))}
            className={FIELD_CLASS}
          >
            {MIN_FREE_HOURS_OPTIONS.map(({ value }) => (
              <option key={value} value={value}>
                {value ? t.filters.hour(Number(value)) : t.filters.any}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {FLAG_FILTERS.map(({ param, key }) => (
          <label key={param} className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={params.get(param) === "1"}
              onChange={(event) => setParam(param, event.target.checked ? "1" : "")}
              className="size-4"
            />
            {t.filters[key]}
          </label>
        ))}
      </div>

      {buildingsFailed && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {t.filters.buildingsError}
        </p>
      )}
    </section>
  );
}

export function RoomFilters() {
  // useSearchParams needs a Suspense boundary, and keeping it here means the page
  // only has to render <RoomFilters /> for the production build to pass.
  return (
    <Suspense fallback={<div aria-hidden className="h-32" />}>
      <RoomFiltersForm />
    </Suspense>
  );
}
