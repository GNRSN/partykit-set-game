import { Card } from "@/game-logic/card-types";

import { cn } from "@/lib/utils";

export const Circle = ({ card }: { card: Card }) => (
  <svg viewBox="0 0 28 28">
    {card.fill === "striped" && (
      <defs>
        <pattern
          id={`diagonalHatch-${card.id}`}
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          shapeRendering="crispEdges"
        >
          <path
            d="M-1,1 l2,-2
                M0,4 l4,-4
                M3,5 l2,-2"
            className={cn("stroke-2", {
              "stroke-red-500": card.color === "red",
              "stroke-green-600": card.color === "green",
              "stroke-blue-600": card.color === "blue",
            })}
          />
        </pattern>
      </defs>
    )}
    <circle
      cx="10"
      cy="10"
      r="10"
      className={cn("fill-white", "translate-y-1", "translate-x-1", {
        "fill-red-500": card.fill === "solid" && card.color === "red",
        "fill-green-600": card.fill === "solid" && card.color === "green",
        "fill-blue-600": card.fill === "solid" && card.color === "blue",

        "stroke-red-500 stroke-2":
          card.fill === "outline" && card.color === "red",
        "stroke-green-600 stroke-2":
          card.fill === "outline" && card.color === "green",
        "stroke-blue-600 stroke-2":
          card.fill === "outline" && card.color === "blue",

        "stroke-red-500 stroke-1":
          card.fill === "striped" && card.color === "red",
        "stroke-green-600 stroke-1":
          card.fill === "striped" && card.color === "green",
        "stroke-blue-600 stroke-1":
          card.fill === "striped" && card.color === "blue",

        // REVIEW: I couldn't get local url to apply through tailwind
        //
        // [`fill-[url(#diagonalHatch-${card.color})]`]: card.fill === "striped",
      })}
      style={{
        fill:
          card.fill === "striped"
            ? `url(#diagonalHatch-${card.id})`
            : undefined,
      }}
    />
  </svg>
);
export const Square = ({ card }: { card: Card }) => (
  <svg viewBox="0 0 28 28">
    {card.fill === "striped" && (
      <defs>
        <pattern
          id={`diagonalHatch-${card.id}`}
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          shapeRendering="crispEdges"
        >
          <path
            d="M-1,1 l2,-2
                M0,4 l4,-4
                M3,5 l2,-2"
            className={cn("stroke-2", {
              "stroke-red-500": card.color === "red",
              "stroke-green-600": card.color === "green",
              "stroke-blue-600": card.color === "blue",
            })}
          />
        </pattern>
      </defs>
    )}
    <rect
      width={20}
      height={20}
      className={cn("fill-white", "translate-x-1", "translate-y-1", {
        "fill-red-500": card.fill === "solid" && card.color === "red",
        "fill-green-600": card.fill === "solid" && card.color === "green",
        "fill-blue-600": card.fill === "solid" && card.color === "blue",

        "stroke-red-500 stroke-2":
          card.fill === "outline" && card.color === "red",
        "stroke-green-600 stroke-2":
          card.fill === "outline" && card.color === "green",
        "stroke-blue-600 stroke-2":
          card.fill === "outline" && card.color === "blue",

        "stroke-red-500 stroke-1":
          card.fill === "striped" && card.color === "red",
        "stroke-green-600 stroke-1":
          card.fill === "striped" && card.color === "green",
        "stroke-blue-600 stroke-1":
          card.fill === "striped" && card.color === "blue",

        // REVIEW: I couldn't get local url to apply through tailwind
        //
        // [`fill-[url(#diagonalHatch-${card.color})]`]: card.fill === "striped",
      })}
      style={{
        fill:
          card.fill === "striped"
            ? `url(#diagonalHatch-${card.id})`
            : undefined,
      }}
    />
  </svg>
);
export const Triangle = ({ card }: { card: Card }) => (
  <svg viewBox="0 0 28 28">
    {card.fill === "striped" && (
      <defs>
        <pattern
          id={`diagonalHatch-${card.id}`}
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          shapeRendering="crispEdges"
        >
          <path
            d="M-1,1 l2,-2
                M0,4 l4,-4
                M3,5 l2,-2"
            className={cn("stroke-2", {
              "stroke-red-500": card.color === "red",
              "stroke-green-600": card.color === "green",
              "stroke-blue-600": card.color === "blue",
            })}
          />
        </pattern>
      </defs>
    )}
    <polygon
      points="10 3, 20 20, 0 20"
      className={cn("fill-white", "translate-x-1", "translate-y-1", {
        "fill-red-500": card.fill === "solid" && card.color === "red",
        "fill-green-600": card.fill === "solid" && card.color === "green",
        "fill-blue-600": card.fill === "solid" && card.color === "blue",

        "stroke-red-500 stroke-2":
          card.fill === "outline" && card.color === "red",
        "stroke-green-600 stroke-2":
          card.fill === "outline" && card.color === "green",
        "stroke-blue-600 stroke-2":
          card.fill === "outline" && card.color === "blue",

        "stroke-red-500 stroke-1":
          card.fill === "striped" && card.color === "red",
        "stroke-green-600 stroke-1":
          card.fill === "striped" && card.color === "green",
        "stroke-blue-600 stroke-1":
          card.fill === "striped" && card.color === "blue",

        // REVIEW: I couldn't get local url to apply through tailwind
        //
        // [`fill-[url(#diagonalHatch-${card.color})]`]: card.fill === "striped",
      })}
      style={{
        fill:
          card.fill === "striped"
            ? `url(#diagonalHatch-${card.id})`
            : undefined,
      }}
    />
  </svg>
);
