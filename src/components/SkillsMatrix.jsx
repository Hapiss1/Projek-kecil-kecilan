import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Globe, 
  Smartphone, 
  Layers, 
  PenTool, 
  Languages as LangIcon,
  Users,
  CheckCircle2
} from 'lucide-react';

/**
 * SkillsMatrix Component (Awwwards Swiss Editorial Presentation)
 * 
 * Mengelompokkan kompetensi ke dalam 4 domain rekayasa utama:
 * 1. Web & Backend Engineering (PHP, Laravel, CI4, Python, Flask, JS, HTML/CSS)
 * 2. Mobile & Cloud Engineering (Flutter, Dart, Firebase, MySQL)
 * 3. Enterprise Systems & BPM (BPM, ERP, Database Architecture)
 * 4. UI/UX Design & Tooling (Figma, Canva, Git/GitHub)
 */
export function SkillsMatrix({ lang = 'id', content }) {
  const { skillCategories, softSkills, languages } = content;
  const sectionRef = useRef(null);

  const domainIcons = [Globe, Smartphone, Layers, PenTool];

  // GSAP Staggered Scroll Reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-skill-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
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
    <section id="keahlian" ref={sectionRef} className="skills-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-editorial">
          <div className="mono-sub accent-tag">
            {lang === 'id' ? "02 // MATRIKS KEAHLIAN & ARSITEKTUR" : "02 // TECHNICAL MATRIX & CAPABILITIES"}
          </div>
          <h2 className="editorial-section-title">
            {lang === 'id' ? "Kompetensi Rekayasa & Stack" : "Engineering Stack & Domains"}
          </h2>
          <p className="editorial-section-desc">
            {lang === 'id'
              ? "Kombinasi kompetensi rekayasa perangkat lunak fullstack, aplikasi mobile cross-platform, pemahaman arsitektur proses bisnis (BPM & ERP), serta perancangan sistem yang terukur."
              : "A comprehensive stack spanning fullstack backend, cross-platform mobile, enterprise business process management (BPM & ERP), and scalable systems engineering."}
          </p>
        </div>

        {/* 4-Domain Grid */}
        <div className="skills-domains-grid">
          {skillCategories.map((domainItem, idx) => {
            const IconComponent = domainIcons[idx] || Globe;
            return (
              <div key={idx} className="domain-card reveal-skill-card">
                <div className="domain-card-head">
                  <div className="domain-icon-box">
                    <IconComponent size={20} className="domain-icon" />
                  </div>
                  <h3 className="domain-name">{domainItem.domain[lang]}</h3>
                </div>

                <div className="skills-chips-wrap">
                  {domainItem.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-chip-row">
                      <div className="skill-info-col">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-detail-text">
                          {skill.detail}
                        </div>
                      </div>
                      <span className="skill-badge">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft Skills & Languages Split Section */}
        <div className="skills-secondary-grid">
          
          {/* Work Ethic & Collaboration */}
          <div className="domain-card reveal-skill-card">
            <div className="domain-card-head">
              <div className="domain-icon-box">
                <Users size={18} className="domain-icon" />
              </div>
              <h3 className="domain-name">
                {lang === 'id' ? "Etos Kerja & Kolaborasi" : "Work Ethic & Collaboration"}
              </h3>
            </div>
            <div className="secondary-skills-list">
              {softSkills.map((s, idx) => (
                <div key={idx} className="secondary-skill-item">
                  <div className="secondary-skill-title">
                    <CheckCircle2 size={15} className="highlight-icon" />
                    <span>{s.name[lang]}</span>
                  </div>
                  <div className="secondary-skill-desc">
                    {s.desc[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="domain-card reveal-skill-card">
            <div className="domain-card-head">
              <div className="domain-icon-box">
                <LangIcon size={18} className="domain-icon" />
              </div>
              <h3 className="domain-name">
                {lang === 'id' ? "Kemampuan Bahasa" : "Language Proficiency"}
              </h3>
            </div>
            <div className="secondary-skills-list">
              {languages.map((l, idx) => (
                <div key={idx} className="lang-proficiency-item">
                  <div>
                    <div className="lang-name">
                      {l.language[lang]}
                    </div>
                    <div className="lang-level">
                      {l.proficiency[lang]}
                    </div>
                  </div>
                  <span className="lang-badge">
                    {l.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
