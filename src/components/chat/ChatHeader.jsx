import { FaSyncAlt, FaTimes } from "react-icons/fa";
import Profile from "../../assets/new_profile.png";

const ChatHeader = ({ onClose, onClear }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md rounded-t-2xl">
      {/* Title & Status */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full border border-cyan-500/30 overflow-hidden shadow-lg shadow-cyan-500/10 flex-shrink-0">
            <img
              src={Profile}
              alt="Krunal Chaudhari"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Status Dot */}
          <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-slate-900" />
          </span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
            Krunal Chaudhari
            <span className="text-[8px] px-1 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest">AI</span>
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9px] text-slate-400 font-medium">
              Full Stack & AI Engineer • Gemini Powered
            </span>
            <span className="text-slate-500 text-[8px]">•</span>
            <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider">Online</span>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {/* Reset Chat Button */}
        <button
          onClick={onClear}
          title="Clear Chat"
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-slate-400 hover:text-white transition duration-200 cursor-pointer"
        >
          <FaSyncAlt className="text-xs" />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close Assistant"
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-slate-400 hover:text-white transition duration-200 cursor-pointer"
        >
          <FaTimes className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
