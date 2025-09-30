"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/", type: "route" },
        { name: "About", href: "#about", type: "section" },
        { name: "Skills", href: "#skills", type: "section" },
        { name: "Projects", href: "/projects", type: "route" },
        { name: "Contact", href: "#contact", type: "section" },
    ];

    const handleNavigation = (item) => {
        if (item.type === "route") {
            if (item.href === "/" && pathname !== "/") {
                router.push("/");
            } else if (item.href !== "/" && pathname !== item.href) {
                router.push(item.href);
            } else if (item.href === "/" && pathname === "/") {
                // If already on home page, scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else if (item.type === "section") {
            if (pathname !== "/") {
                // If not on home page, go to home page first then scroll
                router.push(`/${item.href}`);
            } else {
                // If on home page, scroll to section
                const element = document.querySelector(item.href);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
        setIsOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <button
                        onClick={() => router.push("/")}
                        className="text-xl font-bold hover:scale-105 transition-transform"
                    >
                        <span className="text-accent">Kevin</span> Adiputra
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = (item.type === "route" && pathname === item.href) ||
                                (item.type === "section" && pathname === "/" && item.href !== "#");

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item)}
                                    className={`font-medium transition-colors duration-200 ${isActive
                                            ? "text-accent"
                                            : "text-white hover:text-accent"
                                        }`}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                        
                        {/* Auth Button */}
                        <div className="flex items-center">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full text-sm">
                                        <Shield size={14} className="text-accent" />
                                        <span className="text-white">Admin</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLoginModal(true)}
                                    className="text-white/70 hover:text-accent transition-colors p-2 hover:bg-white/10 rounded-lg"
                                    title="Admin Login"
                                >
                                    <LogIn size={18} />
                                </button>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-accent transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-secondary">
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => {
                                const isActive = (item.type === "route" && pathname === item.href) ||
                                    (item.type === "section" && pathname === "/" && item.href !== "#");

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item)}
                                        className={`font-medium transition-colors duration-200 text-left ${isActive
                                                ? "text-accent"
                                                : "text-white hover:text-accent"
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                            
                            {/* Mobile Auth */}
                            <div className="border-t border-secondary pt-4 mt-4">
                                {isAuthenticated ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Shield size={14} className="text-accent" />
                                            <span className="text-white">Admin Mode</span>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="text-white/70 hover:text-accent transition-colors"
                                        >
                                            <LogOut size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setShowLoginModal(true);
                                            setIsOpen(false);
                                        }}
                                        className="text-white/70 hover:text-accent transition-colors flex items-center gap-2"
                                    >
                                        <LogIn size={18} />
                                        Admin Login
                                    </button>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
            
            {/* Login Modal */}
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
            />
        </header>
    );
};

export default Header;