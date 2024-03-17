import { describe, expect, it } from "bun:test";

import { generateCards } from "./card-logic";
import { Card } from "./card-types";

describe("generateCards", () => {
  it("returns 4 rows even when input is 3 rows containing > 0 matches(s)", () => {
    const c = {
      id: "1",
      fill: "solid",
      shape: "circle",
      color: "red",
      symbolCount: 1,
    } satisfies Card;

    expect(
      generateCards([
        [c, c, c],
        [c, c, c],
        [c, c, c],
      ]).length,
    ).toEqual(4);
  });
});
