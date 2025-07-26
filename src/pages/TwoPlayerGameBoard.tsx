/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GameBoard from "../components/GameBoard";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGameContext from "../context/GameContext";
import { getOrCreateUserId } from "../utils/userId";
import { calcQuardinates } from "../utils/math";
import toast from "react-hot-toast";
import { darkToastStyle } from "../assets";

const TwoPlayerGameBoard = () => {
  const [params] = useSearchParams();
  const roomId = params.get("roomId") || sessionStorage.getItem("roomId");
  const mode = params.get("mode");
  const [isMyTurn, setIsMyTurn] = useState(() => mode === "create");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMeWin, setIsMeWin] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const nav = useNavigate();

  const overMessages = [
    "Match draw!",
    "Player X won!",
    "Player O won!",
    "Game is already over.",
  ];

  const mySymbol = mode === "create" ? "X" : "O";

  const {
    webSocketContext: { sendMessage, messages, clearAllMessages },
  } = useGameContext();
  const [square, setSquare] = useState(Array(9).fill(null));

  const handleClick = (i: number) => {
    if (square[i] != null && !isMyTurn) return;
    setSquare((prev) => prev.map((val, ind) => (ind === i ? mySymbol : val)));
    sendMessage(
      JSON.stringify({
        type: "move",
        roomId,
        userId: getOrCreateUserId(),
        payload: { ...calcQuardinates(i) },
      })
    );
  };

  const playAgain = () => {
    setSquare(Array(9).fill(null));
    setIsGameOver(false);
    clearAllMessages();
    setIsMeWin(false);
  };

  const clearRoom = () => {
    sendMessage(
      JSON.stringify({
        type: "clear-2-player-room",
        roomId,
        userId: getOrCreateUserId(),
      })
    );
    sessionStorage.removeItem("roomId");
    nav("/");
  };

  useEffect(() => {
    if (messages.length === 0) return;
    const latest = messages[messages.length - 1];

    if (latest.startsWith("{") && latest.endsWith("}")) {
      const msg = JSON.parse(latest);
      if ("row" in msg && "col" in msg && "player" in msg) {
        const { row, col, player } = msg;
        const flatIndex = row * 3 + col;
        if (player !== mySymbol) {
          setSquare((prev) =>
            prev.map((val, ind) => (ind === flatIndex ? player : val))
          );
        }
        setIsMyTurn(player !== mySymbol);
        return;
      }
    } else if (overMessages.includes(latest)) {
      setIsGameOver(true);
      setIsMeWin(
        (latest === "Player X won!" && mySymbol === "X") ||
          (latest === "Player O won!" && mySymbol === "O")
      );
      if (latest === "Match draw!") setIsDraw(true);
    }
    toast(latest, {
      style: {
        ...darkToastStyle,
      },
    });

    return () => clearAllMessages();
  }, [messages]);

  return (
    <section className="section justify-center py-20 relative overflow-hidden">
      <table className="min-h-full table-fixed relative">
        {(!isMyTurn || isGameOver) && (
          <thead className="absolute inset-0 bg-white/5 blur-md" />
        )}
        <tbody>
          <GameBoard square={square} handleClick={handleClick} />
        </tbody>
        <tfoot className="relative">
          <tr>
            <td
              colSpan={3}
              className="pt-5 text-center text-neutral-300 font-bold font-comic"
            >
              {!isGameOver
                ? isMyTurn
                  ? "Your Turn"
                  : "Waiting for Opponent..."
                : isMeWin
                ? "You Won! 🎉"
                : isDraw
                ? "It's a Draw! 🤝"
                : "You Lost! 😢"}
            </td>
            {isGameOver && (
              <>
                <td className="flex items-center">
                  <button
                    onClick={clearRoom}
                    className="absolute top-16 left-0 btn theme-gradient"
                  >
                    Back to Lobby
                  </button>
                </td>
                <td className="flex items-center">
                  <button
                    onClick={playAgain}
                    className="absolute top-16 right-0 btn theme-gradient"
                  >
                    Play Again
                  </button>
                </td>
              </>
            )}
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default TwoPlayerGameBoard;
