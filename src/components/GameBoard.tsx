import { motion } from "framer-motion";

interface GameBoardProps {
  square: (string | null)[];
  handleClick: (i: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ square, handleClick }) => {
  return (
    <>
      {[...Array(3)].map((_, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(3)].map((_, colIndex) => (
            <td key={colIndex}>
              <Square
                i={rowIndex * 3 + colIndex}
                value={square[rowIndex * 3 + colIndex]}
                onSquareClick={() => handleClick(rowIndex * 3 + colIndex)}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default GameBoard;

const Square = ({
  value,
  onSquareClick,
  i,
}: {
  value: string | null;
  onSquareClick: () => void;
  i: number;
}) => {
  return (
    <motion.button
      initial={{ rotate: 160, scale: 0.1 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        delay: (i + 1) * 0.1,
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      className="font-delius font-black text-[44px] m-1 size-20 rounded-lg 
      cursor-pointer bg-neutral-800/80 transition-colors duration-200 border-2 
      border-transparent hover:border-pink-600/90"
      onClick={onSquareClick}
    >
      {value}
    </motion.button>
  );
};
