"use client";

import { useState } from "react";
import { Mail, Phone, Send, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: 'success', message: '' });
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const mailtoUrl = `mailto:kevinadiputra1704@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Hi Kevin,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            window.open(mailtoUrl, '_blank');
            setFormData({ name: "", email: "", subject: "", message: "" });
            showNotification('success', 'Thank you! Your message form has been opened in your email client.');
            setIsSubmitting(false);
        }, 500);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            content: "kevinadiputra1704@gmail.com",
            link: "mailto:kevinadiputra1704@gmail.com",
        },
        {
            icon: Phone,
            title: "Phone",
            content: "+62 859-3000-7017",
            link: "tel:+628593007017",
        },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/Kevinadiputra", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/", label: "LinkedIn" },
    ];

    return (
        <section id="contact" className="py-20 bg-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="h2 text-white mb-4">Get In Touch</h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"></div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Have a data science project or ML challenge? I'd love to hear from you.
                        Let's build something intelligent together!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="h3 text-white mb-8">Let's Connect</h3>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => {
                                    const IconComponent = info.icon;
                                    return (
                                        <div key={index} className="flex items-center space-x-4 group">
                                            <div className="w-12 h-12 bg-tertiary group-hover:bg-accent rounded-xl flex items-center justify-center transition-colors">
                                                <IconComponent size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold">{info.title}</h4>
                                                <a
                                                    href={info.link}
                                                    className="text-white/70 hover:text-accent transition-colors"
                                                >
                                                    {info.content}
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 bg-tertiary hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                            aria-label={social.label}
                                        >
                                            <IconComponent size={20} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Availability Status */}
                        <div className="bg-tertiary p-6 rounded-2xl border border-accent/20">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-white font-semibold">Available for Projects</span>
                            </div>
                            <p className="text-white/70 text-sm">
                                I'm currently available for ML consulting, data science projects,
                                and research collaborations. Let's discuss how we can work together!
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-secondary p-8 rounded-2xl">
                        <h3 className="h4 text-white mb-6">Send Me a Message</h3>

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

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-accent to-purple-700 hover:from-purple-700 hover:to-accent text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02] ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Notification Toast */}
                {notification.show && (
                    <div
                        className={`fixed bottom-8 right-8 z-50 p-4 rounded-xl shadow-2xl border max-w-md transition-all duration-300 ${notification.type === 'success'
                            ? 'bg-green-500/90 border-green-400/50 text-white'
                            : 'bg-red-500/90 border-red-400/50 text-white'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            </div>
                            <p className="text-sm font-medium flex-1">{notification.message}</p>
                            <button
                                onClick={() => setNotification({ show: false, type: 'success', message: '' })}
                                className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
