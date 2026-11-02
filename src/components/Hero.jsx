import React from 'react';
import { 
  ArrowDown, 
  MapPin, 
  GraduationCap, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

/**
 * Hero Component (Dribbble Dymas Alfin Editorial Style)
 * 
 * Features:
 * - Fluid, oversized headline
 * - Ultra-concise 2-sentence bio
 * - Authentic portrait with sleek editorial frame
 * - Direct primary CTAs without CV buttons
 */
export function Hero({ lang, content }) {
  const { personal, metrics } = content;

  return (
    <section className="hero-section">
      <div className="container">
        
        <div className="hero-grid">
          
          {/* Left Column: Editorial Introduction */}
          <div className="hero-content">
            
            {/* Minimal Status & Location Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(125, 211, 252, 0.08)', border: '1px solid rgba(125, 211, 252, 0.2)', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.8rem', color: '#7dd3fc', fontWeight: '600' }}>
                <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} />
                <span>{personal.availability[lang]}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.85rem' }}>
                <MapPin size={14} color="#7dd3fc" />
                <span>{personal.location}</span>
              </div>
            </div>

            {/* Oversized Dynamic Headline */}
            <h1 className="hero-headline">
              Muhammad Hafizh Farsya.<br />
              <span style={{ color: 'var(--accent)' }}>Information Systems & Engineering.</span>
            </h1>

            {/* Concise Bio */}
            <p className="hero-lead">
              {personal.bio[lang]}
            </p>

            {/* Direct Primary Action Buttons */}
            <div className="hero-cta-wrap">
              <a href="#proyek" className="btn-hero-primary">
                <span>{lang === 'id' ? "Lihat Karya Pilihan" : "View Selected Works"}</span>
                <ArrowDown size={17} />
              </a>

              <a 
                href={`https://wa.me/${personal.phoneClean}?text=Halo%20Hafizh,%20saya%20melihat%20portofolio%20Anda`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-hero-outline"
                style={{ borderColor: 'rgba(125, 211, 252, 0.3)' }}
              >
                <span>{lang === 'id' ? "Mulai Diskusi" : "Let's Talk"}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

          </div>

          {/* Right Column: Authentic Editorial Portrait */}
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
                  Telkom University & SMK Telkom Banjarbaru
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Metrics Strip */}
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
