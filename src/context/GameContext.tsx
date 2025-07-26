/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type PropsWithChildren } from "react";
import useWebSocket, { type TypeWebSocketReturn } from "../hooks/useWebSocket";

type GameContextType = {
  webSocketContext: TypeWebSocketReturn;
};

const GameContext = createContext({} as GameContextType);

export const GameContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const webSocketContext = useWebSocket(import.meta.env.VITE_WS_URL as string);

  const contextValue = {
    webSocketContext,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (context) {
    return context;
  } else {
    throw new Error("Context must be used inside its children");
  }
};

export default useGameContext;
