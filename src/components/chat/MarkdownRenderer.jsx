import React from 'react';

const MarkdownRenderer = ({ content = '' }) => {
  if (!content) return null;

  // Split by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-350 break-words font-sans">
      {parts.map((part, idx) => {
        // Code Block
        if (part.startsWith('```')) {
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const lang = match ? match[1] : '';
          const code = match ? match[2] : part.slice(3, -3);

          return (
            <pre key={idx} className="bg-black/40 border border-slate-700/50 rounded-lg p-3 overflow-x-auto text-[11px] font-mono text-cyan-400 my-2">
              {lang && <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1 font-sans">{lang}</span>}
              <code>{code.trim()}</code>
            </pre>
          );
        }

        // Standard Text Block (parse bold, links, inline code, list items)
        const lines = part.split('\n');
        
        return (
          <div key={idx} className="space-y-1">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lineIdx} className="h-1" />;

              // List items check
              const isBullet = line.startsWith('•') || line.startsWith('*') || line.startsWith('-') || /^\d+\.\s/.test(line);
              let cleanLine = line;
              if (isBullet) {
                cleanLine = line.replace(/^(?:•|\*|-|\d+\.)\s*/, '');
              }

              // Process inline elements (bold, links, code)
              const processedContent = parseInlineElements(cleanLine);

              if (isBullet) {
                return (
                  <li key={lineIdx} className="ml-4 list-disc text-slate-300">
                    <span>{processedContent}</span>
                  </li>
                );
              }

              return (
                <p key={lineIdx} className="text-slate-300">
                  {processedContent}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Parses inline bold, links, and inline code
function parseInlineElements(text) {
  // Split by link patterns first: [label](url)
  const linkRegex = /(\[.*?\]\(.*?\))/g;
  const parts = text.split(linkRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, label, url] = match;
        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
          >
            {label}
          </a>
        );
      }
    }

    // Process bold (**text**) and inline code (`code`) in text parts
    return parseBoldAndCode(part, idx);
  });
}

function parseBoldAndCode(text, parentKey) {
  // Regex to split by bold (**text**) or inline code (`code`)
  const boldCodeRegex = /(\*\*.*?\*\*|`.*?`)/g;
  const parts = text.split(boldCodeRegex);

  if (parts.length === 1) return text;

  return (
    <span key={parentKey}>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={idx}
              className="bg-slate-800/80 px-1.5 py-0.5 rounded text-[11px] font-mono text-cyan-400 border border-slate-700/30"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </span>
  );
}

export default MarkdownRenderer;
