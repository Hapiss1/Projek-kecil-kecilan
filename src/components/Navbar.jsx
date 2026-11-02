import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Languages, 
  Menu, 
  X, 
  ArrowUpRight 
} from 'lucide-react';

/**
 * Navbar Component (HUD Minimalist Architecture)
 * Left: Identity & Live Bandung Time (WIB)
 * Center: Clean navigation links
 * Right: Availability, Language Switcher, ATS CV Modal Trigger
 */
export function Navbar({ lang, setLang, content, onOpenCv }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Scroll listener for subtle tone-step background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Bandung Time (WIB, UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Jakarta (WIB)
      const formatted = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setTimeStr(`${formatted} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "#proyek", label: lang === 'id' ? "Karya & Rekayasa" : "Projects" },
    { href: "#keahlian", label: lang === 'id' ? "Keahlian" : "Skills" },
    { href: "#pendidikan", label: lang === 'id' ? "Pendidikan" : "Education" },
    { href: "#kontak", label: lang === 'id' ? "Kontak" : "Contact" },
  ];

  return (
    <header className={`navbar-hud ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          
          {/* Brand & Live Bandung Time HUD */}
          <div className="nav-brand-group">
            <a href="#" className="nav-brand-name">
              {content.personal.shortName}
            </a>
            <div className="nav-live-status" title="Zona Waktu Bandung, Jawa Barat (WIB)">
              <span className="live-pulse-dot" />
              <span className="mono-data">{timeStr || "Bandung, ID"}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-menu" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-link-item">
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </nav>

          {/* Actions: Lang toggle + ATS CV button */}
          <div className="nav-actions-group">
            <button
              type="button"
              className="btn-lang-toggle"
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              title={lang === 'id' ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
              aria-label="Pilih Bahasa"
            >
              <Languages size={14} />
              <span className="mono-data">{lang.toUpperCase()}</span>
            </button>

            <button
              type="button"
              className="btn-cv-trigger"
              onClick={onOpenCv}
              title="Pratinjau & Cetak CV ATS"
            >
              <FileText size={15} />
              <span>CV ATS</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu navigasi"
              style={{ display: 'none', color: '#f8fafc', padding: '6px' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
