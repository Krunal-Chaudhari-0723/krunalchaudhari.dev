// Projects.jsx - With Enhanced Background Animations
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import Food from '../assets/food.png';
import Jadoo from '../assets/Jadoo.png';
import Seliora from '../assets/seloria.png';

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

const projects = [
    {
        title: "Seliora FreeLance",
        description: "This is the fullsatck website using Next js and MongoDB for database , Claudinary for storage, In this full stack website i use Razorpay for payment integration",
        tech: ["Next.js", "MongoDb", "Tailwind",  "Razorpay"],
        image: Seliora,
        github: "https://github.com/Krunal-Chaudhari-0723/seloria",
        demo: "https://getseloria.vercel.app",
        featured: true
    },
    {
        title: "Food Delivery App",
        description: "MERN Stack food delivery application with cart, authentication and admin panel. Users can browse restaurants, add items to cart, and place orders seamlessly.",
        tech: ["React", "Node.js", "MongoDB", "Express"],
        image: Food,
        github: "https://github.com/Krunal-Chaudhari-0723/FoodDelivery",
        demo: "https://krunalchaudhari-fooddel-frontend.netlify.app/",
        featured: true
    },
    {
        title: "Jadoo - Travels Website",
        description: "Modern & responsive Tours & Travels web app using React.js for exploring destinations, packages, and deals. Interactive platform with dynamic UI components and seamless user experience.",
        tech: ["React", "Node", "JSON", "Tailwind"],
        image: Jadoo,
        github: "https://github.com/Krunal-Chaudhari-0723/Technical-Task",
        demo: "https://lovely-stardust-c4a5fb.netlify.app/",
        featured: false
    },
];

function Projects() {
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

    const openLink = (url) => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <style>{styles}</style>

            <section
                id="projects"
                className="relative bg-[#0a0a1a] text-white py-28 px-6 overflow-hidden"
            >
                {/* Enhanced Background */}
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

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                            <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <span className="text-cyan-400 text-xs font-medium tracking-wide">My Portfolio</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>

                        <div className="w-92 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full" />

                        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
                            Here are some of my recent projects that showcase my skills and expertise
                        </p>
                    </motion.div>

                    {/* Projects Grid - 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.01 }}
                                className="group relative bg-slate-800/30 border border-slate-700/40 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden h-52">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {project.featured && (
                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-cyan-500 text-white text-[10px] font-semibold tracking-wider uppercase shadow">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-200">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all duration-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => openLink(project.github)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/50 border border-slate-600/40 text-slate-300 text-sm font-medium hover:bg-slate-700 hover:border-slate-500/60 hover:text-white transition-all duration-200 cursor-pointer"
                                        >
                                            <FaGithub className="text-sm" />
                                            GitHub
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => openLink(project.demo)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-indigo-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 cursor-pointer"
                                        >
                                            <HiEye className="text-sm" />
                                            Live Demo
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View More */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center mt-8"
                    >
                        <motion.a
                            href="https://github.com/krunal-chaudhari-0723"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-cyan-500/40 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200"
                        >
                            <FaGithub className="text-base" />
                            View More on GitHub
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default Projects;
