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

const SuggestedQuestions = ({ onSelectQuestion, suggestions = DEFAULT_QUESTIONS, disabled }) => {
  // Use provided suggestions list (safeguarded against empty/null values)
  const chips = Array.isArray(suggestions) && suggestions.length > 0 ? suggestions : DEFAULT_QUESTIONS;

  return (
    <div className="no-scrollbar mask-fade-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-2.5">
      {chips.map((question) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelectQuestion(question)}
          className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-brand-400/40 hover:bg-brand-400/10 hover:text-brand-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
