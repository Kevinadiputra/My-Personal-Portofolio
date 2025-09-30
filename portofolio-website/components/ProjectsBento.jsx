import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, Github, Star, Code, Palette, Database, Globe, Smartphone, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 250;
const DEFAULT_GLOW_COLOR = '88, 16, 255';
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleProjectCard = ({
  project,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onClick
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03;
        const magnetY = (y - centerY) * 0.03;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = e => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <Palette size={14} />;
      case 'backend':
        return <Database size={14} />;
      case 'fullstack':
        return <Globe size={14} />;
      case 'mobile':
        return <Smartphone size={14} />;
      default:
        return <Code size={14} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden cursor-pointer`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onClick={onClick}
    >
      {/* Project Image Background */}
      <div className="absolute inset-0">
        {project?.image && project.image !== "/api/placeholder/400/250" ? (
          <img
            src={project.image}
            alt={project?.title || 'Project'}
            className="w-full h-full object-cover opacity-20"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent-hover/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg text-xs">
            {getCategoryIcon(project?.category)}
            <span className="capitalize">{project?.category || 'Project'}</span>
          </div>
          {project?.featured && (
            <div className="flex items-center gap-1 bg-accent px-2 py-1 rounded-lg text-xs font-semibold">
              <Star size={10} />
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {project?.title || 'Amazing Project'}
          </h3>
          <p className="text-xs text-white/80 leading-relaxed line-clamp-3">
            {project?.description || 'An innovative solution built with modern technologies'}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {(project?.technologies || ['React', 'Node.js']).slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-accent/20 backdrop-blur-sm rounded text-xs"
              >
                {tech}
              </span>
            ))}
            {project?.technologies && project.technologies.length > 3 && (
              <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-1 text-accent text-xs font-medium">
              <Eye size={12} />
              View Project
            </div>
            <div className="flex gap-2">
              {project?.liveUrl && project.liveUrl !== "#" && (
                <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
                  <ExternalLink size={12} />
                </div>
              )}
              {project?.githubUrl && project.githubUrl !== "#" && (
                <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
                  <Github size={12} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 15%,
        rgba(${glowColor}, 0.03) 25%,
        rgba(${glowColor}, 0.015) 40%,
        rgba(${glowColor}, 0.008) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.projects-bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.project-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.6
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.6
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.project-card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const ProjectsBento = ({
  projects = [],
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const router = useRouter();
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  // Take only first 6 projects for the bento layout
  const displayProjects = projects.slice(0, 6);

  const handleProjectClick = (project) => {
    if (project?.id) {
      router.push(`/project/${project.id}`);
    }
  };

  return (
    <>
      <style>
        {`
          .projects-bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 180px;
            --glow-color: ${glowColor};
            --border-color: #392e4e;
            --background-dark: #1a1625;
            --white: hsl(0, 0%, 100%);
            --purple-primary: rgba(88, 16, 255, 1);
            --purple-glow: rgba(88, 16, 255, 0.2);
            --purple-border: rgba(88, 16, 255, 0.6);
          }
          
          .projects-bento-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
          }
          
          @media (min-width: 768px) {
            .projects-bento-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            
            .projects-bento-grid .project-card:nth-child(1) {
              grid-column: span 2;
              grid-row: span 2;
            }
            
            .projects-bento-grid .project-card:nth-child(4) {
              grid-column: span 2;
            }
          }
          
          .project-card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .project-card--border-glow:hover::after {
            opacity: 1;
          }
          
          .project-card--border-glow:hover {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px rgba(${glowColor}, 0.15);
          }
          
          .project-card {
            min-height: 200px;
            border-radius: 16px;
            border: 1px solid var(--border-color);
            background: var(--background-dark);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 180px;
          }
          
          .project-card:hover {
            transform: translateY(-4px);
            border-color: var(--purple-border);
          }
          
          @media (max-width: 767px) {
            .projects-bento-grid {
              grid-template-columns: 1fr;
              gap: 0.75rem;
            }
            
            .projects-bento-grid .project-card {
              min-height: 180px;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div
        className="projects-bento-section select-none relative"
        ref={gridRef}
      >
        <div className="projects-bento-grid">
          {displayProjects.map((project, index) => {
            const baseClassName = `project-card ${
              enableBorderGlow ? 'project-card--border-glow' : ''
            }`;

            if (enableStars) {
              return (
                <ParticleProjectCard
                  key={project.id || index}
                  project={project}
                  className={baseClassName}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                  onClick={() => handleProjectClick(project)}
                />
              );
            }

            return (
              <div
                key={project.id || index}
                className={baseClassName}
                onClick={() => handleProjectClick(project)}
              >
                {/* Same content as ParticleProjectCard but without particle effects */}
                <div className="absolute inset-0">
                  {project?.image && project.image !== "/api/placeholder/400/250" ? (
                    <img
                      src={project.image}
                      alt={project?.title || 'Project'}
                      className="w-full h-full object-cover opacity-20"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent-hover/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg text-xs">
                      {project?.category === 'frontend' && <Palette size={14} />}
                      {project?.category === 'backend' && <Database size={14} />}
                      {project?.category === 'fullstack' && <Globe size={14} />}
                      {project?.category === 'mobile' && <Smartphone size={14} />}
                      {!project?.category && <Code size={14} />}
                      <span className="capitalize">{project?.category || 'Project'}</span>
                    </div>
                    {project?.featured && (
                      <div className="flex items-center gap-1 bg-accent px-2 py-1 rounded-lg text-xs font-semibold">
                        <Star size={10} />
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-base leading-tight line-clamp-2">
                      {project?.title || 'Amazing Project'}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed line-clamp-3">
                      {project?.description || 'An innovative solution built with modern technologies'}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {(project?.technologies || ['React', 'Node.js']).slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 bg-accent/20 backdrop-blur-sm rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project?.technologies && project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/10 backdrop-blur-sm rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-1 text-accent text-xs font-medium">
                        <Eye size={12} />
                        View Project
                      </div>
                      <div className="flex gap-2">
                        {project?.liveUrl && project.liveUrl !== "#" && (
                          <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
                            <ExternalLink size={12} />
                          </div>
                        )}
                        {project?.githubUrl && project.githubUrl !== "#" && (
                          <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
                            <Github size={12} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectsBento;