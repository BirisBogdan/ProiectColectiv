export function checkinLabel(count: number): string {
  if (count === 0) return "";
  if (count === 1) return "1 persoană aici";
  return `${count}${count >= 20 ? " de" : ""} persoane aici`;
}

export function CheckinSignal({ count }: { count: number }) {
  if (count === 0) return null;

  return <span className="text-sm text-gray-700 dark:text-gray-300">{checkinLabel(count)}</span>;
}
