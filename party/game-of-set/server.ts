import type * as PartyKit from "partykit/server";
import { createUpdateMessage, parseSetMessage } from "./types";
import { rateLimit } from "./limiter";
import { generateCards, pickCards, validateSet } from "@/game-logic/card-logic";
import { Card, RowOfCards } from "@/game-logic/card-types";

const json = (response: string) =>
  new Response(response, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export default class SetGameServer implements PartyKit.Server {
  options: PartyKit.ServerOptions = { hibernate: true };
  constructor(readonly room: PartyKit.Party) {}
  // reactions: Record<string, number> = {};
  cards: RowOfCards[] = [];
  score: number = 0;

  async onStart() {
    // load reactions from storage on startup
    // this.reactions = (await this.room.storage.get("reactions")) ?? {};
    this.cards = generateCards();
    this.score = (await this.room.storage.get("reactions")) ?? 0;
  }

  async onRequest(req: PartyKit.Request) {
    // for all HTTP requests, respond with the current state
    return json(createUpdateMessage(this.cards, this.score));
  }

  onConnect(conn: PartyKit.Connection) {
    // on WebSocket connection, send the current state
    conn.send(createUpdateMessage(this.cards, this.score));
  }

  onMessage(message: string, sender: PartyKit.Connection) {
    // rate limit incoming messages
    rateLimit(sender, 50, () => {
      // client sends WebSocket message: update reaction count
      const parsed = parseSetMessage(message);

      const { pickedCards, remainingCards } = pickCards({
        cards: this.cards,
        picked: parsed.selection,
      });

      if (!validateSet(pickedCards)) {
        throw new Error("Invalid set");
      }
      this.updateAndBroadcastCardsAfterSet(remainingCards);
    });
  }

  updateAndBroadcastCardsAfterSet(remainingCards: Card[]) {
    // update stored reaction counts
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

    this.cards = generateCards(remainingCardsAsRows);
    this.score += 1;
    // send updated counts to all connected listeners
    this.room.broadcast(createUpdateMessage(this.cards, this.score));
    // save score to disk (fire and forget)
    this.room.storage.put("score", this.score);
  }
}

SetGameServer satisfies PartyKit.Worker;
