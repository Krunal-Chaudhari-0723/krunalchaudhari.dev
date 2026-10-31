// Projects.jsx - Featured case study + project grid
import { FiArrowUpRight, FiAward, FiCheck, FiLock } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Food from "../assets/food.png";
import Jadoo from "../assets/Jadoo.png";
import Seliora from "../assets/seloria.png";
import AttendIQ from "../assets/attendiq.png";
import BrightPaper from "../assets/brightpaper.png";
import SystemPortal from "../assets/systemportal.png";
import FreelanceSite from "../assets/chaudharikrunal.png";
import { Section, SectionHeader, Reveal, Tag } from "./ui";

const featured = {
    title: "AttendIQ",
    tagline: "Smart attendance & student engagement platform",
    description:
        "Built for Bhagwan Mahavir University. Attendance is marked only after a student's identity and physical presence are both verified. The records then feed engagement scores, academic-risk flags and AI recommendations.",
    highlights: [
        "Face AI identity verification",
        "Campus geofence check before marking attendance",
        "Explainable academic-risk rules with AI recommendations",
        "Separate Admin, Teacher and Student portals",
    ],
    tech: ["Next.js", "Face AI", "Geolocation", "AI Insights"],
    image: AttendIQ,
    github: "",
    demo: "https://attendiqs.vercel.app/",
    achievement: "First Prize · BMU Hackathon",
};

const projects = [
    {
        title: "Seliora Freelance",
        description:
            "Full stack freelance platform connecting clients and developers, with Razorpay payments, Cloudinary media storage and an admin panel.",
        tech: ["Next.js", "MongoDB", "Tailwind", "Razorpay"],
        image: Seliora,
        github: "https://github.com/Krunal-Chaudhari-0723/seloria",
        demo: "https://www.getseloria.com/",
    },
    {
        title: "Bright Paper Website",
        label: "Production · Bright Paper",
        description:
            "B2B website for a paper and packaging supplier serving India since 2007, with a product catalog for duplex board and kraft paper, a gallery, and quote and inquiry flows with WhatsApp integration.",
        tech: ["React", "Vite", "React Router", "WhatsApp"],
        image: BrightPaper,
        github: "",
        demo: "https://brightpaper.co.in/",
    },
    {
        title: "Freelance Studio Website",
        label: "Freelance",
        description:
            "My freelance web development site for businesses in Surat, covering services, selected work, pricing and process, with quote requests over WhatsApp.",
        tech: ["React", "Vite", "Tailwind CSS", "WhatsApp"],
        image: FreelanceSite,
        github: "",
        demo: "https://chaudharikrunal.me/",
    },
    {
        title: "Food Delivery App",
        description:
            "MERN food delivery app with restaurant browsing, cart, JWT authentication and an admin dashboard for orders and inventory.",
        tech: ["React", "Node.js", "MongoDB", "Express"],
        image: Food,
        github: "https://github.com/Krunal-Chaudhari-0723/FoodDelivery",
        demo: "https://krunalchaudhari-fooddel-frontend.netlify.app/",
    },
    {
        title: "Jadoo Travels",
        description:
            "Responsive tours & travels site for exploring destinations, packages and deals, driven by dynamic JSON content.",
        tech: ["React", "Node.js", "JSON", "Tailwind"],
        image: Jadoo,
        github: "https://github.com/Krunal-Chaudhari-0723/Technical-Task",
        demo: "https://lovely-stardust-c4a5fb.netlify.app/",
    },
    {
        title: "Bright Paper Systems Portal",
        label: "Internal tool · Bright Paper",
        description:
            "Staff portal with PIN-based sign-in that handles leave requests, support tickets and birthday reminders, with push notifications on phone and desktop.",
        tech: ["JavaScript", "Firebase", "Apps Script", "Push Notifications"],
        image: SystemPortal,
        github: "",
        demo: "https://brightpaper.github.io/system-portal/",
    },
];

function ProjectLinks({ github, demo }) {
    return (
        <div className="flex items-center gap-5 text-sm">
            {demo && (
                <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-zinc-100 transition-colors hover:text-brand-300"
                >
                    Live demo <FiArrowUpRight />
                </a>
            )}
            {github && (
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-100"
                >
                    <FaGithub /> Source
                </a>
            )}
        </div>
    );
}

function Projects() {
    return (
        <Section id="projects" glow="left">
            <SectionHeader
                index="02"
                eyebrow="Work"
                title="Selected projects"
                description="Things I have designed, built and shipped, from a hackathon winner to production sites and internal tools."
            />

            {/* Featured */}
            <Reveal>
                <article className="card card-featured group grid overflow-hidden rounded-2xl md:grid-cols-[1.15fr_1fr]">
                    <a
                        href={featured.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-brand-600/30 via-zinc-950 to-cyan-500/15 p-5 sm:p-8 md:border-b-0 md:border-r"
                    >
                        <div className="bg-grid pointer-events-none absolute inset-0" />
                        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-brand-500/30 blur-[80px]" />

                        {/* Browser window mockup */}
                        <div className="relative w-full overflow-hidden rounded-xl border border-white/15 bg-zinc-900 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.015]">
                            <div className="flex items-center gap-3 border-b border-white/10 bg-zinc-900 px-3 py-2">
                                <div className="flex gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                                </div>
                                <div className="mx-auto flex min-w-0 items-center gap-1.5 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-zinc-400">
                                    <FiLock className="shrink-0 text-[10px]" />
                                    {new URL(featured.demo).hostname}
                                </div>
                                <span className="w-[42px]" />
                            </div>
                            <img
                                src={featured.image}
                                alt={`${featured.title} screenshot`}
                                className="aspect-[16/10] w-full object-cover object-top"
                            />
                        </div>
                    </a>

                    <div className="flex flex-col p-6 md:p-8">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
                            <FiAward /> {featured.achievement}
                        </span>

                        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50">{featured.title}</h3>
                        <p className="mt-1 text-sm text-zinc-500">{featured.tagline}</p>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{featured.description}</p>

                        <ul className="mt-5 space-y-2">
                            {featured.highlights.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <FiCheck className="mt-0.5 shrink-0 text-brand-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 flex flex-wrap gap-1.5">
                            {featured.tech.map((tech) => <Tag key={tech}>{tech}</Tag>)}
                        </div>

                        <div className="mt-auto pt-6">
                            <ProjectLinks github={featured.github} demo={featured.demo} />
                        </div>
                    </div>
                </article>
            </Reveal>

            {/* Grid */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <Reveal key={project.title} delay={index * 0.06}>
                        <article className="group flex h-full flex-col overflow-hidden card rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                            <div className="relative overflow-hidden border-b border-white/10 bg-zinc-900">
                                {project.label && (
                                    <span className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-zinc-950/80 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur-md">
                                        {project.label}
                                    </span>
                                )}
                                <img
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    loading="lazy"
                                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <h3 className="font-semibold text-zinc-50">{project.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.description}</p>
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {project.tech.map((tech) => <Tag key={tech}>{tech}</Tag>)}
                                </div>
                                <div className="mt-auto pt-5">
                                    <ProjectLinks github={project.github} demo={project.demo} />
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-10 text-center">
                <a
                    href="https://github.com/krunal-chaudhari-0723"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                    <FaGithub /> More on GitHub <FiArrowUpRight />
                </a>
            </Reveal>
        </Section>
    );
}

export default Projects;
