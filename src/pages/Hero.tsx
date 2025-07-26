import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";

const Hero = () => {
  const nav = useNavigate();

  return (
    <section className="section justify-center py-20 relative overflow-hidden">
      <Background />
      <div className="relative z-10 flex flex-col items-center gap-10">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <h1 className="text-6xl font-comic drop-shadow-md">
            Play as you like
          </h1>
          <h3 className="font-delius text-neutral-500">
            You can either play with friends or with my new AI
          </h3>
        </motion.div>

        <motion.div
          className="flex items-center gap-10 *:text-xl *:font-comic"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <button onClick={() => nav("play-with-ai")} className="btn theme-gradient">Play with Alpha 🤖</button>
          <button onClick={() => nav("room")} className="btn theme-gradient">
            Play with Friends
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
