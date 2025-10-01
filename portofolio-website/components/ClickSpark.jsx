"use client";

import { useRef, useEffect, useCallback, createContext, useContext } from 'react';

// Context untuk global click spark configuration
const ClickSparkContext = createContext({
    sparkColor: '#5810FF',
    sparkSize: 8,
    sparkRadius: 20,
    sparkCount: 8,
    duration: 600,
    easing: 'ease-out',
    extraScale: 1.2
});

const ClickSpark = ({
    sparkColor = '#5810FF',
    sparkSize = 8,
    sparkRadius = 20,
    sparkCount = 8,
    duration = 600,
    easing = 'ease-out',
    extraScale = 1.2,
    children
}) => {
    const canvasRef = useRef(null);
    const sparksRef = useRef([]);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas to cover the entire viewport
        const resizeCanvas = () => {
            const { innerWidth, innerHeight } = window;
            if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
                canvas.width = innerWidth;
                canvas.height = innerHeight;
            }
        };

        const handleResize = () => {
            resizeCanvas();
        };

        // Initial resize
        resizeCanvas();

        // Listen for window resize
        window.addEventListener('resize', handleResize);

        // Listen for orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(resizeCanvas, 100);
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    const easeFunc = useCallback(
        t => {
            switch (easing) {
                case 'linear':
                    return t;
                case 'ease-in':
                    return t * t;
                case 'ease-in-out':
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t);
            }
        },
        [easing]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationId;

        const draw = timestamp => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter(spark => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) {
                    return false;
                }

                const progress = elapsed / duration;
                const eased = easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                ctx.strokeStyle = sparkColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);

    const handleClick = useCallback((e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use global coordinates directly
        const x = e.clientX;
        const y = e.clientY;

        const now = performance.now();
        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now
        }));

        sparksRef.current.push(...newSparks);
    }, [sparkCount]);

    // Global click listener
    useEffect(() => {
        const globalClickHandler = (e) => {
            // Check if the clicked element should trigger sparks
            const target = e.target;
            const shouldSpark =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.classList.contains('spark-on-click') ||
                target.classList.contains('clickable') ||
                target.closest('.spark-on-click') ||
                target.closest('.clickable');

            if (shouldSpark) {
                handleClick(e);
            }
        };

        // Add global click listener
        document.addEventListener('click', globalClickHandler, true);

        return () => {
            document.removeEventListener('click', globalClickHandler, true);
        };
    }, [handleClick]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
                style={{ mixBlendMode: 'screen' }}
            />
            {children}
        </>
    );
};

// Hook untuk menggunakan click spark context
const useClickSpark = () => {
    return useContext(ClickSparkContext);
};

// Global ClickSpark provider that wraps the entire app
const ClickSparkProvider = ({ children, ...sparkOptions }) => {
    const config = {
        sparkColor: sparkOptions.sparkColor || '#5810FF',
        sparkSize: sparkOptions.sparkSize || 8,
        sparkRadius: sparkOptions.sparkRadius || 20,
        sparkCount: sparkOptions.sparkCount || 8,
        duration: sparkOptions.duration || 600,
        easing: sparkOptions.easing || 'ease-out',
        extraScale: sparkOptions.extraScale || 1.2
    };

    return (
        <ClickSparkContext.Provider value={config}>
            <ClickSpark {...config}>
                {children}
            </ClickSpark>
        </ClickSparkContext.Provider>
    );
};

export { ClickSparkProvider, useClickSpark, ClickSparkContext };
export default ClickSpark;