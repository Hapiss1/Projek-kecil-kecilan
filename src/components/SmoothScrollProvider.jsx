import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScrollProvider Component
 * Integrates Studio Freight's Lenis smooth scroll engine with React lifecycle.
 * Dispatches normalized scroll progress to parent for 3D camera travel synchronization.
 */
export function SmoothScrollProvider({ children, onScroll }) {
  const lenisRef = useRef(null);
  const onScrollRef = useRef(onScroll);
  onScrollRef.current = onScroll;

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just listen to native scroll
      const handleNativeScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
        if (onScrollRef.current) {
          onScrollRef.current(progress, window.scrollY);
        }
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleNativeScroll);
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false
    });

    lenisRef.current = lenis;

    // Scroll event listener
    lenis.on('scroll', ({ progress, scroll }) => {
      if (onScrollRef.current) {
        onScrollRef.current(progress, scroll);
      }
    });

    // RAF loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lifecycle cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="smooth-scroll-wrapper">
      {children}
    </div>
  );
}

