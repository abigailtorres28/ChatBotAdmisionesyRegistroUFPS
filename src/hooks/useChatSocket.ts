// src/hooks/useChatSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "../stores/chatStore";
import { v4 as uuidv4 } from "uuid";
import { WS_ENDPOINT } from "../utils/constants";

let socket: Socket;

export const useChatSocket = () => {
  const [connected, setConnected] = useState(false);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    socket = io(WS_ENDPOINT, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("bot_response", (data: { content: string }) => {
      addMessage({
        id: uuidv4(),
        role: "assistant",
        content: data.content,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage]);

  const sendMessage = (text: string) => {
    socket.emit("user_message", { content: text });
  };

  return { sendMessage, connected };
};
