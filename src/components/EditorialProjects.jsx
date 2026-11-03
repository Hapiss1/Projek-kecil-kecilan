import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight, X, Layers, Cpu, Database, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Earthy Accent mapping per project for varied editorial texture
const PROJECT_ACCENTS = [
  {
    bgClass: 'hover:bg-earth-taupe',
    badgeBg: '#CEB3A6',
    textHover: 'group-hover:text-ink',
    metaHover: 'group-hover:text-ink/80',
    accentColor: '#CEB3A6',
    isDarkAccent: false,
  },
  {
    bgClass: 'hover:bg-earth-terracotta',
    badgeBg: '#9C6455',
    textHover: 'group-hover:text-base',
    metaHover: 'group-hover:text-base/80',
    accentColor: '#9C6455',
    isDarkAccent: true,
  },
  {
    bgClass: 'hover:bg-earth-espresso',
    badgeBg: '#5E3A30',
    textHover: 'group-hover:text-base',
    metaHover: 'group-hover:text-base/80',
    accentColor: '#5E3A30',
    isDarkAccent: true,
  },
  {
    bgClass: 'hover:bg-earth-taupe',
    badgeBg: '#CEB3A6',
    textHover: 'group-hover:text-ink',
    metaHover: 'group-hover:text-ink/80',
    accentColor: '#CEB3A6',
    isDarkAccent: false,
  },
];

export function EditorialProjects({ projects, onSelectProject }) {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const floatingPreviewRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  // Floating preview cursor tracking via gsap.quickTo (60 FPS, no layout thrashing)
  const xToRef = useRef(null);
  const yToRef = useRef(null);

  useEffect(() => {
    if (!floatingPreviewRef.current) return;

    // Inisialisasi GSAP quickTo untuk pergerakan floating preview yang halus (snappy)
    xToRef.current = gsap.quickTo(floatingPreviewRef.current, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    });
    yToRef.current = gsap.quickTo(floatingPreviewRef.current, 'y', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const handleMouseMove = (e) => {
      // Offset cursor agar tidak menutupi teks saat hover
      if (xToRef.current && yToRef.current) {
        xToRef.current(e.clientX + 32);
        yToRef.current(e.clientY - 120);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animasi reveal Floating Image Preview menggunakan masking murni (clip-path & scale)
  useEffect(() => {
    if (!floatingPreviewRef.current) return;

    if (hoveredIndex !== null) {
      gsap.to(floatingPreviewRef.current, {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(floatingPreviewRef.current, {
        opacity: 0,
        scale: 0.92,
        clipPath: 'inset(8% 8% 8% 8%)',
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  }, [hoveredIndex]);

  // GSAP ScrollTrigger Section Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.fromTo(
        '.projects-header-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // 2. Reveal Project Rows Stagger
      gsap.fromTo(
        '.project-row-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 sm:px-12 py-24 sm:py-32 border-b border-neutral-line/30 bg-base"
    >
      {/* 1. Section Header (Anti-Slop: No Eyebrows, Confident Two-Line Headline) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-24 projects-header-reveal">
        <div className="lg:col-span-3">
          <span className="text-xs font-semibold tracking-widest text-neutral-line uppercase">
            01 / ARCHIVE
          </span>
        </div>
        <div className="lg:col-span-9">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05] max-w-3xl">
            Selected Software Projects &amp; Digital Systems
          </h2>
          <p className="mt-6 text-base sm:text-lg text-ink-secondary max-w-2xl font-light leading-relaxed">
            Karya rekayasa sistem terstruktur mulai dari arsitektur e-commerce terdistribusi,
            portal dokumentasi institusi, hingga aplikasi mobile berkinerja tinggi.
          </p>
        </div>
      </div>

      {/* 2. Floating Image Preview (GSAP Clip-path Masking, Desktop only) */}
      <div
        ref={floatingPreviewRef}
        className="fixed top-0 left-0 pointer-events-none z-40 hidden md:block w-72 lg:w-96 aspect-[16/10] bg-ink rounded-none shadow-2xl overflow-hidden border border-ink/20 opacity-0"
        style={{
          clipPath: 'inset(8% 8% 8% 8%)',
          willChange: 'transform, opacity, clip-path',
        }}
      >
        {activeProject && (
          <div className="relative w-full h-full bg-[#121111] p-6 flex flex-col justify-between">
            {/* SVG Illustration Preview */}
            <img
              src={activeProject.image}
              alt={activeProject.title.id}
              className="w-full h-32 object-contain filter drop-shadow-md"
            />
            {/* Minimal Project Micro-Info */}
            <div className="border-t border-neutral-line/40 pt-3 flex items-center justify-between text-xs text-base">
              <span className="font-medium tracking-tight truncate max-w-[200px]">
                {activeProject.headline.id}
              </span>
              <span className="text-earth-taupe font-semibold">
                {activeProject.stack[0]}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Editorial Magazine Project List */}
      <div ref={listRef} className="border-t border-neutral-line/40">
        {projects.map((project, index) => {
          const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length];
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={project.id}
              data-microcopy={`[Stack: ${project.stack.slice(0, 2).join(' & ')}]`}
              className={`project-row-item group relative transition-colors duration-300 ease-snappy border-b border-neutral-line/30 cursor-pointer ${accent.bgClass}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                setSelectedModalProject(project);
                if (onSelectProject) onSelectProject(project);
              }}
            >
              <div className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-transform duration-300 ease-snappy group-hover:translate-x-2">
                
                {/* Column 1: Index Number */}
                <div className="md:col-span-1">
                  <span
                    className={`text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300 ${
                      isHovered && accent.isDarkAccent
                        ? 'text-base/70'
                        : isHovered
                        ? 'text-ink/70'
                        : 'text-neutral-line'
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Column 2: Large Typographic Title & Headline */}
                <div className="md:col-span-6">
                  <h3
                    className={`text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-colors duration-300 ${
                      isHovered && accent.isDarkAccent
                        ? 'text-base'
                        : 'text-ink'
                    }`}
                  >
                    {project.title.id}
                  </h3>
                  <p
                    className={`mt-2 text-sm sm:text-base font-light transition-colors duration-300 max-w-xl ${
                      isHovered && accent.isDarkAccent
                        ? 'text-base/80'
                        : isHovered
                        ? 'text-ink/80'
                        : 'text-ink-secondary'
                    }`}
                  >
                    {project.headline.id}
                  </p>

                  {/* Inline Mobile Image Preview (Reveals only on small screens) */}
                  <div className="mt-4 md:hidden overflow-hidden rounded bg-[#151515] p-4 border border-neutral-line/30">
                    <img
                      src={project.image}
                      alt={project.title.id}
                      className="w-full h-36 object-contain"
                    />
                  </div>
                </div>

                {/* Column 3: Tech Stack Badges */}
                <div className="md:col-span-3">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-2.5 py-1 transition-colors duration-300 ${
                          isHovered && accent.isDarkAccent
                            ? 'bg-base/10 text-base border-base/30'
                            : 'bg-base border border-neutral-line/30 text-ink'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 4: Category & Arrow Action */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3 text-right">
                  <span
                    className={`text-xs tracking-wide uppercase transition-colors duration-300 ${
                      isHovered && accent.isDarkAccent
                        ? 'text-base/80'
                        : 'text-neutral-line'
                    }`}
                  >
                    {project.category}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? 'bg-ink text-base scale-110'
                        : 'border border-neutral-line/40 text-ink'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Editorial Case Study Modal / Drawer */}
      {selectedModalProject && (
        <ProjectCaseStudyDrawer
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </section>
  );
}

/**
 * Editorial Case Study Detail Drawer
 * Clean Brutalist layout displaying deep architectural details, highlights, and stack.
 */
function ProjectCaseStudyDrawer({ project, onClose }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.drawer-backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="drawer-backdrop fixed inset-0 bg-ink/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-2xl bg-base h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-neutral-line/40 p-8 sm:p-12"
      >
        {/* Top Navigation */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-neutral-line/30">
            <span className="text-xs font-semibold tracking-widest text-neutral-line uppercase">
              CASE STUDY / {project.category}
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-neutral-line/40 flex items-center justify-center hover:bg-earth-terracotta hover:text-base hover:border-earth-terracotta transition-colors duration-200"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Artwork Banner */}
          <div className="mt-8 bg-[#101010] p-8 flex items-center justify-center border border-neutral-line/20">
            <img
              src={project.image}
              alt={project.title.id}
              className="max-h-48 object-contain"
            />
          </div>

          {/* Project Details */}
          <div className="mt-8">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {project.title.id}
            </h3>
            <p className="mt-4 text-base text-ink-secondary leading-relaxed font-light">
              {project.description.id}
            </p>
          </div>

          {/* Architectural Specs */}
          <div className="mt-8 pt-8 border-t border-neutral-line/30 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-line mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-earth-terracotta" />
                Arsitektur &amp; Desain Sistem
              </p>
              <p className="text-sm font-medium text-ink bg-earth-taupe/20 p-3 border-l-2 border-earth-terracotta">
                {project.architecture}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-line mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-earth-terracotta" />
                Key Highlights
              </p>
              <ul className="space-y-2.5">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                    <CheckCircle2 className="w-4 h-4 text-earth-terracotta shrink-0 mt-0.5" />
                    <span>{item.id}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-line mb-3">
                Teknologi yang Digunakan
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 bg-base border border-neutral-line/40 text-ink font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-6 border-t border-neutral-line/30 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-neutral-line hover:text-ink font-semibold"
          >
            ← Kembali ke Galeri
          </button>
          <a
            href="https://github.com/hapissf3001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-base text-xs uppercase tracking-wider font-semibold hover:bg-earth-terracotta transition-colors duration-200"
          >
            Inspect Repository
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

