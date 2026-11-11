"use client";

import { LOCALES } from "@/lib/i18n/messages";
import { setLocale, useLocale, useMessages } from "@/lib/i18n/use-locale";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useMessages();

  return (
    <div role="group" aria-label={t.language.label} className="inline-flex gap-1">
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === locale}
          onClick={() => setLocale(option)}
          className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium aria-pressed:border-blue-700 aria-pressed:bg-blue-700 aria-pressed:text-white dark:border-gray-700"
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
