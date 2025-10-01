"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Download, Github, Linkedin, Mail, Instagram, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import ProfilePictureManager from "@/components/ProfilePictureManager";

const Hero = () => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [isProfileManagerOpen, setIsProfileManagerOpen] = useState(false);

    const { profile, updateProfilePicture } = useProfile();
    const { isAuthenticated } = useAuth();

    const phrases = [
        "Full Stack Developer",
        "Web Developer",
        "Frontend Specialist",
        "Backend Engineer"
    ];

    useEffect(() => {
        const phrase = phrases[currentPhrase];

        if (currentIndex < phrase.length) {
            const timer = setTimeout(() => {
                setDisplayText(phrase.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 150);
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
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235810ff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Profile Image */}
                    <motion.div
                        className="relative mx-auto w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent shadow-2xl group cursor-pointer"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            boxShadow: "0 0 30px rgba(88, 16, 255, 0.6)"
                        }}
                        onClick={() => isAuthenticated && setIsProfileManagerOpen(true)}
                    >
                        {profile?.profilePicture && profile.profilePicture !== '/api/placeholder/400/400' ? (
                            <img
                                src={profile.profilePicture}
                                alt={profile?.name || 'Profile'}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <motion.div
                                className="w-full h-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-4xl md:text-5xl font-bold text-white"
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, #5810ff, #7c3aed)",
                                        "linear-gradient(45deg, #7c3aed, #a855f7)",
                                        "linear-gradient(45deg, #a855f7, #5810ff)"
                                    ]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                <motion.span
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotateY: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    {profile?.name?.split(' ').map(n => n.charAt(0)).join('') || 'KA'}
                                </motion.span>
                            </motion.div>
                        )}

                        {/* Camera overlay for admin */}
                        {isAuthenticated && (
                            <motion.div
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Camera className="text-white" size={24} />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Name and Title */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.h1
                            className="h1 text-white"
                            whileHover={{
                                scale: 1.02,
                                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                Hi, I'm{" "}
                            </motion.span>
                            <motion.span
                                className="text-accent"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                whileHover={{
                                    scale: 1.05,
                                    textShadow: "0 0 25px rgba(88, 16, 255, 1)"
                                }}
                            >
                                {profile?.name || 'Kevin Adiputra'}
                            </motion.span>
                        </motion.h1>

                        <motion.div
                            className="h-16 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                        >
                            <h2 className="h3 text-white/80">
                                I'm a{" "}
                                <motion.span
                                    className="text-accent font-bold"
                                    animate={{
                                        textShadow: [
                                            "0 0 0px rgba(88, 16, 255, 0)",
                                            "0 0 10px rgba(88, 16, 255, 0.8)",
                                            "0 0 0px rgba(88, 16, 255, 0)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                >
                                    {displayText}
                                    <motion.span
                                        className="animate-pulse"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity
                                        }}
                                    >
                                        |
                                    </motion.span>
                                </motion.span>
                            </h2>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        whileHover={{
                            scale: 1.02,
                            color: "rgba(255, 255, 255, 0.9)"
                        }}
                    >
                        Passionate about creating innovative web solutions with modern technologies.
                        I bring ideas to life through clean code and exceptional user experiences.
                    </motion.p>

                    {/* Social Links and CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/Kevinadiputra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/kevin-adiputra-mahesa-8339911b3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/kevinadiputra66/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="mailto:kevinadiputra66@gmail.com"
                                className="w-12 h-12 bg-tertiary hover:bg-accent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                            >
                                <Mail size={20} />
                            </a>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.7 }}
                        >
                            <motion.button
                                className="bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-all duration-300"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 30px rgba(88, 16, 255, 0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    whileHover={{
                                        y: [0, -5, 0],
                                        rotate: [0, 15, -15, 0]
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Download size={18} />
                                </motion.div>
                                Download CV
                            </motion.button>

                            <motion.button
                                onClick={scrollToAbout}
                                className="bg-tertiary hover:bg-tertiary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#5810ff",
                                    boxShadow: "0 10px 30px rgba(88, 16, 255, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                >
                    <motion.button
                        onClick={scrollToAbout}
                        className="text-white/50 hover:text-accent transition-colors"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        whileHover={{
                            scale: 1.2,
                            color: "#5810ff"
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronDown size={32} />
                    </motion.button>
                </motion.div>
            </div>

            {/* Profile Picture Manager Modal */}
            <ProfilePictureManager
                isOpen={isProfileManagerOpen}
                onClose={() => setIsProfileManagerOpen(false)}
                currentImage={profile?.profilePicture}
                onSave={updateProfilePicture}
            />
        </section>
    );
};

export default Hero;