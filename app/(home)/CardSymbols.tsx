import { cn } from "@/lib/utils";

import { type Card } from "../../game-logic/card-logic";

export const Diamond = ({ card }: { card: Card }) => (
  <svg width="20" height="80" viewBox="0 0 45 80">
    {card.fill === "striped" && (
      <defs>
        <pattern
          id={`diagonalHatch-${card.color}`}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
        >
          <path
            d="M-1,1 l2,-2
            M0,8 l4,-4
            M7,9 l2,-2"
            className={cn("stroke-2", {
              "stroke-red-500": card.color === "red",
              "stroke-green-600": card.color === "green",
              "stroke-blue-600": card.color === "purple",
            })}
          />
        </pattern>
      </defs>
    )}
    <polygon
      points="20,0 40,40 20,80 0,40"
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
    />
  </svg>
);
export const Squiggle = ({ card }: { card: Card }) => (
  <svg width="30" height="40" viewBox="-1 0 30 30">
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
      d="M 20 6 L 20 6 C 24 12 9 9 12 15 C 13 17 26 30 18 33 Q 10 36 2 30 C -2 27 0 21 4 24 C 12 30 14 27 12 24 C 10 21 4.6667 22 2 15 C 0 9 4 6 8 3 C 12 0 16 0 20 6"
    />
  </svg>
);
export const Rounded = ({ card }: { card: Card }) => (
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

      "pattern-lines pattern-bg-white pattern-size-1 pattern-opacity-100 outline":
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
