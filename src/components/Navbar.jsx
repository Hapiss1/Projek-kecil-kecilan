import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Menu, 
  X, 
  MessageSquare, 
  FileText, 
  Send,
  Languages,
  CheckCircle2
} from 'lucide-react';

export function Navbar({ lang, setLang, content, onOpenCv }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#proyek", label: lang === 'id' ? "Proyek" : "Projects" },
    { href: "#workbench", label: lang === 'id' ? "Live Simulator" : "Live Simulator" },
    { href: "#keahlian", label: lang === 'id' ? "Keahlian" : "Skills" },
    { href: "#pendidikan", label: lang === 'id' ? "Pendidikan" : "Education" },
    { href: "#kontak", label: lang === 'id' ? "Kontak" : "Contact" },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand */}
        <a href="#" className="navbar-brand">
          <div className="brand-icon">
            <Code2 size={20} className="brand-svg" />
          </div>
          <div className="brand-text">
            <span className="brand-name">{content.personal.shortName}</span>
            <span className="brand-role">{content.personal.school} · RPL</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Status Badge */}
          <div className="status-indicator-pill" title={content.personal.availability[lang]}>
            <span className="pulse-dot"></span>
            <span className="status-text">{lang === 'id' ? "Siap PKL" : "Open for PKL"}</span>
          </div>

          {/* Lang Toggle */}
          <button 
            type="button" 
            className="lang-btn" 
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            title={lang === 'id' ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
            aria-label="Pilih Bahasa"
          >
            <Languages size={15} />
            <span className="lang-code">{lang.toUpperCase()}</span>
          </button>

          {/* CV Button */}
          <button 
            type="button" 
            className="cv-btn"
            onClick={onOpenCv}
            title="Lihat Ringkasan CV ATS"
          >
            <FileText size={16} />
            <span className="cv-btn-text">CV ATS</span>
          </button>

          {/* Direct CTA */}
          <a 
            href={`https://wa.me/${content.personal.phoneClean}?text=Halo%20Hafizh,%20saya%20melihat%20portofolio%20Anda`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-contact-btn"
          >
            <Send size={15} />
            <span>{lang === 'id' ? "Hubungi" : "Connect"}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button 
              type="button"
              className="mobile-cv-action"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCv();
              }}
            >
              <FileText size={18} />
              <span>{lang === 'id' ? "Buka Ringkasan CV ATS" : "View ATS Resume"}</span>
            </button>
            <a 
              href={`https://wa.me/${content.personal.phoneClean}?text=Halo%20Hafizh`}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta-action"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Send size={18} />
              <span>WhatsApp (+62811-5003-018)</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

