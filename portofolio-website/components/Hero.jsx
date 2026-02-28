"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";

const Hero = () => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPhrase, setCurrentPhrase] = useState(0);

    const { profile } = useProfile();

    const phrases = [
        "Machine Learning Engineer",
        "Data Scientist",
        "Deep Learning Researcher",
        "AI Engineer"
    ];

    useEffect(() => {
        const phrase = phrases[currentPhrase];

        if (currentIndex < phrase.length) {
            const timer = setTimeout(() => {
                setDisplayText(phrase.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setCurrentIndex(0);
                setDisplayText("");
                setCurrentPhrase((prev) => (prev + 1) % phrases.length);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, currentPhrase, phrases]);

    const scrollToAbout = () => {
        const aboutSection = document.querySelector("#about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235810ff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="space-y-8">
                    {/* Profile Image */}
                    <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent shadow-2xl">
                        {profile?.profilePicture && profile.profilePicture !== '/api/placeholder/400/400' ? (
                            <img
                                src={profile.profilePicture}
                                alt={profile?.name || 'Profile'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent to-purple-700 flex items-center justify-center text-4xl md:text-5xl font-bold text-white">
                                {profile?.name?.split(' ').map(n => n.charAt(0)).join('') || 'KA'}
                            </div>
                        )}
                    </div>

                    {/* Name and Title */}
                    <div className="space-y-4">
                        <h1 className="h1 text-white">
                            Hi, I'm{" "}
                            <span className="text-accent">
                                {profile?.name || 'Kevin Adiputra'}
                            </span>
                        </h1>

                        <div className="h-16 flex items-center justify-center">
                            <h2 className="h3 text-white/80">
                                I'm a{" "}
                                <span className="text-accent font-bold">
                                    {displayText}
                                    <span className="animate-pulse">|</span>
                                </span>
                            </h2>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Turning data into insights and building intelligent systems with
                        machine learning, deep learning, and statistical analysis.
                    </p>

                    {/* Social Links and CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/Kevinadiputra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={`mailto:${profile?.email || 'kevinadiputra1704@gmail.com'}`}
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Mail size={20} />
                            </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-gradient-to-r from-accent to-purple-700 hover:from-purple-700 hover:to-accent text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105">
                                <Download size={18} />
                                Download CV
                            </button>
                            <button
                                onClick={scrollToAbout}
                                className="bg-tertiary hover:bg-accent text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={scrollToAbout}
                        className="text-white/50 hover:text-accent transition-colors animate-bounce"
                    >
                        <ChevronDown size={32} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
