import type { CSSProperties } from "react";
import { bgShapes } from "../motion/hero";
import { motion } from "framer-motion";

const Background = () => {
  return (
    <>
      {bgShapes.map(({ id, label, color, rotate, scale, ...position }, i) => {
        const style: CSSProperties = {
          color,
          transform: `rotate(${rotate}) scale(${scale})`,
          ...position,
        };

        return (
          <motion.span
            key={id}
            className="absolute text-[14rem] font-comic pointer-events-none select-none opacity-[0.15] mix-blend-screen z-0"
            style={style}
            animate={{
              opacity: [0.2, 0.3, 0.3, 0.2],
              y: ["0%", "10%", "-10%", "0%"],
              scale: [1, 1.1, 0.9, 1],
              transition: {
                delay: i * 0.5,
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {label}
          </motion.span>
        );
      })}
    </>
  );
};

export default Background;
