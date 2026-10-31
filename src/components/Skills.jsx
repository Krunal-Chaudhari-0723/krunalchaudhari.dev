// Skills.jsx - Tech stack grouped by area
import {
    SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
    SiNodedotjs, SiExpress, SiLaravel, SiPhp,
    SiMongodb, SiMysql, SiPostgresql, SiFirebase,
    SiGit, SiGithub, SiDocker, SiVercel, SiPostman
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Section, SectionHeader, Reveal } from "./ui";

const groups = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS3", icon: SiCss, color: "#1572B6" },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
            { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
            { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
            { name: "PHP", icon: SiPhp, color: "#777BB4" },
        ],
    },
    {
        title: "Databases",
        skills: [
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        ],
    },
    {
        title: "Tools & Deployment",
        skills: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "VS Code", icon: VscVscode, color: "#007ACC" },
        ],
    },
];

const Skills = () => {
    return (
        <Section id="skills" glow="right">
            <SectionHeader
                index="04"
                eyebrow="Stack"
                title="Tools I build with"
                description="The languages, frameworks and services I reach for day to day."
            />

            <div className="grid gap-4 md:grid-cols-2">
                {groups.map((group, idx) => (
                    <Reveal key={group.title} delay={idx * 0.05}>
                        <div className="h-full card rounded-2xl p-5 md:p-6">
                            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-500">{group.title}</h3>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {group.skills.map(({ name, icon: Icon, color }) => (
                                    <li
                                        key={name}
                                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-zinc-50"
                                    >
                                        <Icon style={{ color }} className="text-base" />
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
