// Shared layout primitives for every section
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Soft ambient glow placed behind a section; side picks where it sits
const glows = {
    left: "left-[-10%] top-[10%] bg-brand-600/[0.14]",
    right: "right-[-10%] top-[20%] bg-cyan-500/[0.08]",
    center: "left-1/2 top-[30%] -translate-x-1/2 bg-brand-600/[0.12]",
};

export function Section({ id, children, className = "", glow }) {
    return (
        <section id={id} className={`relative px-5 sm:px-6 py-24 md:py-32 ${className}`}>
            {glow && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className={`absolute h-[420px] w-[520px] rounded-full blur-[130px] ${glows[glow]}`} />
                </div>
            )}
            <div className="relative mx-auto max-w-5xl">{children}</div>
        </section>
    );
}

export function SectionHeader({ index, eyebrow, title, description }) {
    return (
        <Reveal className="mb-12 md:mb-16">
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs tracking-wide">
                <span className="text-gradient font-medium">{index}</span>
                <span className="h-px w-6 bg-gradient-to-r from-brand-400 to-cyan-400" />
                <span className="text-zinc-400">{eyebrow}</span>
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">{title}</h2>
            {description && <p className="mt-3 max-w-xl text-zinc-400">{description}</p>}
        </Reveal>
    );
}

export function Tag({ children }) {
    return (
        <span className="rounded-md border border-brand-400/15 bg-brand-400/[0.07] px-2 py-0.5 font-mono text-[11px] text-brand-200/90">
            {children}
        </span>
    );
}
