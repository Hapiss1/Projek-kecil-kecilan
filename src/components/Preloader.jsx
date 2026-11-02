import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Preloader Component (Cinematic WebGL Curtain Preloader)
 * 
 * Menghitung persentase kompilasi WebGL & aset (0% -> 100%).
 * Saat selesai, tirai ditarik ke atas menggunakan GSAP `power4.inOut`
 * untuk memperlihatkan scene 3D yang sudah siap secara mulus tanpa jank.
 */
export function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING R3F SCENE GRAPH...");
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    // Simulasi loading progresif realistis untuk kompilasi shader WebGL
    let current = 0;
    const interval = setInterval(() => {
      // Step increment non-linear
      const inc = Math.floor(Math.random() * 8) + 3;
      current = Math.min(100, current + inc);
      setPercent(current);

      if (current < 35) {
        setStatusText("INITIALIZING R3F SCENE GRAPH...");
      } else if (current < 75) {
        setStatusText("COMPILING CUSTOM GLSL LIQUID SHADERS...");
      } else if (current < 99) {
        setStatusText("SYNCHRONIZING PROCEDURAL TORUS GEOMETRY...");
      } else {
        setStatusText("SYSTEM ENGINE ONLINE · 60 FPS READY");
        clearInterval(interval);

        // Memicu animasi tirai teater GSAP saat mencapai 100%
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          // 1. Fade out isi teks preloader
          tl.to('.preloader-content-wrap', {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: 'power2.in'
          });

          // 2. Tarik tirai preloader ke atas secara teatrikal
          tl.to(preloaderRef.current, {
            yPercent: -100,
            duration: 1.1,
            ease: 'power4.inOut'
          }, '-=0.1');
        }, 200);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="cinematic-preloader-curtain" aria-hidden="true">
      <div className="preloader-content-wrap">
        
        {/* Top Header Telemetry */}
        <div className="preloader-header-meta">
          <span className="mono-sub preloader-pill">
            <span className="live-pulse-dot" />
            <span>MUHAMMAD HAFIZH FARSYA</span>
          </span>
          <span className="mono-sub" style={{ color: '#64748b' }}>
            ENGINEERING PREVIEW · 2026
          </span>
        </div>

        {/* Big Editorial Percentage Display */}
        <div className="preloader-counter-box">
          <div ref={counterRef} className="preloader-percentage-display">
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
