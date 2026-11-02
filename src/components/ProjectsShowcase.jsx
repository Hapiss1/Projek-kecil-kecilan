import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Layers, ExternalLink, Terminal } from 'lucide-react';
import { ProjectDistortionCanvas } from './ProjectDistortionCanvas';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { soundEngine } from '../utils/soundEngine';

/**
 * Palet Warna Kontekstual Per Proyek
 * Mentransisikan warna latar belakang dan aksen secara halus sesuai karya yang sedang aktif di viewport.
 */
const PROJECT_THEMES = {
  'ecommerce-platform': {
    bg: '#040a16', // Deep Nocturnal Cobalt
    accent: '#38bdf8', // Electric Sky Cyan
    accentSubtle: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.28)'
  },
  'prestasi-siswa': {
    bg: '#03100a', // Deep Forest Emerald
    accent: '#34d399', // Emerald Laurel Gold
    accentSubtle: 'rgba(52, 211, 153, 0.12)',
    accentBorder: 'rgba(52, 211, 153, 0.28)'
  },
  'mobile-portfolio': {
    bg: '#0a0817', // Deep Obsidian Violet
    accent: '#818cf8', // Reactive Indigo / Violet
    accentSubtle: 'rgba(129, 140, 248, 0.12)',
    accentBorder: 'rgba(129, 140, 248, 0.28)'
  },
  default: {
    bg: '#05080e', // Primary Cosmic Slate
    accent: '#38bdf8', // Signature Blueprint Cyan
    accentSubtle: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.28)'
  }
};

/**
 * ProjectsShowcase Component
 * 
 * Asymmetric Editorial Showcase (Inspirasi: Majalah High-Fashion & Awwwards SOTD).
 * 
 * Ciri Khas:
 * 1. Tata letak grid asimetris dengan pergantian ritme visual antar section.
 * 2. Teks editorial raksasa dan frame visual saling tumpang tindih (overlap) secara presisi.
 * 3. WebGL Liquid Ripple Shader + Chromatic Aberration floating canvas saat hover.
 * 4. Micro-copy kursor monospace 10px: `[Stack: ... ] — [2026]` yang magnetis.
 * 5. Sibling focus dimming (kartu lain meredup saat salah satu di-hover).
 * 6. Fluid Page Transition ke studi kasus arsitektur mendalam tanpa hard reload.
 */
export function ProjectsShowcase({ lang = 'id', content }) {
  const { projects } = content;
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [inView, setInView] = useState(false);

  // 1. Viewport Visibility Check (Menghemat komputasi GPU bila section di luar layar)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Mouse Tracking untuk WebGL Floating Distortion Canvas
  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  };

  // 3. GSAP Staggered Reveal saat memasuki viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.asymmetric-card-reveal',
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.22,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 4. Contextual Color Morphing via GSAP ScrollTrigger per Proyek
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current.querySelectorAll('.project-asymmetric-card');
    const triggers = [];

    const applyTheme = (theme) => {
      document.documentElement.style.setProperty('--bg-ground', theme.bg);
      document.documentElement.style.setProperty('--accent', theme.accent);
      document.documentElement.style.setProperty('--accent-subtle', theme.accentSubtle);
      document.documentElement.style.setProperty('--accent-border', theme.accentBorder);
    };

    cards.forEach((card, idx) => {
      const projId = projects[idx]?.id;
      const theme = PROJECT_THEMES[projId] || PROJECT_THEMES.default;

      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => applyTheme(theme),
        onEnterBack: () => applyTheme(theme),
        onLeave: (self) => {
          // Bila melewati kartu terakhir, kembalikan ke warna dasar
          if (idx === projects.length - 1 && self.direction > 0) {
            applyTheme(PROJECT_THEMES.default);
          }
        },
        onLeaveBack: (self) => {
          // Bila scroll ke atas melewati kartu pertama kembali ke hero, kembalikan ke warna dasar
          if (idx === 0 && self.direction < 0) {
            applyTheme(PROJECT_THEMES.default);
          }
        }
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      applyTheme(PROJECT_THEMES.default);
    };
  }, [projects]);

  return (
    <section 
      id="proyek" 
      ref={sectionRef} 
      className="projects-editorial-section"
      onMouseMove={handleMouseMove}
    >
      {/* WebGL Floating Liquid Image Distortion Canvas (Aktif saat dalam viewport) */}
      {inView && (
        <ProjectDistortionCanvas
          activeProject={activeProject}
          mousePos={mousePos}
          projects={projects}
        />
      )}

      <div className="container">
        
        {/* Editorial Section Header */}
        <div className="section-head-editorial">
          <div className="mono-sub accent-tag">
            {lang === 'id' ? "01 // KARYA PILIHAN & SISTEM REKAYASA" : "01 // SELECTED WORKS & SYSTEMS"}
          </div>
          <h2 className="editorial-section-title">
            {lang === 'id' ? "Rekayasa Arsitektur & Studi Kasus" : "Engineered Systems & Case Studies"}
          </h2>
          <p className="editorial-section-desc">
            {lang === 'id'
              ? "Koleksi sistem perangkat lunak terstruktur dengan arsitektur modular, integrasi database relasional, dan simulasi reaktif. Arahkan kursor untuk memicu shader WebGL distorsi cairan atau klik untuk inspeksi kode mendalam."
              : "Curated collection of structured software systems featuring modular architectures, relational databases, and reactive interfaces. Hover over any entry to engage the WebGL liquid wave shader, or click for deep code inspection."}
          </p>
        </div>

        {/* Asymmetric High-Fashion Editorial Grid */}
        <div 
          className="asymmetric-editorial-feed"
          onMouseLeave={() => setActiveProject(null)}
        >
          {projects.map((proj, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            const isHovered = activeProject?.id === proj.id;
            const hasActiveSibling = activeProject !== null && !isHovered;

            // Formulasi metadata monospace untuk kursor magnetik
            const stackPreview = proj.stack.slice(0, 3).join(' · ');
            const cursorMetaString = `[Stack: ${stackPreview}] — [2026]`;

            // Variasi ritme asimetris (Item 0: Left-heavy, Item 1: Right-shifted, Item 2: Monumental spread)
            const layoutVariant = idx % 2 === 0 ? 'asymmetric-left' : 'asymmetric-right';

            return (
              <article
                key={proj.id}
                className={`project-asymmetric-card asymmetric-card-reveal ${layoutVariant} ${isHovered ? 'is-active' : ''} ${hasActiveSibling ? 'is-dimmed' : ''}`}
                data-cursor-meta={cursorMetaString}
                onMouseEnter={() => {
                  setActiveProject(proj);
                  soundEngine.playHoverTick();
                }}
                onClick={() => {
                  soundEngine.playMechanicalClick();
                  setSelectedProject(proj);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    soundEngine.playMechanicalClick();
                    setSelectedProject(proj);
                  }
                }}
              >
                {/* 1. Main Editorial Content Column */}
                <div className="asymmetric-text-block">
                  
                  {/* Index & Category Header */}
                  <div className="asymmetric-meta-header">
                    <span className="asymmetric-index">{indexStr}</span>
                    <span className="mono-sub asymmetric-category-pill">
                      {proj.category}
                    </span>
                    <span className="mono-sub asymmetric-tag-pill">
                      {proj.tag}
                    </span>
                  </div>

                  {/* Monumental Headline */}
                  <h3 className="asymmetric-project-title">
                    {proj.title[lang]}
                  </h3>

                  {/* Architectural Tagline */}
                  <p className="asymmetric-project-headline">
                    {proj.headline[lang]}
                  </p>

                  {/* High-level Description */}
                  <p className="asymmetric-project-desc">
                    {proj.description[lang]}
                  </p>

                  {/* Architectural Highlights */}
                  <div className="asymmetric-highlights-box">
                    <div className="mono-sub" style={{ color: '#64748b', marginBottom: 8 }}>
                      [CORE INVARIANTS &amp; ARCHITECTURE]
                    </div>
                    <ul className="asymmetric-highlights-list">
                      {proj.highlights.slice(0, 2).map((hl, hIdx) => (
                        <li key={hIdx} className="asymmetric-highlight-item">
                          <span className="highlight-bullet">&gt;</span>
                          <span>{hl[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills & CTA */}
                  <div className="asymmetric-footer-row">
                    <div className="asymmetric-stack-wrap">
                      {proj.stack.map((st, sIdx) => (
                        <span key={sIdx} className="asymmetric-stack-badge">
                          {st}
                        </span>
                      ))}
                    </div>

                    <div className="asymmetric-cta-pill">
                      <span>{lang === 'id' ? "Buka Studi Kasus" : "Inspect Architecture"}</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                </div>

                {/* 2. Overlapping Preview Visual Frame */}
                <div className="asymmetric-visual-frame" aria-hidden="true">
                  <div className="asymmetric-image-wrap">
                    <img 
                      src={proj.image} 
                      alt={proj.title[lang]} 
                      className="asymmetric-preview-img"
                      loading="lazy"
                    />
                    
                    {/* Visual Overlay Grid & Frame Chrome */}
                    <div className="asymmetric-frame-chrome">
                      <div className="chrome-meta-top">
                        <span className="mono-sub">[FRAME: 0{idx + 1}]</span>
                        <span className="mono-sub">[GLSL: LIQUID SHADER READY]</span>
                      </div>
                      <div className="chrome-center-hint">
                        <Terminal size={18} />
                        <span className="mono-sub">CLICK TO RUN SIMULATOR</span>
                      </div>
                      <div className="chrome-meta-bottom">
                        <span className="mono-sub">{proj.architecture}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>

      {/* Fluid Page Transition Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
}
