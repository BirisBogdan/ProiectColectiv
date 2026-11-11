"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FloorPlan, isBuildingPlan } from "@/features/rooms/components/FloorPlan";
import type { Building, BuildingPlan } from "@/features/rooms/types";

// A static segment, so Next.js matches it before rooms/[id] and "plan" is never read as a room id.

type PlanState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; plan: BuildingPlan };

type BuildingsState = Building[] | "loading" | "error";

const RETRY_CLASS =
  "rounded-lg bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function PlanContent() {
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Planul clădirii</h1>

      <label className="block max-w-xs space-y-1 text-sm font-medium">
        <span className="block">Clădire</span>
        <select
          value={buildingId}
          disabled={!Array.isArray(buildings)}
          onChange={(event) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("buildingId", event.target.value);
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className="w-full min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900"
        >
          {buildingId && !(Array.isArray(buildings) && buildings.some(({ id }) => id === buildingId)) && (
            <option value={buildingId}>
              {buildings === "loading" ? "Se încarcă…" : "Clădire necunoscută"}
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

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Schemă orientativă, nu planul real al clădirii.
      </p>

      {buildings === "error" && !requestedId && (
        <div role="alert" className="space-y-3">
          <p>Nu am putut încărca clădirile.</p>
          <button
            type="button"
            onClick={() => {
              setBuildings("loading");
              setBuildingsAttempt((value) => value + 1);
            }}
            className={RETRY_CLASS}
          >
            Reîncearcă
          </button>
        </div>
      )}

      {buildingId ? (
        // Keyed by building so switching resets to "loading" instead of showing the old plan.
        <BuildingPlanView key={buildingId} buildingId={buildingId} />
      ) : (
        buildings === "loading" && <p role="status">Se încarcă planul…</p>
      )}
    </div>
  );
}

function BuildingPlanView({ buildingId }: { buildingId: string }) {
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

  if (state.status === "loading") return <p role="status">Se încarcă planul…</p>;

  if (state.status === "not-found") {
    return (
      <div className="space-y-3">
        <p role="alert" className="font-semibold">
          Clădirea nu există.
        </p>
        <Link href="/rooms/plan" className="font-medium underline">
          Vezi planul primei clădiri
        </Link>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div role="alert" className="space-y-3">
        <p>Nu am putut încărca planul clădirii.</p>
        <button
          type="button"
          onClick={() => {
            setState({ status: "loading" });
            setAttempt((value) => value + 1);
          }}
          className={RETRY_CLASS}
        >
          Reîncearcă
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {refreshFailed && (
        <p role="status" className="text-sm text-red-700 dark:text-red-400">
          Nu am putut actualiza planul.
        </p>
      )}
      <FloorPlan plan={state.plan} />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Planul se actualizează automat la fiecare 60 de secunde.
      </p>
    </div>
  );
}

export default function RoomsPlanPage() {
  return (
    <Suspense fallback={<p role="status">Se încarcă planul…</p>}>
      <PlanContent />
    </Suspense>
  );
}
