"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollRestoration = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Simpan scroll position sebelum page change
        const saveScrollPosition = () => {
            const scrollData = {
                x: window.scrollX,
                y: window.scrollY,
                timestamp: Date.now()
            };
            sessionStorage.setItem(`scroll-${pathname}`, JSON.stringify(scrollData));
        };

        // Restore scroll position setelah page load
        const restoreScrollPosition = () => {
            const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
            if (savedScroll) {
                try {
                    const { x, y, timestamp } = JSON.parse(savedScroll);
                    // Hanya restore jika data tidak terlalu lama (dalam 5 menit)
                    if (Date.now() - timestamp < 5 * 60 * 1000) {
                        // Delay sedikit untuk memastikan content sudah loaded
                        setTimeout(() => {
                            window.scrollTo(x, y);
                        }, 100);
                    }
                } catch (error) {
                    console.warn('Failed to restore scroll position:', error);
                }
            }
        };

        // Restore scroll position saat component mount
        restoreScrollPosition();

        // Save scroll position saat user scroll
        const handleScroll = () => {
            saveScrollPosition();
        };

        // Save scroll position saat akan pindah page
        const handleBeforeUnload = () => {
            saveScrollPosition();
        };

        // Throttle scroll handler untuk performance
        let scrollTimeout;
        const throttledHandleScroll = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(handleScroll, 100);
        };

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [pathname]);

    return null;
};

export default ScrollRestoration;