// About.jsx - With Background Animations Only
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from '../assets/profile.jpg'

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
  
  @keyframes pulse-ring {
    0%, 100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.6;
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
  
  .animate-pulse-ring {
    animation: pulse-ring 4s ease-in-out infinite;
  }
`;

const About = () => {
    const navigate = useNavigate();
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

    const whatIDo = [
        "Frontend Development with React",
        "Backend with Laravel and Node.js",
        "Database Design (MongoDB, MySQL)",
        "REST API Development",
        "Full Stack Application Development",
        "Performance Optimization"
    ];

    const personalInfo = [
        { label: "Location", value: "Surat, Gujarat" },
        { label: "Email", value: "chaudharikrunal0223@gmail.com" },
        { label: "Phone", value: "+91 6351924667" },
        { label: "Languages", value: "English, Hindi, Marathi, Gujarati" },
        { label: "Education", value: "MCA (Pursuing)" },
        { label: "Experience", value: "1+ Years" }
    ];

    const techStack = [
        "React", "Laravel", "Node.js", "MongoDB", "Express.js",
        "Tailwind CSS", "Git", "MySQL", "PHP", "JavaScript"
    ];

    const goToContact = () => {
        navigate("/contact");
    };

    const goToProjects = () => {
        navigate("/projects");
    };

    return (
        <>
            <style>{styles}</style>

            <section id="about" className="relative py-28 px-6 bg-[#0a0a1a] overflow-hidden">
                {/* Base Background */}
                <div className="absolute inset-0 bg-[#0a0a1a]" />

                {/* Animated Gradient Orbs */}
                <motion.div
                    className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl"
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
                    className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl"
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

                {/* Pulsing Rings */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full border border-cyan-500/10 animate-pulse-ring" />
                    <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full border border-indigo-500/10 animate-pulse-ring" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-[50%] left-[60%] w-48 h-48 rounded-full border border-purple-500/10 animate-pulse-ring" style={{ animationDelay: '4s' }} />
                </div>

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

                {/* Content - No Card Animations */}
                <div className="max-w-6xl mx-auto relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
                                About
                            </span>
                            <span className="text-white ml-3">Me</span>
                        </h2>
                        <div className="w-50 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-4">

                        {/* Left Column - No Animations */}
                        <div>
                            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 mb-6">
                                <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-slate-800">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full blur-md opacity-40 animate-pulse" />
                                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mb-3 overflow-hidden">
                                            <img
                                                src={Profile}
                                                alt="Krunal Janardan Chaudhari"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-white font-semibold text-lg">Krunal Janardan Chaudhari</h3>
                                    <p className="text-cyan-400 text-sm">Full Stack Developer</p>
                                </div>

                                <div className="space-y-3">
                                    {personalInfo.map((info, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-slate-500 uppercase tracking-wide">{info.label}</p>
                                                <p className="text-xs text-slate-300 break-words">{info.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <button
                                    type="button"
                                    onClick={goToContact}
                                    className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg font-medium text-sm text-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer"
                                >
                                    Get in touch
                                </button>
                                <button
                                    type="button"
                                    onClick={goToProjects}
                                    className="px-4 py-2.5 border border-cyan-400/50 text-cyan-400 rounded-lg font-medium text-sm text-center hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer"
                                >
                                    View my work
                                </button>

                                <a
                                    href="https://github.com/Krunal-Chaudhari-0723"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 border border-slate-700 text-slate-300 rounded-lg font-medium text-sm text-center hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>

                        {/* Right Column - No Animations */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    Hello, I am Krunal Janardan
                                    Chaudhari, a Full Stack Developer based in Surat, Gujarat.
                                    I specialize in building modern web applications using the MERN stack and Laravel.
                                    With 6+ Months of experience, I have worked on projects ranging from small
                                    business websites to enterprise-level applications.
                                </p>
                                <p className="text-slate-400 leading-relaxed mt-3">
                                    Currently pursuing my MCA, I am constantly learning and exploring new technologies.
                                    I believe in writing clean, maintainable code and creating seamless user experiences.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">What I Do</h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {whatIDo.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-3 bg-slate-800/20 border border-slate-700/30 rounded-lg">
                                            <span className="text-slate-400 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack with Border */}
                            <div className="border border-cyan-400/30 rounded-2xl p-6 bg-gradient-to-br from-slate-900/40 to-slate-800/20">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <i className="fa-solid fa-cubes text-cyan-400" />
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
