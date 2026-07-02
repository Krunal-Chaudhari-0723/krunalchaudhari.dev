// Hero.jsx - With Enhanced Background Animations
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import myCv from '../assets/Krunal-Full Stack.pdf';
import ProfileImage from '../assets/profile.jpg';

// Add this CSS for custom animations
const styles = `
  @keyframes swing-slow {
    0% {
      transform: rotate(-5deg);
      transition-timing-function: ease-in-out;
    }
    50% {
      transform: rotate(5deg);
      transition-timing-function: ease-in-out;
    }
    100% {
      transform: rotate(-5deg);
      transition-timing-function: ease-in-out;
    }
  }
  
  @keyframes ring-spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes glow-pulse-slow {
    0%, 100% { 
      opacity: 0.3;
      transform: scale(1);
    }
    50% { 
      opacity: 0.6;
      transform: scale(1.05);
    }
  }
  
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
  
  @keyframes slide-left {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(-100%); opacity: 1; }
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
  
  .animate-swing-slow {
    animation: swing-slow 6s ease-in-out infinite;
  }
  
  .animate-ring-spin-slow {
    animation: ring-spin-slow 15s linear infinite;
  }
  
  .animate-glow-pulse-slow {
    animation: glow-pulse-slow 4s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }
  
  .animate-slide-left {
    animation: slide-left 12s linear infinite;
  }
  
  .animate-float-shape {
    animation: float-shape 15s ease-in-out infinite;
  }
`;

const Hero = () => {
    const containerRef = useRef(null);
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

    const roles = [
        { title: "Full Stack Developer", icon: "fa-layer-group", color: "#06b6d4" },
        { title: "Laravel Expert", icon: "fa-laravel", color: "#ff2d20" },
        { title: "React Specialist", icon: "fa-react", color: "#61dafb" },
        { title: "MERN Architect", icon: "fa-node-js", color: "#83cd29" }
    ];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex].title;
        let timer;

        if (isDeleting) {
            if (displayText.length === 0) {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
            } else {
                timer = setTimeout(() => {
                    setDisplayText(prev => prev.slice(0, -1));
                }, 50);
            }
        } else {
            if (displayText.length === currentRole.length) {
                timer = setTimeout(() => setIsDeleting(true), 2500);
            } else {
                timer = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                }, 80);
            }
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex, roles]);

    const techStack = [
        { name: "React", icon: "fa-brands fa-react", color: "#61dafb" },
        { name: "Laravel", icon: "fa-brands fa-laravel", color: "#ff2d20" },
        { name: "Node.js", icon: "fa-brands fa-node-js", color: "#83cd29" },
        { name: "MongoDB", icon: "fa-solid fa-database", color: "#47a248" },
        { name: "Tailwind", icon: "fa-solid fa-wind", color: "#06b6d4" },
        { name: "TypeScript", icon: "fa-solid fa-code", color: "#3178c6" },
        { name: "Express", icon: "fa-solid fa-server", color: "#ffffff" },
        { name: "MySQL", icon: "fa-solid fa-database", color: "#00758f" },
    ];

    return (
        <>
            <style>{styles}</style>

            <section
                ref={containerRef}
                className="relative pt-62 py-20 bg-[#0a0a1a] text-white flex items-center justify-center px-4 md:px-8 overflow-hidden"
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

                {/* Particles - Enhanced */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
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

                {/* Main Content */}
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 items-center relative z-10">

                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Status Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 mb-6"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            <span className="text-white/70 text-sm">Available for work</span>
                            <span className="text-white/30">•</span>
                            <span className="text-cyan-400 text-sm font-medium">Open to Work</span>
                        </motion.div>

                        <p className="text-cyan-400 text-base mb-2 flex items-center gap-2">
                            <span className="text-xl inline-block">👋</span>
                            Hello, I'm
                        </p>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Krunal
                            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent"> Chaudhari</span>
                        </h1>

                        <div className="flex items-center gap-3 mt-4">
                            <i className={`${roles[roleIndex].icon} text-2xl`} style={{ color: roles[roleIndex].color }} />
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-slate-400 text-lg">I'm a</span>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                                        {displayText}
                                    </span>
                                    <span className="inline-block w-0.5 h-6 ml-1 bg-cyan-400 animate-pulse" />
                                </h2>
                            </div>
                        </div>

                        <p className="mt-5 text-slate-300 text-base leading-relaxed max-w-lg">
                            Passionate <span className="text-cyan-400 font-medium">Full Stack Developer</span> and{" "}
                            <span className="text-cyan-400 font-medium">AI Engineer</span> creating
                            modern web applications with 1+ years of expertise.
                        </p>

                        {/* Tech Stack */}
                        <div className="mt-6">
                            <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-cube text-cyan-400" />
                                Tech Stack & Tools
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {techStack.map((tech, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10"
                                        style={{ borderColor: `${tech.color}30` }}
                                        whileHover={{
                                            scale: 1.05,
                                            borderColor: tech.color,
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <i className={`${tech.icon} text-sm`} style={{ color: tech.color }} />
                                        <span className="text-xs text-slate-200 font-medium">{tech.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <motion.button
                                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const contactSection = document.getElementById('contact');
                                    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Hire Me <i className="fa-solid fa-arrow-right" />
                            </motion.button>

                            <motion.button
                                className="px-6 py-3 border-2 border-cyan-400/50 rounded-xl font-semibold text-cyan-300 hover:bg-cyan-400/10 transition-all flex items-center gap-2 cursor-pointer"
                                whileHover={{ scale: 1.05, borderColor: "#06b6d4" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = myCv;
                                    link.download = 'Krunal_Chaudhari_Resume.pdf';
                                    document.body.appendChild(link);
                                    link.click();
                                    link.remove();
                                }}
                            >
                                <i className="fa-regular fa-file-pdf" /> Download CV
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Side - Profile Image with Slow & Smooth Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex flex-col items-center gap-6"
                    >
                        {/* Profile Image - With Ultra Smooth Slow Swing */}
                        <div className="relative group">
                            {/* Slow Spinning Gradient Rings */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full blur-xl opacity-40 animate-ring-spin-slow" />

                            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 rounded-full blur-2xl opacity-15 animate-ring-spin-slow" style={{ animationDirection: "reverse", animationDuration: "20s" }} />

                            {/* Slow Glow Pulse Ring */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-glow-pulse-slow" />

                            {/* Profile Image Container - Super Smooth Swing */}
                            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-cyan-400/30 shadow-2xl shadow-cyan-500/20 overflow-hidden">
                                <div className="w-full h-full animate-swing-slow rounded-full will-change-transform">
                                    <img
                                        src={ProfileImage}
                                        alt="Krunal Chaudhari"
                                        className="w-full h-full object-cover rounded-full transform transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Gradient Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent group-hover:bg-cyan-500/20 transition-all duration-500 rounded-full" />
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                                <div className="relative">
                                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                                    <span className="relative inline-block w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
                                </div>
                            </div>
                        </div>

                        {/* Code Card - Small */}
                        <motion.div
                            className="relative w-full max-w-sm"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl" />

                            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <div className="flex items-center px-4 py-2 bg-black/50 border-b border-white/10">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 ml-3 font-mono">developer.js</span>
                                </div>

                                <div className="p-4">
                                    <pre className="text-[10px] md:text-xs font-mono leading-relaxed whitespace-pre-wrap break-words">
                                        <code className="text-slate-300">
                                            <span className="text-purple-400">const</span>{" "}
                                            <span className="text-cyan-400">developer</span> = {"{"}
                                            <br />
                                            <span className="ml-3">
                                                <span className="text-pink-400">name</span>:{" "}
                                                <span className="text-green-400">"Krunal"</span>,
                                            </span>
                                            <br />
                                            <span className="ml-3">
                                                <span className="text-pink-400">role</span>:{" "}
                                                <span className="text-yellow-400">"Full Stack"</span>,
                                            </span>
                                            <br />
                                            <span className="ml-3">
                                                <span className="text-pink-400">passion</span>:{" "}
                                                <span className="text-blue-400">true</span>,
                                            </span>
                                            <br />
                                            {"}"};
                                            <br />
                                            <span className="text-purple-400">await</span>{" "}
                                            <span className="text-cyan-400">developer</span>.
                                            <span className="text-yellow-400">build</span>();
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <span className="text-slate-500 text-[10px] tracking-wider font-mono">SCROLL</span>
                    <div className="w-4 h-6 border border-slate-600 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-1.5 bg-cyan-400 rounded-full mt-1"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;