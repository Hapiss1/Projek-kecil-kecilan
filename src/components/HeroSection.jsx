import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

/**
 * HeroSection
 * Menampilkan tipografi editorial berukuran besar dengan animasi text reveal GSAP.
 * Menggunakan teknik split-line container dengan `overflow: hidden` untuk transisi elegan Awwwards.
 */
export function HeroSection({ content, lang = 'id' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Inisialisasi GSAP Context untuk isolasi animasi dan pembersihan memori React
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.2 }
      });

      // 1. Reveal Metadata / Top Badge
      tl.fromTo(
        '.reveal-meta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      );

      // 2. Staggered Text Reveal untuk Headline Utama
      tl.fromTo(
        '.reveal-title-line',
        { y: '115%', rotateZ: 2 },
        { y: '0%', rotateZ: 0, stagger: 0.12 },
        '-=0.5'
      );

      // 3. Reveal Deskripsi & Call to Actions
      tl.fromTo(
        '.reveal-fade',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup otomatis saat komponen unmount
  }, []);

  return (
    <section ref={containerRef} className="hero-editorial-section">
      <div className="container hero-editorial-inner">

        {/* Top Status & Meta HUD */}
        <div className="hero-editorial-meta reveal-meta">
          <div className="status-indicator-pill">
            <span className="status-pulse-dot" />
            <span className="mono-sub">AVAILABLE FOR HIGH-IMPACT ROLES · 2026</span>
          </div>
          <div className="mono-sub location-tag">
            BANDUNG, ID (WIB)
          </div>
        </div>

        {/* Main Editorial Typography Headline */}
        <div className="hero-headline-wrapper">
          <div className="overflow-clip">
            <h1 className="editorial-name reveal-title-line">
              MUHAMMAD HAFIZH FARSYA
            </h1>
          </div>
          <div className="overflow-clip">
            <div className="editorial-role-line reveal-title-line">
              CREATIVE DEVELOPER & SYSTEMS ARCHITECT
            </div>
          </div>
        </div>

        {/* Short Punchy Bio & CTAs */}
        <div className="hero-bottom-row">
          <div className="hero-desc-col reveal-fade">
            <p className="editorial-bio-text">
              {lang === 'id'
                ? "Menjembatani rekayasa perangkat lunak fullstack, antarmuka 3D interaktif berkinerja tinggi, dan arsitektur enterprise yang terukur. Mahasiswa Sistem Informasi Telkom University."
                : "Bridging fullstack software engineering, high-performance interactive 3D interfaces, and scalable enterprise architecture. Information Systems student at Telkom University."}
            </p>
          </div>

          <div className="hero-action-col reveal-fade">
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

      </div>
    </section>
  );
}
