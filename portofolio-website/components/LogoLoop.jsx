import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const LogoLoop = ({
    logos = [],
    speed = 1,
    direction = 'left',
    pauseOnHover = true,
    spacing = 100,
    className = '',
    logoClassName = 'w-12 h-12 object-contain opacity-60 hover:opacity-100 transition-opacity'
}) => {
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef(null);

    // Default logos if none provided
    const defaultLogos = [
        { src: '/api/placeholder/48/48', alt: 'JavaScript', name: 'JavaScript' },
        { src: '/api/placeholder/48/48', alt: 'React', name: 'React' },
        { src: '/api/placeholder/48/48', alt: 'Node.js', name: 'Node.js' },
        { src: '/api/placeholder/48/48', alt: 'Python', name: 'Python' },
        { src: '/api/placeholder/48/48', alt: 'AWS', name: 'AWS' },
        { src: '/api/placeholder/48/48', alt: 'Docker', name: 'Docker' },
        { src: '/api/placeholder/48/48', alt: 'MongoDB', name: 'MongoDB' },
        { src: '/api/placeholder/48/48', alt: 'PostgreSQL', name: 'PostgreSQL' },
    ];

    const displayLogos = logos.length > 0 ? logos : defaultLogos;

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
            <div 
                ref={containerRef}
                className="flex items-center h-full relative"
                style={{ width: '200%' }}
            >
                {/* Render logos twice for seamless loop */}
                {[...displayLogos, ...displayLogos].map((logo, index) => (
                    <div
                        key={`${logo.name}-${index}`}
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{ marginRight: `${spacing}px` }}
                    >
                        {logo.component ? (
                            logo.component
                        ) : logo.src ? (
                            <img
                                src={logo.src}
                                alt={logo.alt || logo.name}
                                className={logoClassName}
                                title={logo.name}
                            />
                        ) : (
                            <div 
                                className={`${logoClassName} bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-lg flex items-center justify-center text-accent font-semibold text-xs`}
                                title={logo.name}
                            >
                                {logo.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-current to-transparent opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-current to-transparent opacity-20 pointer-events-none" />
        </div>
    );
};

export default LogoLoop;