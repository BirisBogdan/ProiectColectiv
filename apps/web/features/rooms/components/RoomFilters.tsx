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

const FIELD_CLASS = "field";

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

/**
 * The "free for at least" value the API will actually apply (see parseFilters), normalised
 * so "2.0" matches the "2" option. "" when the API ignores it. A shared link can carry a
 * value that is not one of the options (e.g. 7); the select must still show it.
 */
export function appliedMinFreeHours(raw: string | null): string {
  const value = raw?.trim() ?? "";
  const hours = Number(value);
  return value && Number.isFinite(hours) && hours > 0 ? String(hours) : "";
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
  const minFreeHours = appliedMinFreeHours(params.get("minFreeHours"));
  // Same idea for a value from the URL that is not one of the options: show it, not "Oricât".
  const minFreeHoursNotListed = minFreeHours && validMinFreeHours(minFreeHours) === "";
  // Building, capacity and free time sit behind the "Filtre" button; it says how many are set.
  const advancedCount = [
    buildingId,
    validMinCapacity(params.get("minCapacity")),
    minFreeHours,
  ].filter(Boolean).length;
  const [advancedOpen, setAdvancedOpen] = useState(advancedCount > 0);

  return (
    <section aria-labelledby="room-filters-title" className="space-y-2.5">
      <h2 id="room-filters-title" className="sr-only">
        {t.filters.title}
      </h2>

      <label className="relative block">
        <span className="sr-only">{t.rooms.search}</span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-fg-subtle"
        >
          ⌕
        </span>
        <input
          type="search"
          value={params.get("q") ?? ""}
          placeholder={t.rooms.search}
          onChange={(event) => setParam("q", event.target.value)}
          className={`${FIELD_CLASS} pl-8 placeholder:text-fg-subtle`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-expanded={advancedOpen}
          aria-controls="room-filters-more"
          onClick={() => setAdvancedOpen((open) => !open)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-sm font-medium text-fg transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg aria-expanded:border-line-strong aria-expanded:bg-surface-3"
        >
          {t.filters.more}
          {advancedCount > 0 && (
            <span className="text-fg-subtle tabular-nums">· {advancedCount}</span>
          )}
          <span aria-hidden className="text-[10px] text-fg-subtle">
            {advancedOpen ? "▴" : "▾"}
          </span>
        </button>
        {FLAG_FILTERS.map(({ param, key }) => (
          // A toggle chip: the checkbox stays in the DOM for keyboards and screen readers.
          <label
            key={param}
            className="group inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-fg-muted transition-colors select-none hover:border-line-strong hover:text-fg has-checked:border-line-strong has-checked:bg-surface-3 has-checked:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg"
          >
            <span
              aria-hidden
              className="grid size-3.5 place-items-center rounded-[3px] border border-line-strong text-[9px] leading-none text-transparent group-has-checked:border-fg group-has-checked:bg-fg group-has-checked:text-canvas"
            >
              ✓
            </span>
            <input
              type="checkbox"
              checked={params.get(param) === "1"}
              onChange={(event) => setParam(param, event.target.checked ? "1" : "")}
              className="sr-only"
            />
            {t.filters[key]}
          </label>
        ))}
        <button type="button" onClick={() => navigate("")} className="link ml-auto text-xs">
          {t.filters.reset}
        </button>
      </div>

      <div id="room-filters-more" hidden={!advancedOpen} className="grid grid-cols-2 gap-3 pt-1">
        <label className="col-span-2 min-w-0 space-y-1.5">
          <span className="field-label">{t.filters.building}</span>
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

        <label className="min-w-0 space-y-1.5">
          <span className="field-label">{t.filters.minCapacity}</span>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={validMinCapacity(params.get("minCapacity"))}
            onChange={(event) => setParam("minCapacity", validMinCapacity(event.target.value))}
            className={FIELD_CLASS}
          />
        </label>

        <label className="min-w-0 space-y-1.5">
          <span className="field-label">{t.filters.minFreeHours}</span>
          <select
            value={minFreeHours}
            onChange={(event) => setParam("minFreeHours", appliedMinFreeHours(event.target.value))}
            className={FIELD_CLASS}
          >
            {MIN_FREE_HOURS_OPTIONS.map(({ value }) => (
              <option key={value} value={value}>
                {value ? t.filters.hour(Number(value)) : t.filters.any}
              </option>
            ))}
            {minFreeHoursNotListed && (
              <option value={minFreeHours}>{t.filters.hour(Number(minFreeHours))}</option>
            )}
          </select>
        </label>
      </div>

      {buildingsFailed && (
        <p role="alert" className="error-text">
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
