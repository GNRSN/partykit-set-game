"use-client";

import { cn } from "@/lib/utils";

// REVIEW: Until cards are serverside this is a client component since it uses random

const SHAPES = {
  1: "diamond",
  2: "squiggle",
  3: "rounded",
} as const;

const COLORS = {
  1: "red",
  2: "green",
  3: "purple",
} as const;

const FILLS = {
  1: "outline",
  2: "striped",
  3: "solid",
} as const;

type CardShape = (typeof SHAPES)[keyof typeof SHAPES];
type CardColor = (typeof COLORS)[keyof typeof COLORS];
type CardPattern = (typeof FILLS)[keyof typeof FILLS];

type Card = {
  shape: CardShape;
  color: CardColor;
  fill: (typeof FILLS)[keyof typeof FILLS];
  symbolCount: 1 | 2 | 3;
};

const randomize = () => Math.floor(Math.random() * 3 + 1) as 1 | 2 | 3;

const generateCard = (): Card =>
  Object.freeze({
    shape: SHAPES[randomize()],
    color: COLORS[randomize()],
    fill: FILLS[randomize()],
    symbolCount: randomize(),
  });

type RowsOfCards = Record<number, [Card, Card, Card]>;

export const generateCards = () =>
  Object.freeze({
    1: [generateCard(), generateCard(), generateCard()],
    2: [generateCard(), generateCard(), generateCard()],
    3: [generateCard(), generateCard(), generateCard()],
  } as RowsOfCards);

const Diamond = ({ card }: { card: Card }) => (
  <svg width="20" height="80" viewBox="0 0 40 40">
    <polygon points="20,0 40,40 20,80 0,40" fill={card.color} />
  </svg>
);
const Squiggle = ({ card }: { card: Card }) => (
  <svg width="25" height="25" viewBox="0 0 30 30">
    {card.fill === "striped" && (
      <defs>
        <pattern
          id={`diagonalHatch-${card.color}`}
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
        >
          <path
            d="M-1,1 l2,-2
            M0,4 l4,-4
            M3,5 l2,-2"
            className={cn("stroke-1", {
              "stroke-red-500": card.color === "red",
              "stroke-green-600": card.color === "green",
              "stroke-blue-600": card.color === "purple",
            })}
          />
        </pattern>
      </defs>
    )}
    <path
      className={cn("fill-white", {
        "fill-red-500": card.fill === "solid" && card.color === "red",
        "fill-green-600": card.fill === "solid" && card.color === "green",
        "fill-blue-600": card.fill === "solid" && card.color === "purple",

        "stroke-red-500 stroke-2":
          card.fill === "outline" && card.color === "red",
        "stroke-green-600 stroke-2":
          card.fill === "outline" && card.color === "green",
        "stroke-blue-600 stroke-2":
          card.fill === "outline" && card.color === "purple",

        // REVIEW: I couldn't get local url to apply through tailwind
        //
        // [`fill-[url(#diagonalHatch-${card.color})]`]: card.fill === "striped",
        "stroke-red-500 stroke-1":
          card.fill === "striped" && card.color === "red",
        "stroke-green-600 stroke-1":
          card.fill === "striped" && card.color === "green",
        "stroke-blue-600 stroke-1":
          card.fill === "striped" && card.color === "purple",
      })}
      style={{
        fill:
          card.fill === "striped"
            ? `url(#diagonalHatch-${card.color})`
            : undefined,
      }}
      d="M 20 4 L 20 4 C 24 8 6 8 12 10 C 18 12 26 20 18 22 Q 10 24 2 20 C -2 18 0 14 4 16 C 12 20 14 18 12 16 C 10 14 4.6667 14.6667 2 10 C 0 6 4 4 8 2 C 12 0 16 0 20 4"
    />
  </svg>
);
const Rounded = ({ card }: { card: Card }) => (
  <div
    className={cn("w-4 h-8 rounded-lg", {
      "bg-red-500": card.fill === "solid" && card.color === "red",
      "bg-green-600": card.fill === "solid" && card.color === "green",
      "bg-blue-600": card.fill === "solid" && card.color === "purple",
      "border-red-500 border-2":
        card.fill === "outline" && card.color === "red",
      "border-green-600 border-2":
        card.fill === "outline" && card.color === "green",
      "border-blue-600 border-2":
        card.fill === "outline" && card.color === "purple",

      "pattern-lines pattern-bg-white pattern-size-1 outline":
        card.fill === "striped",
      "pattern-red-500 outline-red-500 ":
        card.fill === "striped" && card.color === "red",
      "pattern-green-600 outline-green-600":
        card.fill === "striped" && card.color === "green",
      "pattern-blue-600 outline-blue-600 ":
        card.fill === "striped" && card.color === "purple",
    })}
  ></div>
);

const SHAPES_TO_SYMBOLS = {
  diamond: Diamond,
  squiggle: Squiggle,
  rounded: Rounded,
} as const satisfies Record<CardShape, any>;

const SetCard = ({ card }: { card: Card }) => {
  return (
    <div // Card background
      className="w-44 h-28 bg-white shadow-md rounded-md m-2 p-2 flex flex-row justify-center items-center gap-4"
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

export const GameOfSet = ({ cards }: { cards: RowsOfCards }) => {
  return (
    <div>
      {Object.entries(cards).map(([rowNumber, row]) => {
        return (
          <div key={`${rowNumber}`} className={`flex flex-row`}>
            {row.map((card, columnNumber) => (
              <SetCard key={`${rowNumber}_${columnNumber}`} card={card} />
            ))}
          </div>
        );
      })}
    </div>
  );
};
