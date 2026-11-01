import React from 'react';
import { 
  ExternalLink, 
  Layers, 
  Database, 
  CheckCircle2, 
  Cpu, 
  Smartphone, 
  ShoppingCart, 
  Award,
  ArrowUpRight
} from 'lucide-react';

export function ProjectsShowcase({ lang, content }) {
  const { projects } = content;

  return (
    <section id="proyek" className="projects-showcase-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-wrap">
          <h2 className="section-headline">
            {lang === 'id' ? "Karya & Rekayasa Proyek Sekolah" : "Featured Engineering Projects"}
          </h2>
          <p className="section-lead">
            {lang === 'id'
              ? "Tiga implementasi perangkat lunak nyata yang dibangun selama studi di SMK Telkom Banjarbaru, mencakup sistem web fullstack hingga aplikasi mobile cross-platform."
              : "Three real-world software implementations developed during vocational studies at SMK Telkom Banjarbaru, spanning fullstack web portals to cross-platform mobile apps."}
          </p>
        </div>

        {/* ALTERNATING GEOMETRY - Project 1: Wide Architecture Showcase (E-Commerce) */}
        {projects[0] && (
          <article className="project-feature-wide">
            <div className="feature-wide-grid">
              
              <div className="feature-wide-content">
                <div className="project-type-tag">
                  <ShoppingCart size={15} />
                  <span>{projects[0].tag}</span>
                </div>

                <h3 className="project-headline-title">
                  {projects[0].title[lang]}
                </h3>

                <p className="project-sub-summary">
                  {projects[0].description[lang]}
                </p>

                {/* Highlights List */}
                <div className="project-highlights-block">
                  <h4 className="highlights-caption">
                    {lang === 'id' ? "Poin Penting & Implementasi:" : "Technical Highlights:"}
                  </h4>
                  <ul className="highlights-list">
                    {projects[0].highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={16} className="highlight-check" />
                        <span>{h[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="project-stack-wrap">
                  {projects[0].stack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-cta-inline">
                  <a href="#workbench" className="btn-inline-sim">
                    <span>{lang === 'id' ? "Uji di Live Workbench" : "Simulate in Workbench"}</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Graphic Spec Panel */}
              <div className="feature-wide-visual">
                <div className="arch-blueprint-card">
                  <div className="blueprint-top">
                    <span className="bp-label">SYSTEM_SPECIFICATION: ECO-STORE</span>
                    <span className="bp-status">MVC_LARAVEL</span>
                  </div>

                  <div className="bp-body">
                    <div className="bp-row">
                      <span className="bp-key">Kategori Produk</span>
                      <span className="bp-val">Buku · Peralatan Komputer · Sepatu</span>
                    </div>
                    <div className="bp-row">
                      <span className="bp-key">Arsitektur</span>
                      <span className="bp-val">{projects[0].architecture}</span>
                    </div>
                    <div className="bp-row">
                      <span className="bp-key">Database Schema</span>
                      <span className="bp-val">MySQL Relasional (Users, Categories, Products, Carts)</span>
                    </div>
                    <div className="bp-row">
                      <span className="bp-key">Fitur Inti</span>
                      <span className="bp-val">Filter Dinamis, Hitung Subtotal, Keranjang Belanja</span>
                    </div>
                  </div>

                  <div className="bp-code-mock">
                    <div className="bp-code-header">
                      <span>routes/web.php</span>
                    </div>
                    <pre className="bp-code-pre">
{`Route::get('/catalog', [ProductController::class, 'index']);
Route::post('/cart/add', [CartController::class, 'store']);
Route::post('/checkout', [OrderController::class, 'process']);`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </article>
        )}

        {/* ALTERNATING GEOMETRY - Project 2: Split Editorial Layout (Portal Prestasi Siswa) */}
        {projects[1] && (
          <article className="project-feature-split">
            <div className="feature-split-grid">
              
              {/* Visual Panel Left */}
              <div className="feature-split-visual">
                <div className="portal-mock-display">
                  <div className="portal-mock-header">
                    <Award size={18} className="award-icon" />
                    <span>SMK Telkom Banjarbaru · Achievement Repository</span>
                  </div>
                  <div className="portal-mock-body">
                    <div className="mock-stat-grid">
                      <div className="mock-stat-box">
                        <span className="mock-num mono-num">100+</span>
                        <span className="mock-lbl">Arsip Prestasi</span>
                      </div>
                      <div className="mock-stat-box">
                        <span className="mock-num mono-num">3</span>
                        <span className="mock-lbl">Tingkatan Kompetisi</span>
                      </div>
                    </div>
                    <div className="mock-recent-title">Arsip Terbaru Terverifikasi:</div>
                    <div className="mock-record-pill">
                      <strong>LKS Web Tech</strong> · Juara 1 Tingkat Provinsi
                    </div>
                    <div className="mock-record-pill">
                      <strong>Olimpiade Jaringan IT</strong> · Juara 2 Nasional
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Right */}
              <div className="feature-split-content">
                <div className="project-type-tag">
                  <Award size={15} />
                  <span>{projects[1].tag}</span>
                </div>

                <h3 className="project-headline-title">
                  {projects[1].title[lang]}
                </h3>

                <p className="project-sub-summary">
                  {projects[1].description[lang]}
                </p>

                <div className="project-highlights-block">
                  <h4 className="highlights-caption">
                    {lang === 'id' ? "Poin Penting & Implementasi:" : "Technical Highlights:"}
                  </h4>
                  <ul className="highlights-list">
                    {projects[1].highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={16} className="highlight-check" />
                        <span>{h[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-stack-wrap">
                  {projects[1].stack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-cta-inline">
                  <a href="#workbench" className="btn-inline-sim">
                    <span>{lang === 'id' ? "Buka Filter Data di Simulator" : "Inspect Data in Simulator"}</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

            </div>
          </article>
        )}

        {/* ALTERNATING GEOMETRY - Project 3: Mobile Showcase Centric (Flutter App) */}
        {projects[2] && (
          <article className="project-feature-mobile-centric">
            <div className="mobile-centric-grid">
              
              <div className="mobile-centric-content">
                <div className="project-type-tag">
                  <Smartphone size={15} />
                  <span>{projects[2].tag}</span>
                </div>

                <h3 className="project-headline-title">
                  {projects[2].title[lang]}
                </h3>

                <p className="project-sub-summary">
                  {projects[2].description[lang]}
                </p>

                <div className="project-highlights-block">
                  <h4 className="highlights-caption">
                    {lang === 'id' ? "Poin Penting & Implementasi:" : "Technical Highlights:"}
                  </h4>
                  <ul className="highlights-list">
                    {projects[2].highlights.map((h, i) => (
                      <li key={i} className="highlight-item">
                        <CheckCircle2 size={16} className="highlight-check" />
                        <span>{h[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-stack-wrap">
                  {projects[2].stack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-cta-inline">
                  <a href="#workbench" className="btn-inline-sim">
                    <span>{lang === 'id' ? "Buka Simulasi Smartphone" : "Launch Phone Simulation"}</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Visual Mobile Cards Spec */}
              <div className="mobile-centric-cards">
                <div className="mobile-spec-box">
                  <div className="spec-item">
                    <span className="spec-title">Cross-Platform Framework</span>
                    <span className="spec-val">Flutter SDK 3.x (Single Codebase untuk Android & iOS)</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-title">Cloud Storage & Sync</span>
                    <span className="spec-val">Google Firebase Cloud Firestore (NoSQL Real-Time Collections)</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-title">Design to Code Process</span>
                    <span className="spec-val">Figma Component System diubah menjadi Modular Flutter Widgets</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-title">Performa Rendering</span>
                    <span className="spec-val">60 FPS Native Graphics Pipeline</span>
                  </div>
                </div>
              </div>

            </div>
          </article>
        )}

      </div>
    </section>
  );
}

