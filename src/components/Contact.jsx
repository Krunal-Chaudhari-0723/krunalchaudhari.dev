// Contact.jsx - With Enhanced Background Animations
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaEnvelope,
    FaPhone,
    FaFacebook,
    FaMedium,
} from "react-icons/fa";

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

function Contact() {
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
        const phoneRegex = /^[0-9\s\+\-\(\)]{7,}$/;
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

    return (
        <>
            <style>{styles}</style>

            <section id="contact" className="relative bg-[#0a0a1a] text-white py-28 px-6 overflow-hidden">
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

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent"
                    >
                        Contact Me
                    <div className="w-50 mt-2 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full"></div>
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Left Side - Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col h-full hover:border-cyan-500/30 transition-all duration-300"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-white">
                                Let's Connect
                            </h3>

                            <p className="text-slate-400 mb-6 leading-relaxed">
                                I'm available for freelance projects, internships, and collaboration opportunities.
                                Let's build something amazing together! Feel free to reach out anytime.
                            </p>

                            <div className="space-y-5 flex-1">
                                <motion.div
                                    className="flex items-center gap-4 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition">
                                        <FaEnvelope className="text-cyan-400 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs">Email</p>
                                        <span className="text-white text-sm group-hover:text-cyan-400 transition">
                                            chaudharikrunal0223@gmail.com
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-4 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition">
                                        <FaPhone className="text-cyan-400 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs">Phone</p>
                                        <span className="text-white text-sm group-hover:text-cyan-400 transition">
                                            +91 63519 24667
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Social Links at Bottom */}
                            <div className="mt-auto pt-8 border-t border-white/10">
                                <p className="text-slate-400 text-sm mb-4">Connect on Social Media</p>
                                <div className="flex gap-4 flex-wrap">
                                    {[
                                        { icon: FaLinkedin, link: "https://www.linkedin.com/in/krunal-chaudhari-2b9ab5354/" },
                                        { icon: FaGithub, link: "https://github.com/Krunal-Chaudhari-0723" },
                                        { icon: FaInstagram, link: "https://www.instagram.com/krunalchaudhari.dev" },
                                        { icon: FaFacebook, link: "https://www.facebook.com/krunalchaudhari.dev" },
                                        { icon: FaMedium, link: "https://medium.com/@chaudharikrunal0223" },
                                    ].map((social, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -5, scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                                        >
                                            <social.icon />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Contact Form */}
                        <motion.form
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            onSubmit={handleSubmit}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-4 hover:border-cyan-500/30 transition-all duration-300"
                            noValidate
                        >
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                Send a Message
                            </h3>

                            {/* Success Message */}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-sm text-center"
                                >
                                    ✅ Message sent successfully! I'll get back to you soon.
                                </motion.div>
                            )}

                            {/* Submit Error */}
                            {errors.submit && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm text-center"
                                >
                                    ❌ {errors.submit}
                                </motion.div>
                            )}

                            {/* Name Field */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-900/80 border ${errors.name ? 'border-red-500' : 'border-slate-700'} p-4 rounded-xl outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition`}
                                />
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1 ml-2"
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email *"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-900/80 border ${errors.email ? 'border-red-500' : 'border-slate-700'} p-4 rounded-xl outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition`}
                                />
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1 ml-2"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number *"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-900/80 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} p-4 rounded-xl outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition`}
                                />
                                {errors.phone && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1 ml-2"
                                    >
                                        {errors.phone}
                                    </motion.p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div>
                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="Your Message *"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-900/80 border ${errors.message ? 'border-red-500' : 'border-slate-700'} p-4 rounded-xl outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition resize-none`}
                                />
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1 ml-2"
                                    >
                                        {errors.message}
                                    </motion.p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : 'Send Message'}
                            </motion.button>

                            <p className="text-slate-500 text-xs text-center pt-2">
                                I'll respond within 24-48 hours
                            </p>
                        </motion.form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;