// Experience.jsx - Work history timeline
import { Section, SectionHeader, Reveal, Tag } from "./ui";

const experiences = [
    {
        year: "Aug 2026 — Present",
        title: "Full Stack Developer (MERN)",
        company: "Bright Paper",
        description: "Developing and maintaining web applications and internal tools that support day-to-day business workflows. Building frontend and backend features, integrating APIs and fixing production issues.",
        tags: ["React", "Node.js", "Express", "MongoDB"],
        current: true,
    },
    {
        year: "Mar 2026 — Aug 2026",
        title: "Full Stack Developer (MERN)",
        company: "The Hidden Ideas Infotech",
        description: "Built end-to-end features for HRMS and C2C CRM products. Developed REST APIs for authentication, CRUD workflows and data validation, designed MongoDB schemas for core modules and resolved production bugs.",
        tags: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
        year: "Feb 2026 — Mar 2026",
        title: "Full Stack Developer (MERN), Trainee",
        company: "Trueline Solutions",
        description: "Shipped features and bug fixes on a live client website using the MERN stack, and improved page performance and cross-device responsiveness based on client feedback.",
        tags: ["React", "Node.js", "MongoDB", "Express"],
    },
    {
        year: "Feb 2022 — Feb 2026",
        title: "Programming Faculty",
        company: "MDIIT",
        description: "Taught programming and web development, designed course material and guided students through real-world projects.",
        tags: ["Teaching", "Mentoring", "Curriculum Design"],
    },
    {
        year: "Jul 2025",
        title: "Gen AI Intern",
        company: "TATA",
        description: "Worked on AI concepts, prompt engineering and modern AI tools, building prototypes that showcase generative AI capabilities.",
        tags: ["GPT", "Prompt Engineering", "LLM"],
    },
    {
        year: "May 2025 — Jul 2025",
        title: "Backend Developer Intern",
        company: "Kash Info Solution",
        description: "Worked on Laravel applications and database management, implementing RESTful APIs and optimizing database queries.",
        tags: ["Laravel", "PHP", "MySQL", "APIs"],
    },
];

function Experience() {
    return (
        <Section id="experience">
            <SectionHeader index="03" eyebrow="Experience" title="Where I've worked" />

            <ol className="relative">
                <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand-400/70 via-white/10 to-transparent" />
                {experiences.map((exp, index) => (
                    <li key={exp.title + exp.company} className="relative pb-12 pl-8 last:pb-0 md:pl-10">
                        <span
                            className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-zinc-950 ${exp.current ? "bg-gradient-to-br from-brand-300 to-cyan-300 shadow-[0_0_12px_2px_rgb(139_92_246/0.7)]" : "bg-zinc-700"
                                }`}
                        />
                        <Reveal delay={index * 0.04} className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-8">
                            <p className="font-mono text-xs uppercase tracking-wide text-zinc-500 md:pt-1">{exp.year}</p>
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-50">
                                    {exp.title}
                                    <span className="font-normal text-zinc-500"> · {exp.company}</span>
                                </h3>
                                {exp.current && (
                                    <span className="mt-1.5 inline-block rounded-full bg-brand-400/15 px-2 py-0.5 text-[11px] font-medium text-brand-200 ring-1 ring-inset ring-brand-400/25">
                                        Current
                                    </span>
                                )}
                                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{exp.description}</p>
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {exp.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                                </div>
                            </div>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

export default Experience;
