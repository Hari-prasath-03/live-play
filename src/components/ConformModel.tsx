import { motion, AnimatePresence, type Variants } from "framer-motion";

interface ConfirmModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  question: string;
}

const modal: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export const ConfirmModal = ({
  show,
  onConfirm,
  onCancel,
  question = "Are you sure?",
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
          <motion.div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-black/60 overflow-hidden rounded-b-lg">
            <motion.div
              className="py-4 px-6 max-w-sm w-full shadow-xl text-center"
              variants={modal}
            >
              <p className="mt-2 mb-6 text-neutral-400">{question}</p>
              <div className="flex justify-end gap-4">
                <button
                  className="btn-sm bg-blue-500 text-white"
                  onClick={onConfirm}
                >
                  Yes
                </button>
                <button
                  className="btn-sm bg-neutral-800/80 text-white"
                  onClick={onCancel}
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
