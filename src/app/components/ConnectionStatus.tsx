"use client";

import { useEffect, useState } from "react";
import PartySocket from "partysocket";

import { useCursorsContext } from "@/components/cursors/cursors-provider";

const readyStates = {
  [PartySocket.CONNECTING]: {
    text: "Connecting",
    color: "bg-yellow-500",
  },
  [PartySocket.OPEN]: {
    text: "Connected",
    color: "bg-green-500",
  },
  [PartySocket.CLOSING]: {
    text: "Closing",
    color: "bg-orange-500",
  },
  [PartySocket.CLOSED]: {
    text: "Not Connected",
    color: "bg-red-500",
  },
};

export function ConnectionStatus({
  socket,
}: {
  socket: PartySocket | WebSocket | null;
}) {
  const { getCount } = useCursorsContext();

  const [readyState, setReadyState] = useState<number>(
    socket?.readyState === 1 ? 1 : 0,
  );
  const display = readyStates[readyState as keyof typeof readyStates];

  useEffect(() => {
    if (socket) {
      const onStateChange = () => {
        setReadyState(socket.readyState);
      };

      socket.addEventListener("open", onStateChange);
      socket.addEventListener("close", onStateChange);

      return () => {
        socket.removeEventListener("open", onStateChange);
        socket.removeEventListener("close", onStateChange);
      };
    }
  }, [socket]);

  return (
    <div className="z-20 fixed top-6 right-2 flex gap-2 justify-center items-center  px-3 py-1 sm:py-2">
      <p className="text-xs font-base uppercase tracking-wider leading-none text-stone-500">
        ({getCount()}) {display.text}
      </p>
      <div className={`w-3 h-3 rounded-full ${display.color}`}></div>
    </div>
  );
}
