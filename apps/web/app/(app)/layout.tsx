"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useMessages } from "@/lib/i18n/use-locale";

export default function AppLayout({ children }: LayoutProps<"/">) {
  const t = useMessages();

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="text-lg font-semibold">
            StudyRoom Finder
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/rooms" className="font-medium hover:underline">
              {t.nav.rooms}
            </Link>
            <Link href="/rooms/plan" className="font-medium hover:underline">
              {t.nav.plan}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </>
  );
}
