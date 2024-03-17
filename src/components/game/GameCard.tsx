import { Card, CardShape } from "@/game-logic/card-types";

import { cn } from "@/lib/utils";

import { Circle, Square, Triangle } from "./CardSymbols";

const SHAPES_TO_SYMBOLS = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
} as const satisfies Record<CardShape, React.FC<{ card: Card }>>;

type CardProps = {
  card: Card;
  selectHandler: (id: string) => void;
  isSelected: boolean;
  isWinFlash: boolean;
  isLoseFlash: boolean;
};

export const GameCard = ({
  card,
  selectHandler,
  isSelected,
  isWinFlash,
  isLoseFlash,
}: CardProps) => {
  return (
    <div // Card background
      className={cn(
        "w-44 h-28 bg-white shadow-md hover:shadow-lg transition-shadow rounded-md m-2 p-2 flex flex-row justify-center items-center gap-2",
        {
          "hover:outline outline-2 outline-zinc-100":
            !isSelected && !isWinFlash && !isLoseFlash,
          "outline outline-2 outline-yellow-400 hover:outline-yellow-500":
            isSelected,
          "outline outline-2 outline-green-400": isWinFlash,
          "outline outline-2 outline-red-400": isLoseFlash,
        },
      )}
      onClick={() => selectHandler(card.id)}
    >
      {Array(card.symbolCount)
        .fill(0)
        .map((_, index) => {
          const CorrespondingSymbol = SHAPES_TO_SYMBOLS[card.shape];
          return (
            <div key={index} className="w-1/4">
              <CorrespondingSymbol card={card} />
            </div>
          );
        })}
    </div>
  );
};
