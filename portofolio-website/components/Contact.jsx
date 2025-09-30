"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react";
import LocationMap from "./LocationMap";
import { motion } from "framer-motion";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would typically send the form data to your backend
        console.log("Form submitted:", formData);

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);

        // Show success message (you could use a toast library here)
        alert("Thank you! Your message has been sent successfully.");
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            content: "kevinadiputra66@gmail.com",
            link: "mailto:kevinadiputra66@gmail.com",
        },
        {
            icon: Phone,
            title: "Phone",
            content: "+62 821 8185 7340",
            link: "tel:+6282181857340",
        },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/Kevinadiputra", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/", label: "LinkedIn" },
        { icon: Instagram, href: "https://www.instagram.com/kevinadiputra66/", label: "Instagram" },
    ];

    return (
        <section id="contact" className="py-20 bg-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.h2 
                        className="h2 text-white mb-4"
                        whileHover={{ 
                            scale: 1.05,
                            textShadow: "0 0 20px rgba(88, 16, 255, 0.8)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        Get In Touch
                    </motion.h2>
                    <motion.div 
                        className="w-24 h-1 bg-gradient-to-r from-accent to-accent-hover mx-auto rounded-full mb-6"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 96, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    />
                    <motion.p 
                        className="text-white/70 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                        Let's create something amazing together!
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Information */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <motion.h3 
                                className="h3 text-white mb-8"
                                whileHover={{ 
                                    scale: 1.02,
                                    color: "#5810ff"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                Let's Connect
                            </motion.h3>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => {
                                    const IconComponent = info.icon;
                                    return (
                                        <motion.div 
                                            key={index} 
                                            className="flex items-center space-x-4 group"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ 
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <motion.div 
                                                className="w-12 h-12 bg-tertiary group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors relative overflow-hidden"
                                                whileHover={{ 
                                                    boxShadow: "0 0 20px rgba(88, 16, 255, 0.4)",
                                                    rotate: [0, -5, 5, 0]
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <IconComponent size={20} className="text-white" />
                                                <motion.div
                                                    className="absolute inset-0 bg-accent/20 rounded-xl"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </motion.div>
                                            <div>
                                                <h4 className="text-white font-semibold">{info.title}</h4>
                                                <motion.a
                                                    href={info.link}
                                                    className="text-white/70 hover:text-accent transition-colors"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {info.content}
                                                </motion.a>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* Location with Google Maps */}
                                <LocationMap />
                            </div>
                        </div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                            <motion.div 
                                className="flex space-x-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-tertiary hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300"
                                            aria-label={social.label}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ 
                                                duration: 0.4, 
                                                delay: index * 0.1,
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{ 
                                                scale: 1.15,
                                                rotate: [0, -10, 10, 0],
                                                boxShadow: "0 0 25px rgba(88, 16, 255, 0.6)"
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <motion.div
                                                whileHover={{ 
                                                    rotate: [0, 15, -15, 0],
                                                    scale: [1, 1.1, 1]
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <IconComponent size={20} />
                                            </motion.div>
                                        </motion.a>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        {/* Availability Status */}
                        <motion.div 
                            className="bg-gradient-to-br from-tertiary to-secondary p-6 rounded-2xl border border-accent/20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 10px 30px rgba(88, 16, 255, 0.2)"
                            }}
                        >
                            <motion.div 
                                className="flex items-center space-x-3 mb-3"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <motion.div 
                                    className="w-3 h-3 bg-green-500 rounded-full"
                                    animate={{ 
                                        scale: [1, 1.3, 1],
                                        boxShadow: [
                                            "0 0 0px rgba(34, 197, 94, 0)",
                                            "0 0 15px rgba(34, 197, 94, 0.8)",
                                            "0 0 0px rgba(34, 197, 94, 0)"
                                        ]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                />
                                <motion.span 
                                    className="text-white font-semibold"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Available for Projects
                                </motion.span>
                            </motion.div>
                            <motion.p 
                                className="text-white/70 text-sm"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                I'm currently available for freelance work and new opportunities.
                                Let's discuss how we can work together!
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        className="bg-secondary p-8 rounded-2xl"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <motion.h3 
                            className="h4 text-white mb-6"
                            whileHover={{ 
                                scale: 1.02,
                                color: "#5810ff"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Send Me a Message
                        </motion.h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-tertiary border border-tertiary-hover rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-tertiary border border-tertiary-hover rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-white/70 text-sm font-medium mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-tertiary border border-tertiary-hover rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-tertiary border border-tertiary-hover rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Tell me about your project or idea..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 10px 30px rgba(88, 16, 255, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div 
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ 
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <motion.div
                                            whileHover={{ 
                                                rotate: [0, -10, 10, 0],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <Send size={18} />
                                        </motion.div>
                                        <span>Send Message</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;