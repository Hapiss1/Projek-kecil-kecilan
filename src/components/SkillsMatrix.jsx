import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Database, 
  PenTool, 
  Users, 
  MessageCircle, 
  Sparkles, 
  CheckCircle,
  Languages
} from 'lucide-react';

export function SkillsMatrix({ lang, content }) {
  const { skillCategories, softSkills, languages } = content;
  const [activeCategory, setActiveCategory] = useState('all');

  const domainIcons = {
    "Pengembangan Web": Globe,
    "Pengembangan Mobile": Smartphone,
    "Basis Data & Cloud": Database,
    "Desain & Prototyping": PenTool
  };

  const filteredCategories = activeCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter((_, idx) => idx.toString() === activeCategory);

  return (
    <section id="keahlian" className="skills-section">
      <div className="container">
        
        {/* Section Headline */}
        <div className="section-head-wrap">
          <h2 className="section-headline">
            {lang === 'id' ? "Keahlian Teknis & Domain Kerja" : "Technical Skills & Competencies"}
          </h2>
          <p className="section-lead">
            {lang === 'id'
              ? "Kombinasi kemampuan pengembangan software web, mobile cross-platform, manajemen basis data, serta kolaborasi tim."
              : "A versatile suite of technical competencies spanning fullstack web, cross-platform mobile, databases, and proactive teamwork."}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="skills-filter-nav">
          <button
            type="button"
            className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            {lang === 'id' ? "Semua Bidang" : "All Domains"}
          </button>
          {skillCategories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              className={`filter-pill ${activeCategory === idx.toString() ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx.toString())}
            >
              {cat.domain[lang]}
            </button>
          ))}
        </div>

        {/* Technical Skills Grid */}
        <div className="skills-domain-grid">
          {filteredCategories.map((cat, catIdx) => {
            const IconComp = domainIcons[cat.domain.id] || Globe;
            return (
              <div key={catIdx} className="domain-card">
                <div className="domain-header">
                  <div className="domain-icon-wrapper">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h3 className="domain-title">{cat.domain[lang]}</h3>
                    <p className="domain-desc">{cat.description[lang]}</p>
                  </div>
                </div>

                <div className="skills-items-list">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item-row">
                      <div className="skill-main-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-badge">{skill.badge}</span>
                      </div>
                      <div className="skill-detail-text">
                        {skill.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Soft Skills & Languages Split Grid */}
        <div className="soft-skills-and-lang-grid">
          
          {/* Soft Skills */}
          <div className="soft-skills-panel">
            <div className="panel-title-row">
              <Users size={18} className="panel-icon" />
              <h3 className="panel-title">
                {lang === 'id' ? "Karakter & Soft Skill" : "Soft Skills & Teamwork"}
              </h3>
            </div>
            <div className="soft-skills-list">
              {softSkills.map((s, idx) => (
                <div key={idx} className="soft-skill-item">
                  <div className="soft-skill-head">
                    <CheckCircle size={16} className="soft-check" />
                    <h4 className="soft-skill-name">{s.name[lang]}</h4>
                  </div>
                  <p className="soft-skill-desc">{s.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="languages-panel">
            <div className="panel-title-row">
              <Languages size={18} className="panel-icon" />
              <h3 className="panel-title">
                {lang === 'id' ? "Kemampuan Bahasa" : "Languages"}
              </h3>
            </div>
            <div className="languages-list">
              {languages.map((l, idx) => (
                <div key={idx} className="language-item-card">
                  <div className="lang-badge-pill">{l.badge}</div>
                  <div className="lang-info">
                    <div className="lang-name">{l.language[lang]}</div>
                    <div className="lang-level">{l.proficiency[lang]}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="internship-readiness-box">
              <div className="readiness-title">
                {lang === 'id' ? "Kesiapan Praktik Kerja Lapangan (PKL)" : "Internship Availability"}
              </div>
              <p className="readiness-desc">
                {lang === 'id'
                  ? "Siap bergabung dengan tim engineering industri, beradaptasi dengan alur kerja Git, task ticketing, dan kultur kerja profesional."
                  : "Prepared to integrate into industrial engineering teams, adapting swiftly to Git workflows, issue ticketing, and engineering rigor."}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

