import { RowOfCards } from "@/game-logic/card-types";
import { parseUpdateResponse } from "@/party-kit/match-game/types";

import { env } from "../../env";
import { GameOfMatch } from "./MatchGame";

const PARTYKIT_PROTOCOL =
  (
    env.NEXT_PUBLIC_PARTYKIT_HOST.startsWith("localhost") ||
    env.NEXT_PUBLIC_PARTYKIT_HOST.startsWith("127.0.0.1")
  ) ?
    "http"
  : "https";

const PARTYKIT_URL = `${PARTYKIT_PROTOCOL}://${env.NEXT_PUBLIC_PARTYKIT_HOST}`;

const ROOM_ID = "shared-game";

export default async function Home() {
  // fetch initial data in server component for server rendering
  const roomHost = env.NEXT_PUBLIC_PARTYKIT_HOST;
  const roomId = ROOM_ID;

  // REVIEW: This fetch fails when server is hibernating, run with hibernate false or wrap with try-catch and handle?
  const req = await fetch(`${PARTYKIT_URL}/parties/game/${roomId}`, {
    method: "GET",
    next: { revalidate: 0 },
  });

  // onRequest handler will respond with initial data
  if (req.status !== 200) {
    console.error("fetch response status:", req.status);
  }
  const message = parseUpdateResponse(await req.json());

  // pass initial data to client, which will connect to the room via WebSockets
  return (
    <div className="flex w-full flex-col gap-4">
      <GameOfMatch
        initial={{
          cards: message.cards as RowOfCards[],
          score: message.score,
        }}
        party={{
          roomId,
          roomHost,
        }}
      />
    </div>
  );
}
