"use client";

import { useEffect, useState } from "react";
import { RowOfCards } from "@/game-logic/card-types";
import {
  createSetMessage,
  parseUpdateMessage,
} from "@/party-kit/match-game/types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import usePartySocket from "partysocket/react";

import { Button } from "@/components/common/ui/button";
import { GameCard } from "@/components/game/GameCard";

import { validateSet } from "../../game-logic/card-logic";
import { TutorialModal } from "./TutorialModal";

type PageProps = {
  party: {
    roomId: string;
    roomHost: string;
  };
  initial: {
    cards: RowOfCards[];
    score: number;
  };
};

export const GameOfMatch = ({ initial, party }: PageProps) => {
  return null;

  // use server-rendered initial data
  const [cards, setCards] = useState(initial.cards);
  const [score, setScore] = useState(initial.score);

  // update state when sets are found
  const socket = usePartySocket({
    host: party.roomHost,
    party: "game",
    room: party.roomId,
    onMessage: (event) => {
      const message = parseUpdateMessage(event.data);
      setCards(message.cards as RowOfCards[]);
      setScore(message.score);
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
    <>
      <section className="flex flex-row items-center justify-center text-xs text-zinc-500">
        <div className="text-center italic ">Collective score: {score} pt</div>
      </section>
      <section className="flex w-full items-center justify-center">
        <div className="relative">
          {cards.map((row, rowIdx) => {
            const rowNumber = rowIdx + 1;
            return (
              // REVIEW: Using index as key may be risky here
              <div
                key={`${rowNumber}`}
                className={`flex flex-row`}
              >
                {row.map((card, columnNumber) => (
                  <GameCard
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
      </section>
      <section className="flex justify-center">
        <TutorialModal>
          <Button
            variant="ghost"
            className="text-xs text-zinc-500"
          >
            How to play <InfoCircledIcon className="ml-1 inline" />
          </Button>
        </TutorialModal>
      </section>
    </>
  );
};
