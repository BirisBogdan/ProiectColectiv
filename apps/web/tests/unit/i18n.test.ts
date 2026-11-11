import { afterEach, describe, expect, it, vi } from "vitest";
import { messages, type Messages } from "@/lib/i18n/messages";
import { getLocaleSnapshot, LOCALE_STORAGE_KEY, toLocale } from "@/lib/i18n/use-locale";

function keyPaths(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? keyPaths(child, `${prefix}${key}.`)
      : [`${prefix}${key}:${typeof child}`],
  );
}

function fakeStorage(stored: string | null) {
  return { getItem: (key: string) => (key === LOCALE_STORAGE_KEY ? stored : null) };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("messages", () => {
  it("has the same keys, of the same kind, in both languages", () => {
    expect(keyPaths(messages.en).sort()).toEqual(keyPaths(messages.ro).sort());
  });

  it.each([
    ["ro", "Liberă până la 14:00", "Ocupată până la 12:00"],
    ["en", "Free until 14:00", "Occupied until 12:00"],
  ] as const)("fills in the time in %s", (locale, free, occupied) => {
    const t: Messages = messages[locale];
    expect(t.status.freeUntil("14:00")).toBe(free);
    expect(t.status.occupiedUntil("12:00")).toBe(occupied);
  });
});

describe("toLocale", () => {
  it.each([
    ["ro", "ro"],
    ["en", "en"],
    ["fr", "ro"],
    ["EN", "ro"],
    ["", "ro"],
    [null, "ro"],
    [undefined, "ro"],
  ] as const)("%s → %s", (value, locale) => {
    expect(toLocale(value)).toBe(locale);
  });
});

describe("getLocaleSnapshot", () => {
  it("reads the stored locale", () => {
    vi.stubGlobal("window", { localStorage: fakeStorage("en") });
    expect(getLocaleSnapshot()).toBe("en");
  });

  it("turns an unknown stored value into Romanian", () => {
    vi.stubGlobal("window", { localStorage: fakeStorage("de") });
    expect(getLocaleSnapshot()).toBe("ro");
  });

  it("falls back to Romanian when storage is blocked", () => {
    vi.stubGlobal("window", {
      get localStorage(): Storage {
        throw new Error("SecurityError");
      },
    });
    expect(getLocaleSnapshot()).toBe("ro");
  });
});
