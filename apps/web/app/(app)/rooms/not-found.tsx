"use client";

import Link from "next/link";
import { useMessages } from "@/lib/i18n/use-locale";

export default function RoomNotFound() {
  const t = useMessages();

  return (
    <div className="panel flex flex-col items-start gap-3 px-5 py-6">
      <h1 className="text-xl font-semibold tracking-tight">{t.roomNotFound.title}</h1>
      <Link href="/rooms" className="link text-sm">
        {t.roomNotFound.back}
      </Link>
    </div>
  );
}
