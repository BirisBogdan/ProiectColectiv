"use client";

import Link from "next/link";
import { useMessages } from "@/lib/i18n/use-locale";

export default function RoomNotFound() {
  const t = useMessages();

  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-2xl font-semibold">{t.roomNotFound.title}</h1>
      <Link href="/rooms" className="font-medium underline">
        {t.roomNotFound.back}
      </Link>
    </div>
  );
}
