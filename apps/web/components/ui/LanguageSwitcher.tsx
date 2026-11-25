"use client";

import { LOCALES } from "@/lib/i18n/messages";
import { setLocale, useLocale, useMessages } from "@/lib/i18n/use-locale";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useMessages();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className="inline-flex rounded-md border border-line bg-surface p-0.5"
    >
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === locale}
          onClick={() => setLocale(option)}
          className="rounded-[5px] px-2 py-0.5 text-xs font-semibold text-fg-subtle transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-fg aria-pressed:bg-surface-3 aria-pressed:text-fg"
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
