"use-client";
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

const PATTERNS = {
  1: "outline",
  2: "striped",
  3: "solid",
} as const;

type CardShape = (typeof SHAPES)[keyof typeof SHAPES];
type CardColor = (typeof COLORS)[keyof typeof COLORS];
type CardPattern = (typeof PATTERNS)[keyof typeof PATTERNS];

type Card = {
  shape: CardShape;
  color: CardColor;
  pattern: CardPattern;
  symbolCount: 1 | 2 | 3;
};

const randomize = () => Math.floor(Math.random() * 3 + 1) as 1 | 2 | 3;

const generateCard = (): Card =>
  Object.freeze({
    shape: SHAPES[randomize()],
    color: COLORS[randomize()],
    pattern: PATTERNS[randomize()],
    symbolCount: randomize(),
  });

type RowsOfCards = Record<number, [Card, Card, Card]>;

export const generateCards = () =>
  Object.freeze({
    1: [generateCard(), generateCard(), generateCard()],
    2: [generateCard(), generateCard(), generateCard()],
    3: [generateCard(), generateCard(), generateCard()],
  } as RowsOfCards);

const Diamond = ({ card }: { card: Card }) => <svg>♦</svg>;
const Squiggle = ({ card }: { card: Card }) => <svg>▲</svg>;
const Rounded = ({ card }: { card: Card }) => (
  <div className="w-3 h-6 rounded-lg"></div>
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
              key={`${card.shape}_${card.color}_${card.pattern}_${index}`}
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
