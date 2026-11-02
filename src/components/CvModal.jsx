import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Layers,
  Code
} from 'lucide-react';

/**
 * CvModal Component (ATS-Standard Printable Resume)
 * Designed for both high-contrast on-screen modal review and clean B&W printer output (@media print).
 */
export function CvModal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  const { personal, educationHistory, projects, skillCategories, softSkills, languages } = content;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div 
        className="cv-modal-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        {/* Floating Close Button */}
        <button 
          type="button" 
          className="cv-modal-close-btn" 
          onClick={onClose}
          aria-label="Tutup Ringkasan CV"
        >
          <X size={22} />
        </button>

        {/* Modal Action Bar (Hidden on print) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }} className="no-print">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0284c7' }}>
              Dokumen Resmi · ATS Friendly Resume
            </span>
            <div id="cv-modal-title" style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>
              Curriculum Vitae — {personal.name}
            </div>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem'
            }}
          >
            <Printer size={16} />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {/* ATS CV DOCUMENT BODY (Clean Swiss Typography) */}
        <div className="ats-document-body" style={{ color: '#0f172a', lineHeight: '1.5' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a' }}>
              {personal.name}
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem', color: '#334155' }}>
              <span>{personal.phone}</span>
              <span>•</span>
              <span>{personal.email}</span>
              <span>•</span>
              <span>{personal.location}</span>
            </div>
          </div>

          {/* Section: Tentang Saya */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              Tentang Saya
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#334155', textAlign: 'justify', lineHeight: '1.6' }}>
              {personal.bio.id}
            </p>
          </div>

          {/* Section: Pendidikan */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              Pendidikan
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {educationHistory.map((edu, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                      {edu.major.id}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Proyek Rekayasa */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              Proyek Rekayasa Perangkat Lunak
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {projects.map((p, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>
                      {p.title.id}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                      {p.stack.join(' • ')}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: '#334155', marginTop: '2px', lineHeight: '1.5' }}>
                    {p.description.id}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Keahlian Teknis */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              Keahlian Teknis & Bahasa
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.825rem', color: '#334155' }}>
              <div>
                <strong>Web & Backend:</strong> PHP, Laravel, CodeIgniter 4, Python, Flask, HTML, CSS, JavaScript
              </div>
              <div>
                <strong>Mobile & Cloud:</strong> Flutter (Dart), Firebase, Firestore, MySQL
              </div>
              <div>
                <strong>Sistem Enterprise:</strong> Business Process Management (BPM), ERP, Asisten Lab Algoritma
              </div>
              <div>
                <strong>Desain & Alat:</strong> Figma, Canva, Git, GitHub
              </div>
            </div>
          </div>

          {/* Section: Bahasa & Soft Skills */}
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px', color: '#0f172a' }}>
              Soft Skills & Bahasa
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: '#334155' }}>
              <div><strong>Soft Skills:</strong> Kerja Tim, Komunikasi Proaktif, Analisis Logika & Problem Solving</div>
              <div><strong>Bahasa:</strong> Bahasa Indonesia (Native), Bahasa Inggris (Working Proficiency)</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
