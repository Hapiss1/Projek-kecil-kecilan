import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { OptimizedCanvas } from './OptimizedCanvas';
import { AmbientFluidMesh } from './AmbientFluidCanvas';
import { MapPin, Sparkles } from 'lucide-react';

/**
 * SplitText Helper Component
 * Memecah string menjadi huruf-huruf individual dalam wrapper overflow:hidden
 * Hardware-Accelerated: Hanya mentransformasikan yPercent, rotateZ, dan opacity (Composite Layer GPU).
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

export function HeroSection({
  isPreloaderDone = false,
  velocityRef,
  isWireframe = false,
  onShaderWarmedUp,
}) {
  const containerRef = useRef(null);
  const portraitCardRef = useRef(null);
  const metaRef = useRef([]);

  // Inisialisasi animasi GSAP Split-Text & Dribbble Portrait Card Reveal
  // Hardware-Accelerated: Hanya menggunakan GPU-composited transform & opacity (Zero Layout Thrashing)
  useEffect(() => {
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

      // 2. Reveal Dribbble-style Avatar Portrait Card (Smooth clip-path & scale-up)
      if (portraitCardRef.current) {
        tl.fromTo(
          portraitCardRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.94,
            clipPath: 'inset(12% 12% 12% 12% round 1.25rem)',
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.8'
        );
      }

      // 3. Metadata & Sub-headings Fade In
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

  // Interactive 3D Mouse Parallax Tilt pada Portrait Card (GPU QuickTo)
  useEffect(() => {
    const card = portraitCardRef.current;
    if (!card) return;

    const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power2.out' });
    const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const mouseDistX = (e.clientX - cardCenterX) / (rect.width / 2);
      const mouseDistY = (e.clientY - cardCenterY) / (rect.height / 2);

      if (Math.abs(mouseDistX) < 2.0 && Math.abs(mouseDistY) < 2.0) {
        rotateX(-mouseDistY * 7);
        rotateY(mouseDistX * 7);
      }
    };

    const handleMouseLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 pt-32 pb-16 lg:pb-24 border-b border-neutral-line/30 overflow-hidden bg-base"
    >
      {/* 1. Subtle Ambient WebGL Canvas dengan OptimizedCanvas (Pre-warmed GPU, Dynamic Culling, Strict DPR) */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-75">
        <OptimizedCanvas onWarmedUp={onShaderWarmedUp}>
          <AmbientFluidMesh velocityRef={velocityRef} isWireframe={isWireframe} />
        </OptimizedCanvas>
      </div>

      {/* 2. Top Identity Tagline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
        <div className="md:col-span-8 overflow-hidden">
          <p
            ref={(el) => (metaRef.current[0] = el)}
            className="text-sm sm:text-base text-ink-secondary font-normal tracking-tight flex items-center gap-2 will-change-transform"
          >
            <span>Muhammad Hafizh Farsya Syahputra</span>
            <span className="text-neutral-line">/</span>
            <span className="text-xs uppercase tracking-widest text-earth-terracotta font-semibold">
              Software Engineer
            </span>
          </p>
        </div>
        <div className="md:col-span-4 overflow-hidden md:text-right">
          <p
            ref={(el) => (metaRef.current[1] = el)}
            className="text-xs sm:text-sm text-neutral-line uppercase tracking-widest flex items-center justify-start md:justify-end gap-1.5 will-change-transform"
          >
            <MapPin className="w-3.5 h-3.5 text-earth-terracotta" />
            <span>Telkom University · Bandung</span>
          </p>
        </div>
      </div>

      {/* 3. Main Hero Area: Asymmetric Editorial Layout (Typography + Dribbble Avatar Card) */}
      <div className="my-auto py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (8 cols): Giant Staggered Split-Text Name & Tagline */}
          <div className="lg:col-span-8 select-none">
            <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-bold leading-[0.88] tracking-ultra text-ink flex flex-col">
              
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
                  className="inline-block text-2xl sm:text-4xl lg:text-5xl font-light text-earth-terracotta tracking-normal will-change-transform"
                >
                  / SE
                </span>
              </div>

            </h1>

            {/* Sub-Tagline below Name */}
            <div className="mt-8 overflow-hidden max-w-xl">
              <p
                ref={(el) => (metaRef.current[3] = el)}
                className="text-base sm:text-lg text-ink-secondary font-light leading-relaxed will-change-transform"
              >
                Mahasiswa Sistem Informasi Telkom University &amp; Alumni Rekayasa Perangkat Lunak.
                Fokus merancang web, aplikasi mobile, dan arsitektur data enterprise.
              </p>
            </div>
          </div>

          {/* Right Column (4 cols): Interactive Dribbble-Style Avatar Portrait Card */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div
              style={{ perspective: '1000px' }}
              className="w-full max-w-sm"
            >
              <div
                ref={portraitCardRef}
                data-microcopy="[Portrait: M. Hafizh Farsya]"
                className="group relative p-3 sm:p-4 bg-base/85 backdrop-blur-md border border-neutral-line/30 rounded-2xl shadow-xl hover:border-earth-terracotta transition-all duration-300 will-change-transform cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image Container with Inner Border & Lighting */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#0a1122] shadow-inner">
                  <img
                    src="/avatar.jpg"
                    alt="Muhammad Hafizh Farsya 3D Avatar Portrait"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  />

                  {/* Top Identifier Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-ink/80 backdrop-blur-md border border-neutral-line/40 text-[10px] font-mono text-base uppercase tracking-wider rounded-md flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3 h-3 text-earth-taupe" />
                    <span>MHF / 2026</span>
                  </div>

                  {/* Top Right Flag Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-ink/80 backdrop-blur-md border border-neutral-line/40 text-[10px] font-mono text-base tracking-wider rounded-md">
                    🇮🇩 ID
                  </div>

                  {/* Bottom Floating Status Capsule (Dribbble Signature) */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-ink/90 backdrop-blur-md border border-neutral-line/40 rounded-lg flex items-center justify-between text-base shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-earth-terracotta animate-pulse" />
                      <span className="text-xs font-medium tracking-tight">Available for Roles</span>
                    </div>
                    <span className="text-[10px] font-mono text-earth-taupe uppercase">Bandung</span>
                  </div>
                </div>

                {/* Card Editorial Caption */}
                <div className="pt-3 px-1 flex items-center justify-between text-xs">
                  <div>
                    <h2 className="font-bold text-xs uppercase tracking-tight text-ink">
                      M. Hafizh Farsya S.
                    </h2>
                    <p className="text-[11px] text-neutral-line font-light">
                      Information Systems · Telkom Univ
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-neutral-line/30 text-neutral-line uppercase">
                    Software Eng.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Philosophy & Contextual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-neutral-line/30">
        <div className="md:col-span-6 overflow-hidden">
          <blockquote
            ref={(el) => (metaRef.current[4] = el)}
            className="text-lg sm:text-xl md:text-2xl font-light text-ink leading-snug tracking-tight max-w-xl will-change-transform"
          >
            &ldquo;Most portfolios try to impress.{' '}
            <span className="font-semibold text-earth-espresso">
              This one tries to communicate.
            </span>&rdquo;
          </blockquote>
        </div>

        <div className="md:col-span-3 overflow-hidden">
          <p
            ref={(el) => (metaRef.current[5] = el)}
            className="text-xs uppercase tracking-widest text-neutral-line mb-1 will-change-transform"
          >
            Focus
          </p>
          <p className="text-sm font-medium text-ink">
            Systems Architecture &amp; Frontend Engineering
          </p>
        </div>

        <div className="md:col-span-3 overflow-hidden md:text-right">
          <p
            ref={(el) => (metaRef.current[6] = el)}
            className="text-xs uppercase tracking-widest text-neutral-line mb-1 will-change-transform"
          >
            Status
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-ink">
            <span className="w-2 h-2 rounded-full bg-earth-terracotta animate-pulse" />
            Active Student &amp; Ready for Work
          </div>
        </div>
      </div>

    </section>
  );
}
