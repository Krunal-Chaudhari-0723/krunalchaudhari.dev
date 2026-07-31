import { motion } from "framer-motion";
import { FaCommentDots } from "react-icons/fa";

const ChatButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
      {/* Pulsing Outer Rings */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          className="absolute inset-0 rounded-full bg-indigo-500/10 blur-md"
        />
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-950/80 backdrop-blur-md shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 border border-white/10 hover:border-cyan-500/40 transition-all duration-350 cursor-pointer"
        aria-label="Open AI Assistant"
      >
        {/* Soft rotating background aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 group-hover:from-cyan-500/20 group-hover:to-indigo-500/20 animate-spin-slow transition-all duration-350" />
        
        {/* Border glow */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all duration-350" />

        {/* Message Symbol */}
        <div className="relative transform group-hover:scale-110 transition duration-300">
          <FaCommentDots className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
        </div>
      </motion.button>
    </div>
  );
};

export default ChatButton;
