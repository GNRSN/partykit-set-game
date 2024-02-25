"use client";

import { useCursors } from "./cursors-provider";

export default function Home() {
  const { getCount } = useCursors();
  const count = getCount();

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="bg-yellow-100 w-full p-2 rounded flex justify-center items-center text-xl">
        <p>
          <strong>{count}</strong> multiplayer cursor{count != 1 ? "s" : ""} 🎈
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">PartyKit Game of Set</h1>
      </section>
    </div>
  );
}
