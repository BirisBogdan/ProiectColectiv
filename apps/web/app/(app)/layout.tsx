"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useMessages } from "@/lib/i18n/use-locale";

// Header and content share one width: edge padding grows with the screen, and the content
// stops growing at 1800px so lines stay readable on very wide monitors.
const PAGE_WIDTH = "mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 2xl:px-12";

const NAV_CLASS =
  "-mb-px flex h-14 items-center border-b-2 px-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";

export default function AppLayout({ children }: LayoutProps<"/">) {
  const t = useMessages();
  const pathname = usePathname();
  // /rooms/plan is its own tab; every other /rooms page belongs to "Săli".
  const onPlan = pathname.startsWith("/rooms/plan");
  const links = [
    { href: "/rooms", label: t.nav.rooms, active: !onPlan },
    { href: "/rooms/plan", label: t.nav.plan, active: onPlan },
  ];

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-canvas/95 backdrop-blur">
        <div className={`flex h-14 items-center justify-between gap-4 ${PAGE_WIDTH}`}>
          <Link href="/" className="flex items-center gap-2.5 rounded-sm text-sm font-semibold">
            <span
              aria-hidden
              className="grid size-6 place-items-center rounded-md bg-fg text-[11px] font-bold text-canvas"
            >
              U
            </span>
            <span className="hidden sm:inline">StudyRoom Finder</span>
          </Link>
          <nav className="flex items-center gap-5">
            {links.map(({ href, label, active }) => (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`${NAV_CLASS} ${
                  active ? "border-fg text-fg" : "border-transparent text-fg-muted hover:text-fg"
                }`}
              >
                {label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>
        </div>
      </header>
      <main className={`w-full flex-1 py-6 lg:py-8 ${PAGE_WIDTH}`}>{children}</main>
    </>
  );
}
