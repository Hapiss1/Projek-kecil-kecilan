import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CinematicPreloader Component
 * 
 * Preloader tipografi minimalis (0% - 100%) yang menyembunyikan kompilasi shader WebGL.
 * Menggunakan GSAP dengan custom easing teatrikal untuk menyingkap tirai ke atas
 * saat seluruh inisialisasi selesai.
 */
export function CinematicPreloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING ENGINE...");
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Step increment acak yang organik
      const inc = Math.floor(Math.random() * 9) + 4;
      current = Math.min(100, current + inc);
      setPercent(current);

      if (current < 30) {
        setStatusText("INITIALIZING R3F SCENE GRAPH...");
      } else if (current < 65) {
        setStatusText("COMPILING CUSTOM GLSL LIQUID SHADERS...");
      } else if (current < 95) {
        setStatusText("SYNCHRONIZING PROCEDURAL GEOMETRY...");
      } else {
        setStatusText("SYSTEMS SYNCHRONIZED · 60 FPS READY");
        clearInterval(interval);

        // Memicu animasi tirai teater GSAP saat mencapai 100%
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          // 1. Fade out teks counter & status
          tl.to(contentRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.35,
            ease: 'power2.in'
          });

          // 2. Tarik tirai teater ke atas dengan kurva bespoke Awwwards
          tl.to(preloaderRef.current, {
            yPercent: -100,
            duration: 1.15,
            ease: 'power4.inOut' // Easing teatrikal yang sangat halus
          }, '-=0.1');
        }, 180);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="cinematic-preloader-curtain" aria-hidden="true">
      <div ref={contentRef} className="preloader-content-wrap">
        
        {/* Top Header Telemetry */}
        <div className="preloader-header-meta">
          <span className="mono-sub preloader-pill">
            <span className="live-pulse-dot" />
            <span>MUHAMMAD HAFIZH FARSYA</span>
          </span>
          <span className="mono-sub" style={{ color: '#64748b' }}>
            EDITORIAL &amp; CINEMATIC · 2026
          </span>
        </div>

        {/* Big Editorial Percentage Display */}
        <div className="preloader-counter-box">
          <div className="preloader-percentage-display">
            {String(percent).padStart(2, '0')}%
          </div>
        </div>

        {/* Dynamic Status & Progress Line */}
        <div className="preloader-footer-meta">
          <div className="preloader-progress-track">
            <div 
              className="preloader-progress-fill" 
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="preloader-status-text">
            <span className="mono-sub accent-tag">&gt;&gt;</span>
            <span className="mono-sub" style={{ color: '#94a3b8' }}>{statusText}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

