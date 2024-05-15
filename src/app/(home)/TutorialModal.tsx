import { Card, CardPattern } from "@/game-logic/card-types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/ui/dialog";
import { GameCard } from "@/components/game/GameCard";

export function TutorialModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <DialogDescription>Rules of the game</DialogDescription>

          <div>
            The board contains at least 12 cards with symbols in different
            shape, color, pattern and number. For each property there are 3
            different varieties.
          </div>

          <div className="flex flex-row gap-4">
            <CardExplained
              card={{
                shape: "circle",
                color: "red",
                fill: "solid",
                symbolCount: 3,
              }}
            />
            <CardExplained
              card={{
                shape: "triangle",
                color: "green",
                fill: "striped",
                symbolCount: 2,
              }}
            />
            <CardExplained
              card={{
                shape: "square",
                color: "blue",
                fill: "outline",
                symbolCount: 1,
              }}
            />
          </div>

          <div>
            The goal of the game is to find a triad (3 card) for with each
            property is either unique or shared between all three.
          </div>
          <div>The following examples are a valid triad</div>

          <div className="flex flex-row gap-4">
            <CardExplained
              card={{
                shape: "circle",
                color: "red",
                fill: "striped",
                symbolCount: 3,
              }}
            />
            <CardExplained
              card={{
                shape: "circle",
                color: "green",
                fill: "striped",
                symbolCount: 2,
              }}
            />
            <CardExplained
              card={{
                shape: "circle",
                color: "blue",
                fill: "solid",
                symbolCount: 1,
              }}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const FILL_TERMS = {
  solid: "filled",
  striped: "striped",
  outline: "outlined",
} satisfies Record<CardPattern, string>;

function CardExplained({ card }: { card: Omit<Card, "id"> }) {
  const { shape, color, fill, symbolCount } = card;
  return (
    <div className="pointer-events-none flex touch-none flex-col flex-wrap gap-2">
      <GameCard
        card={{
          ...card,
          id: "1",
        }}
        isSelected={false}
        isWinFlash={false}
        isLoseFlash={false}
        selectHandler={() => null}
      />
      <div className="m-2 text-center">
        {symbolCount} {color} {FILL_TERMS[fill]}{" "}
        {symbolCount < 2 ? shape : shape + "s"}
      </div>
    </div>
  );
}
