// Hero.jsx - Headline, intro and quick stats
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiDownload, FiAward } from "react-icons/fi";
import myCv from "../assets/Krunal-Full Stack.pdf";
import ProfileImage from "../assets/new_profile.png";
import { socials } from "../lib/site";

const stats = [
    { value: "#1", label: "Hackathon winner" },
    { value: "1+ yr", label: "Shipping production apps" },
    { value: "10+", label: "Projects built" },
    { value: "300+", label: "Students mentored" },
];

const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
    return (
        <section id="home" className="relative overflow-hidden px-5 pb-20 pt-36 sm:px-6 md:pb-28 md:pt-44">
            {/* Background */}
            <div className="bg-grid pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-48 left-[-5%] h-[520px] w-[620px] rounded-full bg-brand-600/30 blur-[140px]" />
                <div className="absolute -top-24 right-[-10%] h-[440px] w-[560px] rounded-full bg-cyan-500/15 blur-[140px]" />
                <div className="absolute top-[45%] left-[35%] h-[320px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zinc-950" />

            <div className="relative mx-auto max-w-5xl">
                {/* Announcement */}
                <motion.button
                    {...fadeUp(0)}
                    onClick={() => scrollTo("projects")}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.07] py-1 pl-1.5 pr-3 text-xs text-amber-200 transition-colors hover:border-amber-400/50 sm:text-sm"
                >
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 font-medium text-amber-300">
                        <FiAward /> First Prize
                    </span>
                    Won the BMU Hackathon with AttendIQ
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </motion.button>

                {/* Identity */}
                <motion.div {...fadeUp(0.08)} className="mt-10 flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={ProfileImage}
                            alt="Krunal Chaudhari"
                            className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-400" />
                    </div>
                    <div>
                        <p className="font-medium text-zinc-100">Krunal Chaudhari</p>
                        <p className="text-sm text-zinc-500">Full Stack Developer (MERN)</p>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    {...fadeUp(0.16)}
                    className="mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-tighter text-zinc-50 sm:text-6xl md:text-7xl"
                >
                    I build fast, reliable{" "}
                    <span className="text-gradient">full stack</span>{" "}
                    web products.
                </motion.h1>

                <motion.p {...fadeUp(0.24)} className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                    Full stack developer from Surat, India, working across React, Next.js, Node.js and Laravel.
                    Currently building web apps and internal tools at{" "}
                    <span className="text-zinc-200">Bright Paper</span>.
                </motion.p>

                {/* CTAs */}
                <motion.div {...fadeUp(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
                    <button
                        onClick={() => scrollTo("contact")}
                        className="btn-primary group inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
                    >
                        Get in touch
                        <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <a
                        href={myCv}
                        download="Krunal_Chaudhari_Resume.pdf"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-100 backdrop-blur-sm transition-colors hover:border-brand-400/40 hover:bg-brand-400/[0.08]"
                    >
                        <FiDownload />
                        Download CV
                    </a>

                    <div className="ml-1 flex items-center gap-1">
                        {socials.slice(0, 3).map(({ label, icon: Icon, link }) => (
                            <a
                                key={label}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="rounded-lg p-2.5 text-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-100"
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.p {...fadeUp(0.4)} className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-500">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Available for freelance &amp; full-time roles
                </motion.p>

                {/* Stats */}
                <motion.dl
                    {...fadeUp(0.48)}
                    className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_30px_80px_-40px_rgb(139_92_246/0.6)] md:grid-cols-4"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-zinc-950/90 px-5 py-5 backdrop-blur">
                            <dt className="text-sm text-zinc-500">{stat.label}</dt>
                            <dd className="text-gradient mt-1 w-fit text-3xl font-semibold tracking-tight">{stat.value}</dd>
                        </div>
                    ))}
                </motion.dl>

                <a
                    href="https://github.com/Krunal-Chaudhari-0723"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-300"
                >
                    github.com/Krunal-Chaudhari-0723 <FiArrowUpRight />
                </a>
            </div>
        </section>
    );
};

export default Hero;
