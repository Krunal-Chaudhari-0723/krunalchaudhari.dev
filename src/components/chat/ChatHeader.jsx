import { FiRotateCcw, FiX } from "react-icons/fi";
import AssistantAvatar from "./AssistantAvatar";

const ChatHeader = ({ onClose, onClear, canClear }) => {
  return (
    <div className="relative flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
      {/* Title & Status */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <AssistantAvatar size="h-9 w-9" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-400" />
        </div>

        <div className="leading-tight">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-zinc-50">
            Krunal's Assistant
            <span className="rounded-md bg-brand-400/15 px-1.5 py-px text-[10px] font-medium text-brand-200 ring-1 ring-inset ring-brand-400/25">
              AI
            </span>
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">Online · usually replies instantly</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        {canClear && (
          <button
            onClick={onClear}
            title="New chat"
            aria-label="Start a new chat"
            className="cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
          >
            <FiRotateCcw className="text-sm" />
          </button>
        )}
        <button
          onClick={onClose}
          title="Close"
          aria-label="Close assistant"
          className="cursor-pointer rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
        >
          <FiX className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
