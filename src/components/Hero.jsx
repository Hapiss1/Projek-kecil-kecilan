import React from 'react';
import { 
  ArrowDown, 
  FileDown, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  ArrowUpRight 
} from 'lucide-react';

/**
 * Hero Component (Anti-Slop Editorial Architecture)
 * Follows Two-Line Headline Rule, incorporates authentic portrait photo,
 * and features clean metrics strip.
 */
export function Hero({ lang, content, onOpenCv }) {
  const { personal, metrics } = content;

  return (
    <section className="hero-section">
      <div className="container">
        
        {/* Main Hero Split Grid */}
        <div className="hero-grid">
          
          {/* Left: Editorial Content */}
          <div className="hero-content">
            
            {/* Location & Academic Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', color: '#94a3b8', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="#7dd3fc" />
                <span>{personal.location}</span>
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GraduationCap size={15} color="#7dd3fc" />
                <span>Telkom University & SMK Telkom</span>
              </span>
            </div>

            {/* Authoritative Two-Line Headline */}
            <h1 className="hero-headline">
              Muhammad Hafizh Farsya.<br />
              <span style={{ color: 'var(--accent)' }}>Information Systems & Engineering.</span>
            </h1>

            {/* Supporting Sub-Lead */}
            <p className="hero-lead">
              {personal.bio[lang]}
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-cta-wrap">
              <a href="#proyek" className="btn-hero-primary">
                <span>{lang === 'id' ? "Jelajahi Karya" : "Explore Projects"}</span>
                <ArrowDown size={17} />
              </a>

              <button 
                type="button" 
                onClick={onOpenCv} 
                className="btn-hero-outline"
                title="Buka dokumen ringkasan CV ATS"
              >
                <FileDown size={17} />
                <span>{lang === 'id' ? "Unduh CV ATS" : "ATS Resume"}</span>
              </button>

              <a 
                href={`https://wa.me/${personal.phoneClean}?text=Halo%20Hafizh,%20saya%20melihat%20portofolio%20Anda`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-hero-outline"
                style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}
                title="Hubungi via WhatsApp"
              >
                <Phone size={16} />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right: Authentic Portrait Frame */}
          <div className="hero-portrait-col">
            <div className="hero-portrait-card">
              <div className="portrait-image-wrap">
                <img 
                  src={personal.photoUrl || "/hapiss.jpg"} 
                  alt={personal.name} 
                  className="portrait-image"
                  loading="eager"
                  width="400"
                  height="500"
                />
              </div>
              <div className="portrait-meta">
                <div className="portrait-name">{personal.name}</div>
                <div className="portrait-sub">
                  {lang === 'id' ? "Sistem Informasi · Telkom University" : "Information Systems · Telkom University"}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tone-Step Metrics Strip */}
        <div className="metrics-strip" style={{ marginTop: '72px', borderRadius: 'var(--radius-md)' }}>
          <div className="metrics-grid">
            {metrics.map((m, idx) => (
              <div key={idx} className="metric-item">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label[lang]}</div>
                <div className="metric-sub">{m.sub[lang]}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
