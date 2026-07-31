import { motion } from "framer-motion";

const DEFAULT_QUESTIONS = [
  "Who are you?",
  "Show your projects",
  "Tech Stack",
  "Experience",
  "Education",
  "How can I hire you?",
  "Download Resume",
  "Contact",
  "Open Source",
  "Availability"
];

const SuggestedQuestions = ({ onSelectQuestion, suggestions = DEFAULT_QUESTIONS }) => {
  // Use provided suggestions list (safeguarded against empty/null values)
  const chips = Array.isArray(suggestions) && suggestions.length > 0 ? suggestions : DEFAULT_QUESTIONS;

  return (
    <div className="w-full py-2 overflow-x-auto scrollbar-hide flex gap-2 px-1 mask-linear-r">
      <div className="flex gap-2 flex-nowrap pb-1">
        {chips.map((question, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectQuestion(question)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
