import { generateCards, pickCards, validateSet } from "@/game-logic/card-logic";
import { Card, RowOfCards } from "@/game-logic/card-types";
import type * as PartyKit from "partykit/server";

import { rateLimit } from "./limiter";
import { createUpdateMessage, GameState, parseSetMessage } from "./types";

const json = (response: string) =>
  new Response(response, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export default class MatchGameServer implements PartyKit.Server {
  options: PartyKit.ServerOptions = { hibernate: true };
  constructor(readonly room: PartyKit.Party) {}
  cards: RowOfCards[] = [];
  score: number = 0;

  /**
   * async on start + hibernation was an anti-pattern, also hibernation didn't work wtih yjs
   * @see https://docs.partykit.io/guides/scaling-partykit-servers-with-hibernation/
   */
  async getState() {
    const cardsFromStorage = await this.room.storage.get<RowOfCards[]>("cards");
    const scoreFromStorage = await this.room.storage.get<number>("score");

    const cards = cardsFromStorage || generateCards();
    const score = scoreFromStorage ?? 0;

    if (!cardsFromStorage) {
      this.room.storage.put("cards", cards);
    }
    if (typeof scoreFromStorage !== "number") {
      this.room.storage.put("score", score);
    }

    return {
      cards,
      score,
    };
  }

  updateState({ score, cards }: GameState) {
    // save score to disk
    this.room.storage.put("score", score);
    this.room.storage.put("cards", cards);
    // send updated counts to all connected listeners
    this.room.broadcast(createUpdateMessage({ score, cards }));
  }

  // for all HTTP requests, respond with the current state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onRequest(req: PartyKit.Request) {
    const state = await this.getState();

    return json(createUpdateMessage(state));
  }

  // on WebSocket connection, send the current state
  async onConnect(connection: PartyKit.Connection) {
    const state = await this.getState();

    connection.send(createUpdateMessage(state));
  }

  async onMessage(message: string, connection: PartyKit.Connection) {
    const state = await this.getState();

    // rate limit incoming messages
    rateLimit(connection, 50, () => {
      const parsed = parseSetMessage(message);

      const { pickedCards, remainingCards } = pickCards({
        cards: state.cards,
        picked: parsed.selection,
      });

      if (pickedCards.length !== 3) {
        throw new Error(
          JSON.stringify(
            {
              message: `Cards missing: Only found ${pickedCards.length} of 3 cards`,
              related: {
                cards: state.cards.flatMap((row) => row.map((card) => card.id)),
                picked: parsed.selection,
              },
            },
            null,
            2,
          ),
        );
      }

      if (!validateSet(pickedCards)) {
        throw new Error("Invalid set");
      }

      /**
       * Stack remaining cards as rows
       *
       * REVIEW: Maybe it would be cooler to stack vertically => making sure we keep card index
       *
       * [ A, B, C ]
       * [ E, F, G ]
       * [ H, I, J ]
       *
       * picking A + F + J =>
       * [ E, B, C ]
       * [ H, I, G ]
       * [ K, L, M ]
       */
      let rowMemo: Card[] = [];
      const remainingCardsAsRows = remainingCards.reduce<RowOfCards[]>(
        (memo, card) => {
          rowMemo.push(card);

          if (rowMemo.length === 3) {
            memo.push(rowMemo as RowOfCards);
            rowMemo = [];
          }

          return memo;
        },
        [],
      );

      const cards = generateCards(remainingCardsAsRows);
      const score = state.score + 1;

      this.updateState({ score, cards });
    });
  }
}

MatchGameServer satisfies PartyKit.Worker;
