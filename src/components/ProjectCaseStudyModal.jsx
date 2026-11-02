import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Layers, 
  ShieldCheck, 
  Activity,
  Code
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

/**
 * ProjectCaseStudyModal Component (Fluid Page Transition)
 * 
 * Menggantikan hard reload browser dengan transisi WebGL fluid wave wipe.
 * Menyajikan studi kasus arsitektur mendalam tanpa layar putih sama sekali.
 */
export function ProjectCaseStudyModal({ project, lang = 'id', onClose }) {
  const containerRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    soundEngine.playMechanicalClick();

    // Fluid liquid entrance transition
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Tirai gelombang masuk menutupi layar lalu membuka konten baru
      tl.fromTo(
        curtainRef.current,
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.5, ease: 'power3.inOut' }
      )
      .to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.6,
        ease: 'power4.out'
      }, '+=0.05')
      .fromTo(
        '.case-study-stagger',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );
    }, containerRef);

    // Lock scroll saat modal studi kasus terbuka
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    soundEngine.playMechanicalClick();
    
    // Reverse fluid wipe animation sebelum unmount
    gsap.to(curtainRef.current, {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.45,
      ease: 'power3.inOut',
      onComplete: onClose
    });
  };

  if (!project) return null;

  return (
    <div ref={containerRef} className="case-study-overlay" role="dialog" aria-modal="true">
      {/* Fluid Liquid Curtain Wipe */}
      <div ref={curtainRef} className="case-study-fluid-curtain" />

      {/* Main Case Study Scroll Container */}
      <div className="case-study-scroll-wrapper">
        <div className="container case-study-content">

          {/* Top Return Navigation Bar */}
          <div className="case-study-nav case-study-stagger">
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn-case-study-return"
              title="Kembali ke Portofolio Utama"
            >
              <ArrowLeft size={16} />
              <span>{lang === 'id' ? "KEMBALI KE SHOWCASE" : "RETURN TO SHOWCASE"}</span>
            </button>

            <span className="mono-sub accent-tag">
              CASE STUDY // ARCHITECTURAL DEEP-DIVE
            </span>
          </div>

          {/* Hero Case Study Header */}
          <div className="case-study-hero-head case-study-stagger">
            <span className="mono-sub" style={{ color: '#7dd3fc', fontWeight: 800 }}>
              {project.tag} · {project.category}
            </span>
            <h1 className="case-study-headline">
              {project.title[lang]}
            </h1>
            <p className="case-study-lead">
              {project.headline[lang]}
            </p>
          </div>

          {/* Visual Showcase Screen */}
          {project.image && (
            <div className="case-study-visual-box case-study-stagger">
              <img 
                src={project.image} 
                alt={project.title[lang]} 
                className="case-study-visual-img"
              />
            </div>
          )}

          {/* Architecture & Engineering Narrative Grid */}
          <div className="case-study-grid-breakdown">
            
            {/* Left: Problem & Solution Blueprint */}
            <div className="case-study-col-main case-study-stagger">
              <div className="case-study-card-block">
                <div className="case-study-block-header">
                  <Cpu size={18} className="domain-icon" />
                  <h3 className="case-study-block-title">
                    {lang === 'id' ? "Abstraksi Arsitektur & Masalah yang Dipecahkan" : "Problem & Architectural Abstraction"}
                  </h3>
                </div>
                <p className="case-study-body-text">
                  {project.description[lang]}
                </p>
                <div className="case-study-arch-badge">
                  <span>ARCHITECTURE PATTERN: </span>
                  <strong>{project.architecture}</strong>
                </div>
              </div>

              {/* Highlights & Engineering Precision */}
              <div className="case-study-card-block" style={{ marginTop: '24px' }}>
                <div className="case-study-block-header">
                  <ShieldCheck size={18} className="domain-icon" />
                  <h3 className="case-study-block-title">
                    {lang === 'id' ? "Tolok Ukur Rekayasa & Validasi" : "Engineering Accolades & Invariants"}
                  </h3>
                </div>
                <ul className="case-study-highlights-list">
                  {project.highlights.map((hl, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="highlight-icon" />
                      <span>{hl[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Technical Stack Matrix & Telemetry */}
            <div className="case-study-col-side case-study-stagger">
              <div className="case-study-card-block">
                <div className="case-study-block-header">
                  <Database size={18} className="domain-icon" />
                  <h3 className="case-study-block-title">
                    {lang === 'id' ? "Stack Teknologi" : "Applied Stacks"}
                  </h3>
                </div>
                <div className="case-study-stack-chips">
                  {project.stack.map((item, idx) => (
                    <span key={idx} className="tech-tag">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="case-study-telemetry-box">
                  <div className="telemetry-row">
                    <span className="telemetry-label">FRAME RATE:</span>
                    <span className="telemetry-value good">60 - 120 FPS NATIVE</span>
                  </div>
                  <div className="telemetry-row">
                    <span className="telemetry-label">DATA INTEGRITY:</span>
                    <span className="telemetry-value good">ACID COMPLIANT / REST SYNC</span>
                  </div>
                  <div className="telemetry-row">
                    <span className="telemetry-label">LATENCY:</span>
                    <span className="telemetry-value good">&lt; 50ms CLOUD PUB/SUB</span>
                  </div>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <a
                    href={`https://wa.me/628115003018?text=Halo%20Hafizh,%20saya%20tertarik%20dengan%20studi%20kasus%20arsitektur%20${encodeURIComponent(project.title[lang])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-action"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>{lang === 'id' ? "Diskusikan Sistem Ini" : "Discuss System"}</span>
                    <ExternalLink size={15} />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

