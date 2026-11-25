"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FloorPlan, isBuildingPlan } from "@/features/rooms/components/FloorPlan";
import type { Building, BuildingPlan } from "@/features/rooms/types";
import { useMessages } from "@/lib/i18n/use-locale";

// A static segment, so Next.js matches it before rooms/[id] and "plan" is never read as a room id.

type PlanState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; plan: BuildingPlan };

type BuildingsState = Building[] | "loading" | "error";

const RETRY_CLASS = "btn-secondary";

function PlanContent() {
  const t = useMessages();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("buildingId")?.trim() ?? "";

  const [buildings, setBuildings] = useState<BuildingsState>("loading");
  const [buildingsAttempt, setBuildingsAttempt] = useState(0);

  useEffect(() => {
    const request = new AbortController();

    async function loadBuildings() {
      try {
        const response = await fetch("/api/buildings", { signal: request.signal });
        if (!response.ok) throw new Error("Unable to fetch buildings");
        const loaded: Building[] = await response.json();
        if (!request.signal.aborted) setBuildings(loaded);
      } catch {
        if (!request.signal.aborted) setBuildings("error");
      }
    }

    void loadBuildings();
    return () => request.abort();
  }, [buildingsAttempt]);

  // With no building in the URL, show the first one without waiting for a click.
  const buildingId = requestedId || (Array.isArray(buildings) ? (buildings[0]?.id ?? "") : "");

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">{t.plan.title}</h1>

      <label className="block max-w-xs space-y-1.5">
        <span className="field-label">{t.plan.building}</span>
        <select
          value={buildingId}
          disabled={!Array.isArray(buildings)}
          onChange={(event) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("buildingId", event.target.value);
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className="field"
        >
          {buildingId && !(Array.isArray(buildings) && buildings.some(({ id }) => id === buildingId)) && (
            <option value={buildingId}>
              {buildings === "loading" ? t.filters.loading : t.filters.unknownBuilding}
            </option>
          )}
          {Array.isArray(buildings) &&
            buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
        </select>
      </label>

      <p className="note">
        {t.plan.schematic}
      </p>

      {buildings === "error" && !requestedId && (
        <div role="alert" className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-sm text-fg-muted">{t.filters.buildingsError}</p>
          <button
            type="button"
            onClick={() => {
              setBuildings("loading");
              setBuildingsAttempt((value) => value + 1);
            }}
            className={RETRY_CLASS}
          >
            {t.rooms.retry}
          </button>
        </div>
      )}

      {buildingId ? (
        // Keyed by building so switching resets to "loading" instead of showing the old plan.
        <BuildingPlanView key={buildingId} buildingId={buildingId} />
      ) : (
        buildings === "loading" && <p role="status" className="note">{t.plan.loading}</p>
      )}
    </div>
  );
}

function BuildingPlanView({ buildingId }: { buildingId: string }) {
  const t = useMessages();
  const [state, setState] = useState<PlanState>({ status: "loading" });
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    let activeRequest: AbortController | null = null;
    let hasLoaded = false;

    async function loadPlan() {
      // A slow response must not replace a newer refresh or survive a building change.
      activeRequest?.abort();
      const request = new AbortController();
      activeRequest = request;
      const isActive = () => !disposed && !request.signal.aborted && activeRequest === request;

      try {
        const response = await fetch(`/api/buildings/${encodeURIComponent(buildingId)}/plan`, {
          cache: "no-store",
          signal: request.signal,
        });
        if (!isActive()) return;
        if (response.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        if (!response.ok) throw new Error("Unable to fetch the building plan");

        const loaded: unknown = await response.json();
        if (!isActive()) return;
        if (!isBuildingPlan(loaded)) throw new Error("Invalid building plan response");

        hasLoaded = true;
        setState({ status: "ready", plan: loaded });
        setRefreshFailed(false);
      } catch {
        if (!isActive()) return;
        // Keep the plan already on screen; only a first load turns into an error.
        if (hasLoaded) setRefreshFailed(true);
        else setState({ status: "error" });
      }
    }

    void loadPlan();
    const interval = setInterval(() => void loadPlan(), 60_000);

    return () => {
      disposed = true;
      clearInterval(interval);
      activeRequest?.abort();
    };
  }, [buildingId, attempt]);

  if (state.status === "loading") return <p role="status" className="note">{t.plan.loading}</p>;

  if (state.status === "not-found") {
    return (
      <div className="space-y-3">
        <p role="alert" className="text-sm font-semibold">
          {t.plan.notFound}
        </p>
        <Link href="/rooms/plan" className="link text-sm">
          {t.plan.first}
        </Link>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div role="alert" className="panel flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-fg-muted">{t.plan.error}</p>
        <button
          type="button"
          onClick={() => {
            setState({ status: "loading" });
            setAttempt((value) => value + 1);
          }}
          className={RETRY_CLASS}
        >
          {t.rooms.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {refreshFailed && (
        <p role="status" className="error-text">
          {t.plan.refreshError}
        </p>
      )}
      <FloorPlan plan={state.plan} />
      <p className="note">
        {t.plan.updated}
      </p>
    </div>
  );
}

export default function RoomsPlanPage() {
  const t = useMessages();
  return (
    <Suspense fallback={<p role="status" className="note">{t.plan.loading}</p>}>
      <PlanContent />
    </Suspense>
  );
}
