"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => {
                            const isActive = (item.type === "route" && pathname === item.href) ||
                                           (item.type === "section" && pathname === "/" && item.href !== "#");
                            
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item)}
                                    className={`font-medium transition-colors duration-200 ${
                                        isActive 
                                            ? "text-accent" 
                                            : "text-white hover:text-accent"
                                    }`}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
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
                                        className={`font-medium transition-colors duration-200 text-left ${
                                            isActive 
                                                ? "text-accent" 
                                                : "text-white hover:text-accent"
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;