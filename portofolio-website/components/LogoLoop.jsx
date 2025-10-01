import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import {
    Award,
    Star,
    Shield,
    Target,
    Trophy,
    CheckCircle2,
    Sparkles,
    Crown,
    Zap,
    Gem
} from 'lucide-react';

const LogoLoop = ({
    logos = [],
    certificates = [],
    speed = 1.5,
    direction = 'left',
    pauseOnHover = true,
    spacing = 80,
    className = '',
    logoClassName = 'w-16 h-16 object-contain group-hover:scale-110 transition-all duration-300',
    showCertificateLogos = false
}) => {
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef(null);

    // Generate certificate-based logos
    const getCertificateLogos = () => {
        if (!certificates || certificates.length === 0) return [];

        return certificates.map((cert, index) => ({
            id: cert.id,
            name: cert.title,
            issuer: cert.issuer,
            platform: cert.platform,
            level: cert.level,
            featured: cert.featured,
            badge: cert.badge,
            skills: cert.skills,
            component: (
                <motion.div
                    key={cert.id}
                    className="group relative"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="relative w-20 h-20 bg-gradient-to-br from-accent/20 via-accent-hover/30 to-accent/20 rounded-2xl border border-accent/30 flex flex-col items-center justify-center p-2 backdrop-blur-sm group-hover:border-accent/50 transition-all duration-300">
                        {/* Certificate Badge/Logo */}
                        {cert.badge && cert.badge !== '/api/placeholder/400/300' ? (
                            <img
                                src={cert.badge}
                                alt={cert.title}
                                className="w-8 h-8 object-contain mb-1"
                            />
                        ) : (
                            <div className="w-8 h-8 mb-1 flex items-center justify-center">
                                {cert.featured ? (
                                    <Crown className="w-6 h-6 text-yellow-400" />
                                ) : cert.level === 'expert' ? (
                                    <Trophy className="w-6 h-6 text-red-400" />
                                ) : cert.level === 'professional' ? (
                                    <Gem className="w-6 h-6 text-purple-400" />
                                ) : cert.level === 'advanced' ? (
                                    <Zap className="w-6 h-6 text-orange-400" />
                                ) : cert.level === 'intermediate' ? (
                                    <Target className="w-6 h-6 text-blue-400" />
                                ) : (
                                    <Shield className="w-6 h-6 text-green-400" />
                                )}
                            </div>
                        )}

                        {/* Certificate Info */}
                        <div className="text-center">
                            <div className="text-xs font-semibold text-white truncate w-full">
                                {cert.issuer}
                            </div>
                            <div className="text-[10px] text-accent font-medium">
                                {cert.level}
                            </div>
                        </div>

                        {/* Featured Star */}
                        {cert.featured && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Star className="w-2.5 h-2.5 text-yellow-900 fill-current" />
                            </div>
                        )}

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-tertiary border border-accent/30 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                        <div className="font-semibold">{cert.title}</div>
                        <div className="text-accent text-[10px]">{cert.platform}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-tertiary border-r border-b border-accent/30 rotate-45" />
                    </div>
                </motion.div>
            )
        }));
    };

    // Default skill logos if no certificates
    const defaultLogos = [
        {
            name: 'JavaScript',
            component: (
                <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center border border-yellow-400/30">
                    <span className="text-yellow-400 font-bold text-sm">JS</span>
                </div>
            )
        },
        {
            name: 'React',
            component: (
                <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center border border-blue-400/30">
                    <span className="text-blue-400 font-bold text-sm">React</span>
                </div>
            )
        },
        {
            name: 'Python',
            component: (
                <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center border border-green-400/30">
                    <span className="text-green-400 font-bold text-sm">Py</span>
                </div>
            )
        },
        {
            name: 'AWS',
            component: (
                <div className="w-16 h-16 bg-orange-400/20 rounded-2xl flex items-center justify-center border border-orange-400/30">
                    <span className="text-orange-400 font-bold text-sm">AWS</span>
                </div>
            )
        },
        {
            name: 'Docker',
            component: (
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-500 font-bold text-sm">Docker</span>
                </div>
            )
        },
    ];

    const displayLogos = showCertificateLogos && certificates?.length > 0
        ? getCertificateLogos()
        : logos.length > 0
            ? logos
            : defaultLogos;

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const logoElements = container.children;

        if (logoElements.length === 0) return;

        // Calculate total width
        const logoWidth = logoElements[0].offsetWidth;
        const totalWidth = logoWidth * logoElements.length + spacing * (logoElements.length - 1);

        // Set up infinite loop animation
        const setupAnimation = () => {
            gsap.set(logoElements, {
                x: (i) => i * (logoWidth + spacing)
            });

            const tl = gsap.timeline({ repeat: -1, ease: 'none' });

            if (direction === 'left') {
                tl.to(logoElements, {
                    x: (i) => i * (logoWidth + spacing) - totalWidth - spacing,
                    duration: totalWidth / (50 * speed), // Adjust speed based on total width
                    ease: 'none',
                    modifiers: {
                        x: (x) => {
                            const numericX = parseFloat(x);
                            if (numericX <= -logoWidth - spacing) {
                                return (displayLogos.length - 1) * (logoWidth + spacing) + 'px';
                            }
                            return x;
                        }
                    }
                });
            } else {
                tl.to(logoElements, {
                    x: (i) => i * (logoWidth + spacing) + totalWidth + spacing,
                    duration: totalWidth / (50 * speed),
                    ease: 'none',
                    modifiers: {
                        x: (x) => {
                            const numericX = parseFloat(x);
                            if (numericX >= container.offsetWidth) {
                                return -(logoWidth + spacing) + 'px';
                            }
                            return x;
                        }
                    }
                });
            }

            return tl;
        };

        animationRef.current = setupAnimation();

        if (pauseOnHover) {
            const handleMouseEnter = () => {
                setIsPaused(true);
                animationRef.current?.pause();
            };

            const handleMouseLeave = () => {
                setIsPaused(false);
                animationRef.current?.resume();
            };

            container.addEventListener('mouseenter', handleMouseEnter);
            container.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
                animationRef.current?.kill();
            };
        }

        return () => {
            animationRef.current?.kill();
        };
    }, [displayLogos, speed, direction, pauseOnHover, spacing]);

    return (
        <div className={`overflow-hidden relative ${className}`}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />

            <div
                ref={containerRef}
                className="flex items-center h-full relative z-10"
                style={{ width: '200%' }}
            >
                {/* Render logos twice for seamless loop */}
                {[...displayLogos, ...displayLogos].map((logo, index) => (
                    <div
                        key={`${logo.name || logo.id}-${index}`}
                        className="flex-shrink-0 flex items-center justify-center spark-on-click"
                        style={{ marginRight: `${spacing}px` }}
                    >
                        {logo.component ? (
                            logo.component
                        ) : logo.src ? (
                            <motion.div
                                className="group relative"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt || logo.name}
                                    className={`${logoClassName} filter drop-shadow-lg group-hover:drop-shadow-2xl`}
                                    title={logo.name}
                                />
                                <div className="absolute inset-0 bg-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </motion.div>
                        ) : (
                            <motion.div
                                className="group relative"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-2xl flex items-center justify-center text-accent font-semibold text-sm border border-accent/30 group-hover:border-accent/50 transition-all duration-300 backdrop-blur-sm`}
                                    title={logo.name}
                                >
                                    {logo.name?.charAt(0) || '?'}
                                </div>
                                <div className="absolute inset-0 bg-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            {/* Enhanced Gradient overlays */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-primary via-primary/80 to-transparent pointer-events-none z-20" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary via-primary/80 to-transparent pointer-events-none z-20" />

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border border-accent/20 pointer-events-none" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-accent/30 rounded-full"
                        animate={{
                            x: [0, Math.random() * 400],
                            y: [Math.random() * 100, Math.random() * 100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default LogoLoop;