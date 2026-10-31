// Navbar.jsx - Floating pill navigation, keeps the URL in sync with the section in view
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import ProfileImage from "../assets/new_profile.png";
import myCv from "../assets/Krunal-Full Stack.pdf";

// Order matches the section order on the page (used for active-section tracking)
const navLinks = [
    { name: "About", path: "/about", sectionId: "about" },
    { name: "Projects", path: "/projects", sectionId: "projects" },
    { name: "Experience", path: "/experience", sectionId: "experience" },
    { name: "Skills", path: "/skills", sectionId: "skills" },
    { name: "Achievements", path: "/achievements", sectionId: "achievements" },
    { name: "Contact", path: "/contact", sectionId: "contact" },
];

const pathFor = (sectionId) => navLinks.find((link) => link.sectionId === sectionId)?.path ?? "/";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    // URL syncing stays off until the initial deep-link scroll has happened
    const syncUrl = useRef(false);

    // On first load, jump to the section named in the URL (also upgrades old /#/contact links)
    useEffect(() => {
        if (window.location.hash.startsWith("#/")) {
            window.history.replaceState(null, "", window.location.hash.slice(1) || "/");
        }

        const link = navLinks.find((l) => l.path === window.location.pathname.replace(/\/+$/, ""));
        if (!link && window.location.pathname !== "/") window.history.replaceState(null, "", "/");

        const timer = setTimeout(() => {
            if (link) document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "auto" });
            syncUrl.current = true;
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Track scroll for navbar background, the active section and the URL
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            let current = "home";
            for (const { sectionId } of navLinks) {
                const element = document.getElementById(sectionId);
                if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.4) {
                    current = sectionId;
                }
            }
            setActiveSection(current);

            const path = pathFor(current);
            if (syncUrl.current && window.location.pathname !== path) {
                window.history.replaceState(null, "", path);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (link) => {
        setMenuOpen(false);
        document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "smooth" });
    };

    const goHome = () => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isActive = (link) => activeSection === link.sectionId;

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
            <nav
                className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-300 ${scrolled || menuOpen
                    ? "border-white/10 bg-zinc-950/80 shadow-lg shadow-black/40 backdrop-blur-xl"
                    : "border-transparent bg-transparent"
                    }`}
            >
                {/* Logo */}
                <button onClick={goHome} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1">
                    <img
                        src={ProfileImage}
                        alt="Krunal Chaudhari"
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-white/15"
                    />
                    <span className="font-mono text-sm font-medium text-zinc-100">
                        krunalchaudhari<span className="text-gradient">.dev</span>
                    </span>
                </button>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-0.5 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => handleNavigation(link)}
                                className={`relative cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors ${isActive(link) ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100"
                                    }`}
                            >
                                {isActive(link) && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/[0.1] to-white/[0.04] ring-1 ring-inset ring-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative">{link.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <a
                        href={myCv}
                        download="Krunal_Chaudhari_Resume.pdf"
                        className="hidden items-center gap-1.5 btn-primary rounded-lg px-3.5 py-1.5 text-sm font-medium sm:inline-flex"
                    >
                        <FiDownload className="text-xs" />
                        Resume
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="cursor-pointer rounded-lg p-2 text-lg text-zinc-300 hover:bg-white/5 md:hidden"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavigation(link)}
                                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left text-sm ${isActive(link) ? "bg-white/[0.06] text-zinc-50" : "text-zinc-400"
                                    }`}
                            >
                                {link.name}
                                {isActive(link) && <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />}
                            </button>
                        ))}
                        <a
                            href={myCv}
                            download="Krunal_Chaudhari_Resume.pdf"
                            className="mt-2 flex items-center justify-center gap-2 btn-primary rounded-xl px-4 py-3 text-sm font-medium"
                        >
                            <FiDownload />
                            Download Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
