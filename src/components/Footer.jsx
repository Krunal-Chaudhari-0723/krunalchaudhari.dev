import { FiArrowUp } from "react-icons/fi";
import { socials } from "../lib/site";

function Footer() {
    return (
        <footer className="border-t border-white/5 px-5 py-10 sm:px-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-mono text-sm text-zinc-300">
                        krunalchaudhari<span className="text-gradient">.dev</span>
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                        © {new Date().getFullYear()} Krunal Janardan Chaudhari. Built with React &amp; Tailwind CSS.
                    </p>
                </div>

                <div className="flex items-center gap-1">
                    {socials.map(({ label, icon: Icon, link }) => (
                        <a
                            key={label}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-100"
                        >
                            <Icon />
                        </a>
                    ))}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Back to top"
                        className="ml-2 cursor-pointer rounded-lg border border-white/10 p-2 text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                        <FiArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
