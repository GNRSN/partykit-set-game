import { GameOfSet } from "./GameOfSet";
import { PlayerCounter } from "./PlayerCounter";
import { generateCards } from "../../game-logic/card-logic";

export default function Home() {
  const cards = generateCards();
  return (
    <div className="w-full flex flex-col gap-8">
      <section className="bg-yellow-100 w-full p-2 rounded flex justify-center items-center text-xl">
        <PlayerCounter />
      </section>

      <section className="w-full flex justify-center items-center">
        <GameOfSet cards={cards} />
      </section>
    </div>
  );
}
