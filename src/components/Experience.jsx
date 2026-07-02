// Experience.jsx - With Enhanced Background Animations
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Add this CSS for custom animations
const styles = `
  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-30px) rotate(5deg);
    }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
  }
  
  @keyframes float-shape {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1);
    }
    33% { 
      transform: translateY(-20px) rotate(120deg) scale(1.1);
    }
    66% { 
      transform: translateY(10px) rotate(240deg) scale(0.9);
    }
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }
  
  .animate-float-shape {
    animation: float-shape 15s ease-in-out infinite;
  }
`;

const experiences = [
    {
        year: "APR 2026 - PRESENT",
        title: "Fullstack Developer & AI Engineer",
        company: "The Hidden Ideas Infotech",
        description: "Building end-to-end web applications with modern tech stack. Implementing AI solutions and optimizing performance for scalable platforms.",
        tags: ["React", "Node.js", "Python", "AI"],
        color: "cyan"
    },
    {
        year: "FEB 2026 - MAR 2026",
        title: "Fullstack Developer",
        company: "Trueline Solutions",
        description: "Developed informative web applications during intensive training period. Collaborated with team to deliver responsive and user-friendly interfaces.",
        tags: ["JavaScript", "MongoDB", "Express"],
        color: "emerald"
    },
    {
        year: "FEB 2022 - FEB 2026",
        title: "Programming Faculty",
        company: "MDIIT",
        description: "Teaching programming, web development and guiding students in projects. Mentored 100+ students in building real-world applications.",
        tags: ["Teaching", "Mentoring", "Curriculum Design"],
        color: "purple"
    },
    {
        year: "JUL 2025",
        title: "Gen AI Intern",
        company: "TATA",
        description: "Worked on AI concepts, prompt engineering and modern AI tools. Developed prototypes showcasing generative AI capabilities.",
        tags: ["GPT", "Prompt Engineering", "LLM"],
        color: "orange"
    },
    {
        year: "MAY 2025 - JUL 2025",
        title: "Backend Developer Intern",
        company: "Kash Info Solution",
        description: "Worked on Laravel applications, database management and backend development. Implemented RESTful APIs and optimized database queries.",
        tags: ["Laravel", "PHP", "MySQL", "APIs"],
        color: "indigo"
    },
];

// Color mapping
const colorClasses = {
    cyan: "from-cyan-500 to-blue-500",
    emerald: "from-emerald-500 to-teal-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
    indigo: "from-indigo-500 to-purple-500",
};

const ExperienceCard = ({ exp, index, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [isHovered, setIsHovered] = useState(false);

    // Get icon based on title
    const getIconSymbol = (title) => {
        if (title.includes("AI")) return "🤖";
        if (title.includes("Faculty")) return "📚";
        if (title.includes("Intern")) return "🎯";
        if (title.includes("Backend")) return "⚙️";
        return "💼";
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 -translate-x-1/2 z-10">
                <motion.div
                    animate={{ scale: isHovered ? 1.3 : 1 }}
                    className="relative"
                >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colorClasses[exp.color]} shadow-lg`} />
                    <motion.div
                        animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 0.6 : 0.3 }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorClasses[exp.color]} blur-sm`}
                    />
                </motion.div>
            </div>

            {/* Connecting Line to next card */}
            {!isLast && (
                <div className="absolute left-0 top-14 bottom-0 w-px -translate-x-1/2">
                    <div className={`w-px h-full bg-gradient-to-b ${colorClasses[exp.color]} opacity-30`} />
                </div>
            )}

            {/* Card Content */}
            <motion.div
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.3 }}
                className={`relative ml-8 p-6 rounded-xl bg-slate-800/50 border transition-all duration-300 cursor-pointer
                    ${isHovered ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-slate-700/50'}`}
            >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">{getIconSymbol(exp.title)}</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-cyan-400 text-xs font-medium">{exp.year}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mt-0.5">
                                {exp.title}
                            </h3>
                        </div>
                    </div>

                    {/* Company Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600">
                        <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-slate-300 text-xs">{exp.company}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                        <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600 
                                transition-all duration-200 ${isHovered ? 'border-cyan-500/50 text-cyan-300' : ''}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

function Experience() {
    const sectionRef = useRef(null);
    const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <style>{styles}</style>

            <section
                id="experience"
                className="relative bg-[#0a0a1a] text-white py-28 px-6 overflow-hidden"
            >
                {/* Enhanced Background */}
                <div className="absolute inset-0 bg-[#0a0a1a]" />

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl"
                    animate={{
                        x: mousePosition.x * 0.3 - 20,
                        y: mousePosition.y * 0.3 - 20,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 50,
                        mass: 1,
                    }}
                />

                <motion.div
                    className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl"
                    animate={{
                        x: (mousePosition.x - 50) * -0.2,
                        y: (mousePosition.y - 50) * -0.2,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 50,
                        mass: 0.8,
                    }}
                />

                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl"
                    animate={{
                        x: mousePosition.x * 0.1 - 30,
                        y: mousePosition.y * 0.1 - 30,
                    }}
                    transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 50,
                        mass: 1.2,
                    }}
                />

                {/* Floating Shapes */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-[15%] left-[5%] w-16 h-16 border border-cyan-500/20 rounded-full animate-float-slow"
                        style={{ animationDelay: '0s' }}
                    />
                    <motion.div
                        className="absolute top-[25%] right-[8%] w-12 h-12 border border-indigo-500/20 rounded-lg animate-float-slow"
                        style={{ animationDelay: '2s' }}
                    />
                    <motion.div
                        className="absolute bottom-[30%] left-[10%] w-20 h-20 border border-purple-500/20 rounded-full animate-float-slow"
                        style={{ animationDelay: '4s' }}
                    />
                    <motion.div
                        className="absolute bottom-[20%] right-[5%] w-10 h-10 border border-cyan-500/20 rotate-45 animate-float-slow"
                        style={{ animationDelay: '1s' }}
                    />
                </div>

                {/* Twinkling Stars */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    {['fa-react', 'fa-laravel', 'fa-node-js', 'fa-php', 'fa-database', 'fa-code'].map((icon, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-2xl text-cyan-500/10 animate-float-shape"
                            style={{
                                top: `${10 + Math.random() * 80}%`,
                                left: `${10 + Math.random() * 80}%`,
                                animationDelay: `${i * 2}s`,
                            }}
                        >
                            <i className={`fa-brands ${icon}`} />
                        </motion.div>
                    ))}
                </div>

                {/* Animated Grid Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={`h-${i}`}
                            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                            style={{
                                top: `${(i / 10) * 100}%`,
                            }}
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={`v-${i}`}
                            className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
                            style={{
                                left: `${(i / 10) * 100}%`,
                            }}
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: i * 0.3 + 2,
                            }}
                        />
                    ))}
                </div>

                {/* Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                            }}
                            animate={{
                                y: [null, Math.random() * window.innerHeight],
                                x: [null, Math.random() * window.innerWidth],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: Math.random() * 15 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div ref={sectionRef} className="max-w-4xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                            <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-cyan-400 text-xs font-medium">My Journey</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
                            Work Experience
                        </h2>

                        <div className="w-92 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />

                        <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-4">
                            A timeline of my professional journey and the experiences I've gained
                        </p>
                    </motion.div>

                    {/* Timeline Container */}
                    <div className="relative pl-4">
                        {/* Experience Cards */}
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <ExperienceCard
                                    key={index}
                                    exp={exp}
                                    index={index}
                                    isLast={index === experiences.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center mt-8"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Let's Work Together
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default Experience;  