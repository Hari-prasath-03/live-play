/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useGameContext from "../context/GameContext";
import { getOrCreateUserId } from "../utils/userId";
import toast from "react-hot-toast";
import { darkToastStyle } from "../assets";
import GameBoard from "./GameBoard";
import { calcQuardinates, revCalcQuardinates } from "../utils/math";
import { useNavigate } from "react-router-dom";

const AiGameBoard = ({ roomId }: { roomId: string }) => {
  const {
    webSocketContext: { sendMessage, messages, clearAllMessages },
  } = useGameContext();
  const [square, setSquare] = useState(Array(9).fill(null));
  const [isTableDisabled, setIsTableDisabled] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const nav = useNavigate();

  const handleClick = (i: number) => {
    if (square[i] != null) return;
    setSquare((pv) => pv.map((val, ind) => (ind === i ? "X" : val)));
    sendMessage(
      JSON.stringify({
        type: "ai-move",
        roomId,
        userId: getOrCreateUserId(),
        payload: { ...calcQuardinates(i) },
      })
    );
    setSquare((pv) => [...pv]);
  };

  const clearRoom = () => {
    sendMessage(
      JSON.stringify({
        type: "clear-ai-room",
        roomId,
        userId: getOrCreateUserId(),
      })
    );
    sessionStorage.removeItem("roomId");
    nav("/");
  };

  useEffect(() => {
    if (messages.length === 0) return;
    else if (
      messages[messages.length - 1].startsWith("{") &&
      messages[messages.length - 1].endsWith("}")
    ) {
      setIsTableDisabled(true);
      const i = revCalcQuardinates(JSON.parse(messages[messages.length - 1]));
      setTimeout(() => {
        setSquare((pv) => pv.map((val, ind) => (ind === i ? "O" : val)));
        setIsTableDisabled(false);
      }, 1000);
      return;
    } else if (messages[messages.length - 1] === "Game is a draw!") {
      setIsGameOver(true);
      setTimeout(() => {
        setIsTableDisabled(true);
        toast(messages[messages.length - 1], {
          icon: "💬",
          style: {
            ...darkToastStyle,
          },
        });
      }, 1000);
      return;
    } else if (messages[messages.length - 1] === "AI wins!") {
      setIsGameOver(true);
      setTimeout(() => {
        setIsTableDisabled(true);
        toast(messages[messages.length - 1], {
          icon: "💬",
          style: {
            ...darkToastStyle,
          },
        });
      }, 1000);
      return;
    }
    toast(messages[messages.length - 1], {
      icon: "💬",
      style: {
        ...darkToastStyle,
      },
    });
    return () => clearAllMessages();
  }, [messages]);

  return (
    <table className="min-h-full table-fixed relative">
      {isTableDisabled && (
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
            {square.every((val) => val === null)
              ? "Let's start the game!"
              : isGameOver
              ? "Game Over!"
              : isTableDisabled
              ? "Wait for AI's move..."
              : "Your turn!"}
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
              <td colSpan={3} className="flex items-center">
                <button
                  onClick={() => {
                    window.location.reload();
                    clearRoom();
                  }}
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
  );
};

export default AiGameBoard;
