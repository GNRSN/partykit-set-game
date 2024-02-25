import { GameOfSet, generateCards } from "./GameOfSet";
import { PlayerCounter } from "./PlayerCounter";

export default function Home() {
  const cards = generateCards();
  return (
    <div className="w-full flex flex-col gap-8">
      <section className="bg-yellow-100 w-full p-2 rounded flex justify-center items-center text-xl">
        <PlayerCounter />
      </section>

      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">PartyKit Game of Set</h1>
      </section>

      <section>
        <GameOfSet cards={cards} />
      </section>
    </div>
  );
}
