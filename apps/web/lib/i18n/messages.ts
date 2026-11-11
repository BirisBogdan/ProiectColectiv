export const LOCALES = ["ro", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ro";

// Romanian is the default and the reference: every other language must have exactly
// these keys, so a missing or extra key is a typecheck error.
const ro = {
  status: {
    free: "Liberă",
    freeUntil: (time: string) => `Liberă până la ${time}`,
    occupied: "Ocupată",
    occupiedUntil: (time: string) => `Ocupată până la ${time}`,
    unknown: "Stare necunoscută",
  },
  home: {
    title: "StudyRoom Finder",
    tagline: "Găsește o sală liberă în FMI pentru a învăța.",
    cta: "Vezi sălile libere",
  },
  roomNotFound: {
    title: "Sala nu există",
    back: "Înapoi la săli",
  },
  language: {
    label: "Limba",
  },
};

export type Messages = typeof ro;

const en: Messages = {
  status: {
    free: "Free",
    freeUntil: (time) => `Free until ${time}`,
    occupied: "Occupied",
    occupiedUntil: (time) => `Occupied until ${time}`,
    unknown: "Status unknown",
  },
  home: {
    title: "StudyRoom Finder",
    tagline: "Find a free room in FMI to study.",
    cta: "See free rooms",
  },
  roomNotFound: {
    title: "This room does not exist",
    back: "Back to rooms",
  },
  language: {
    label: "Language",
  },
};

export const messages: Record<Locale, Messages> = { ro, en };
