import { useCallback, useLayoutEffect, useRef } from "react";

import { useCursors } from "./cursors-provider";

export default function MyCursor() {
  const { myCursor, windowDimensions } = useCursors();
  const fill = "#000";
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
  const left = myCursor ? myCursor.x * windowDimensions.width - offset : -10;
  const top = myCursor ? myCursor.y * windowDimensions.height - offset : -10;

  // The purpose of this component is to reflect the user's own cursor when on mobile
  if (myCursor?.pointer !== "touch") {
    return null;
  }

  return (
    <div className="absolute" ref={rCursor} style={{ left: -10, top: -10 }}>
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
    </div>
  );
}
