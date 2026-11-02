import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  MapPin, 
  ArrowUpRight 
} from 'lucide-react';

/**
 * ContactSection Component (HUD Minimalist Architecture)
 * Direct communication channels: WhatsApp, Email, and Copy Contact.
 */
export function ContactSection({ lang, content }) {
  const { personal } = content;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="kontak" className="contact-section">
      <div className="container">
        
        <div className="contact-card-box">
          <div style={{ fontSize: '0.85rem', color: '#7dd3fc', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', fontFamily: 'var(--font-mono)' }}>
            {lang === 'id' ? "Saluran Komunikasi Langsung" : "Direct Communications"}
          </div>

          <h2 className="section-headline" style={{ marginBottom: '16px' }}>
            {lang === 'id' ? "Mari Membangun Solusi Bersama." : "Let's Engineer Software Together."}
          </h2>

          <p style={{ margin: '0 auto 24px', fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6', maxWidth: '58ch' }}>
            {lang === 'id'
              ? "Terbuka untuk peluang magang kejuruan, kolaborasi rekayasa perangkat lunak web dan mobile, atau diskusi seputar sistem informasi enterprise."
              : "Open for professional internship opportunities, software engineering collaboration, or discussions on enterprise information systems."}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '28px' }}>
            <MapPin size={15} color="#7dd3fc" />
            <span>{personal.location} (Bandung, Jawa Barat)</span>
          </div>

          <div className="contact-actions-row">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${personal.phoneClean}?text=Halo%20Hafizh,%20saya%20melihat%20portofolio%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-contact-wa"
            >
              <Phone size={17} />
              <span>WhatsApp: {personal.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${personal.email}`}
              className="btn-contact-email"
            >
              <Mail size={17} />
              <span>{personal.email}</span>
            </a>

            {/* Copy Email Button */}
            <button
              type="button"
              onClick={() => copyToClipboard(personal.email, 'email')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--bg-surface-elevated)',
                color: '#cbd5e1',
                border: '1px solid var(--border-subtle)',
                padding: '12px 18px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}
            >
              {copiedEmail ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
              <span>{copiedEmail ? "Email Tersalin!" : "Salin Email"}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
