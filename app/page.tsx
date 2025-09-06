import dynamic from "next/dynamic";

const GameLazy = dynamic(() => import("./_game/game").then((mod) => mod.Game));

export default function Home() {
  return (
    <div className="grid min-w-screen items-center justify-items-center min-h-screen">
      <GameLazy />
    </div>
  );
}
