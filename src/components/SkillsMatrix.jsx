import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Layers, 
  PenTool, 
  CheckCircle, 
  Languages as LangIcon,
  Users,
  Compass
} from 'lucide-react';

/**
 * SkillsMatrix Component (Swiss Editorial Clean Data Presentation)
 * 
 * Groups competencies into 4 core software engineering domains:
 * 1. Web & Backend Engineering (PHP, Laravel, CI4, Python, Flask, JS, HTML/CSS)
 * 2. Mobile & Cloud Engineering (Flutter, Dart, Firebase, MySQL)
 * 3. Enterprise Systems & BPM (BPM, ERP, Teaching Assistant)
 * 4. UI/UX Design & Tooling (Figma, Canva, Git/GitHub)
 */
export function SkillsMatrix({ lang, content }) {
  const { skillCategories, softSkills, languages } = content;

  const domainIcons = [Globe, Smartphone, Layers, PenTool];

  return (
    <section id="keahlian" className="skills-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <h2 className="section-headline">
            {lang === 'id' ? "Matriks Keahlian & Sistem Enterprise" : "Technical Matrix & Enterprise Systems"}
          </h2>
          <p className="section-sub">
            {lang === 'id'
              ? "Kombinasi kompetensi rekayasa perangkat lunak fullstack, aplikasi mobile cross-platform, pemahaman arsitektur proses bisnis (BPM & ERP), serta rekayasa sistem yang terukur."
              : "A comprehensive stack spanning fullstack backend, cross-platform mobile, enterprise business process management (BPM & ERP), and scalable systems engineering."}
          </p>
        </div>

        {/* 4-Domain Grid */}
        <div className="skills-domains-grid">
          {skillCategories.map((domainItem, idx) => {
            const IconComponent = domainIcons[idx] || Globe;
            return (
              <div key={idx} className="domain-card">
                <div className="domain-card-head">
                  <IconComponent size={20} className="domain-icon" />
                  <h3 className="domain-name">{domainItem.domain[lang]}</h3>
                </div>

                <div className="skills-chips-wrap">
                  {domainItem.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-chip-row">
                      <div>
                        <div className="skill-name">{skill.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
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
        <div style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Soft Skills */}
          <div className="domain-card">
            <div className="domain-card-head">
              <Users size={18} className="domain-icon" />
              <h3 className="domain-name">
                {lang === 'id' ? "Etos Kerja & Kolaborasi" : "Work Ethic & Collaboration"}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {softSkills.map((s, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f8fafc', marginBottom: '3px' }}>
                    {s.name[lang]}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5' }}>
                    {s.desc[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="domain-card">
            <div className="domain-card-head">
              <LangIcon size={18} className="domain-icon" />
              <h3 className="domain-name">
                {lang === 'id' ? "Kemampuan Bahasa" : "Language Proficiency"}
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {languages.map((l, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-ground)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '12px 14px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f8fafc' }}>
                      {l.language[lang]}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {l.proficiency[lang]}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#7dd3fc', background: 'rgba(125,211,252,0.12)', padding: '4px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
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
