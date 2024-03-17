import z from "zod";

export const SHAPES = {
  1: "circle",
  2: "square",
  3: "triangle",
} as const;

export const COLORS = {
  1: "red",
  2: "green",
  3: "blue",
} as const;

export const FILLS = {
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

export const CardSchema = z.object({
  id: z.string(),
  shape: z.string(),
  color: z.string(),
  fill: z.string(),
  symbolCount: z.number(),
});

export type RowOfCards = [Card, Card, Card];
