/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useGameContext from "../context/GameContext";
import { genRandomId, getOrCreateUserId } from "../utils/userId";
import AiGameBoard from "../components/AIGameBoard";

const PlayWithAi = () => {
  const [roomId] = useState(() => genRandomId(6));

  const {
    webSocketContext: { isConnected, sendMessage },
  } = useGameContext();

  useEffect(() => {
    if (isConnected)
      sendMessage(
        JSON.stringify({
          type: "ai-create",
          userId: getOrCreateUserId(),
          roomId,
        })
      );
  }, [isConnected]);

  return (
    <section className="section justify-center py-20 relative overflow-hidden">
      <AiGameBoard roomId={roomId} />
    </section>
  );
};

export default PlayWithAi;
