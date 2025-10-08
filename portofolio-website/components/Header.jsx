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
        { name: "Home", href: "/", type: "route", openInNewTab: false },
        { name: "About", href: "#about", type: "section", openInNewTab: false },
        { name: "Skills", href: "#skills", type: "section", openInNewTab: false },
        { name: "Projects", href: "/projects", type: "route", openInNewTab: false },
        { name: "Certificates", href: "/certificates", type: "route", openInNewTab: false },
        { name: "Contact", href: "#contact", type: "section", openInNewTab: false },
    ];

    const handleNavigation = (item, forceNewTab = false) => {
        // Check if should open in new tab (Ctrl+Click or middle click or explicit flag)
        const shouldOpenInNewTab = forceNewTab || item.openInNewTab;

        if (item.type === "route") {
            if (shouldOpenInNewTab) {
                window.open(item.href, '_blank', 'noopener,noreferrer');
            } else {
                if (item.href === "/" && pathname !== "/") {
                    router.push("/");
                } else if (item.href !== "/" && pathname !== item.href) {
                    router.push(item.href);
                } else if (item.href === "/" && pathname === "/") {
                    // If already on home page, scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }
        } else if (item.type === "section") {
            if (shouldOpenInNewTab) {
                window.open(`/${item.href}`, '_blank', 'noopener,noreferrer');
            } else {
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
                        className="text-xl font-bold hover:scale-105 transition-transform spark-on-click"
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
                                    onClick={(e) => handleNavigation(item, e.ctrlKey || e.metaKey)}
                                    onAuxClick={(e) => e.button === 1 && handleNavigation(item, true)}
                                    className={`font-medium transition-colors duration-200 spark-on-click ${isActive
                                        ? "text-accent"
                                        : "text-white hover:text-accent"
                                        }`}
                                    title={`${item.name} (Ctrl+Click to open in new tab)`}
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
                                        onClick={(e) => handleNavigation(item, e.ctrlKey || e.metaKey)}
                                        onAuxClick={(e) => e.button === 1 && handleNavigation(item, true)}
                                        className={`font-medium transition-colors duration-200 text-left ${isActive
                                            ? "text-accent"
                                            : "text-white hover:text-accent"
                                            }`}
                                    >
                                        {item.name}
                                        <span className="text-xs text-white/50 block">
                                            {item.type === "route" ? "Ctrl+Click for new tab" : ""}
                                        </span>
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