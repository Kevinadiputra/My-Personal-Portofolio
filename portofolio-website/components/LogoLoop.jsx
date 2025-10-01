import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
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

// React Bits LogoLoop implementation helpers
const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.4,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
};

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const cx = (...parts) => parts.filter(Boolean).join(' ');

const useResizeObserver = (callback, elements, dependencies) => {
    useEffect(() => {
        if (!window.ResizeObserver) {
            const handleResize = () => callback();
            window.addEventListener('resize', handleResize);
            callback();
            return () => window.removeEventListener('resize', handleResize);
        }

        const observers = elements.map(ref => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        });

        callback();

        return () => {
            observers.forEach(observer => observer?.disconnect());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];

        if (images.length === 0) {
            onLoad();
            return;
        }

        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;
            if (remainingImages === 0) {
                onLoad();
            }
        };

        images.forEach(img => {
            const htmlImg = img;
            if (htmlImg.complete) {
                handleImageLoad();
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true });
                htmlImg.addEventListener('error', handleImageLoad, { once: true });
            }
        });

        return () => {
            images.forEach(img => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {
    const rafRef = useRef(null);
    const lastTimestampRef = useRef(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (seqWidth > 0) {
            offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
            track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }

        if (prefersReduced) {
            track.style.transform = 'translate3d(0, 0, 0)';
            return () => {
                lastTimestampRef.current = null;
            };
        }

        const animate = timestamp => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            const target = pauseOnHover && isHovered ? 0 : targetVelocity;

            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqWidth > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
                offsetRef.current = nextOffset;

                const translateX = -offsetRef.current;
                track.style.transform = `translate3d(${translateX}px, 0, 0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

const LogoLoop = memo(
    ({
        logos = [],
        certificates = [],
        speed = 200,
        direction = 'left',
        width = '100%',
        logoHeight = 80,
        gap = 24,
        pauseOnHover = false,
        fadeOut = true,
        fadeOutColor,
        scaleOnHover = false,
        ariaLabel = 'Certificate logos',
        className,
        style,
        showCertificateLogos = false
    }) => {
        const containerRef = useRef(null);
        const trackRef = useRef(null);
        const seqRef = useRef(null);

        const [seqWidth, setSeqWidth] = useState(0);
        const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
        const [isHovered, setIsHovered] = useState(false);

        // Generate certificate logos
        const getCertificateLogos = useCallback(() => {
            if (!certificates || certificates.length === 0) return [];

            return certificates.map((cert) => {
                if (cert.badge && cert.badge !== '/api/placeholder/400/300') {
                    return {
                        src: cert.badge,
                        alt: cert.title,
                        title: `${cert.title} - ${cert.issuer}`,
                        href: cert.verifyUrl && cert.verifyUrl !== '#' ? cert.verifyUrl : undefined
                    };
                }

                // Fallback icon component
                const IconComponent = cert.featured ? Crown
                    : cert.level === 'expert' ? Trophy
                        : cert.level === 'professional' ? Gem
                            : cert.level === 'advanced' ? Zap
                                : cert.level === 'intermediate' ? Target
                                    : Shield;

                const levelColors = {
                    'expert': 'text-red-400',
                    'professional': 'text-purple-400',
                    'advanced': 'text-orange-400',
                    'intermediate': 'text-blue-400',
                    'beginner': 'text-green-400'
                };

                return {
                    node: (
                        <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent-hover/20 rounded-xl border border-accent/30 flex items-center justify-center backdrop-blur-sm">
                            <IconComponent className={`w-12 h-12 ${levelColors[cert.level] || 'text-accent'}`} />
                        </div>
                    ),
                    title: `${cert.title} - ${cert.issuer}`,
                    href: cert.verifyUrl && cert.verifyUrl !== '#' ? cert.verifyUrl : undefined
                };
            });
        }, [certificates]);

        // Default technology logos
        const defaultLogos = useMemo(() => [
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript', title: 'JavaScript' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', title: 'React' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python', title: 'Python' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js', title: 'Node.js' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', alt: 'AWS', title: 'AWS' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker', title: 'Docker' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB', title: 'MongoDB' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL', title: 'PostgreSQL' },
        ], []);

        const displayLogos = useMemo(() => {
            if (showCertificateLogos && certificates?.length > 0) {
                return getCertificateLogos();
            }
            return logos.length > 0 ? logos : defaultLogos;
        }, [showCertificateLogos, certificates, getCertificateLogos, logos, defaultLogos]);

        const targetVelocity = useMemo(() => {
            const magnitude = Math.abs(speed);
            const directionMultiplier = direction === 'left' ? 1 : -1;
            const speedMultiplier = speed < 0 ? -1 : 1;
            return magnitude * directionMultiplier * speedMultiplier;
        }, [speed, direction]);

        const updateDimensions = useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

            if (sequenceWidth > 0) {
                setSeqWidth(Math.ceil(sequenceWidth));
                const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
                setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
            }
        }, []);

        useResizeObserver(updateDimensions, [containerRef, seqRef], [displayLogos, gap, logoHeight]);
        useImageLoader(seqRef, updateDimensions, [displayLogos, gap, logoHeight]);
        useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

        const cssVariables = useMemo(
            () => ({
                '--logoloop-gap': `${gap}px`,
                '--logoloop-logoHeight': `${logoHeight}px`,
                ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
            }),
            [gap, logoHeight, fadeOutColor]
        );

        const rootClasses = useMemo(
            () =>
                cx(
                    'relative overflow-x-hidden group',
                    '[--logoloop-gap:24px]',
                    '[--logoloop-logoHeight:80px]',
                    '[--logoloop-fadeColorAuto:#1a1a2e]',
                    'dark:[--logoloop-fadeColorAuto:#0b0b0b]',
                    scaleOnHover && 'py-[calc(var(--logoloop-logoHeight)*0.1)]',
                    className
                ),
            [scaleOnHover, className]
        );

        const handleMouseEnter = useCallback(() => {
            if (pauseOnHover) setIsHovered(true);
        }, [pauseOnHover]);

        const handleMouseLeave = useCallback(() => {
            if (pauseOnHover) setIsHovered(false);
        }, [pauseOnHover]);

        const renderLogoItem = useCallback(
            (item, key) => {
                const isNodeItem = 'node' in item;

                const content = isNodeItem ? (
                    <span
                        className={cx(
                            'inline-flex items-center justify-center h-full',
                            'motion-reduce:transition-none',
                            scaleOnHover &&
                            'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110'
                        )}
                        aria-hidden={!!item.href && !item.ariaLabel}
                    >
                        {item.node}
                    </span>
                ) : (
                    <div className="h-[var(--logoloop-logoHeight)] w-[var(--logoloop-logoHeight)] flex items-center justify-center">
                        <img
                            className={cx(
                                'max-h-full max-w-full object-contain',
                                '[-webkit-user-drag:none] pointer-events-none',
                                '[image-rendering:-webkit-optimize-contrast]',
                                'motion-reduce:transition-none opacity-70 hover:opacity-100 transition-opacity',
                                scaleOnHover &&
                                'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110'
                            )}
                            src={item.src}
                            srcSet={item.srcSet}
                            sizes={item.sizes}
                            width={item.width}
                            height={item.height}
                            alt={item.alt ?? ''}
                            title={item.title}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                        />
                    </div>
                );

                const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

                const inner = item.href ? (
                    <a
                        className={cx(
                            'inline-flex items-center no-underline rounded',
                            'transition-opacity duration-200 ease-linear',
                            'hover:opacity-80',
                            'focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2'
                        )}
                        href={item.href}
                        aria-label={itemAriaLabel || 'logo link'}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {content}
                    </a>
                ) : (
                    content
                );

                return (
                    <li
                        className={cx(
                            'flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]',
                            'flex items-center justify-center h-[var(--logoloop-logoHeight)]',
                            scaleOnHover && 'overflow-visible group/item'
                        )}
                        key={key}
                        role="listitem"
                    >
                        {inner}
                    </li>
                );
            },
            [scaleOnHover]
        );

        const logoLists = useMemo(
            () =>
                Array.from({ length: copyCount }, (_, copyIndex) => (
                    <ul
                        className="flex items-center h-full"
                        key={`copy-${copyIndex}`}
                        role="list"
                        aria-hidden={copyIndex > 0}
                        ref={copyIndex === 0 ? seqRef : undefined}
                    >
                        {displayLogos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
                    </ul>
                )),
            [copyCount, displayLogos, renderLogoItem]
        );

        const containerStyle = useMemo(
            () => ({
                width: toCssLength(width) ?? '100%',
                ...cssVariables,
                ...style
            }),
            [width, cssVariables, style]
        );

        return (
            <div
                ref={containerRef}
                className={rootClasses}
                style={containerStyle}
                role="region"
                aria-label={ariaLabel}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {fadeOut && (
                    <>
                        <div
                            aria-hidden
                            className={cx(
                                'pointer-events-none absolute inset-y-0 left-0 z-[1]',
                                'w-[clamp(24px,8%,120px)]',
                                'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                            )}
                        />
                        <div
                            aria-hidden
                            className={cx(
                                'pointer-events-none absolute inset-y-0 right-0 z-[1]',
                                'w-[clamp(24px,8%,120px)]',
                                'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
                            )}
                        />
                    </>
                )}

                <div
                    className={cx('flex w-max will-change-transform select-none items-center h-full', 'motion-reduce:transform-none')}
                    ref={trackRef}
                >
                    {logoLists}
                </div>
            </div>
        );
    }
); export default LogoLoop;