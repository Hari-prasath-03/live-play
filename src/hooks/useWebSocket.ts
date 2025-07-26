import { useEffect, useRef, useState } from "react";

export type TypeWebSocketReturn = {
  messages: string[];
  sendMessage: (msg: string, cb?: () => void) => void;
  isConnected: boolean;
  clearAllMessages: () => void;
};

const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendMessage = (msg: string, cb?: () => void) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
      cb?.();
    }
  };

  useEffect(() => {
    socketRef.current = new WebSocket(url);
    const socket = socketRef.current;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection established");
      setMessages([]);
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [url]);

  const clearAllMessages = () => setMessages([]);

  return { messages, sendMessage, isConnected, clearAllMessages };
};

export default useWebSocket;
