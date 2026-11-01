import React from 'react';
import { ArrowUp, Code2, Heart } from 'lucide-react';

export function Footer({ lang, content }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-inner">
        
        <div className="footer-left">
          <div className="footer-brand">
            <Code2 size={20} className="footer-icon" />
            <span className="footer-name">{content.personal.name}</span>
          </div>
          <p className="footer-copy">
            {lang === 'id' 
              ? "Siswa Rekayasa Perangkat Lunak (RPL) · SMK Telkom Banjarbaru. Siap berkontribusi dalam Praktik Kerja Lapangan (PKL) industri."
              : "Software Engineering Student · SMK Telkom Banjarbaru. Prepared for vocational industry placement."}
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-quick-links">
            <a href="#proyek">{lang === 'id' ? "Proyek" : "Projects"}</a>
            <a href="#workbench">{lang === 'id' ? "Live Simulator" : "Simulator"}</a>
            <a href="#keahlian">{lang === 'id' ? "Keahlian" : "Skills"}</a>
            <a href="#pendidikan">{lang === 'id' ? "Pendidikan" : "Education"}</a>
            <a href="#kontak">{lang === 'id' ? "Kontak" : "Contact"}</a>
          </div>

          <button
            type="button"
            className="btn-back-to-top"
            onClick={scrollToTop}
            title={lang === 'id' ? "Kembali ke Atas" : "Back to Top"}
            aria-label="Kembali ke bagian atas"
          >
            <ArrowUp size={16} />
            <span>{lang === 'id' ? "Ke Atas" : "Top"}</span>
          </button>
        </div>

      </div>

      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <div className="copyright-text">
            © {new Date().getFullYear()} {content.personal.name}. All rights reserved.
          </div>
          <div className="meta-text">
            Built with React & Vite · Banjarbaru, Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}

