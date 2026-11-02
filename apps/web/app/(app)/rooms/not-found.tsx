import Link from "next/link";

export default function RoomNotFound() {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-2xl font-semibold">Sala nu există</h1>
      <Link href="/rooms" className="font-medium underline">
        Înapoi la săli
      </Link>
    </div>
  );
}
