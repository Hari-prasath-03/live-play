/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { getOrCreateUserId } from "../utils/userId";
import { motion } from "framer-motion";
import OtpInput from "../components/OtpInput";
import { ConfirmModal } from "../components/ConformModel";
import useGameContext from "../context/GameContext";
import Background from "../components/Background";
import toast from "react-hot-toast";
import { darkToastStyle } from "../assets";
import { generateRandom } from "../utils/generateRandom";
import { useNavigate } from "react-router-dom";

const RoomSetup = () => {
  const {
    webSocketContext: { isConnected, sendMessage, messages },
  } = useGameContext();
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [showModel, setshowModel] = useState(false);
  const [mode, setMode] = useState<"create" | "join" | null>();
  const nav = useNavigate();

  const createRoom = () => {
    const roomId = joindAndCheckOtp();
    if (!roomId)
      return toast("Please enter a valid 6-digit OTP", {
        icon: "🚫",
        style: { ...darkToastStyle },
      });
    setMode("create");
    const userId = getOrCreateUserId();
    sendMessage(JSON.stringify({ type: "create", roomId, userId }));
    sessionStorage.setItem("roomId", roomId);
  };

  const joinRoom = () => {
    const roomId = joindAndCheckOtp();
    if (!roomId) {
      toast("Please enter a valid 6-digit OTP", {
        icon: "🚫",
        style: { ...darkToastStyle },
      });
    }
    setMode("join");
    sessionStorage.setItem("roomId", roomId || "");
    sendMessage(
      JSON.stringify({ type: "join", roomId, userId: getOrCreateUserId() })
    );
  };

  const onConfirm = () => {
    setshowModel(false);
    const roomId = sessionStorage.getItem("roomId");
    if (inputRef.current) {
      inputRef.current.forEach((inp, i) => {
        if (inp) inp.value = roomId?.[i] || "";
      });
    }
    sendMessage(
      JSON.stringify({
        type: "reconnect",
        roomId: roomId,
        userId: getOrCreateUserId(),
      })
    );
  };

  const onCancel = () => {
    setshowModel(false);
    sessionStorage.removeItem("roomId");
  };

  const reConnectRoom = () => {
    const roomId = sessionStorage.getItem("roomId");
    if (!roomId) return;
    setshowModel(true);
  };

  useEffect(() => {
    if (!isConnected) return;
    reConnectRoom();
  }, [isConnected]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;
    if (value && index < 5) inputRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target as HTMLInputElement;
    if (e.key === "Backspace" && !input.value && index > 0)
      inputRef.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    pasteData.forEach((digit, index) => {
      if (inputRef.current[index]) inputRef.current[index].value = digit;
    });
    const next = pasteData.length < 6 ? pasteData.length : 5;
    inputRef.current[next]?.focus();
  };

  const joindAndCheckOtp = () => {
    const otp = inputRef.current.map((inp) => inp?.value).join("");
    if (otp.length !== 6) return null;
    return otp;
  };

  const populateRandomOtp = () => {
    const randomOtp = generateRandom(6);
    sessionStorage.setItem("roomId", randomOtp);

    if (inputRef.current) {
      inputRef.current.forEach((inp, i) => {
        if (inp) inp.value = randomOtp[i];
      });
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const redirectMsgs = ["Room joined!", "Opponent joined!", "Room rejoined!"];

    if (messages.length === 0) return;
    else if (redirectMsgs.includes(lastMessage)) {
      nav(`/player-room?roomId=${sessionStorage.getItem("roomId")}&mode=${mode}`);
    } else {
      toast(lastMessage, {
        style: { ...darkToastStyle },
      });
    }
  }, [messages]);

  return (
    <div className="section justify-center gap-5 py-20 relative overflow-hidden">
      <Background />
      <ConfirmModal
        show={showModel}
        onConfirm={onConfirm}
        onCancel={onCancel}
        question={`Do you want to rejoin the room ${
          sessionStorage.getItem("roomId") || ""
        }?`}
      />
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        <h2 className="text-5xl font-bold font-comic">Room Setup</h2>
        <h3 className="font-delius text-neutral-500">
          Do you want to create a new room or join?
        </h3>
      </motion.div>
      <OtpInput
        length={6}
        ref={inputRef}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        handlePaste={handlePaste}
      />
      <div>
        <button onClick={populateRandomOtp} className="btn theme-gradient">
          Gen random
        </button>
      </div>
      <div className="flex gap-4 mt-4 *:text-xl *:font-comic">
        <button onClick={createRoom} className="btn theme-gradient">
          Create Room
        </button>
        <button onClick={joinRoom} className="btn theme-gradient">
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomSetup;
