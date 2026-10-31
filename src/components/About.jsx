// About.jsx - Short bio, focus areas and quick facts
import { FiMapPin, FiBookOpen, FiGlobe, FiBriefcase } from "react-icons/fi";
import Profile from "../assets/new_profile.png";
import { Section, SectionHeader, Reveal } from "./ui";

const focusAreas = [
    { title: "Frontend", text: "Responsive, accessible interfaces with React, Next.js and Tailwind CSS." },
    { title: "Backend", text: "REST APIs and business logic with Node.js, Express and Laravel." },
    { title: "Data", text: "Schema design and query tuning on MongoDB and MySQL." },
    { title: "AI", text: "LLM features, prompt engineering and AI-assisted workflows in real products." },
];

const facts = [
    { icon: FiMapPin, label: "Based in", value: "Surat, Gujarat" },
    { icon: FiBookOpen, label: "Education", value: "MCA (Pursuing)" },
    { icon: FiBriefcase, label: "Experience", value: "1+ years" },
    { icon: FiGlobe, label: "Languages", value: "English, Hindi, Marathi, Gujarati" },
];

const About = () => {
    return (
        <Section id="about" glow="right">
            <SectionHeader index="01" eyebrow="About" title="Developer, builder, teacher." />

            <div className="grid gap-12 md:grid-cols-[1fr_300px]">
                <div>
                    <Reveal className="space-y-5 text-lg leading-relaxed text-zinc-400">
                        <p>
                            I'm <span className="text-zinc-100">Krunal Janardan Chaudhari</span>, a full stack developer
                            based in Surat. I build web applications end to end with the MERN stack and Laravel, from
                            the database schema to the last pixel of the UI.
                        </p>
                        <p>
                            Before shipping products full time, I spent four years teaching programming and mentored
                            300+ students. That taught me to write code other people can read, and to explain the
                            trade-offs behind it. I'm currently pursuing my MCA and exploring how AI can make everyday
                            software smarter.
                        </p>
                    </Reveal>

                    <div className="mt-10 grid gap-3 sm:grid-cols-2">
                        {focusAreas.map((area, idx) => (
                            <Reveal key={area.title} delay={idx * 0.05}>
                                <div className="h-full card rounded-xl p-4">
                                    <p className="font-mono text-xs text-brand-300">{area.title}</p>
                                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{area.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <Reveal delay={0.1}>
                    <aside className="overflow-hidden card rounded-2xl">
                        <img
                            src={Profile}
                            alt="Krunal Chaudhari"
                            className="aspect-square w-full object-cover grayscale-[30%]"
                        />
                        <dl className="divide-y divide-white/5">
                            {facts.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3 px-5 py-3.5">
                                    <Icon className="mt-0.5 shrink-0 text-zinc-500" />
                                    <div>
                                        <dt className="text-xs text-zinc-500">{label}</dt>
                                        <dd className="text-sm text-zinc-200">{value}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </aside>
                </Reveal>
            </div>
        </Section>
    );
};

export default About;
