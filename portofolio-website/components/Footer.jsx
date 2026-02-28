"use client";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-secondary border-t border-tertiary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 grid md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="text-2xl font-bold">
                            <span className="text-accent">Kevin</span> Adiputra
                        </div>
                        <p className="text-white/70 leading-relaxed">
                            Machine Learning Engineer & Data Scientist passionate about building
                            intelligent solutions and turning data into actionable insights.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/Kevinadiputra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-accent transition-colors"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-accent transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="mailto:kevinadiputra1704@gmail.com"
                                className="text-white/70 hover:text-accent transition-colors"
                            >
                                Email
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                        <div className="space-y-2">
                            {quickLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="block text-white/70 hover:text-accent transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold text-lg">Get In Touch</h3>
                        <div className="space-y-2 text-white/70">
                            <p>📧 kevinadiputra1704@gmail.com</p>
                            <p>📱 +62 859-3000-7017</p>
                            <p>📍 Indonesia</p>
                        </div>
                        <div className="pt-4">
                            <button
                                onClick={() => scrollToSection("#contact")}
                                className="btn btn-sm btn-accent"
                            >
                                Let's Work Together
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="py-6 border-t border-tertiary flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-white/50 text-sm">
                        © {currentYear} Kevin Adiputra. All rights reserved.
                    </p>

                    <div className="flex items-center space-x-6">
                        <span className="text-white/50 text-sm">Built with Next.js</span>
                        <button
                            onClick={scrollToTop}
                            className="text-white/50 hover:text-accent transition-colors text-sm"
                        >
                            Back to Top ↑
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
