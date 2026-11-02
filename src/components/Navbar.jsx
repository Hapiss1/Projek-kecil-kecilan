import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  ArrowUpRight,
  Menu,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

/**
 * Navbar Component (HUD Minimalist Architecture)
 * Persistent fixed header that tracks scrolling with frosted glassmorphic backdrop.
 */
export function Navbar({ lang = 'id', setLang, content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // 1. Persistent Scroll State Tracking
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(offset > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
            <a 
              href="#" 
              className="nav-brand-name"
              onMouseEnter={() => soundEngine.playHoverTick()}
              onClick={() => soundEngine.playMechanicalClick()}
            >
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
                <a 
                  href={link.href}
                  onMouseEnter={() => soundEngine.playHoverTick()}
                  onClick={() => soundEngine.playMechanicalClick()}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </nav>

          {/* Right Action: Sound Toggle + Language + Connect CTA + Mobile Menu */}
          <div className="nav-actions-group">
            {/* Subtle UI Audio Toggle (Web Audio API Synthesizer) */}
            <button
              type="button"
              className={`btn-sound-toggle ${soundActive ? 'is-active' : ''}`}
              onClick={() => {
                const active = soundEngine.toggleSound();
                setSoundActive(active);
              }}
              title={soundActive ? "Nonaktifkan Micro-Audio" : "Aktifkan Subtle UI Micro-Audio (Web Audio API)"}
              aria-label="Toggle micro audio"
            >
              {soundActive ? <Volume2 size={15} color="#7dd3fc" /> : <VolumeX size={15} />}
            </button>

            {/* Language Toggle */}
            <button
              type="button"
              className="btn-lang-toggle"
              onClick={() => {
                soundEngine.playMechanicalClick();
                setLang(lang === 'id' ? 'en' : 'id');
              }}
              onMouseEnter={() => soundEngine.playHoverTick()}
              title={lang === 'id' ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <Languages size={14} />
              <span className="mono-data">{lang.toUpperCase()}</span>
            </button>

            {/* Direct Connect CTA */}
            <a
              href={`https://wa.me/${content.personal.phoneClean}?text=Halo%20Hafizh,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav-talk"
              onMouseEnter={() => soundEngine.playHoverTick()}
              onClick={() => soundEngine.playMechanicalClick()}
            >
              <span>{lang === 'id' ? "Hubungi" : "Let's Talk"}</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playMechanicalClick();
                setMobileOpen(!mobileOpen);
              }}
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
                  onClick={() => {
                    soundEngine.playMechanicalClick();
                    setMobileOpen(false);
                  }}
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
