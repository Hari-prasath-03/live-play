import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type React from "react";

interface OtpInputProps {
  length: number;
  ref: React.RefObject<(HTMLInputElement | null)[]>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const otpInputVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  }),
};

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  ref,
  handleChange,
  handleKeyDown,
  handlePaste,
}) => (
  <div className="flex justify-between gap-2 mb-6 text-center text-white/70">
    {Array.from({ length }).map((_, i) => (
      <motion.input
        key={i}
        custom={i}
        variants={otpInputVariants}
        initial="hidden"
        animate="visible"
        type="text"
        maxLength={1}
        className="w-12 h-12 text-center text-2xl font-semibold text-white bg-transparent border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-150"
        ref={(el) => {
          ref.current[i] = el;
        }}
        onChange={(e) => handleChange(e, i)}
        onKeyDown={(e) => handleKeyDown(e, i)}
        onPaste={handlePaste}
      />
    ))}
  </div>
);

export default OtpInput;
