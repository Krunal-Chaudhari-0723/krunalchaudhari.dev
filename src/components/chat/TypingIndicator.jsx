import AssistantAvatar from "./AssistantAvatar";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3 py-2" role="status" aria-live="polite">
      <AssistantAvatar />
      <div className="flex items-center gap-2">
        <span className="flex gap-1">
          {[0, 1, 2].map((idx) => (
            <span
              key={idx}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400"
              style={{ animationDelay: `${idx * 0.15}s` }}
            />
          ))}
        </span>
        <span className="text-shimmer text-sm font-medium">Thinking…</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
