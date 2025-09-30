"use client";

import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const useClickSpark = (options = {}) => {
    const {
        particleCount = 12,
        colors = ['#5810FF', '#8B46FF', '#A855F7', '#C084FC', '#DDD6FE'],
        size = { min: 2, max: 6 },
        speed = { min: 100, max: 300 },
        gravity = 800,
        friction = 0.98,
        life = 1.2
    } = options;

    const createSpark = useCallback((x, y) => {
        const sparks = [];
        
        for (let i = 0; i < particleCount; i++) {
            const spark = document.createElement('div');
            const sparkSize = Math.random() * (size.max - size.min) + size.min;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.5;
            const velocity = Math.random() * (speed.max - speed.min) + speed.min;
            
            spark.style.cssText = `
                position: fixed;
                width: ${sparkSize}px;
                height: ${sparkSize}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${x}px;
                top: ${y}px;
                box-shadow: 0 0 6px ${color}40, 0 0 12px ${color}20;
            `;
            
            document.body.appendChild(spark);
            sparks.push(spark);
            
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            gsap.set(spark, { x: 0, y: 0, scale: 1, opacity: 1 });
            
            gsap.to(spark, {
                x: vx * (life / 2),
                y: vy * (life / 2) + (gravity * life * life) / 2,
                scale: 0,
                opacity: 0,
                duration: life,
                ease: "power2.out",
                onComplete: () => {
                    spark.remove();
                }
            });
            
            // Add some rotation for extra flair
            gsap.to(spark, {
                rotation: Math.random() * 360,
                duration: life,
                ease: "none"
            });
        }
        
        return sparks;
    }, [particleCount, colors, size, speed, gravity, friction, life]);

    const handleClick = useCallback((event) => {
        const x = event.clientX;
        const y = event.clientY;
        createSpark(x, y);
    }, [createSpark]);

    return { createSpark, handleClick };
};

const ClickSparkProvider = ({ children, ...sparkOptions }) => {
    const { handleClick } = useClickSpark(sparkOptions);

    useRef(() => {
        const handleGlobalClick = (event) => {
            // Only trigger on clickable elements
            const target = event.target;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.classList.contains('clickable') ||
                target.classList.contains('spark-on-click')
            ) {
                handleClick(event);
            }
        };

        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, [handleClick]);

    return children;
};

export { useClickSpark, ClickSparkProvider };
export default ClickSparkProvider;