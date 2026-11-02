import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

/**
 * Navbar Component (Dribbble Dymas Alfin Minimalist Style)
 * Minimal floating header with status indicator, clean navigation links, and direct contact trigger.
 */
export function Navbar({ lang, setLang, content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      setTimeStr(`${formatted} WIB`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { href: "#proyek", label: lang === 'id' ? "Karya Pilihan" : "Selected Works" },
    { href: "#keahlian", label: lang === 'id' ? "Layanan & Stack" : "Services" },
    { href: "#pendidikan", label: lang === 'id' ? "Pendidikan" : "Journey" },
    { href: "#kontak", label: lang === 'id' ? "Kontak" : "Contact" },
  ];

  return (
    <header className={`navbar-hud ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          
          {/* Brand & Availability Status */}
          <div className="nav-brand-group">
            <a href="#" className="nav-brand-name">
              {content.personal.shortName}
            </a>
            <div className="nav-live-status">
              <span className="live-pulse-dot" />
              <span className="mono-data" style={{ color: '#94a3b8' }}>
                Bandung · {timeStr}
              </span>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="nav-links-menu" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-link-item">
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </nav>

          {/* Right Action: Language + Connect CTA */}
          <div className="nav-actions-group">
            <button
              type="button"
              className="btn-lang-toggle"
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              title={lang === 'id' ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <Languages size={14} />
              <span className="mono-data">{lang.toUpperCase()}</span>
            </button>

            <a
              href={`https://wa.me/${content.personal.phoneClean}?text=Halo%20Hafizh,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-talk"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>{lang === 'id' ? "Hubungi" : "Let's Talk"}</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-mobile-toggle"
              style={{ display: 'none' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
