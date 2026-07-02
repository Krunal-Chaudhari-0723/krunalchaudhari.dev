// Achievements.jsx - Lightweight Version (No Lag)
import { motion } from "framer-motion";
import { useState } from "react";
import {
    FaTrophy,
    FaCertificate,
    FaCode,
    FaLaptopCode,
    FaUsers,
    FaChalkboardTeacher,
    FaBrain,
    FaUniversity,
} from "react-icons/fa";

const achievements = [
    {
        id: 1,
        title: "Mentored 300+ Students",
        description: "Guided over 300 students in programming, web development, and career direction.",
        icon: FaUsers,
        color: "#06b6d4",
        date: "Feb 2023 – Feb 2026",
        type: "achievement",
    },
    {
        id: 2,
        title: "Campus Mantri, GeeksforGeeks",
        description: "Served as Campus Ambassador, organizing technical events and workshops on campus.",
        icon: FaChalkboardTeacher,
        color: "#2e8b57",
        date: "Jan 2026 – Apr 2026",
        type: "achievement",
    },
    {
        id: 3,
        title: "Full Stack Development",
        description: "Comprehensive certification covering the MERN stack and modern web tooling.",
        icon: FaCode,
        color: "#61dafb",
        date: "Jun 2024",
        type: "certification",
    },
    {
        id: 4,
        title: "TATA Gen AI Certificate",
        description: "Generative AI certification covering core concepts, prompt engineering, and LLM applications.",
        icon: FaBrain,
        color: "#8B5CF6",
        date: "Jul 2025",
        type: "certification",
    },
    {
        id: 5,
        title: "Frontend Development",
        description: "freeCodeCamp certification in HTML, CSS, JavaScript, and responsive design.",
        icon: FaCertificate,
        color: "#ff2d20",
        date: "Apr 2026",
        type: "certification",
    },
    {
        id: 6,
        title: "Frontend Certificate, VNSGU",
        description: "Veer Narmad South Gujarat University certificate in modern frontend technologies.",
        icon: FaUniversity,
        color: "#FCD34D",
        date: "Nov 2024",
        type: "certification",
    },
];

const stats = [
    { number: "300+", label: "Students Mentored", icon: FaUsers, filter: "all" },
    { number: "10+", label: "Projects Completed", icon: FaCode, filter: "all" },
    { number: "5+", label: "Certifications", icon: FaCertificate, filter: "certification" },
    { number: "2+", label: "Years Experience", icon: FaLaptopCode, filter: "all" },
];

const FILTERS = [
    { id: "all", label: "All" },
    { id: "achievement", label: "Achievements" },
    { id: "certification", label: "Certifications" },
];

const typeLabel = {
    certification: "Certification",
    achievement: "Achievement",
};

// Pre-compute colors
const getColorStyles = (color) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return {
        bg: `rgba(${r}, ${g}, ${b}, 0.15)`,
        border: `rgba(${r}, ${g}, ${b}, 0.3)`,
        text: color,
    };
};

const achievementsWithColors = achievements.map(ach => ({
    ...ach,
    colors: getColorStyles(ach.color)
}));

const Achievements = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    const [hoveredId, setHoveredId] = useState(null);

    const filteredAchievements =
        activeFilter === "all"
            ? achievementsWithColors
            : achievementsWithColors.filter((a) => a.type === activeFilter);

    const countFor = (type) =>
        type === "all" ? achievements.length : achievements.filter((a) => a.type === type).length;

    return (
        <section id="achievements" className="relative py-28 px-6 bg-[#0a0a1a] overflow-hidden">
            {/* Simple Static Background - No animations */}
            <div className="absolute inset-0 bg-[#0a0a1a]" />

            {/* Only 2 static gradient blobs - no animation */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                        <FaTrophy className="text-cyan-400 text-sm" />
                        <span className="text-cyan-400 text-xs font-medium tracking-wide">
                            My Achievements
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-block relative">
                        <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
                            Achievements
                        </span>
                        <span className="text-white ml-3">&amp; Awards</span>
                        <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 rounded-full" />
                    </h2>

                    <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-6 leading-relaxed">
                        Certifications, recognition, and milestones earned along the way.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const isActive = activeFilter === stat.filter;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveFilter(stat.filter)}
                                className={`text-left bg-gradient-to-br from-slate-900/60 to-slate-800/30 border rounded-2xl p-6 transition-all duration-200 ${isActive
                                        ? "border-cyan-500/50"
                                        : "border-slate-700/50 hover:border-cyan-500/30"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-3">
                                    <Icon className="text-cyan-400 text-xl" />
                                </div>
                                <div className="text-3xl font-bold text-white">{stat.number}</div>
                                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                            </button>
                        );
                    })}
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                    {FILTERS.map((f) => {
                        const isActive = activeFilter === f.id;
                        return (
                            <button
                                key={f.id}
                                onClick={() => setActiveFilter(f.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${isActive
                                        ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                                        : "bg-white/[0.02] border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600"
                                    }`}
                            >
                                {f.label}
                                <span className={`ml-2 text-xs ${isActive ? "text-cyan-400/80" : "text-slate-600"}`}>
                                    {countFor(f.id)}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAchievements.map((achievement) => {
                        const Icon = achievement.icon;
                        const colors = achievement.colors;
                        const isHovered = hoveredId === achievement.id;

                        return (
                            <div
                                key={achievement.id}
                                className="group relative bg-gradient-to-br from-slate-900/60 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
                                style={{
                                    borderColor: isHovered ? colors.border : undefined,
                                }}
                                onMouseEnter={() => setHoveredId(achievement.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Type badge */}
                                <span
                                    className="absolute top-4 right-4 text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider border"
                                    style={{
                                        color: colors.text,
                                        borderColor: colors.border,
                                        backgroundColor: colors.bg,
                                    }}
                                >
                                    {typeLabel[achievement.type]}
                                </span>

                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                                    style={{ backgroundColor: colors.bg }}
                                >
                                    <Icon className="text-2xl" style={{ color: colors.text }} />
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2 pr-16 leading-snug">
                                    {achievement.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    {achievement.description}
                                </p>

                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <span className="text-[10px] text-slate-400">{achievement.date}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredAchievements.length === 0 && (
                    <div className="text-center text-slate-500 text-sm py-12">
                        Nothing in this category yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Achievements;