import { GameOfSet } from "./GameOfSet";
import { PlayerCounter } from "./PlayerCounter";
import { PARTYKIT_HOST } from "../env";

const ROOM_ID = "shared-game";

export default async function Home() {
  // fetch initial data in server component for server rendering
  const roomHost = PARTYKIT_HOST;
  const roomId = ROOM_ID;
  // const req = await fetch(`https://${roomHost}/game/${roomId}`, {
  //   method: "GET",
  //   next: { revalidate: 0 },
  // });

  // onRequest handler will respond with initial data
  // const res = (await req.json()) as { cards: RowOfCards[] };

  // pass initial data to client, which will connect to the room via WebSockets
  return (
    <div className="w-full flex flex-col gap-8">
      <section className="bg-yellow-100 w-full p-2 rounded flex justify-center items-center text-xl">
        <PlayerCounter />
      </section>

      <section className="w-full flex justify-center items-center">
        <GameOfSet
          initial={{
            cards: [], //res.cards,
          }}
          party={{
            roomId,
            roomHost,
          }}
        />
      </section>
    </div>
  );
}
