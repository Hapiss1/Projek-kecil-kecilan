import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Calendar,
  Building2
} from 'lucide-react';

/**
 * EducationTimeline Component (Telematics & Academic Track)
 * Displays Telkom University & SMK Telkom Banjarbaru educational milestones.
 */
export function EducationTimeline({ lang = 'id', content }) {
  const { educationHistory } = content;
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-timeline-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
    <section id="pendidikan" ref={sectionRef} className="timeline-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-editorial">
          <div className="mono-sub accent-tag">
            {lang === 'id' ? "03 // REKAM JEJAK AKADEMIK & TELEMATIKA" : "03 // ACADEMIC MILESTONES & TELEMATICS"}
          </div>
          <h2 className="editorial-section-title">
            {lang === 'id' ? "Pendidikan & Rekam Jejak" : "Education & Academic Track"}
          </h2>
          <p className="editorial-section-desc">
            {lang === 'id'
              ? "Perjalanan pendidikan tinggi bidang Sistem Informasi di Telkom University dengan fondasi kuat kejuruan Rekayasa Perangkat Lunak dari SMK Telkom Banjarbaru."
              : "Academic journey in Information Systems at Telkom University underpinned by vocational software engineering training from SMK Telkom Banjarbaru."}
          </p>
        </div>

        {/* Timeline Track */}
        <div className="timeline-track">
          {educationHistory.map((edu, idx) => (
            <div key={idx} className="timeline-card reveal-timeline-card">
              
              <div className="timeline-card-header">
                <div className="timeline-inst-info">
                  <div className="timeline-inst-head">
                    <Building2 size={18} className="timeline-icon" />
                    <h3 className="timeline-institution">{edu.institution}</h3>
                  </div>
                  <div className="timeline-major-title">
                    {edu.major[lang]}
                  </div>
                  <div className="timeline-location-row">
                    <MapPin size={13} className="accent-pin" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className="timeline-status-col">
                  <div className="timeline-period-badge">
                    <Calendar size={13} />
                    <span>{edu.period}</span>
                  </div>
                  <span className="timeline-status-tag">
                    {edu.status[lang]}
                  </span>
                </div>
              </div>

              <p className="timeline-summary-text">
                {edu.summary[lang]}
              </p>

              {/* Highlights & Accolades */}
              <div className="timeline-highlights-box">
                <div className="timeline-highlights-label">
                  {lang === 'id' ? "Fokus Kompetensi & Pencapaian:" : "Core Focus & Accolades:"}
                </div>
                <div className="timeline-highlights-grid">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="timeline-highlight-item">
                      <CheckCircle2 size={15} className="highlight-icon" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
