"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useMessages } from "@/lib/i18n/use-locale";

export default function Home() {
  const t = useMessages();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold">{t.home.title}</h1>
      <p className="text-lg">{t.home.tagline}</p>
      <Link
        href="/rooms?freeOnly=1"
        className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
      >
        {t.home.cta}
      </Link>
      <LanguageSwitcher />
    </main>
  );
}
