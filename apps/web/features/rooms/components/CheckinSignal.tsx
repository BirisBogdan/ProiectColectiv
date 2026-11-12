import type { Messages } from "@/lib/i18n/messages";
import { messages } from "@/lib/i18n/messages";
import { useMessages } from "@/lib/i18n/use-locale";

export function checkinLabel(count: number, t: Messages["checkin"] = messages.ro.checkin): string {
  return count === 0 ? "" : t.people(count);
}

export function CheckinSignal({ count }: { count: number }) {
  const t = useMessages();
  if (count === 0) return null;

  return <span className="text-sm text-gray-700 dark:text-gray-300">{checkinLabel(count, t.checkin)}</span>;
}
