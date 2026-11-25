import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  NOTE_MAX_LENGTH,
  noteTooLong,
  ReportProblem,
  reportBody,
  submitReport,
} from "@/features/rooms/components/ReportProblem";
import {
  ROOM_REPORT_KINDS,
  recentReportsOf,
  ReportSignal,
  reportSignalLabels,
} from "@/features/rooms/components/ReportSignal";
import { RoomCard } from "@/features/rooms/components/RoomCard";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import type { RoomWithStatus } from "@/features/rooms/types";
import { messages } from "@/lib/i18n/messages";

const room: RoomWithStatus = {
  id: "c-510",
  buildingId: "fmi-central",
  code: "C510",
  buildingName: "Clădirea Centrală",
  floor: 5,
  capacity: 40,
  hasOutlets: true,
  hasProjector: true,
  status: "free",
  until: "14:00",
  activeCheckins: 0,
};

function withReports(recentReports: unknown): RoomWithStatus {
  return { ...room, recentReports } as RoomWithStatus;
}

function fakeFetch(status: number) {
  return vi.fn<typeof fetch>(async () => new Response(null, { status }));
}

describe("submitReport", () => {
  it.each(ROOM_REPORT_KINDS)("posts the %s kind to the room's reports endpoint", async (kind) => {
    const fetchImpl = fakeFetch(201);
    await expect(submitReport("c-510", kind, "", fetchImpl)).resolves.toBe("sent");

    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("/api/rooms/c-510/reports");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body))).toEqual({ kind });
  });

  it("sends the note trimmed, and leaves out an empty one", () => {
    expect(reportBody("projector", "  nu pornește  ")).toEqual({
      kind: "projector",
      note: "nu pornește",
    });
    expect(reportBody("projector", "   ")).toEqual({ kind: "projector" });
  });

  it("encodes the room id in the URL", async () => {
    const fetchImpl = fakeFetch(201);
    await submitReport("2/I", "other", "", fetchImpl);
    expect(fetchImpl.mock.calls[0][0]).toBe("/api/rooms/2%2FI/reports");
  });

  it.each([
    [429, "duplicate"],
    [400, "failed"],
    [404, "failed"],
    [500, "failed"],
  ] as const)("answers %i with %s", async (status, outcome) => {
    await expect(submitReport("c-510", "occupied", "", fakeFetch(status))).resolves.toBe(outcome);
  });

  it("is failed when the request itself fails", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });
    await expect(submitReport("c-510", "occupied", "", fetchImpl)).resolves.toBe("failed");
  });

  it("does not send a note over 500 characters", async () => {
    const fetchImpl = fakeFetch(201);
    const note = "a".repeat(NOTE_MAX_LENGTH + 1);
    await expect(submitReport("c-510", "other", note, fetchImpl)).resolves.toBe("invalid");
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe("noteTooLong", () => {
  it("allows exactly 500 characters, not 501", () => {
    expect(noteTooLong("a".repeat(NOTE_MAX_LENGTH))).toBe(false);
    expect(noteTooLong("a".repeat(NOTE_MAX_LENGTH + 1))).toBe(true);
  });

  it("ignores surrounding spaces, like the body that is sent", () => {
    expect(noteTooLong(` ${"a".repeat(NOTE_MAX_LENGTH)} `)).toBe(false);
  });
});

describe("the messages shown after sending", () => {
  it.each([
    ["ro", "Mulțumim! Raportul a fost trimis.", "Ai raportat deja asta."],
    ["en", "Thank you! Your report was sent.", "You already reported this."],
  ] as const)("exist in %s", (locale, sent, duplicate) => {
    expect(messages[locale].report.sent).toBe(sent);
    expect(messages[locale].report.duplicate).toBe(duplicate);
  });
});

describe("ReportProblem", () => {
  it("starts closed, with only the report button", () => {
    const html = renderToStaticMarkup(<ReportProblem roomId="c-510" onReported={() => {}} />);
    expect(html).toContain("Raportează o problemă");
    expect(html).toContain("min-h-11");
    expect(html).not.toContain("<form");
  });
});

describe("recentReportsOf", () => {
  it("is null while the API does not send recentReports", () => {
    expect(recentReportsOf(room)).toBeNull();
  });

  it("keeps valid entries and drops unknown kinds and empty counts", () => {
    expect(
      recentReportsOf(
        withReports([
          { kind: "projector", count: 2 },
          { kind: "occupied", count: 0 },
          { kind: "lava", count: 3 },
          { kind: "outlets", count: 1.5 },
          null,
        ]),
      ),
    ).toEqual([{ kind: "projector", count: 2 }]);
  });
});

describe("reportSignalLabels", () => {
  it("has one line per kind, in a fixed order, in both languages", () => {
    const reports = [
      { kind: "projector", count: 2 },
      { kind: "occupied", count: 1 },
    ] as const;
    expect(reportSignalLabels([...reports])).toEqual([
      "Raportată ocupată (1)",
      "Proiector raportat defect (2)",
    ]);
    expect(reportSignalLabels([...reports], messages.en.report)).toEqual([
      "Reported occupied (1)",
      "Projector reported broken (2)",
    ]);
  });

  it("has a label for every kind", () => {
    const all = ROOM_REPORT_KINDS.map((kind) => ({ kind, count: 1 }));
    expect(reportSignalLabels(all)).toHaveLength(ROOM_REPORT_KINDS.length);
  });
});

describe("ReportSignal on the card and the header", () => {
  it.each([
    ["RoomCard", RoomCard],
    ["RoomHeader", RoomHeader],
  ] as const)("%s shows the reports and keeps the status badge", (_name, Component) => {
    const html = renderToStaticMarkup(
      <Component room={withReports([{ kind: "projector", count: 2 }])} />,
    );
    expect(html).toContain("Proiector raportat defect (2)");
    expect(html).toContain(renderToStaticMarkup(<StatusBadge status="free" until="14:00" />));
  });

  it("shows nothing without reports", () => {
    expect(renderToStaticMarkup(<ReportSignal room={room} />)).toBe("");
    expect(renderToStaticMarkup(<ReportSignal room={withReports([])} />)).toBe("");
  });
});
