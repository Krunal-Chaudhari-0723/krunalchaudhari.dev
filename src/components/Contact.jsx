// Contact.jsx - Contact details and EmailJS form
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiCopy, FiCheck, FiArrowUpRight, FiSend } from "react-icons/fi";
import { Section, SectionHeader, Reveal } from "./ui";
import { EMAIL, PHONE, socials } from "../lib/site";

const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
    { name: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210", autoComplete: "tel" },
];

const inputClass = (hasError) =>
    `w-full rounded-xl border bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-brand-400/60 focus:ring-2 focus:ring-brand-400/20 ${hasError ? "border-red-500/60" : "border-white/10"
    }`;

function Contact() {
    useEffect(() => {
        // Initialize EmailJS with your public key from environment
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [copied, setCopied] = useState(false);

    // Validation Function
    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^[0-9\s+\-()]{7,}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone.trim())) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        } else if (formData.message.trim().length > 1000) {
            newErrors.message = 'Message must be less than 1000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            // Send email using EmailJS
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    from_phone: formData.phone,
                    message: formData.message,
                    to_email: import.meta.env.VITE_OWNER_EMAIL
                }
            );

            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setErrors({});

            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Email Error:', error);
            setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <Section id="contact" glow="center">
            <SectionHeader
                index="06"
                eyebrow="Contact"
                title="Let's build something together."
                description="Open to freelance projects, full-time roles and collaborations. I usually reply within 24–48 hours."
            />

            <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
                {/* Contact details */}
                <Reveal className="space-y-6">
                    <div className="card rounded-2xl p-2">
                        <div className="flex items-center gap-3 rounded-xl p-3">
                            <FiMail className="shrink-0 text-zinc-500" />
                            <a href={`mailto:${EMAIL}`} className="min-w-0 flex-1 truncate text-sm text-zinc-200 hover:text-brand-300">
                                {EMAIL}
                            </a>
                            <button
                                onClick={copyEmail}
                                aria-label="Copy email address"
                                className="shrink-0 cursor-pointer rounded-lg border border-white/10 p-2 text-zinc-400 transition-colors hover:text-zinc-100"
                            >
                                {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                            </button>
                        </div>
                        <div className="mx-3 border-t border-white/5" />
                        <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl p-3 text-sm text-zinc-200 hover:text-brand-300">
                            <FiPhone className="shrink-0 text-zinc-500" />
                            {PHONE}
                        </a>
                    </div>

                    <ul className="divide-y divide-white/5 border-y border-white/5">
                        {socials.map(({ label, icon: Icon, link }) => (
                            <li key={label}>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 py-3 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                                >
                                    <Icon className="text-base" />
                                    {label}
                                    <FiArrowUpRight className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </Reveal>

                {/* Form */}
                <Reveal delay={0.08}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 card rounded-2xl p-5 md:p-6"
                        noValidate
                    >
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-300"
                                role="status"
                            >
                                Message sent! I'll get back to you soon.
                            </motion.div>
                        )}

                        {errors.submit && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-300"
                                role="alert"
                            >
                                {errors.submit}
                            </motion.div>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name} className={field.name === "phone" ? "sm:col-span-2" : ""}>
                                    <label htmlFor={field.name} className="mb-1.5 block text-xs font-medium text-zinc-400">
                                        {field.label}
                                    </label>
                                    <input
                                        id={field.name}
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autoComplete}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        aria-invalid={!!errors[field.name]}
                                        className={inputClass(errors[field.name])}
                                    />
                                    {errors[field.name] && <p className="mt-1 text-xs text-red-400">{errors[field.name]}</p>}
                                </div>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-zinc-400">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="5"
                                name="message"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                aria-invalid={!!errors.message}
                                className={`${inputClass(errors.message)} resize-none`}
                            />
                            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 btn-primary rounded-xl px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send message <FiSend />
                                </>
                            )}
                        </button>
                    </form>
                </Reveal>
            </div>
        </Section>
    );
}

export default Contact;
