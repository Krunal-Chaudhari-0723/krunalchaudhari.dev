import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { FiX } from "react-icons/fi";

// Floating launcher: "Ask AI" pill that turns into a close button while the chat is open
const ChatButton = ({ isOpen, onClick }) => {
  return (
    <div className={`fixed bottom-5 right-5 z-50 md:bottom-8 md:right-8 ${isOpen ? "hidden md:block" : ""}`}>
      <motion.button
        layout
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        className="btn-primary group relative flex h-12 cursor-pointer items-center gap-2 overflow-hidden rounded-full pl-4 pr-5 text-sm font-medium"
        style={isOpen ? { paddingRight: "1rem" } : undefined}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <FiX className="text-lg" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <HiSparkles className="text-base transition-transform duration-300 group-hover:rotate-12" />
              Ask AI
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatButton;
