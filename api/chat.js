import { GoogleGenAI } from '@google/genai';
import { getSystemPrompt } from './systemPrompt.js';
import fs from 'fs';
import path from 'path';

// Levenshtein distance for fuzzy matching
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
        tmp[i - 1][j] + 1, // deletion
        tmp[i][j - 1] + 1, // insertion
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // substitution
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

// Reads dynamic JSON files safely from /data/
const readDataFile = (filename) => {
  try {
    const filepath = path.join(process.cwd(), 'data', filename);
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Intent mappings with synonyms and structured response setups
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
    terms: ["project", "projects", "featured project", "best project", "latest project", "explain eduflow", "explain getseloria", "food delivery project", "travel project", "portfolio project", "show your work", "applications", "challenges", "architecture", "features", "show projects"],
    type: "projects",
    dataFilename: "projects.json",
    content: "Here are my featured projects. I build scalable applications with focus on clean architecture and performance:",
    suggestions: ["Tech Stack", "Experience", "Contact"]
  },
  {
    id: "experience",
    terms: ["experience", "experiences", "job", "jobs", "work", "intern", "internship", "faculty", "company", "companies", "career", "history", "trueline", "hidden ideas", "kash", "mdiit", "tata", "current role", "responsibilities", "laravel experience", "react experience", "node experience", "work history", "timeline"],
    type: "experience",
    dataFilename: "experience.json",
    content: "I have over 1 year of experience across fullstack development, AI concepts, and academic mentoring. Here is my professional timeline:",
    suggestions: ["Skills", "Projects", "Resume"]
  },
  {
    id: "skills",
    terms: ["skill", "skills", "tech stack", "technology", "technologies", "programming", "languages", "frameworks", "backend", "frontend", "database", "databases", "devops", "docker", "postman", "ai tools", "claude code", "cursor", "antigravity", "prompt engineering", "libraries", "version control", "cloud", "tools", "ides"],
    type: "skills",
    dataFilename: "skills.json",
    content: "I work with a modern developer stack, specializing in JavaScript, PHP, React, Next.js, and Laravel. Here is my technology grid:",
    suggestions: ["Projects", "Experience", "Resume"]
  },
  {
    id: "education",
    terms: ["education", "college", "university", "study", "studies", "degree", "mca", "bca", "qualification", "vnsgu", "academic performance", "graduation", "post graduation", "post-graduation", "school"],
    type: "education",
    dataFilename: "education.json",
    content: "I am pursuing my Master of Computer Applications (MCA) after completing my computer science foundation. Here are my education details:",
    suggestions: ["Skills", "Experience", "Contact"]
  },
  {
    id: "achievements",
    terms: ["achievement", "achievements", "certificat", "certificate", "certificates", "certification", "certifications", "award", "awards", "trophy", "mentor", "mentored", "ambassador", "gfg", "geeksforgeeks"],
    type: "achievements",
    dataFilename: "achievements.json",
    content: "I have earned several recognitions, including mentoring 300+ students and serving as GFG Campus Ambassador. Here are my milestones:",
    suggestions: ["Projects", "Skills", "Resume"]
  },
  {
    id: "contact",
    terms: ["contact", "email", "phone", "hire", "call", "reach", "address", "location", "message", "contact details", "schedule a meeting", "how can i contact you", "get in touch", "phone number"],
    type: "contact",
    dataFilename: "contact.json",
    content: "I'd love to connect with you! Here are my direct contact details:",
    suggestions: ["LinkedIn", "Resume", "Availability"]
  },
  {
    id: "resume",
    terms: ["resume", "cv", "download resume", "download cv"],
    type: "resume",
    dataFilename: "contact.json",
    content: "You can view and download my official resume/CV below:",
    suggestions: ["Skills", "Projects", "Contact"]
  },
  {
    id: "social",
    terms: ["social", "linkedin", "github", "instagram", "facebook", "medium", "profile", "profiles", "link", "links", "handle", "handles", "social links"],
    type: "links",
    dataFilename: "social.json",
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

// Helper to stream text response chunk-by-chunk for local static intents
async function streamIntentText(text, res) {
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    res.write(`event: text\ndata: ${words[i]}${i === words.length - 1 ? '' : ' '}\n\n`);
    await new Promise(resolve => setTimeout(resolve, 30));
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  const userQuery = messages[messages.length - 1].content || '';
  const normalizedQuery = userQuery.toLowerCase();
  const queryWords = normalizedQuery.replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);

  // Intent Engine matching
  let matchedIntent = null;
  for (const intent of INTENTS) {
    for (const term of intent.terms) {
      if (normalizedQuery.includes(term)) {
        matchedIntent = intent;
        break;
      }
      const isFuzzy = queryWords.some(qw => fuzzyMatch(qw, term));
      if (isFuzzy) {
        matchedIntent = intent;
        break;
      }
    }
    if (matchedIntent) break;
  }

  // SSE header configuration
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // If intent matches, return structured event immediately (bypass Gemini)
  if (matchedIntent) {
    // Load local JSON payload if linked
    let dataPayload = null;
    if (matchedIntent.dataFilename) {
      dataPayload = readDataFile(matchedIntent.dataFilename);
    }

    // Write structural SSE chunk
    if (dataPayload) {
      res.write(`event: ${matchedIntent.type}\ndata: ${JSON.stringify(dataPayload)}\n\n`);
    } else {
      res.write(`event: ${matchedIntent.type}\ndata: {}\n\n`);
    }

    // Stream introduction/text block
    if (matchedIntent.content) {
      await streamIntentText(matchedIntent.content, res);
    }

    // Write follow-up suggestions chunk
    if (matchedIntent.suggestions) {
      res.write(`event: suggestions\ndata: ${JSON.stringify(matchedIntent.suggestions)}\n\n`);
    }

    res.end();
    return;
  }

  // Intent is Unknown -> Call Gemini 2.5 Flash
  const isUnrelated = queryWords.some(w => ["ipl", "joke", "python", "code", "weather", "news", "physics", "math"].includes(w));
  
  if (!process.env.GEMINI_API_KEY) {
    // Mock streaming fallback for local environment without API key
    let fallbackText = "";
    if (isUnrelated) {
      fallbackText = "I'd love to help with that, but I'm here to answer questions about my professional background, projects, skills, experience, and contact details.";
    } else {
      fallbackText = "I'd love to chat about that! However, since my Gemini connection is offline, I can only answer questions about my skills, projects, timeline, and contact information. Feel free to try asking one of those!";
    }
    await streamIntentText(fallbackText, res);
    res.write(`event: suggestions\ndata: ${JSON.stringify(["Skills", "Projects", "Contact"])}\n\n`);
    res.end();
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // For unknown queries, retrieve complete portfolio details for rich AI context
    const fullContext = {
      personal: readDataFile('personal.json'),
      education: readDataFile('education.json'),
      experience: readDataFile('experience.json'),
      projects: readDataFile('projects.json'),
      skills: readDataFile('skills.json'),
      contact: readDataFile('contact.json'),
      social: readDataFile('social.json'),
      achievements: readDataFile('achievements.json')
    };
    const systemInstruction = getSystemPrompt(JSON.stringify(fullContext));

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`event: text\ndata: ${chunk.text}\n\n`);
      }
    }

    // Send default smart follow-up suggestions at the end of the AI stream
    res.write(`event: suggestions\ndata: ${JSON.stringify(["Skills", "Projects", "Contact"])}\n\n`);
  } catch (err) {
    console.error("Gemini stream error:", err);
    res.write(`event: error\ndata: ${err.message}\n\n`);
  } finally {
    res.end();
  }
}
