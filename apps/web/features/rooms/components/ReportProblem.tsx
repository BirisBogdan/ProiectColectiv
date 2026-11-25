"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ROOM_REPORT_KINDS, type RoomReportKind } from "@/features/rooms/components/ReportSignal";
import { useMessages } from "@/lib/i18n/use-locale";

// Same limit as the room_reports.note check in TODO-36.
export const NOTE_MAX_LENGTH = 500;

export type ReportOutcome = "sent" | "duplicate" | "invalid" | "failed";

export function noteTooLong(note: string): boolean {
  return note.trim().length > NOTE_MAX_LENGTH;
}

/** The POST body of TODO-36: `{ kind, note? }`, without an empty note. */
export function reportBody(
  kind: RoomReportKind,
  note: string,
): { kind: RoomReportKind; note?: string } {
  const trimmed = note.trim();
  return trimmed ? { kind, note: trimmed } : { kind };
}

/** Sends a report to POST /api/rooms/{id}/reports and says how it went. */
export async function submitReport(
  roomId: string,
  kind: RoomReportKind,
  note: string,
  fetchImpl: typeof fetch = fetch,
): Promise<ReportOutcome> {
  if (noteTooLong(note)) return "invalid";
  try {
    const response = await fetchImpl(`/api/rooms/${encodeURIComponent(roomId)}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportBody(kind, note)),
    });
    if (response.status === 201) return "sent";
    if (response.status === 429) return "duplicate";
    return "failed";
  } catch {
    return "failed";
  }
}

// At least 44px high, so they are easy to hit on a phone.
const TOUCH = "min-h-11";

export function ReportProblem({ roomId, onReported }: { roomId: string; onReported: () => void }) {
  const t = useMessages();
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<RoomReportKind | null>(null);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [outcome, setOutcome] = useState<ReportOutcome | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstOptionRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setKind(null);
    setNote("");
  }, []);

  // Focus the first option on open, and the report button again on close.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) firstOptionRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // While the form is open, Escape closes the form and not the room sheet, which also
  // listens for Escape on window (RoomSheet). Capture phase, so this runs first wherever
  // focus is, even after a disabled button dropped it to <body>.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      close();
    }
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, close]);

  async function send() {
    if (!kind) return;
    setPending(true);
    const result = await submitReport(roomId, kind, note);
    setPending(false);
    setOutcome(result);
    if (result === "sent") {
      close();
      onReported();
    }
  }

  const tooLong = noteTooLong(note);

  return (
    <section className="space-y-2">
      {!open && (
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={false}
          aria-controls={formId}
          onClick={() => {
            setOutcome(null);
            setOpen(true);
          }}
          className={`btn-secondary ${TOUCH}`}
        >
          {t.report.open}
        </button>
      )}

      {open && (
        <form
          id={formId}
          onSubmit={(event) => {
            event.preventDefault();
            void send();
          }}
          className="panel space-y-3 px-4 py-3 sm:px-5"
        >
          <fieldset className="space-y-1.5">
            <legend className="mb-1.5 text-sm font-semibold">{t.report.title}</legend>
            {ROOM_REPORT_KINDS.map((option, index) => (
              <label
                key={option}
                className={`flex ${TOUCH} cursor-pointer items-center gap-3 rounded-md border border-line px-3 text-sm has-checked:border-fg-subtle has-checked:bg-surface-3 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg`}
              >
                <input
                  ref={index === 0 ? firstOptionRef : undefined}
                  type="radio"
                  name={`${formId}-kind`}
                  value={option}
                  checked={kind === option}
                  onChange={() => setKind(option)}
                  className="accent-fg"
                />
                {t.report.kinds[option]}
              </label>
            ))}
          </fieldset>

          <label className="block space-y-1.5">
            <span className="field-label">{t.report.note}</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              aria-invalid={tooLong}
              aria-describedby={`${formId}-count`}
              className="field h-auto py-2"
            />
            <span
              id={`${formId}-count`}
              className={`block text-xs tabular-nums ${tooLong ? "text-busy" : "text-fg-subtle"}`}
            >
              {tooLong
                ? t.report.noteTooLong(NOTE_MAX_LENGTH)
                : t.report.noteCount(note.trim().length, NOTE_MAX_LENGTH)}
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={!kind || tooLong || pending}
              className={`btn-primary ${TOUCH}`}
            >
              {t.report.send}
            </button>
            <button type="button" onClick={close} className={`btn-secondary ${TOUCH}`}>
              {t.report.cancel}
            </button>
          </div>
        </form>
      )}

      {outcome === "sent" && (
        <p role="status" className="text-sm text-fg-muted">
          {t.report.sent}
        </p>
      )}
      {outcome === "duplicate" && (
        <p role="alert" className="error-text">
          {t.report.duplicate}
        </p>
      )}
      {(outcome === "failed" || outcome === "invalid") && (
        <p role="alert" className="error-text">
          {t.report.failed}
        </p>
      )}
    </section>
  );
}
