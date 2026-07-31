import { useState, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import ChatButton from "./ChatButton";

// Dynamic import for performance optimization
const ChatWindow = lazy(() => import("./ChatWindow"));

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Sparkle Trigger Button - Always Loaded */}
      <ChatButton onClick={toggleChat} />

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
