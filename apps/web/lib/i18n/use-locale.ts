"use client";

import { useEffect, useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, LOCALES, messages, type Locale, type Messages } from "./messages";

export const LOCALE_STORAGE_KEY = "ubb.locale";

/** Anything that is not a known locale (missing, old, edited by hand) means Romanian. */
export function toLocale(value: string | null | undefined): Locale {
  return LOCALES.find((locale) => locale === value) ?? DEFAULT_LOCALE;
}

// localStorage as an external store: the "storage" event covers other tabs, the
// listeners set covers setLocale() in this tab, which does not fire that event.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getLocaleSnapshot(): Locale {
  try {
    return toLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return DEFAULT_LOCALE; // storage blocked (private mode, disabled site data)
  }
}

// The server cannot see localStorage, so it always renders Romanian. React also uses
// this during hydration, then switches to the stored locale: no hydration mismatch.
const getServerSnapshot = (): Locale => DEFAULT_LOCALE;

export function useLocale(): Locale {
  const locale = useSyncExternalStore(subscribe, getLocaleSnapshot, getServerSnapshot);

  // The root layout renders lang="ro"; keep it true for screen readers after a switch
  // and after a reload with English stored.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return locale;
}

export function useMessages(): Messages {
  return messages[useLocale()];
}

export function setLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage blocked: the choice cannot be remembered, nothing else to do.
  }
  document.documentElement.lang = locale;
  listeners.forEach((listener) => listener());
}
