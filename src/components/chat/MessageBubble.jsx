import { useState } from "react";
import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";
import ProjectCard from "./ProjectCard";
import AssistantAvatar from "./AssistantAvatar";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFilePdf,
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaMedium,
  FaFacebook,
  FaCopy,
  FaCheck
} from "react-icons/fa";

const socialIcons = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Medium: FaMedium,
  Facebook: FaFacebook,
};

const MessageBubble = ({ message }) => {
  const { role, content, type, data } = message;
  const isAssistant = role === "assistant";
  
  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text, typeName) => {
    navigator.clipboard.writeText(text);
    setCopiedText(typeName);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 w-full my-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && <AssistantAvatar />}

      <div className="flex flex-col max-w-[80%] gap-1.5">
        {/* Main Text Content */}
        {content && (
          <div
            className={`px-4 py-3 rounded-2xl backdrop-blur-md shadow-md shadow-black/10 border text-slate-200 text-sm leading-relaxed
              ${
                isAssistant
                  ? "bg-slate-800/40 border-slate-700/50 rounded-tl-none"
                  : "bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 border-cyan-500/30 rounded-tr-none text-white"
              }`}
          >
            <MarkdownRenderer content={content} />
          </div>
        )}

        {/* Structured Custom UI Components */}
        {isAssistant && type && (
          <div className="w-full mt-1.5">
            {/* 1. PROJECT_CARD (Projects list grid) */}
            {type === "projects" && Array.isArray(data) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {data.map((project, idx) => (
                  <ProjectCard key={idx} project={project} />
                ))}
              </div>
            )}

            {/* 2. CONTACT_CARD */}
            {type === "contact" && data && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/40 w-full max-w-sm hover:border-cyan-500/30 transition-all duration-300">
                <h4 className="text-white font-bold text-xs mb-3.5 border-b border-white/10 pb-2 uppercase tracking-widest text-cyan-400">
                  Contact Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between group/item">
                    <a
                      href={`mailto:${data.email}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 text-xs transition duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <FaEnvelope className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Email</p>
                        <span className="font-semibold text-slate-200">{data.email}</span>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy(data.email, "email")}
                      title="Copy email to clipboard"
                      className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition duration-200 cursor-pointer ml-2 border border-transparent hover:border-cyan-500/20"
                    >
                      {copiedText === "email" ? <FaCheck className="text-[10px] text-emerald-400" /> : <FaCopy className="text-[10px]" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between group/item">
                    <a
                      href={`tel:${data.phone}`}
                      className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 text-xs transition duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <FaPhone className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Phone</p>
                        <span className="font-semibold text-slate-200">{data.phone}</span>
                      </div>
                    </a>
                    <button
                      onClick={() => handleCopy(data.phone, "phone")}
                      title="Copy phone to clipboard"
                      className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition duration-200 cursor-pointer ml-2 border border-transparent hover:border-cyan-500/20"
                    >
                      {copiedText === "phone" ? <FaCheck className="text-[10px] text-emerald-400" /> : <FaCopy className="text-[10px]" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 text-xs">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Location</p>
                      <span className="font-semibold text-slate-200">{data.location}</span>
                    </div>
                  </div>
                </div>

                {data.availability && (
                  <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-slate-400 text-[10px] leading-snug">{data.availability}</span>
                  </div>
                )}
              </div>
            )}

            {/* 3. DOWNLOAD_BUTTON (Resume download) */}
            {type === "resume" && data && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/40 w-full max-w-xs hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-lg flex-shrink-0">
                  <FaFilePdf />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{data.resumeName || "Krunal's Resume"}</p>
                  <p className="text-[10px] text-slate-500">PDF Document</p>
                </div>
                <a
                  href={data.resumePath}
                  download={data.resumeName}
                  className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center transition shadow-md shadow-cyan-500/25 cursor-pointer"
                >
                  <FaDownload className="text-xs" />
                </a>
              </div>
            )}

            {/* 4. BUTTON_GROUP / SOCIAL_CARD / LINK_CARD */}
            {type === "links" && Array.isArray(data) && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/40 w-full max-w-sm hover:border-cyan-500/30 transition-all duration-300">
                <h4 className="text-white font-bold text-xs mb-3.5 border-b border-white/10 pb-2 uppercase tracking-widest text-cyan-400">
                  Connect & Socials
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.map((social, idx) => {
                    const Icon = socialIcons[social.platform] || FaGithub;
                    return (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 text-xs transition duration-200"
                      >
                        <Icon className="text-sm" />
                        <span>{social.platform}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. SKILLS_GRID */}
            {type === "skills" && data && data.categories && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/40 w-full hover:border-cyan-500/30 transition-all duration-300">
                <h4 className="text-white font-bold text-xs mb-3.5 border-b border-white/10 pb-2 uppercase tracking-widest text-cyan-400">
                  Tech Stack Grouped
                </h4>
                <div className="space-y-3.5">
                  {Object.entries(data.categories).map(([category, skillList]) => (
                    <div key={category}>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
                        {category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {skillList.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-950 border border-white/5 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 hover:shadow-[0_0_8px_rgba(34,211,238,0.15)] transition duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TIMELINE (Experience, Education, achievements) */}
            {(type === "experience" || type === "education" || type === "achievements") && Array.isArray(data) && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-xl p-4 shadow-lg shadow-black/40 w-full hover:border-cyan-500/30 transition-all duration-300">
                <h4 className="text-white font-bold text-xs mb-3.5 border-b border-white/10 pb-2 uppercase tracking-widest text-cyan-400 flex items-center justify-between">
                  <span>{type === "experience" ? "Work History" : type === "education" ? "Education Journey" : "Certifications & Awards"}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 font-bold tracking-widest">Timeline</span>
                </h4>
                <div className="relative border-l border-cyan-500/25 pl-4 space-y-5 ml-2">
                  {data.map((item, index) => (
                    <div key={index} className="relative text-left group">
                      {/* Timeline dot */}
                      <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 shadow-md shadow-cyan-500/50 group-hover:scale-125 transition-transform duration-200" />
                      <div className="flex flex-col">
                        <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
                          {item.year || item.date || item.status}
                        </span>
                        <span className="text-xs font-bold text-white mt-0.5">
                          {item.title || item.degree}
                        </span>
                        <span className="text-[10px] text-cyan-200/85 font-medium">
                          {item.company || item.specialization || (item.type ? `${item.type} Milestone` : "")}
                        </span>
                        <span className="text-[11px] text-slate-300 leading-relaxed mt-1 block font-normal">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
