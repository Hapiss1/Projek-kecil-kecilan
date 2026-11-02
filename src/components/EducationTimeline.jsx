import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  Award,
  BookOpen
} from 'lucide-react';

/**
 * EducationTimeline Component (Telematics & Academic Track)
 * Displays Telkom University & SMK Telkom Banjarbaru educational milestones.
 */
export function EducationTimeline({ lang, content }) {
  const { educationHistory } = content;

  return (
    <section id="pendidikan" className="timeline-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <h2 className="section-headline">
            {lang === 'id' ? "Pendidikan & Rekam Jejak Akademik" : "Education & Academic Milestone"}
          </h2>
          <p className="section-sub">
            {lang === 'id'
              ? "Perjalanan pendidikan tinggi di Telkom University dan fondasi kejuruan rekayasa perangkat lunak di SMK Telkom Banjarbaru."
              : "Academic journey in Information Systems at Telkom University and foundational software engineering at SMK Telkom Banjarbaru."}
          </p>
        </div>

        {/* Timeline Track */}
        <div className="timeline-track">
          {educationHistory.map((edu, idx) => (
            <div key={idx} className="timeline-card">
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <h3 className="timeline-institution">{edu.institution}</h3>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#f8fafc', marginBottom: '4px' }}>
                    {edu.major[lang]}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <MapPin size={13} color="#7dd3fc" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="timeline-period">{edu.period}</div>
                  <span style={{ fontSize: '0.75rem', color: '#7dd3fc', background: 'rgba(125,211,252,0.12)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                    {edu.status[lang]}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', margin: '14px 0 16px 0' }}>
                {edu.summary[lang]}
              </p>

              {/* Highlights */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: '700', marginBottom: '8px' }}>
                  {lang === 'id' ? "Pencapaian & Fokus Utama:" : "Key Focus & Accolades:"}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      <CheckCircle2 size={15} color="#7dd3fc" style={{ flexShrink: 0 }} />
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
