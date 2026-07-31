import { motion } from "framer-motion";

const TypingIndicator = () => {
  const dotVariants = {
    animate: (i) => ({
      y: [0, -6, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.15,
      },
    }),
  };

  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 w-fit max-w-[80%] backdrop-blur-md shadow-md shadow-black/10">
      <span className="text-xs text-slate-400 mr-1 font-medium">Assistant is thinking</span>
      <div className="flex gap-1 items-center h-2 mt-1">
        {[0, 1, 2].map((idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={dotVariants}
            animate="animate"
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
