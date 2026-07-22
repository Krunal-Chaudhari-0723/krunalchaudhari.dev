// Navbar.jsx - With Larger Visible Social Icons
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileImage from '../assets/new_profile.png';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("/");
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/", sectionId: "home", icon: "fa-home" },
        { name: "About", path: "/about", sectionId: "about", icon: "fa-user" },
        { name: "Skills", path: "/skills", sectionId: "skills", icon: "fa-code" },
        { name: "Achievements", path: "/achievements", sectionId: "achievements", icon: "fa-trophy" },
        { name: "Projects", path: "/projects", sectionId: "projects", icon: "fa-folder-open" },
        { name: "Experience", path: "/experience", sectionId: "experience", icon: "fa-briefcase" },
        { name: "Contact", path: "/contact", sectionId: "contact", icon: "fa-envelope" },
    ];

    const socialLinks = [
        { icon: FaGithub, link: "https://github.com/Krunal-Chaudhari-0723", label: "GitHub", color: "#ffffff", bg: "hover:bg-gray-700" },
        { icon: FaLinkedin, link: "https://www.linkedin.com/in/krunal-chaudhari-2b9ab5354/", label: "LinkedIn", color: "#0A66C2", bg: "hover:bg-[#0A66C2]" },
        { icon: FaInstagram, link: "https://www.instagram.com/krunalchaudhari.dev", label: "Instagram", color: "#E4405F", bg: "hover:bg-[#E4405F]" },
    ];

    // Track scroll for navbar background
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section on scroll (only on Home page)
    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname !== "/") {
                setActiveSection(location.pathname);
                return;
            }

            const sections = [
                { id: "home", element: document.getElementById("home") },
                { id: "about", element: document.getElementById("about") },
                { id: "skills", element: document.getElementById("skills") },
                { id: "achievements", element: document.getElementById("achievements") },
                { id: "projects", element: document.getElementById("projects") },
                { id: "experience", element: document.getElementById("experience") },
                { id: "contact", element: document.getElementById("contact") },
            ];

            let currentSection = "home";
            let maxVisible = 0;

            sections.forEach(({ id, element }) => {
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

                    if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
                        const visiblePercent = visibleHeight / rect.height;
                        if (visiblePercent > maxVisible) {
                            maxVisible = visiblePercent;
                            currentSection = id;
                        }
                    }
                }
            });

            setActiveSection(currentSection);
        };

        setTimeout(handleScroll, 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // Scroll to top on route change
    useEffect(() => {
        if (location.pathname !== "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection(location.pathname);
        }
    }, [location.pathname]);

    const handleNavigation = (link) => {
        setMenuOpen(false);

        if (link.path === "/") {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("home");
            return;
        }

        if (location.pathname === "/") {
            const element = document.getElementById(link.sectionId);
            if (element) {
                const navbarHeight = 80;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - navbarHeight,
                    behavior: "smooth",
                });
                setActiveSection(link.sectionId);
                return;
            }
        }

        navigate(link.path);
        setActiveSection(link.path);
    };

    const isActive = (link) => {
        if (location.pathname !== "/") {
            return location.pathname === link.path;
        }
        return activeSection === link.sectionId;
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                        ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
                        : "bg-white/5 backdrop-blur-sm border-b border-white/10"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2 cursor-pointer"
                        onClick={() => {
                            navigate("/");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setActiveSection("home");
                            setMenuOpen(false);
                        }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                            <img
                                src={ProfileImage}
                                alt="Profile"
                                className="relative w-10 h-10 rounded-full object-cover border border-cyan-400/50"
                            />
                        </div>
                        <motion.h1
                            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent"
                            whileHover={{ x: 2 }}
                        >
                            Krunal.
                        </motion.h1>
                    </motion.button>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-1 items-center">
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={link.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <motion.button
                                    className={`relative px-4 py-2 font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${isActive(link)
                                            ? "text-cyan-400"
                                            : "text-white/80 hover:text-white"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavigation(link)}
                                >
                                    <i className={`fa-regular ${link.icon} text-sm`} />
                                    <span>{link.name}</span>

                                    {isActive(link) && (
                                        <motion.div
                                            layoutId="activeUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                                            transition={{ type: "spring", duration: 0.6 }}
                                        />
                                    )}

                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </motion.li>
                        ))}

                        {/* Social Icons - Larger & More Visible */}
                        <motion.li
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10"
                        >
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 group ${social.bg}`}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.label}
                                >
                                    <social.icon
                                        className="text-lg"
                                        style={{ color: social.color }}
                                    />
                                </motion.a>
                            ))}
                        </motion.li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-white text-2xl p-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {menuOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <FaTimes />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <FaBars />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[73px] left-0 right-0 z-40 md:hidden"
                    >
                        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
                            <motion.ul
                                className="flex flex-col py-4"
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                            >
                                {navLinks.map((link) => (
                                    <motion.li
                                        key={link.name}
                                        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.button
                                            className={`flex items-center gap-3 px-6 py-4 text-lg font-medium transition-all duration-300 w-full text-left cursor-pointer ${isActive(link)
                                                    ? "text-cyan-400 border-l-4 border-cyan-400 bg-gradient-to-r from-cyan-500/10 to-transparent"
                                                    : "text-white/80 hover:text-white hover:bg-white/5"
                                                }`}
                                            whileHover={{ x: 10 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleNavigation(link)}
                                        >
                                            <i className={`fa-regular ${link.icon} w-5`} />
                                            <span>{link.name}</span>
                                            {isActive(link) && (
                                                <motion.div layoutId="mobileActive" className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                            )}
                                        </motion.button>
                                    </motion.li>
                                ))}

                                {/* Social Icons in Mobile Menu - Larger */}
                                <motion.li
                                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pt-4 pb-6 border-t border-white/10 mt-2"
                                >
                                    <div className="flex items-center justify-center gap-6">
                                        {socialLinks.map((social, idx) => (
                                            <motion.a
                                                key={idx}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                                                whileHover={{ scale: 1.15, y: -3 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <social.icon
                                                    className="text-2xl"
                                                    style={{ color: social.color }}
                                                />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.li>
                            </motion.ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
