import React from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  CheckCircle2, 
  Briefcase,
  GraduationCap
} from 'lucide-react';

export function CvModal({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  const { personal, education } = content;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Toolbar */}
        <div className="cv-modal-toolbar">
          <div className="toolbar-info">
            <span className="doc-type-badge">ATS FORMATTED RESUME</span>
            <span className="doc-name">{personal.name}.pdf</span>
          </div>

          <div className="toolbar-buttons">
            <button
              type="button"
              className="btn-print-cv"
              onClick={handlePrint}
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer size={16} />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              className="btn-close-modal"
              onClick={onClose}
              aria-label="Tutup Pratinjau CV"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Paper Container (Standard ATS Format) */}
        <div className="cv-paper-sheet printable-area">
          
          {/* Header */}
          <header className="cv-sheet-header">
            <h1 className="cv-candidate-name">{personal.name}</h1>
            <div className="cv-contact-row">
              <span>{personal.phone}</span>
              <span className="sep">·</span>
              <span>{personal.email}</span>
              <span className="sep">·</span>
              <span>{personal.location}</span>
            </div>
          </header>

          <hr className="cv-rule" />

          {/* Tentang Saya */}
          <section className="cv-section">
            <h2 className="cv-section-title">Tentang Saya</h2>
            <p className="cv-paragraph">
              Saya adalah siswa jurusan Rekayasa Perangkat Lunak (RPL) yang memiliki minat tinggi dalam pengembangan perangkat lunak dan teknologi digital. Terbiasa mengerjakan proyek berbasis website dan aplikasi menggunakan bahasa pemrograman seperti HTML, CSS, PHP, dan Laravel. Memiliki pengalaman dalam mengerjakan proyek individu dan kelompok. Saya berharap dengan adanya Praktik Kerja Lapangan (PKL) bisa memperoleh pengalaman di dunia kerja.
            </p>
          </section>

          <hr className="cv-rule" />

          {/* Pendidikan */}
          <section className="cv-section">
            <h2 className="cv-section-title">Pendidikan</h2>
            <div className="cv-edu-entry">
              <div className="cv-entry-head">
                <strong>{education.institution}</strong>
                <span className="mono-num">{education.period}</span>
              </div>
              <div className="cv-entry-sub">Jurusan Rekayasa Perangkat Lunak</div>
            </div>
          </section>

          <hr className="cv-rule" />

          {/* Keahlian Teknis */}
          <section className="cv-section">
            <h2 className="cv-section-title">Keahlian</h2>
            <ul className="cv-bullet-list">
              <li>Flutter (dart) & Firebase</li>
              <li>HTML, CSS</li>
              <li>PHP & Laravel</li>
              <li>MySQL & Firestore</li>
              <li>UI/UX Design (Figma, Canva)</li>
            </ul>
          </section>

          <hr className="cv-rule" />

          {/* Soft Skill & Bahasa */}
          <div className="cv-split-cols">
            <section className="cv-section">
              <h2 className="cv-section-title">Soft Skill</h2>
              <ul className="cv-bullet-list">
                <li>Kerja Tim</li>
                <li>Komunikasi</li>
              </ul>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">Bahasa</h2>
              <ul className="cv-bullet-list">
                <li>Bahasa Indonesia</li>
                <li>Bahasa Inggris</li>
              </ul>
            </section>
          </div>

          <hr className="cv-rule" />

          {/* Proyek Sekolah */}
          <section className="cv-section">
            <h2 className="cv-section-title">Proyek Sekolah</h2>
            <ul className="cv-bullet-list">
              <li>
                <strong>Website E-commerce</strong>: Membuat Website E-commerce menjual produk seperti buku, peralatan komputer, dan juga sepatu.
              </li>
              <li>
                <strong>Website Prestasi Siswa/Siswi</strong>: Membuat Website prestasi siswa/siswi yang memiliki prestasi sebagai dokumentasi sekolah.
              </li>
              <li>
                <strong>Aplikasi Portofolio</strong>: Membuat Aplikasi Portofolio. Aplikasi ini bertujuan agar pengguna dapat menampilkan profil, pekerjaan, dan keterampilan.
              </li>
            </ul>
          </section>

        </div>

      </div>
    </div>
  );
}

