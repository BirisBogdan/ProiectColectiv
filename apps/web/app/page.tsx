"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useMessages } from "@/lib/i18n/use-locale";

export default function Home() {
  const t = useMessages();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <span aria-hidden className="grid size-10 place-items-center rounded-lg bg-fg text-base font-bold text-canvas">
        U
      </span>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.home.title}</h1>
        <p className="mx-auto max-w-md text-fg-muted">{t.home.tagline}</p>
      </div>
      <Link href="/rooms?freeOnly=1" className="btn-primary h-11 px-6">
        {t.home.cta}
      </Link>
      <LanguageSwitcher />
    </main>
  );
}
