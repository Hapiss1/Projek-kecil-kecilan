import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

/**
 * Navbar Component (HUD Minimalist Architecture)
 * Persistent fixed header that tracks scrolling with frosted glassmorphic backdrop.
 */
export function Navbar({ lang = 'id', setLang, content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // 1. Persistent Scroll State Tracking
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(offset > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Real-time Bandung WIB Clock
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
    { href: "#keahlian", label: lang === 'id' ? "Keahlian" : "Capabilities" },
    { href: "#pendidikan", label: lang === 'id' ? "Pendidikan" : "Education" },
    { href: "#kontak", label: lang === 'id' ? "Kontak" : "Contact" },
  ];

  return (
    <header className={`navbar-hud ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          
          {/* Brand & Live Status */}
          <div className="nav-brand-group">
            <a href="#" className="nav-brand-name">
              {content.personal.shortName}
            </a>
            <div className="nav-live-status">
              <span className="live-pulse-dot" />
              <span className="mono-data">
                Bandung · {timeStr}
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="nav-links-menu" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-link-item">
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </nav>

          {/* Right Action: Language + Connect CTA + Mobile Menu Button */}
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
            >
              <span>{lang === 'id' ? "Hubungi" : "Let's Talk"}</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-mobile-toggle"
              aria-label="Buka menu navigasi"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="nav-mobile-dropdown">
            <div className="nav-mobile-links">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
