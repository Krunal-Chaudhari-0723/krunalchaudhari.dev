import { useState } from "react";
import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";
import ProjectCard from "./ProjectCard";
import AssistantAvatar from "./AssistantAvatar";
import myCv from "../../assets/Krunal-Full Stack.pdf";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiCopy,
  FiCheck,
  FiFileText,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaLinkedin, FaGithub, FaInstagram, FaMedium, FaFacebook } from "react-icons/fa";

const socialIcons = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Medium: FaMedium,
  Facebook: FaFacebook,
};

const timelineTitles = {
  experience: "Work history",
  education: "Education",
  achievements: "Achievements & certifications",
};

// Shared surface for the structured cards inside assistant replies
const Panel = ({ title, children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-4 ${className}`}>
    {title && <h4 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-zinc-500">{title}</h4>}
    {children}
  </div>
);

const MessageBubble = ({ message, isStreaming }) => {
  const { role, content, type, data } = message;
  const isAssistant = role === "assistant";

  const [copiedText, setCopiedText] = useState(null);

  const handleCopy = (text, typeName) => {
    navigator.clipboard.writeText(text);
    setCopiedText(typeName);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!isAssistant) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end py-1.5"
      >
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-brand-500 to-indigo-600 px-4 py-2.5 text-sm leading-relaxed text-white shadow-lg shadow-brand-900/30">
          {content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex gap-3 py-2"
    >
      <AssistantAvatar />

      <div className="min-w-0 flex-1 space-y-3 pt-0.5">
        {/* Main Text Content */}
        {content && (
          <div className="text-sm leading-relaxed text-zinc-300">
            <MarkdownRenderer content={content} />
            {isStreaming && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-brand-300" />}
          </div>
        )}

        {/* Structured Custom UI Components */}
        {type && (
          <div className="w-full">
            {/* 1. Projects carousel */}
            {type === "projects" && Array.isArray(data) && (
              <div className="no-scrollbar -mr-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pr-4">
                {data.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            )}

            {/* 2. Contact card */}
            {type === "contact" && data && (
              <Panel title="Contact">
                <div className="space-y-1">
                  {[
                    { key: "email", icon: FiMail, label: data.email, href: `mailto:${data.email}` },
                    { key: "phone", icon: FiPhone, label: data.phone, href: `tel:${data.phone}` },
                  ].map(({ key, icon: Icon, label, href }) => (
                    <div key={key} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.04]">
                      <Icon className="shrink-0 text-zinc-500" />
                      <a href={href} className="min-w-0 flex-1 truncate text-sm text-zinc-200 hover:text-brand-300">
                        {label}
                      </a>
                      <button
                        onClick={() => handleCopy(label, key)}
                        aria-label={`Copy ${key}`}
                        className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-100"
                      >
                        {copiedText === key ? <FiCheck className="text-xs text-emerald-400" /> : <FiCopy className="text-xs" />}
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 px-2 py-2 text-sm text-zinc-400">
                    <FiMapPin className="shrink-0 text-zinc-500" />
                    {data.location}
                  </div>
                </div>

                {data.availability && (
                  <p className="mt-2 flex items-start gap-2 border-t border-white/5 pt-3 text-xs leading-relaxed text-zinc-400">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {data.availability}
                  </p>
                )}
              </Panel>
            )}

            {/* 3. Resume download */}
            {type === "resume" && data && (
              <a
                href={myCv}
                download={data.resumeName || "Krunal_Chaudhari_Resume.pdf"}
                className="group/resume flex max-w-xs items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-brand-400/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20">
                  <FiFileText />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">{data.resumeName || "Krunal's Resume"}</p>
                  <p className="text-xs text-zinc-500">PDF · Full Stack Developer (MERN)</p>
                </div>
                <span className="btn-primary flex h-8 w-8 items-center justify-center rounded-full">
                  <FiDownload className="text-xs" />
                </span>
              </a>
            )}

            {/* 4. Social links */}
            {type === "links" && Array.isArray(data) && (
              <div className="flex flex-wrap gap-2">
                {data.map((social) => {
                  const Icon = socialIcons[social.platform] || FaGithub;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-brand-400/40 hover:text-zinc-50"
                    >
                      <Icon className="text-sm" />
                      {social.platform}
                      <FiArrowUpRight className="text-zinc-500" />
                    </a>
                  );
                })}
              </div>
            )}

            {/* 5. Skills grid */}
            {type === "skills" && data && data.categories && (
              <Panel title="Tech stack">
                <div className="space-y-3">
                  {Object.entries(data.categories).map(([category, skillList]) => (
                    <div key={category}>
                      <span className="mb-1.5 block text-xs text-zinc-400">{category}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-brand-400/15 bg-brand-400/[0.07] px-2 py-0.5 font-mono text-[11px] text-brand-200/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {/* 6. Timeline (experience, education, achievements) */}
            {timelineTitles[type] && Array.isArray(data) && (
              <Panel title={timelineTitles[type]}>
                <ol className="relative ml-1 space-y-4 border-l border-white/10 pl-4">
                  {data.map((item, index) => (
                    <li key={index} className="relative">
                      <span
                        className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-4 ring-zinc-950 ${index === 0 ? "bg-brand-300" : "bg-zinc-600"}`}
                      />
                      <p className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                        {item.year || item.date || item.status}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-zinc-100">
                        {item.title || item.degree}
                        {(item.company || item.specialization) && (
                          <span className="font-normal text-zinc-500"> · {item.company || item.specialization}</span>
                        )}
                      </p>
                      {item.description && (
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </Panel>
            )}
          </div>
        )}

        {/* Message actions */}
        {content && !isStreaming && (
          <button
            onClick={() => handleCopy(content, "message")}
            aria-label="Copy reply"
            className="flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-zinc-500 opacity-0 transition hover:bg-white/5 hover:text-zinc-200 focus:opacity-100 group-hover:opacity-100"
          >
            {copiedText === "message" ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
            {copiedText === "message" ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
