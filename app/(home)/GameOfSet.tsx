"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { validateSet } from "../../game-logic/card-logic";
import { Diamond, Rounded, Squiggle } from "./CardSymbols";

import usePartySocket, { useWebSocket } from "partysocket/react";
import { CardsUpdate, createSetMessage } from "@/party/game-of-set/types";
import { Card, CardShape, RowOfCards } from "@/game-logic/card-types";

const SHAPES_TO_SYMBOLS = {
  diamond: Diamond,
  squiggle: Squiggle,
  rounded: Rounded,
} as const satisfies Record<CardShape, unknown>;

type CardProps = {
  card: Card;
  selectHandler: (id: string) => void;
  isSelected: boolean;
  isWinFlash: boolean;
  isLoseFlash: boolean;
};

const SetCard = ({
  card,
  selectHandler,
  isSelected,
  isWinFlash,
  isLoseFlash,
}: CardProps) => {
  return (
    <div // Card background
      className={cn(
        "w-44 h-28 bg-white shadow-md rounded-md m-2 p-2 flex flex-row justify-center items-center gap-4",
        {
          "outline outline-2 outline-yellow-400": isSelected,
          "outline outline-2 outline-green-400": isWinFlash,
          "outline outline-2 outline-red-400": isLoseFlash,
        },
      )}
      onClick={() => selectHandler(card.id)}
    >
      {Array(card.symbolCount)
        .fill(0)
        .map((_, index) => {
          const Comp = SHAPES_TO_SYMBOLS[card.shape];
          return (
            <Comp // Card symbol
              key={`${card.shape}_${card.color}_${card.fill}_${index}`}
              card={card}
            />
          );
        })}
    </div>
  );
};

type PageProps = {
  party: {
    roomId: string;
    roomHost: string;
  };
  initial: {
    cards: RowOfCards[];
  };
};

export const GameOfSet = ({ initial, party }: PageProps) => {
  // use server-rendered initial data
  const [cards, setCards] = useState(initial.cards);

  // update state when new reactions come in
  const socket = usePartySocket({
    host: party.roomHost,
    party: "game",
    room: party.roomId,
    onMessage: (event) => {
      const message = JSON.parse(event.data) as CardsUpdate;
      setCards(message.cards as RowOfCards[]);
    },
  });

  const [selection, setSelection] = useState<string[]>([]);
  const [isWinFlash, setIsWinFlash] = useState<string[]>([]);
  const [isLoseFlash, setIsLoseFlash] = useState<string[]>([]);

  useEffect(() => {
    if (selection.length >= 3) {
      const cardsFlat = cards.flat();

      const isSet = validateSet(
        selection.map((id) => {
          const card = cardsFlat.find((c) => c.id === id);

          if (!card) throw new Error("Card not found");
          return card;
        }),
      );

      socket.send(createSetMessage(selection));

      if (isSet) {
        setIsWinFlash([...selection]);
        setTimeout(() => {
          setIsWinFlash([]);
        }, 300);
        // TODO: Serverside, remove cards and stack rows, then add more cards as needed
      } else {
        setIsLoseFlash([...selection]);
        setTimeout(() => {
          setIsLoseFlash([]);
        }, 300);
      }

      setSelection([]);
    }
  }, [selection, cards, socket]);

  return (
    <div>
      {cards.map((row, rowIdx) => {
        const rowNumber = rowIdx + 1;
        return (
          <div key={`${rowNumber}`} className={`flex flex-row`}>
            {row.map((card, columnNumber) => (
              <SetCard
                key={`${rowNumber}_${columnNumber}`}
                card={card}
                selectHandler={(id) => {
                  if (selection.includes(id)) {
                    setSelection(selection.filter((s) => s !== id));
                  } else {
                    setSelection([...selection, id]);
                  }
                }}
                isSelected={selection.includes(card.id)}
                isWinFlash={isWinFlash.includes(card.id)}
                isLoseFlash={isLoseFlash.includes(card.id)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
