import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

export function EducationTimeline({ lang, content }) {
  const { education } = content;

  return (
    <section id="pendidikan" className="education-section">
      <div className="container">
        
        {/* Section Headline */}
        <div className="section-head-wrap">
          <h2 className="section-headline">
            {lang === 'id' ? "Pendidikan & Rekam Jejak" : "Education & Academic Track"}
          </h2>
          <p className="section-lead">
            {lang === 'id'
              ? "Fondasi kejuruan rekayasa perangkat lunak dan persiapan intensif menuju dunia kerja industri."
              : "Vocational software engineering grounding and targeted preparation for industrial workflows."}
          </p>
        </div>

        {/* Timeline Structural Card */}
        <div className="education-card">
          <div className="edu-top-row">
            <div className="edu-badge-icon">
              <GraduationCap size={24} />
            </div>
            
            <div className="edu-main-meta">
              <div className="edu-period-tag mono-num">
                <Calendar size={14} />
                <span>{education.period}</span>
              </div>
              <h3 className="edu-school-name">{education.institution}</h3>
              <div className="edu-major-location">
                <span className="edu-major">{education.status[lang]}</span>
                <span className="edu-dot">·</span>
                <span className="edu-loc">
                  <MapPin size={13} />
                  <span>{education.location}</span>
                </span>
              </div>
            </div>
          </div>

          <p className="edu-summary-text">
            {education.summary[lang]}
          </p>

          <div className="edu-competencies-block">
            <h4 className="competency-title">
              {lang === 'id' ? "Fokus Kompetensi Keahlian (RPL):" : "Core Curriculum Competencies:"}
            </h4>
            <div className="competencies-grid">
              {education.competencies.map((comp, idx) => (
                <div key={idx} className="comp-item">
                  <CheckCircle2 size={16} className="comp-check" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pkl-invitation-banner">
            <div className="pkl-invitation-content">
              <div className="pkl-pill">
                <Briefcase size={14} />
                <span>{lang === 'id' ? "Peluang Kerja Sama PKL" : "Vocational Internship"}</span>
              </div>
              <h4 className="pkl-inv-title">
                {lang === 'id' 
                  ? "Mencari Tempat Praktik Kerja Lapangan (PKL)" 
                  : "Seeking Vocational Industry Internship Placement"}
              </h4>
              <p className="pkl-inv-desc">
                {lang === 'id'
                  ? "Terbuka untuk perusahaan software house, instansi pemerintah, startup, atau korporat yang membutuhkan kontributor berbakat dalam web (Laravel/PHP) maupun mobile (Flutter)."
                  : "Welcoming opportunities from software companies, government institutions, and startups looking for junior contributors in Laravel, PHP, and Flutter."}
              </p>
            </div>
            <a href="#kontak" className="btn-primary pkl-cta">
              <span>{lang === 'id' ? "Diskusikan Peluang PKL" : "Inquire for PKL"}</span>
              <ArrowRight size={16} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

