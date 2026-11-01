import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export function ContactSection({ lang, content }) {
  const { personal } = content;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick message form state
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [messageType, setMessageType] = useState('PKL / Magang');
  const [messageNotes, setMessageNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleSendMessage = (channel) => {
    const greeting = lang === 'id' 
      ? `Halo Hafizh, saya ${senderName || 'Rekan'} dari ${senderOrg || 'Industri'}. Ingin mendiskusikan topik: ${messageType}. ${messageNotes}`
      : `Hi Hafizh, I am ${senderName || 'Partner'} from ${senderOrg || 'Company'}. Interested in discussing: ${messageType}. ${messageNotes}`;

    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/${personal.phoneClean}?text=${encodeURIComponent(greeting)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } else {
      const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(`[Inquiry] ${messageType} - ${senderName}`)}&body=${encodeURIComponent(greeting)}`;
      window.location.href = mailtoUrl;
    }
    setFormSubmitted(true);
  };

  return (
    <section id="kontak" className="contact-section">
      <div className="container">
        
        {/* Section Headline */}
        <div className="section-head-wrap">
          <h2 className="section-headline">
            {lang === 'id' ? "Koneksi & Diskusi Proyek" : "Connect & Industrial Placement"}
          </h2>
          <p className="section-lead">
            {lang === 'id'
              ? "Tertarik mengundang Hafizh untuk Praktik Kerja Lapangan (PKL), proyek software web & mobile, atau sekadar berdiskusi teknologi?"
              : "Interested in offering an internship position, discussing software collaboration, or exchanging tech insights?"}
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Direct Info Cards */}
          <div className="contact-cards-col">
            
            {/* Email Card */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <Mail size={20} />
              </div>
              <div className="method-info">
                <span className="method-label">Email Korespondensi</span>
                <a href={`mailto:${personal.email}`} className="method-value">
                  {personal.email}
                </a>
              </div>
              <button
                type="button"
                className="copy-btn"
                onClick={() => copyToClipboard(personal.email, 'email')}
                title="Salin Email"
              >
                {copiedEmail ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copiedEmail ? "Tersalin" : "Salin"}</span>
              </button>
            </div>

            {/* Phone / WA Card */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <Phone size={20} />
              </div>
              <div className="method-info">
                <span className="method-label">WhatsApp & Telepon</span>
                <a 
                  href={`https://wa.me/${personal.phoneClean}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="method-value mono-num"
                >
                  {personal.phone}
                </a>
              </div>
              <button
                type="button"
                className="copy-btn"
                onClick={() => copyToClipboard(personal.phone, 'phone')}
                title="Salin Nomor WhatsApp"
              >
                {copiedPhone ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                <span>{copiedPhone ? "Tersalin" : "Salin"}</span>
              </button>
            </div>

            {/* Location Card */}
            <div className="contact-method-card">
              <div className="method-icon-wrap">
                <MapPin size={20} />
              </div>
              <div className="method-info">
                <span className="method-label">Domisili & Wilayah Kerja</span>
                <span className="method-value">{personal.location}</span>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="availability-card">
              <div className="avail-badge">
                <span className="avail-pulse"></span>
                <span>Status Saat Ini</span>
              </div>
              <h3 className="avail-heading">{personal.availability[lang]}</h3>
              <p className="avail-sub">
                {lang === 'id'
                  ? "Siap untuk penempatan di wilayah Banjarbaru, Banjarmasin sekitarnya, maupun skema Remote/Hybrid."
                  : "Ready for on-site placement in Banjarbaru/Banjarmasin area or remote/hybrid arrangements."}
              </p>
            </div>

          </div>

          {/* Right Column: Instant Message Composer */}
          <div className="contact-composer-col">
            <div className="composer-card">
              <div className="composer-header">
                <MessageSquare size={18} className="composer-icon" />
                <h3 className="composer-title">
                  {lang === 'id' ? "Kirim Pesan Cepat" : "Quick Message Dispatcher"}
                </h3>
              </div>

              <div className="composer-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'id' ? "Nama Anda / Perusahaan" : "Your Name / Organization"}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Contoh: HRD PT Digital Inovasi"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {lang === 'id' ? "Topik Pembahasan" : "Inquiry Topic"}
                    </label>
                    <select
                      className="form-select"
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                    >
                      <option value="Tawaran PKL / Magang">Tawaran PKL / Magang Industri</option>
                      <option value="Proyek Pembuatan Website / Aplikasi">Proyek Web / Mobile App</option>
                      <option value="Diskusi Teknis & Kolaborasi">Diskusi Teknis & Kolaborasi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {lang === 'id' ? "Catatan Tambahan (Opsional)" : "Additional Message (Optional)"}
                  </label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Tuliskan detail singkat tawaran magang, persyaratan, atau pertanyaan Anda..."
                    value={messageNotes}
                    onChange={(e) => setMessageNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="composer-actions">
                  <button
                    type="button"
                    className="btn-send-wa"
                    onClick={() => handleSendMessage('whatsapp')}
                  >
                    <Send size={16} />
                    <span>{lang === 'id' ? "Kirim via WhatsApp" : "Dispatch to WhatsApp"}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-send-email"
                    onClick={() => handleSendMessage('email')}
                  >
                    <Mail size={16} />
                    <span>{lang === 'id' ? "Buka di Email" : "Send via Email"}</span>
                  </button>
                </div>

                {formSubmitted && (
                  <div className="submit-feedback-note">
                    <Check size={16} />
                    <span>Aplikasi perpesanan telah dibuka dengan draf pesan otomatis.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
