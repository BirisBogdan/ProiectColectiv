import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold">StudyRoom Finder</h1>
      <p className="text-lg">Găsește o sală liberă în FMI pentru a învăța.</p>
      <Link
        href="/rooms?freeOnly=1"
        className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
      >
        Vezi sălile libere
      </Link>
    </main>
  );
}
