import { nanoid } from "nanoid";

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

export type CardShape = (typeof SHAPES)[keyof typeof SHAPES];
export type CardColor = (typeof COLORS)[keyof typeof COLORS];
export type CardPattern = (typeof FILLS)[keyof typeof FILLS];

export type Card = {
  id: string;
  shape: CardShape;
  color: CardColor;
  fill: (typeof FILLS)[keyof typeof FILLS];
  symbolCount: 1 | 2 | 3;
};

const randomize = () => Math.floor(Math.random() * 3 + 1) as 1 | 2 | 3;

const generateCard = (): Card =>
  Object.freeze({
    id: nanoid(),
    shape: SHAPES[randomize()],
    color: COLORS[randomize()],
    fill: FILLS[randomize()],
    symbolCount: randomize(),
  });

export type RowsOfCards = Record<number, [Card, Card, Card]>;

export const generateCards = () =>
  Object.freeze({
    1: [generateCard(), generateCard(), generateCard()],
    2: [generateCard(), generateCard(), generateCard()],
    3: [generateCard(), generateCard(), generateCard()],
  } as RowsOfCards);
