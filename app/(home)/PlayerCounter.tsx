"use client";
import { useCursors } from "./cursors-provider";

export function PlayerCounter() {
  const { getCount } = useCursors();
  const count = getCount();

  return (
    <p>
      <strong>{count}</strong> player{count != 1 ? "s" : ""} 🎈
    </p>
  );
}
