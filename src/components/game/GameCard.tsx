import { Card, CardShape } from "@/game-logic/card-types";
import { cn } from "@/utils";

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
        "m-2 flex h-28 max-h-[18vw] w-44 max-w-[28vw] flex-row items-center justify-center gap-2 rounded-md bg-white p-2 shadow-md transition-shadow hover:-translate-y-1 hover:shadow-xl",
        {
          "-translate-y-1 shadow-lg outline outline-2 outline-yellow-400 hover:outline-yellow-500":
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
