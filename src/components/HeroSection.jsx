import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ArrowDownRight, ArrowUpRight, Compass } from 'lucide-react';
import { ProceduralSceneRig } from './ProceduralHeroScene';

/**
 * HeroSection Component
 * 
 * Fullscreen Hero dengan WebGL Typographic Masking:
 * Nama "MUHAMMAD HAFIZH FARSYA" bertindak sebagai jendela (masking)
 * sehingga objek 3D WebGL prosedural (Torus Knot Distort + Sparkles)
 * HANYA terlihat secara eksklusif di dalam lekukan huruf tipografi.
 */
export function HeroSection({ content, lang = 'id', debugMode = false }) {
  const containerRef = useRef(null);
  const maskStageRef = useRef(null);

  useEffect(() => {
    // GSAP Context untuk isolasi animasi text reveal dan transisi pintu masuk
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.2 }
      });

      // 1. Reveal Meta Status Pill
      tl.fromTo(
        '.reveal-hero-meta',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.15 }
      );

      // 2. Reveal Typographic Mask Stage (Skala & Opacity halus)
      tl.fromTo(
        '.hero-mask-stage',
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
        '-=0.5'
      );

      // 3. Staggered Stroke Line Animation
      tl.fromTo(
        '.mask-stroke-line',
        { opacity: 0, strokeDasharray: 300, strokeDashoffset: 300 },
        { opacity: 1, strokeDashoffset: 0, duration: 1.6, stagger: 0.2 },
        '-=1.0'
      );

      // 4. Reveal Role Subtitle & Bio
      tl.fromTo(
        '.reveal-hero-role',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.8'
      );

      tl.fromTo(
        '.reveal-hero-bottom',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.0 },
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-editorial-section hero-fullscreen-stage">
      <div className="container hero-editorial-inner">

        {/* Top Status & Editorial Meta Bar */}
        <div className="hero-editorial-meta reveal-hero-meta">
          <div className="status-indicator-pill">
            <span className="status-pulse-dot" />
            <span className="mono-sub">AVAILABLE FOR HIGH-IMPACT ROLES · 2026</span>
          </div>
          <div className="mono-sub location-tag">
            <Compass size={13} style={{ display: 'inline', marginRight: 6, verticalAlign: -1 }} />
            <span>BANDUNG, ID (WIB) · LAT 6.9175° S</span>
          </div>
        </div>

        {/* =========================================================================
            CENTERPIECE: WEBGL TYPOGRAPHIC MASKING STAGE
            Objek 3D WebGL hanya ter-render & terlihat di dalam bentuk potongan huruf.
           ========================================================================= */}
        <div ref={maskStageRef} className="hero-mask-stage">
          
          {/* Layer 0: Dedicated R3F WebGL Canvas (Behind the SVG cutout) */}
          <div className="hero-webgl-canvas-box" aria-hidden="true">
            <Canvas
              camera={{ position: [0, 0, 4.2], fov: 45 }}
              dpr={[1, 1.5]} // Clamped DPR untuk 60 FPS mobile
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
              }}
            >
              <ProceduralSceneRig debugMode={debugMode} />
            </Canvas>
          </div>

          {/* Layer 1: Inverted SVG Alpha Mask Overlay */}
          <svg
            className="hero-typographic-mask-svg"
            viewBox="0 0 1200 460"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="heroNameCutoutMask">
                {/* Rect putih: menutupi seluruh background di luar huruf */}
                <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
                {/* Teks hitam: memotong lubang tembus pandang ke kanvas WebGL */}
                <text
                  x="50%"
                  y="38%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#000000"
                  fontFamily="'Space Grotesk', -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="94"
                  letterSpacing="-0.02em"
                >
                  MUHAMMAD HAFIZH
                </text>
                <text
                  x="50%"
                  y="78%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#000000"
                  fontFamily="'Space Grotesk', -apple-system, sans-serif"
                  fontWeight="900"
                  fontSize="120"
                  letterSpacing="0.08em"
                >
                  FARSYA
                </text>
              </mask>
            </defs>

            {/* Solid page background dengan lubang transparan pada huruf */}
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="var(--bg-ground, #05080e)"
              mask="url(#heroNameCutoutMask)"
            />

            {/* Subtle editorial stroke line untuk aksentuasi kontur tepi huruf */}
            <text
              x="50%"
              y="38%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.2"
              fontFamily="'Space Grotesk', -apple-system, sans-serif"
              fontWeight="900"
              fontSize="94"
              letterSpacing="-0.02em"
              className="mask-stroke-line"
            >
              MUHAMMAD HAFIZH
            </text>
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.2"
              fontFamily="'Space Grotesk', -apple-system, sans-serif"
              fontWeight="900"
              fontSize="120"
              letterSpacing="0.08em"
              className="mask-stroke-line"
            >
              FARSYA
            </text>
          </svg>

        </div>

        {/* Editorial Subtitle */}
        <div className="hero-role-row reveal-hero-role">
          <div className="editorial-role-tag">
            <span className="mono-sub accent-tag">[SPECIALIZATION]</span>
            <span className="editorial-role-line">CREATIVE DEVELOPER &amp; SYSTEMS ARCHITECT</span>
          </div>
        </div>

        {/* Bottom Editorial Bio & Action Row */}
        <div className="hero-bottom-row reveal-hero-bottom">
          <div className="hero-desc-col">
            <p className="editorial-bio-text">
              {lang === 'id'
                ? "Menjembatani rekayasa perangkat lunak fullstack, antarmuka 3D interaktif berkinerja tinggi, dan arsitektur enterprise yang terukur. Mahasiswa Sistem Informasi Telkom University."
                : "Bridging fullstack software engineering, high-performance interactive 3D interfaces, and scalable enterprise architecture. Information Systems student at Telkom University."}
            </p>
          </div>

          <div className="hero-action-col">
            <a href="#proyek" className="btn-primary-action">
              <span>{lang === 'id' ? "Lihat Proyek" : "Explore Works"}</span>
              <ArrowDownRight size={16} />
            </a>
            <a
              href="https://wa.me/6281258079633?text=Halo%20Hafizh,%20saya%20tertarik%20dengan%20portofolio%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-action"
            >
              <span>{lang === 'id' ? "Hubungi Langsung" : "Let's Connect"}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="hero-scroll-hint reveal-hero-bottom">
          <span className="mono-sub" style={{ letterSpacing: '0.15em', color: '#64748b' }}>
            [ SCROLL TO EXPLORE ↓ ]
          </span>
        </div>

      </div>
    </section>
  );
}
