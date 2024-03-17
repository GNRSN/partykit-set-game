"use client";

import { useCursors } from "./cursors-provider";
import MyCursor from "./MyCursor";
import OtherCursor from "./OtherCursor";

export default function Cursors() {
  const { others } = useCursors();
  return (
    <div
      className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50"
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
