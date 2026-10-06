import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";

// Local static data imports for frontend RAG fallback routing
import personalData from "../../../data/personal.json";
import projectsData from "../../../data/projects.json";
import experienceData from "../../../data/experience.json";
import skillsData from "../../../data/skills.json";
import educationData from "../../../data/education.json";
import contactData from "../../../data/contact.json";
import socialData from "../../../data/social.json";
import achievementsData from "../../../data/achievements.json";

// Levenshtein distance helper
function levenshteinDistance(a, b) {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

// Fuzzy matching check
function fuzzyMatch(word, target) {
  const w = word.toLowerCase();
  const t = target.toLowerCase();
  if (w.includes(t) || t.includes(w)) return true;
  
  if (w.length >= 3 && t.length >= 3) {
    const distance = levenshteinDistance(w, t);
    const maxAllowed = t.length > 5 ? 2 : 1;
    return distance <= maxAllowed;
  }
  return false;
}

// Local keywords mapping for intents fallback
const INTENTS = [
  {
    id: "greetings",
    terms: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "yo"],
    type: "text",
    content: "Hello! 👋 I'm Krunal Chaudhari. I'm glad you're here! You can ask me about my skills, experience, projects, education, or contact details. What would you like to know?",
    suggestions: ["Who are you?", "Show your projects", "Tech Stack"]
  },
  {
    id: "thanks",
    terms: ["thank you", "thanks", "awesome", "cool", "perfect", "great", "ok", "okay", "nice"],
    type: "text",
    content: "You're very welcome! 😊 Let me know if you want to know anything else about my work or experience.",
    suggestions: ["Experience", "Contact", "Download Resume"]
  },
  {
    id: "farewells",
    terms: ["bye", "goodbye", "see you", "take care", "exit", "quit"],
    type: "text",
    content: "Goodbye! Thank you for checking out my portfolio. Have a great day! 🚀",
    suggestions: ["Who are you?", "Tech Stack", "Contact"]
  },
  {
    id: "projects",
    terms: ["project", "projects", "portfolio", "built", "develop", "developed", "app", "apps", "eduflow", "attendiq", "attendance", "hackathon", "seloria", "getseloria", "jadoo", "food", "codebase", "creation", "freelance", "worklist"],
    type: "projects",
    data: projectsData,
    content: "Here are my featured projects. I build scalable applications with focus on clean architecture and performance:",
    suggestions: ["Tech Stack", "Experience", "Contact"]
  },
  {
    id: "experience",
    terms: ["experience", "experiences", "job", "jobs", "work", "intern", "internship", "faculty", "company", "companies", "career", "history", "trueline", "hidden ideas", "kash", "mdiit", "tata", "current role", "responsibilities", "laravel experience", "react experience", "node experience", "work history", "timeline"],
    type: "experience",
    data: experienceData,
    content: "I have over 1 year of experience across fullstack development, AI concepts, and academic mentoring. Here is my professional timeline:",
    suggestions: ["Skills", "Projects", "Resume"]
  },
  {
    id: "skills",
    terms: ["skill", "skills", "tech stack", "technology", "technologies", "programming", "languages", "frameworks", "backend", "frontend", "database", "databases", "devops", "docker", "postman", "ai tools", "claude code", "cursor", "antigravity", "prompt engineering", "libraries", "version control", "cloud", "tools", "ides"],
    type: "skills",
    data: skillsData,
    content: "I work with a modern developer stack, specializing in JavaScript, PHP, React, Next.js, and Laravel. Here is my technology grid:",
    suggestions: ["Projects", "Experience", "Resume"]
  },
  {
    id: "education",
    terms: ["education", "college", "university", "study", "studies", "degree", "mca", "bca", "qualification", "vnsgu", "academic performance", "graduation", "post graduation", "post-graduation", "school"],
    type: "education",
    data: educationData,
    content: "I am pursuing my Master of Computer Applications (MCA) after completing my computer science foundation. Here are my education details:",
    suggestions: ["Skills", "Experience", "Contact"]
  },
  {
    id: "achievements",
    terms: ["achievement", "achievements", "certificat", "certificate", "certificates", "certification", "certifications", "award", "awards", "trophy", "mentor", "mentored", "ambassador", "gfg", "geeksforgeeks"],
    type: "achievements",
    data: achievementsData,
    content: "I have earned several recognitions, including mentoring 300+ students and serving as GFG Campus Ambassador. Here are my milestones:",
    suggestions: ["Projects", "Skills", "Resume"]
  },
  {
    id: "contact",
    terms: ["contact", "email", "phone", "hire", "call", "reach", "address", "location", "message", "contact details", "schedule a meeting", "how can i contact you", "get in touch", "phone number"],
    type: "contact",
    data: contactData,
    content: "I'd love to connect with you! Here are my direct contact details:",
    suggestions: ["LinkedIn", "Resume", "Availability"]
  },
  {
    id: "resume",
    terms: ["resume", "cv", "download resume", "download cv"],
    type: "resume",
    data: contactData,
    content: "You can view and download my official resume/CV below:",
    suggestions: ["Skills", "Projects", "Contact"]
  },
  {
    id: "social",
    terms: ["social", "linkedin", "github", "instagram", "facebook", "medium", "profile", "profiles", "link", "links", "handle", "handles", "social links"],
    type: "links",
    data: socialData,
    content: "Here are my social profiles and online portfolios. Let's connect!",
    suggestions: ["LinkedIn", "Resume", "Contact"]
  },
  {
    id: "introduction",
    terms: ["who are you", "what's your name", "introduce yourself", "tell me about yourself", "give me your introduction", "about you", "background", "introduce"],
    type: "text",
    content: "Hi, I'm Krunal Chaudhari, a Full Stack Developer based in Surat, Gujarat, India. I'm currently pursuing my Master of Computer Applications (MCA) while building modern web applications using React, Next.js, Node.js, Laravel, MongoDB, and AI-assisted development tools. I enjoy solving real-world business problems and continuously learning new technologies.",
    suggestions: ["Skills", "Projects", "Experience", "Resume"]
  },
  {
    id: "location",
    terms: ["where do you live", "where are you living", "living", "live", "which city", "where are you from", "location", "current location", "where do you stay", "where you live", "address", "city"],
    type: "text",
    content: "I live in Surat, Gujarat, India. It's a beautiful city known as the textile and diamond center, and it is where I currently work and study.",
    suggestions: ["Contact", "Experience", "Education"]
  },
  {
    id: "why_hire_me",
    terms: ["why should we hire you", "why should i hire you", "convince me", "why hire me"],
    type: "text",
    content: "You should hire me because I combine solid backend engineering (Laravel, Node.js) with clean frontend interfaces (React, Next.js, Tailwind). I have a self-driven learning mindset (pursuing MCA while doing internships and mentoring), write clean and maintainable code, and focus on delivering actual business value.",
    suggestions: ["Projects", "Experience", "Resume"]
  },
  {
    id: "services",
    terms: ["services", "what services do you offer", "what do you do", "can you build"],
    type: "text",
    content: "I offer the following development services:\n\n• **Full Stack Web Development** (MERN, Laravel)\n• **Single Page Applications (SPAs)** & dashboards\n• **Custom REST APIs** & database design\n• **Landing Pages** & corporate portfolios\n• **AI Agent Integrations** & automation scripts",
    suggestions: ["Projects", "Contact", "Resume"]
  },
  {
    id: "availability",
    terms: ["availability", "freelance", "freelancing", "open source", "open-source", "hire you", "available"],
    type: "text",
    content: "I am currently available for freelance projects, developer internships, and full-time software engineering roles. I am open to working remotely or collaborating globally.",
    suggestions: ["Contact", "Resume", "Projects"]
  },
  {
    id: "career_goals",
    terms: ["career goals", "career objective", "future improvements", "lessons learned", "goals", "objective"],
    type: "text",
    content: "My career goal is to grow as a Senior Fullstack Architect and AI Integration Specialist. I aim to write highly performant, clean, and testable code, design scalable system architectures, and lead development teams in building next-gen web applications.",
    suggestions: ["Skills", "Projects", "Experience"]
  },
  {
    id: "strengths",
    terms: ["strengths", "strength", "what are your strengths"],
    type: "text",
    content: "My key strengths are my strong problem-solving skills, my fast adaptability to new frameworks and tools (like Gen AI and new SDKs), my commitment to writing clean, documentable code, and my experience in teaching/mentoring, which helps me communicate technical concepts effectively.",
    suggestions: ["Experience", "Projects", "Contact"]
  },
  {
    id: "weaknesses",
    terms: ["weaknesses", "weakness", "what are your weaknesses"],
    type: "text",
    content: "My weakness is that I sometimes get overly detailed and spend extra time perfecting code modularity or pixel-aligning UI micro-animations. However, I manage this by utilizing timeboxing, setting strict milestones, and prioritizing core business logic.",
    suggestions: ["Skills", "Projects", "Contact"]
  }
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content: `Hi 👋\n\nI'm Krunal Chaudhari.\n\nI can answer questions about my:\n\n• **Skills**\n• **Projects**\n• **Experience**\n• **Education**\n• **Tech Stack**\n• **Freelancing**\n• **Contact Information**\n\nTry asking:\n\n"What technologies do you know?"`,
};

const DEFAULT_SUGGESTIONS = [
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

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Guard Refs to prevent double event firing and race conditions
  const isSendingRef = useRef(false);
  const fallbackIdRef = useRef(0);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle keyboard listener to close chat with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle clearing the chat history
  const handleClearChat = () => {
    fallbackIdRef.current++; // Cancel any active loops
    setMessages([WELCOME_MESSAGE]);
    setSuggestions(DEFAULT_SUGGESTIONS);
  };

  // Process fuzzy client fallback RAG when server is not hosted locally (npm run dev)
  const handleClientFallback = async (text, activeFallbackId) => {
    const normalizedQuery = text.toLowerCase();
    const queryWords = normalizedQuery.replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);

    let matched = null;
    for (const intent of INTENTS) {
      for (const term of intent.terms) {
        if (normalizedQuery.includes(term)) {
          matched = intent;
          break;
        }
        const isFuzzy = queryWords.some(qw => fuzzyMatch(qw, term));
        if (isFuzzy) {
          matched = intent;
          break;
        }
      }
      if (matched) break;
    }

    // Unrelated questions check
    const isUnrelated = queryWords.some(w => ["ipl", "joke", "python", "code", "weather", "news", "physics", "math"].includes(w));

    let type = null;
    let data = null;
    let fallbackText = "";
    let localSuggestions = ["Skills", "Projects", "Contact"];

    if (matched && !isUnrelated) {
      type = matched.type;
      data = matched.data || null;
      fallbackText = matched.content;
      localSuggestions = matched.suggestions || localSuggestions;

      if (type === "resume") {
        setTimeout(() => {
          if (activeFallbackId !== fallbackIdRef.current) return;
          const link = document.createElement("a");
          link.href = contactData.resumePath;
          link.download = contactData.resumeName || "Krunal_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          link.remove();
        }, 1000);
      }
    } else {
      if (isUnrelated) {
        fallbackText = "I'd love to help with that, but as Krunal, I'm here to answer questions about my professional background, projects, skills, experience, and contact details.";
      } else {
        fallbackText = "I'd love to chat about that! However, since my Gemini connection is offline, I can only answer questions about my skills, projects, timeline, and contact information. Feel free to try asking one of those!";
      }
    }

    if (activeFallbackId !== fallbackIdRef.current) return;

    setMessages((prev) => {
      const next = [...prev];
      const lastIndex = next.length - 1;
      if (lastIndex >= 0 && next[lastIndex].role === "assistant") {
        next[lastIndex] = {
          ...next[lastIndex],
          type: type,
          data: data
        };
      }
      return next;
    });

    const words = fallbackText.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (activeFallbackId !== fallbackIdRef.current) return; // Terminate loop if cancelled
      await new Promise((resolve) => setTimeout(resolve, 30));
      
      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        if (lastIndex >= 0 && next[lastIndex].role === "assistant" && activeFallbackId === fallbackIdRef.current) {
          next[lastIndex] = {
            ...next[lastIndex],
            content: next[lastIndex].content + words[i] + (i === words.length - 1 ? "" : " ")
          };
        }
        return next;
      });
    }

    if (activeFallbackId === fallbackIdRef.current) {
      setSuggestions(localSuggestions);
    }
  };

  // Process and send the user message
  const handleSendMessage = async (text) => {
    if (!text.trim() || isSendingRef.current) return;

    isSendingRef.current = true;
    const currentFallbackId = ++fallbackIdRef.current; // Cancel any active loops and set new transaction ID

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    const assistantPlaceholder = {
      role: "assistant",
      content: "",
      type: null,
      data: null,
    };
    setMessages((prev) => [...prev, assistantPlaceholder]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      // If the route doesn't exist (running standard vite dev server locally without Vercel backend)
      if (response.status === 404) {
        setIsTyping(false);
        await handleClientFallback(text, currentFallbackId);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to send message to assistant");
      }

      if (!response.body) {
        throw new Error("No response body received from stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      setIsTyping(false); // Hide generic indicator once stream starts

      while (true) {
        if (currentFallbackId !== fallbackIdRef.current) break; // Terminate if cleared or new message sent

        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const eventStr of events) {
          if (!eventStr.trim()) continue;

          const lines = eventStr.split("\n");
          let eventType = "text";
          let eventData = "";

          for (const line of lines) {
            if (line.startsWith("event:")) {
              eventType = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              eventData += line.slice(5);
            }
          }

          if (eventType === "text") {
            setMessages((prev) => {
              const next = [...prev];
              const lastIndex = next.length - 1;
              if (lastIndex >= 0 && next[lastIndex].role === "assistant" && currentFallbackId === fallbackIdRef.current) {
                next[lastIndex] = {
                  ...next[lastIndex],
                  content: next[lastIndex].content + eventData
                };
              }
              return next;
            });
          } else if (eventType === "suggestions") {
            const parsedSuggestions = JSON.parse(eventData);
            setSuggestions(parsedSuggestions);
          } else if (["projects", "contact", "resume", "links", "skills", "experience", "education", "achievements"].includes(eventType)) {
            const parsedData = JSON.parse(eventData);

            setMessages((prev) => {
              const next = [...prev];
              const lastIndex = next.length - 1;
              if (lastIndex >= 0 && next[lastIndex].role === "assistant" && currentFallbackId === fallbackIdRef.current) {
                next[lastIndex] = {
                  ...next[lastIndex],
                  type: eventType,
                  data: parsedData
                };
              }
              return next;
            });

            if (eventType === "resume" && parsedData && parsedData.resumePath) {
              setTimeout(() => {
                if (currentFallbackId !== fallbackIdRef.current) return;
                const link = document.createElement("a");
                link.href = parsedData.resumePath;
                link.download = parsedData.resumeName || "Krunal_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                link.remove();
              }, 1000);
            }
          }
        }
      }
    } catch (error) {
      console.warn("Server API not reachable, running client-side fuzzy fallback:", error);
      setIsTyping(false);
      try {
        await handleClientFallback(text, currentFallbackId);
      } catch (fallbackError) {
        console.error("Local fallback failed:", fallbackError);
        setMessages((prev) => {
          const next = [...prev];
          const lastIndex = next.length - 1;
          if (lastIndex >= 0 && next[lastIndex].role === "assistant" && currentFallbackId === fallbackIdRef.current) {
            next[lastIndex] = {
              ...next[lastIndex],
              content: "I don't have that information available right now."
            };
          }
          return next;
        });
      }
    } finally {
      isSendingRef.current = false;
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 220 }}
      className="fixed bottom-24 right-4 md:right-8 z-50 flex flex-col w-[calc(100vw-32px)] md:w-[400px] h-[550px] md:h-[600px] bg-slate-955/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
    >
      {/* Header */}
      <ChatHeader onClose={onClose} onClear={handleClearChat} />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="flex flex-col gap-1">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions container */}
      <div className="px-5 py-1.5 bg-slate-950/50 border-t border-white/5">
        <SuggestedQuestions onSelectQuestion={handleSendMessage} suggestions={suggestions} />
      </div>

      {/* Footer Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="flex items-center gap-2 p-4 border-t border-white/10 bg-slate-900/60 backdrop-blur-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my skills, work history..."
          disabled={isTyping}
          className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-slate-955/70 text-white text-xs placeholder:text-slate-550 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/10 transition-all duration-250 disabled:opacity-50 shadow-inner"
        />

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-sm transition shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <FaPaperPlane className="text-xs" />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatWindow;
