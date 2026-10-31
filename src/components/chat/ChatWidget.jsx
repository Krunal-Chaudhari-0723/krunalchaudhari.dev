import { useState, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import ChatButton from "./ChatButton";

// Dynamic import for performance optimization
const ChatWindow = lazy(() => import("./ChatWindow"));

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Launcher - Always Loaded */}
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />

      {/* Lazy Loaded Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={null}>
            <ChatWindow onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
