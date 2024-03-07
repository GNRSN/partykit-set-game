import { CardSchema, RowOfCards } from "@/game-logic/card-types";
import z from "zod";

export const SLOW_DOWN_SENTINEL = "slowdown";
export const GO_AWAY_SENTINEL = "goaway";

// array of 3 ids
const selectionSchema = z.array(z.string()).length(3);

// client sends a message either via WebSocket or HTTP
// { type: "set", selection: [string, string, string] }
const SetSchema = z.object({
  type: z.literal("set"),
  selection: selectionSchema,
});

// server responds with updated state
const CardsUpdateSchema = z.object({
  type: z.literal("update"),
  cards: z.array(z.array(CardSchema).length(3)),
  score: z.number(),
});

export type CardsUpdate = z.infer<typeof CardsUpdateSchema>;

export const parseSetMessage = (message: string) => {
  return SetSchema.parse(JSON.parse(message));
};

export const createSetMessage = (selection: string[]) => {
  return JSON.stringify(
    SetSchema.parse({
      type: "set",
      selection,
    }),
  );
};

export const parseUpdateMessage = (message: string) => {
  return CardsUpdateSchema.parse(JSON.parse(message));
};

export const createUpdateMessage = (cards: RowOfCards[], score: number) => {
  return JSON.stringify(
    CardsUpdateSchema.parse({
      type: "update",
      cards,
      score,
    }),
  );
};
