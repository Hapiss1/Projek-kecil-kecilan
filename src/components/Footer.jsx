import React from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Footer Component
 * Minimalist HUD baseline with copyright, Bandung live zone, and back-to-top trigger.
 */
export function Footer({ lang, content }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-bar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          © {new Date().getFullYear()} {content.personal.name}. All rights reserved.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Built with React 18, React Three Fiber & Lenis · Bandung, Indonesia
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#7dd3fc',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}
          >
            <span>{lang === 'id' ? "Kembali ke Atas" : "Back to top"}</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
