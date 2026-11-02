import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { ProjectDistortionCanvas } from './ProjectDistortionCanvas';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { soundEngine } from '../utils/soundEngine';

/**
 * ProjectsShowcase Component
 * Awwwards-Level Editorial Typography Rows + WebGL Liquid Distortion Shader on Hover.
 * 
 * Inovasi:
 * 1. Menggantikan kartu generik dengan baris tipografi editorial raksasa.
 * 2. Canvas WebGL R3F distorsi gelombang cairan yang melayang mengikuti mouse dengan inersia.
 * 3. Sibling dimming focus effect (baris lain meredup saat salah satu di-hover).
 * 4. Staggered text reveal menggunakan GSAP ScrollTrigger.
 * 5. Fluid Page Transition ke studi kasus arsitektur mendalam tanpa hard reload.
 */
export function ProjectsShowcase({ lang = 'id', content }) {
  const { projects } = content;
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [inView, setInView] = useState(false);

  // 1. Viewport Visibility Check (Menghemat GPU bila section di luar layar)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
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

  // 3. GSAP Staggered Text Reveal saat section memasuki viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-row-reveal',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="proyek" 
      ref={sectionRef} 
      className="projects-editorial-section"
      onMouseMove={handleMouseMove}
    >
      {/* WebGL Floating Liquid Image Distortion Canvas (Hanya aktif saat dalam viewport) */}
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
            {lang === 'id' ? "01 // KARYA PILIHAN & SISTEM ENTERPRISE" : "01 // SELECTED WORKS & SYSTEMS"}
          </div>
          <h2 className="editorial-section-title">
            {lang === 'id' ? "Rekayasa Arsitektur & Studi Kasus" : "Engineered Systems & Case Studies"}
          </h2>
          <p className="editorial-section-desc">
            {lang === 'id'
              ? "Arahkan kursor ke nama proyek untuk memicu shader distorsi WebGL cairan secara real-time, atau klik untuk membuka studi kasus arsitektur mendalam melalui transisi layar cair."
              : "Hover over any project row to trigger real-time WebGL liquid distortion shader, or click to enter the deep architectural case study via fluid screen transition."}
          </p>
        </div>

        {/* Large Typography Project Rows */}
        <div 
          className="projects-editorial-list"
          onMouseLeave={() => setActiveProject(null)}
        >
          {projects.map((proj, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            const isHovered = activeProject?.id === proj.id;

            return (
              <div
                key={proj.id}
                className={`project-editorial-row project-row-reveal ${isHovered ? 'is-active' : ''}`}
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
                {/* Index Column */}
                <div className="project-editorial-index">
                  {indexStr}
                </div>

                {/* Main Large Typography Title */}
                <div className="project-editorial-title-wrap">
                  <h3 className="project-editorial-title">
                    {proj.title[lang]}
                  </h3>
                  <div className="project-editorial-tagline">
                    {proj.headline[lang]}
                  </div>
                </div>

                {/* Metadata & Tech Stack */}
                <div className="project-editorial-meta">
                  <span className="project-editorial-category">
                    {proj.category}
                  </span>
                  <div className="project-editorial-stack">
                    {proj.stack.slice(0, 3).map((st, sIdx) => (
                      <span key={sIdx} className="project-stack-tag">
                        {st}
                      </span>
                    ))}
                    {proj.stack.length > 3 && (
                      <span className="project-stack-tag">+{proj.stack.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Interactive Action Icon */}
                <div className="project-editorial-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </div>
              </div>
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
