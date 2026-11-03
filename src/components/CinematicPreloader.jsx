import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CinematicPreloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll saat preloader aktif
    document.body.style.overflow = 'hidden';

    const countObj = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        },
      });

      // 1. Numerik Counter dari 0% ke 100%
      tl.to(countObj, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          setProgress(Math.floor(countObj.val));
        },
      });

      // 2. Garis Progress Hairline Melebar
      if (progressBarRef.current) {
        tl.to(
          progressBarRef.current,
          {
            scaleX: 1,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          0
        );
      }

      // 3. Efek Tirai Teater Menyingkap ke Atas (Theater Curtain Lift)
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 1.1,
          ease: 'power4.inOut',
        },
        '+=0.1'
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <aside
      ref={containerRef}
      aria-label="System Initializing Preloader"
      className="fixed inset-0 z-50 bg-base text-ink flex flex-col justify-between p-8 sm:p-16 select-none border-b border-neutral-line/30"
      style={{ willChange: 'transform' }}
    >
      {/* Top Metadata */}
      <div className="flex items-center justify-between text-xs tracking-widest uppercase text-neutral-line">
        <span className="font-semibold text-ink">MHF / 2026</span>
        <span>Initializing Systems &amp; WebGL</span>
      </div>

      {/* Center: Giant Editorial Percentage Counter */}
      <div className="my-auto">
        <div className="overflow-hidden">
          <div
            ref={counterRef}
            className="text-[20vw] sm:text-[18vw] font-black leading-none tracking-ultra text-ink font-sans flex items-baseline"
          >
            <span>{String(progress).padStart(2, '0')}</span>
            <span className="text-[6vw] font-light text-earth-terracotta ml-2">%</span>
          </div>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-full max-w-xl h-[1px] bg-neutral-line/20 mt-4 overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-earth-terracotta origin-left scale-x-0"
          />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs tracking-wider text-neutral-line gap-2">
        <p className="font-mono text-[11px] text-ink">
          [STATUS: COMPILING SHADERS &amp; CALCULATING INERTIA]
        </p>
        <p className="font-light">
          Muhammad Hafizh Farsya — Software Engineering
        </p>
      </div>
    </aside>
  );
}
