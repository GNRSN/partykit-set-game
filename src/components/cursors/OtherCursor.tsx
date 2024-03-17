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
    <div className="absolute" ref={rCursor} style={{ left: -10, top: -10 }}>
      {pointer === "touch" ? (
        <svg
          height="32"
          viewBox="0 0 32 32"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" transform="translate(9 8)">
            <path d="M 0 6 L 10 0 L 6 11 L 4 7 L 0 6" fill={fill} />
            <path d="M 0 6 L 10 0 L 6 11 L 4 7 L 0 6" fill="#fff" />
          </g>
        </svg>
      ) : (
        <svg
          height="32"
          viewBox="0 0 32 32"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" transform="translate(10 7)">
            <path d="M 0 6 L 10 0 L 6 11 L 4 7 L 0 6" fill="#fff" />
            <path d="M 0 6 L 10 0 L 6 11 L 4 7 L 0 6" fill={fill} />
          </g>
        </svg>
      )}
      <div
        className="absolute text-2xl whitespace-nowrap p-1"
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
