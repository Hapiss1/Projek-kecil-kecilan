import React from 'react';
import { 
  ArrowRight, 
  Terminal, 
  MapPin, 
  Mail, 
  Phone, 
  FileDown, 
  GraduationCap, 
  Layers, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export function Hero({ lang, content, onOpenCv }) {
  const { personal, metrics } = content;

  return (
    <section className="hero-section ambient-bg">
      <div className="container hero-container">
        <div className="hero-grid">
          
          {/* Main Editorial Left Column */}
          <div className="hero-content">
            {/* Direct status indicator without cheesy pill badge */}
            <div className="hero-meta-inline">
              <span className="location-item">
                <MapPin size={15} className="meta-icon" />
                <span>{personal.location}</span>
              </span>
              <span className="meta-divider">/</span>
              <span className="school-item">
                <GraduationCap size={15} className="meta-icon" />
                <span>{personal.school}</span>
              </span>
            </div>

            {/* Authoritative Two-Line Headline Rule */}
            <h1 className="hero-headline">
              Muhammad Hafizh Farsya Syahputra
            </h1>
            
            <p className="hero-subtitle">
              {personal.heroTagline[lang]}
            </p>

            <p className="hero-bio">
              {personal.bio[lang]}
            </p>

            {/* Action Triggers */}
            <div className="hero-cta-group">
              <a href="#proyek" className="btn-primary">
                <span>{lang === 'id' ? "Telusuri Proyek" : "Explore Projects"}</span>
                <ArrowRight size={17} />
              </a>

              <a href="#workbench" className="btn-secondary">
                <Terminal size={17} />
                <span>{lang === 'id' ? "Buka Live Simulator" : "Launch Simulator"}</span>
              </a>

              <button 
                type="button" 
                onClick={onOpenCv} 
                className="btn-ghost-cv"
                title="Buka dokumen ringkasan CV ATS"
              >
                <FileDown size={17} />
                <span>{lang === 'id' ? "Ringkasan CV" : "ATS Resume"}</span>
              </button>
            </div>

            {/* Direct Contact Bar */}
            <div className="hero-contact-strip">
              <a 
                href={`mailto:${personal.email}`} 
                className="contact-strip-item"
                title="Kirim Email ke Hafizh"
              >
                <Mail size={16} />
                <span>{personal.email}</span>
              </a>
              <a 
                href={`https://wa.me/${personal.phoneClean}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-strip-item"
                title="Hubungi via WhatsApp"
              >
                <Phone size={16} />
                <span>{personal.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Profile Console Card */}
          <div className="hero-card-col">
            <div className="engineer-profile-card">
              <div className="card-top-bar">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-amber"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="card-top-title">
                  hafizh-farsya.dev ~ rpl-candidate
                </div>
              </div>

              <div className="card-body">
                <div className="profile-badge-row">
                  <div className="avatar-monogram">
                    <span>HF</span>
                  </div>
                  <div className="profile-text-meta">
                    <div className="profile-name">{personal.shortName}</div>
                    <div className="profile-role">{personal.major[lang]}</div>
                  </div>
                </div>

                <div className="console-code-block">
                  <div className="code-line">
                    <span className="code-keyword">const</span>{" "}
                    <span className="code-var">developer</span> = &#123;
                  </div>
                  <div className="code-line indent">
                    <span className="code-prop">name:</span>{" "}
                    <span className="code-str">"{personal.shortName}"</span>,
                  </div>
                  <div className="code-line indent">
                    <span className="code-prop">education:</span>{" "}
                    <span className="code-str">"{personal.school}"</span>,
                  </div>
                  <div className="code-line indent">
                    <span className="code-prop">specialization:</span>{" "}
                    <span className="code-str">"Web & Mobile Engineering"</span>,
                  </div>
                  <div className="code-line indent">
                    <span className="code-prop">coreStacks:</span> [
                    <span className="code-stack">"Flutter"</span>,{" "}
                    <span className="code-stack">"Laravel"</span>,{" "}
                    <span className="code-stack">"PHP"</span>,{" "}
                    <span className="code-stack">"MySQL"</span>,{" "}
                    <span className="code-stack">"Firestore"</span>],
                  </div>
                  <div className="code-line indent">
                    <span className="code-prop">internshipStatus:</span>{" "}
                    <span className="code-val-ready">"READY_FOR_PKL"</span>
                  </div>
                  <div className="code-line">&#125;;</div>
                </div>

                <div className="profile-quick-stats">
                  <div className="stat-pill">
                    <span className="stat-bullet"></span>
                    <span className="stat-label">SMK Telkom Banjarbaru</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-bullet"></span>
                    <span className="stat-label">3 Proyek Produksi Sekolah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Empirical Metrics Bar */}
        <div className="hero-metrics-bar">
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-box">
              <div className="metric-val mono-num">{metric.value}</div>
              <div className="metric-title">{metric.label[lang]}</div>
              <div className="metric-sub">{metric.sub[lang]}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

