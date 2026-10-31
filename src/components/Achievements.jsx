// Achievements.jsx - Hackathon award, leadership and certifications
import { FiArrowUpRight, FiUsers, FiMic, FiCode, FiCpu, FiMonitor, FiBookOpen } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { Section, SectionHeader, Reveal } from "./ui";

const award = {
    title: "First Prize & Gold Medal",
    event: "BMU Hackathon · Bhagwan Mahavir University",
    description:
        "Won first place with AttendIQ, a smart attendance and engagement platform that verifies students with Face AI and campus geofencing, then turns attendance into engagement analytics and academic-risk alerts.",
    date: "2026",
    demo: "https://attendiqs.vercel.app/",
};

const achievements = [
    {
        title: "Campus Mantri, GeeksforGeeks",
        description: "Served as Campus Ambassador, organizing technical events and workshops on campus.",
        icon: FiMic,
        date: "Jan 2026 – Apr 2026",
    },
    {
        title: "Mentored 300+ Students",
        description: "Guided over 300 students in programming, web development and career direction.",
        icon: FiUsers,
        date: "Feb 2023 – Feb 2026",
    },
];

const certifications = [
    { title: "Frontend Development", issuer: "freeCodeCamp", icon: FiMonitor, date: "Apr 2026" },
    { title: "Gen AI Certificate", issuer: "TATA", icon: FiCpu, date: "Jul 2025" },
    { title: "Frontend Certificate", issuer: "VNSGU", icon: FiBookOpen, date: "Nov 2024" },
    { title: "Full Stack Development", issuer: "MERN stack certification", icon: FiCode, date: "Jun 2024" },
];

const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

const Achievements = () => {
    return (
        <Section id="achievements">
            <SectionHeader index="05" eyebrow="Recognition" title="Achievements & certifications" />

            {/* Hackathon award */}
            <Reveal>
                <div className="card card-gold overflow-hidden rounded-2xl">
                    <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-amber-400/20 blur-[90px]" />
                    <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 md:p-8">
                        <div className="relative w-fit shrink-0">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-orange-500 text-3xl text-amber-950 shadow-[0_10px_40px_-6px_rgb(251_191_36/0.6)] ring-1 ring-inset ring-white/40">
                                <FaTrophy />
                            </div>
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-amber-300/40 bg-zinc-950 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
                                #1
                            </span>
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="font-mono text-xs uppercase tracking-wider text-amber-300/90">{award.event}</p>
                            <h3 className="mt-2 bg-gradient-to-r from-amber-100 via-amber-300 to-orange-300 bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">
                                {award.title}
                            </h3>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{award.description}</p>

                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                                <button
                                    onClick={scrollToProjects}
                                    className="cursor-pointer font-medium text-amber-200 transition-colors hover:text-amber-100"
                                >
                                    View AttendIQ project
                                </button>
                                <a
                                    href={award.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-zinc-100"
                                >
                                    Live demo <FiArrowUpRight />
                                </a>
                                <span className="font-mono text-xs text-zinc-500 sm:ml-auto">{award.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {achievements.map(({ title, description, icon: Icon, date }, idx) => (
                    <Reveal key={title} delay={idx * 0.05}>
                        <div className="card h-full rounded-2xl p-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-400/10 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                                <Icon />
                            </div>
                            <h3 className="mt-4 font-semibold text-zinc-50">{title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{description}</p>
                            <p className="mt-4 font-mono text-xs text-zinc-500">{date}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-12">
                <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-zinc-500">Certifications</h3>
                <ul className="divide-y divide-white/5 border-y border-white/5">
                    {certifications.map(({ title, issuer, icon: Icon, date }) => (
                        <li key={title} className="flex items-center gap-4 py-4">
                            <Icon className="shrink-0 text-zinc-500" />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-zinc-200">{title}</p>
                                <p className="text-xs text-zinc-500">{issuer}</p>
                            </div>
                            <span className="shrink-0 font-mono text-xs text-zinc-500">{date}</span>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </Section>
    );
};

export default Achievements;
