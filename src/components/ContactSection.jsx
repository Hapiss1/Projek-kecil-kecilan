import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  MapPin, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';

/**
 * ContactSection Component (Awwwards HUD Minimalist Architecture)
 * Direct communication channels: WhatsApp, Email, and Copy Contact.
 */
export function ContactSection({ lang = 'id', content }) {
  const { personal } = content;
  const sectionRef = useRef(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-contact-box',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    <section id="kontak" ref={sectionRef} className="contact-section">
      <div className="container">
        
        <div className="contact-card-box reveal-contact-box">
          <div className="mono-sub accent-tag" style={{ marginBottom: '16px' }}>
            {lang === 'id' ? "04 // SALURAN KOMUNIKASI LANGSUNG" : "04 // DIRECT COMMUNICATIONS"}
          </div>

          <h2 className="editorial-section-title" style={{ marginBottom: '16px', maxWidth: '20ch', marginLeft: 'auto', marginRight: 'auto' }}>
            {lang === 'id' ? "Mari Membangun Solusi Bersama." : "Let's Engineer Software Together."}
          </h2>

          <p className="contact-desc-text">
            {lang === 'id'
              ? "Terbuka untuk peluang magang, proyek rekayasa perangkat lunak web dan mobile berkinerja tinggi, atau diskusi seputar sistem informasi enterprise."
              : "Open for professional internship opportunities, high-performance web & mobile software engineering, or enterprise systems discussion."}
          </p>

          <div className="contact-location-tag">
            <MapPin size={15} className="accent-pin" />
            <span>{personal.location}</span>
          </div>

          <div className="contact-actions-row">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${personal.phoneClean}?text=Halo%20Hafizh,%20saya%20tertarik%20dengan%20portofolio%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
            >
              <MessageSquare size={17} />
              <span>WhatsApp: {personal.phone}</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Email */}
            <a
              href={`mailto:${personal.email}`}
              className="btn-secondary-action"
            >
              <Mail size={17} />
              <span>{personal.email}</span>
            </a>

            {/* Copy Email Button */}
            <button
              type="button"
              onClick={() => copyToClipboard(personal.email, 'email')}
              className="btn-copy-action"
              title="Salin Alamat Email"
            >
              {copiedEmail ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
              <span>{copiedEmail ? (lang === 'id' ? "Email Tersalin!" : "Email Copied!") : (lang === 'id' ? "Salin Email" : "Copy Email")}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
