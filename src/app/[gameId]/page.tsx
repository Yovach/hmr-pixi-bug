import { notFound } from "next/navigation";
import { Wrapper } from "../_game/wrapper";

async function getPost(gameId: string): Promise<any> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${gameId}`,
    {
      next: {
        revalidate: 0,
      },
    },
  );
  return await response.json();
}

export default async function Home({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const request = await getPost(gameId);
  if (Object.keys(request).length === 0) {
    notFound();
  }

  return (
    <div className="grid min-w-screen items-center justify-items-center min-h-screen">
      <Wrapper game={request} />
    </div>
  );
}
