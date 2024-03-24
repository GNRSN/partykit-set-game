import { useCallback, useLayoutEffect, useRef } from "react";
import { Cursor } from "@/party-kit/cursors";

import { useCursorsContext } from "./cursors-provider";

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function OtherCursorImpl(props: { cursor: Cursor }) {
  const { cursor } = props;
  const { windowDimensions } = useCursorsContext();
  const fill = "#04f";
  const rCursor = useRef<HTMLDivElement>(null);

  const animateCursor = useCallback((point: number[]) => {
    const elm = rCursor.current;
    if (!elm) return;
    elm.style.setProperty(
      "transform",
      `translate(${point[0]}px, ${point[1]}px)`,
    );
  }, []);

  useLayoutEffect(() => {
    animateCursor([left, top]), [animateCursor, [left, top]];
  });

  const offset = 10;
  const left = cursor.x * windowDimensions.width - offset;
  const top = cursor.y * windowDimensions.height - offset;

  const flag = cursor.country ? `${getFlagEmoji(cursor.country)} ` : "";

  const pointer = cursor.pointer ?? "mouse";

  return (
    <div
      className="absolute"
      ref={rCursor}
      style={{ left: 9, top: -3 }}
    >
      {pointer === "touch" ?
        <svg
          height="25"
          viewBox="0 0 20 20"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            transform="translate(9 9)"
          >
            <path
              d="M 10 6 L 0 0 L 5 11 L 6 7 L 10 6"
              fill={fill}
            />
          </g>
        </svg>
      : <svg
          height="25"
          viewBox="0 0 20 20"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            transform="translate(9 9)"
          >
            <path
              d="M 10 6 L 0 0 L 5 11 L 6 7 L 10 6"
              fill={fill}
            />
          </g>
        </svg>
      }
      <div
        className="absolute whitespace-nowrap p-1 text-2xl"
        style={{ top: 10, left: 16 }}
      >
        {flag}
      </div>
    </div>
  );
}

export default function OtherCursor(props: { id: string }) {
  const { id } = props;
  const { others } = useCursorsContext();
  const cursor = others[id];
  if (!cursor) return null;
  return <OtherCursorImpl cursor={cursor} />;
}
