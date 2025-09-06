import Link from "next/link";

const games = Array.from({length: 100}).map((_, idx) => idx)

export default async function Home() {
  return (
    <div className="grid min-w-screen items-center justify-items-center min-h-screen">
      <ul className="flex flex-col gap-y-4 max-h-[500px] overflow-y-scroll">
      {
        games.map((gameId) => (
          <Link href={`/${gameId}`} key={gameId}>{gameId}</Link>
        ))
      }</ul>
    </div>
  );
}
