"use client";

import { useCursorsContext } from "./cursors-provider";
import MyCursor from "./MyCursor";
import OtherCursor from "./OtherCursor";

export function Cursors() {
  const { others } = useCursorsContext();
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 h-full w-full overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {Object.keys(others).map((id) => (
        <div key={`cursor-${id}`}>
          <OtherCursor id={id} />
        </div>
      ))}
      {/*
        <!-- set overflow-hidden on body to prevent scrolling,
        otherwise reflecting the touch cursor is out of place. -->
        */}
      <MyCursor />
    </div>
  );
}
