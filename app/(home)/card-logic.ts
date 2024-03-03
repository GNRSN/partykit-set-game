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

const COMPARED_PROPERTIES = [
  "shape",
  "color",
  "fill",
  "symbolCount",
] as const satisfies ReadonlyArray<keyof Card>;

export const validateSet = (cards: Card[]): boolean => {
  if (cards.length !== 3) {
    throw new Error(`Unexpected number of cards: ${cards.length}`);
  }

  let isSet = true;

  COMPARED_PROPERTIES.forEach((property) => {
    if (!isSet) return;

    // Sets filters out duplicates
    const s = new Set(cards.map((card) => card[property]));
    // 1 or 3 means all values match or a unique
    isSet = s.size !== 2;
  });

  return isSet;
};

export type RowOfCards = [Card, Card, Card];

export const findPossibleSets = (rows: RowOfCards[]) => {
  const possibleSets: [string, string, string][] = [];

  const cards = rows.flat();

  cards.forEach((card, index1) => {
    for (let i = index1 + 1; i < cards.length; i++) {
      const card2 = cards[i];

      for (let j = i + 1; j < cards.length; j++) {
        const card3 = cards[j];
        if (validateSet([card, card2, card3])) {
          possibleSets.push([card.id, card2.id, card3.id]);
        }
      }
    }
  });

  return possibleSets;
};

export const generateCards = (existingRows: RowOfCards[] = []) => {
  const rows = [...existingRows];

  let hasPossibleSet = findPossibleSets(rows).length > 0;

  while (!hasPossibleSet && rows.length < 10) {
    rows.push([generateCard(), generateCard(), generateCard()]);

    hasPossibleSet = findPossibleSets(rows).length > 0;
  }

  return rows;
};
