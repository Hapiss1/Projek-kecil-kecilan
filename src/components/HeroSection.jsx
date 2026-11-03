import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { AmbientFluidMesh } from './AmbientFluidCanvas';

/**
 * SplitText Helper Component
 * Memecah string menjadi huruf-huruf individual dalam wrapper overflow:hidden
 * untuk animasi micro-rotation dan vertical stagger yang presisi.
 */
function SplitTextWord({ word, className = '', letterClassName = '' }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {word.split('').map((char, index) => (
        <span key={index} className="inline-block overflow-hidden pb-1">
          <span
            className={`hero-char inline-block will-change-transform ${letterClassName}`}
            style={{ transformOrigin: 'bottom left' }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection({ isPreloaderDone = false, velocityRef, isWireframe = false }) {
  const containerRef = useRef(null);
  const metaRef = useRef([]);

  useEffect(() => {
    // Jalankan animasi reveal hanya setelah preloader selesai (atau jika tidak ada preloader)
    if (!isPreloaderDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      // 1. Staggered Split-Text Reveal dengan micro-rotation (6deg -> 0deg)
      tl.fromTo(
        '.hero-char',
        {
          yPercent: 120,
          rotateZ: 6,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.02,
          delay: 0.1,
        }
      );

      // 2. Metadata & Sub-headings Fade In
      tl.fromTo(
        metaRef.current,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.9,
        },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 pt-32 pb-16 lg:pb-24 border-b border-neutral-line/30 overflow-hidden bg-base"
    >
      {/* 1. Subtle Ambient WebGL Canvas (R3F + Custom Simplex Fluid Shader) */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-75">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <AmbientFluidMesh velocityRef={velocityRef} isWireframe={isWireframe} />
        </Canvas>
      </div>

      {/* 2. Top Identity Tagline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
        <div className="md:col-span-8 overflow-hidden">
          <p
            ref={(el) => (metaRef.current[0] = el)}
            className="text-sm sm:text-base text-ink-secondary font-normal tracking-tight"
          >
            Muhammad Hafizh Farsya Syahputra
          </p>
        </div>
        <div className="md:col-span-4 overflow-hidden md:text-right">
          <p
            ref={(el) => (metaRef.current[1] = el)}
            className="text-xs sm:text-sm text-neutral-line uppercase tracking-widest"
          >
            Telkom University · Bandung
          </p>
        </div>
      </div>

      {/* 3. Giant Staggered Split-Text Name */}
      <div className="my-auto py-12 lg:py-20 select-none">
        <h1 className="text-[13vw] sm:text-[11.5vw] lg:text-[10vw] font-bold leading-[0.88] tracking-ultra text-ink flex flex-col">
          
          {/* Line 1: MUHAMMAD (Light weight) */}
          <div className="overflow-hidden">
            <SplitTextWord
              word="MUHAMMAD"
              letterClassName="font-light text-ink"
            />
          </div>

          {/* Line 2: HAFIZH (Black weight) */}
          <div className="overflow-hidden">
            <SplitTextWord
              word="HAFIZH"
              letterClassName="font-black text-ink"
            />
          </div>

          {/* Line 3: FARSYA / SE */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-x-4">
            <SplitTextWord
              word="FARSYA"
              letterClassName="font-black text-ink"
            />
            <span
              ref={(el) => (metaRef.current[2] = el)}
              className="inline-block text-2xl sm:text-4xl lg:text-5xl font-light text-earth-terracotta tracking-normal"
            >
              / SE
            </span>
          </div>

        </h1>
      </div>

      {/* 4. Bottom Philosophy & Contextual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-neutral-line/30">
        <div className="md:col-span-6 overflow-hidden">
          <blockquote
            ref={(el) => (metaRef.current[3] = el)}
            className="text-lg sm:text-xl md:text-2xl font-light text-ink leading-snug tracking-tight max-w-xl"
          >
            &ldquo;Most portfolios try to impress.{' '}
            <span className="font-semibold text-earth-espresso">
              This one tries to communicate.
            </span>&rdquo;
          </blockquote>
        </div>

        <div className="md:col-span-3 overflow-hidden">
          <p
            ref={(el) => (metaRef.current[4] = el)}
            className="text-xs uppercase tracking-widest text-neutral-line mb-1"
          >
            Focus
          </p>
          <p className="text-sm font-medium text-ink">
            Systems Architecture &amp; Frontend Engineering
          </p>
        </div>

        <div className="md:col-span-3 overflow-hidden md:text-right">
          <p
            ref={(el) => (metaRef.current[5] = el)}
            className="text-xs uppercase tracking-widest text-neutral-line mb-1"
          >
            Status
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-ink">
            <span className="w-2 h-2 rounded-full bg-earth-terracotta animate-pulse" />
            Available for Roles
          </div>
        </div>
      </div>

    </section>
  );
}
