import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ShoppingCart, 
  Award, 
  Smartphone, 
  Terminal, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles,
  Layers,
  ArrowUpRight,
  Code
} from 'lucide-react';

/**
 * ProjectsShowcase Component (Sticky Depth Layer & In-Card Interactive Sandbox)
 * 
 * Replaces generic 3-card rows with full-width stacked architectural cards.
 * Left Column: System architecture, relational schema, and highlights.
 * Right Column: "The One Live Thing" reactive in-card functional simulator.
 */
export function ProjectsShowcase({ lang, content }) {
  const { projects } = content;

  // --- E-Commerce Simulator State ---
  const ecomProducts = projects[0]?.interactiveSimulator?.demoProducts || [];
  const [cart, setCart] = useState([
    { id: 1, name: "Buku Pemrograman Web Modern", price: 125000, qty: 1 }
  ]);
  const [cartSuccess, setCartSuccess] = useState(false);

  const addToCart = (product) => {
    setCartSuccess(false);
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCartSuccess(false);
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setCartSuccess(false);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  // --- Student Achievement Portal Simulator State ---
  const portalRecords = projects[1]?.interactiveSimulator?.records || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('Semua');

  const filteredRecords = useMemo(() => {
    return portalRecords.filter((rec) => {
      const matchTier = selectedTier === 'Semua' || rec.tier === selectedTier;
      const matchQuery =
        rec.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.field.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTier && matchQuery;
    });
  }, [portalRecords, searchQuery, selectedTier]);

  // --- Mobile App Simulator State ---
  const mobileScreens = projects[2]?.interactiveSimulator?.screens || [];
  const [activeMobileScreen, setActiveMobileScreen] = useState(0);

  // --- Python Algorithm Simulator State ---
  const pythonSnippets = projects[3]?.interactiveSimulator?.snippets || [];
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);

  return (
    <section id="proyek" className="projects-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head">
          <h2 className="section-headline">
            {lang === 'id' ? "Karya Rekayasa Perangkat Lunak" : "Featured Engineering Systems"}
          </h2>
          <p className="section-sub">
            {lang === 'id'
              ? "Empat implementasi perangkat lunak nyata dengan studi kasus arsitektur di sisi kiri dan simulator fungsional yang dapat Anda uji langsung di sisi kanan."
              : "Four real-world software implementations featuring architectural specs on the left and responsive functional sandboxes on the right."}
          </p>
        </div>

        {/* Sticky Projects Stack */}
        <div className="sticky-projects-stack">
          
          {/* ================= PROJECT 01: E-COMMERCE PLATFORM ================= */}
          {projects[0] && (
            <article className="sticky-project-card" style={{ zIndex: 10 }}>
              <div className="project-card-grid">
                
                {/* Left: Architecture & Specs */}
                <div className="project-spec-col">
                  <div>
                    <div className="project-index">01 / 04 · {projects[0].category}</div>
                    <h3 className="project-title">{projects[0].title[lang]}</h3>
                    <p className="project-desc">{projects[0].description[lang]}</p>
                    
                    <ul className="project-highlights-list">
                      {projects[0].highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="highlight-icon" />
                          <span>{h[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tags-wrap">
                    {projects[0].stack.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: In-Card Interactive Sandbox */}
                <div className="project-sandbox-col">
                  <div className="sandbox-header">
                    <span className="sandbox-title">Live POS & Cart Simulator</span>
                    <span className="sandbox-badge mono-data">Laravel MVC Reactive State</span>
                  </div>

                  <div className="ecom-sandbox-products">
                    {ecomProducts.slice(0, 4).map((p) => (
                      <div key={p.id} className="ecom-product-card">
                        <div>
                          <div className="ecom-product-name">{p.name}</div>
                          <div className="ecom-product-price">
                            Rp {p.price.toLocaleString('id-ID')}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn-ecom-add"
                          onClick={() => addToCart(p)}
                        >
                          + Tambah
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Total & Items Bar */}
                  <div className="ecom-cart-bar">
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Item di Keranjang: <strong style={{ color: '#7dd3fc' }}>{cart.reduce((a, b) => a + b.qty, 0)}</strong>
                      </div>
                      <div className="ecom-cart-total">
                        Total: Rp {cartTotal.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={clearCart}
                        style={{ fontSize: '0.75rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 10px', borderRadius: '4px' }}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setCartSuccess(true)}
                        style={{ fontSize: '0.75rem', color: '#080c14', background: '#7dd3fc', fontWeight: '700', padding: '5px 12px', borderRadius: '4px' }}
                      >
                        {cartSuccess ? "✓ Berhasil!" : "Checkout"}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </article>
          )}

          {/* ================= PROJECT 02: STUDENT ACHIEVEMENT PORTAL ================= */}
          {projects[1] && (
            <article className="sticky-project-card" style={{ zIndex: 11 }}>
              <div className="project-card-grid">
                
                {/* Left: Architecture & Specs */}
                <div className="project-spec-col">
                  <div>
                    <div className="project-index">02 / 04 · {projects[1].category}</div>
                    <h3 className="project-title">{projects[1].title[lang]}</h3>
                    <p className="project-desc">{projects[1].description[lang]}</p>
                    
                    <ul className="project-highlights-list">
                      {projects[1].highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="highlight-icon" />
                          <span>{h[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tags-wrap">
                    {projects[1].stack.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: In-Card Interactive Sandbox */}
                <div className="project-sandbox-col">
                  <div className="sandbox-header">
                    <span className="sandbox-title">Indexed Records Query Inspector</span>
                    <span className="sandbox-badge mono-data">Relational MySQL Query</span>
                  </div>

                  {/* Search and Filter Controls */}
                  <div className="portal-search-bar">
                    <input
                      type="text"
                      className="portal-input"
                      placeholder="Cari siswa, kejuaraan, bidang..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                      className="portal-input"
                      style={{ maxWidth: '120px' }}
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                    >
                      <option value="Semua">Semua Tingkat</option>
                      <option value="Nasional">Nasional</option>
                      <option value="Provinsi">Provinsi</option>
                      <option value="Regional">Regional</option>
                      <option value="Kota">Kota</option>
                    </select>
                  </div>

                  {/* Record List */}
                  <div className="portal-records-list">
                    {filteredRecords.map((rec) => (
                      <div key={rec.id} className="portal-record-card">
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f8fafc' }}>
                            {rec.student}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            {rec.competition} · {rec.year}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.7rem', color: '#7dd3fc', background: 'rgba(125,211,252,0.12)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '3px' }}>
                            {rec.tier}
                          </span>
                          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: '600' }}>
                            {rec.rank}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </article>
          )}

          {/* ================= PROJECT 03: MOBILE PORTFOLIO APP ================= */}
          {projects[2] && (
            <article className="sticky-project-card" style={{ zIndex: 12 }}>
              <div className="project-card-grid">
                
                {/* Left: Architecture & Specs */}
                <div className="project-spec-col">
                  <div>
                    <div className="project-index">03 / 04 · {projects[2].category}</div>
                    <h3 className="project-title">{projects[2].title[lang]}</h3>
                    <p className="project-desc">{projects[2].description[lang]}</p>
                    
                    <ul className="project-highlights-list">
                      {projects[2].highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="highlight-icon" />
                          <span>{h[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tags-wrap">
                    {projects[2].stack.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: In-Card Interactive Sandbox */}
                <div className="project-sandbox-col">
                  <div className="sandbox-header">
                    <span className="sandbox-title">Flutter Native Device Preview</span>
                    <span className="sandbox-badge mono-data">60 FPS Stateful Provider</span>
                  </div>

                  <div className="mobile-device-mockup">
                    <div className="mobile-mock-screen">
                      <div style={{ fontSize: '0.7rem', color: '#7dd3fc', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {mobileScreens[activeMobileScreen]?.badge} Screen
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: '#f8fafc', marginBottom: '6px' }}>
                        {mobileScreens[activeMobileScreen]?.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '12px' }}>
                        {mobileScreens[activeMobileScreen]?.summary}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                        {mobileScreens[activeMobileScreen]?.stats}
                      </div>
                    </div>

                    <div className="mobile-tabs-nav">
                      {mobileScreens.map((screen, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`btn-mobile-tab ${activeMobileScreen === idx ? 'active' : ''}`}
                          onClick={() => setActiveMobileScreen(idx)}
                        >
                          {screen.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </article>
          )}

          {/* ================= PROJECT 04: PYTHON ALGORITHMS & LOGIC ================= */}
          {projects[3] && (
            <article className="sticky-project-card" style={{ zIndex: 13 }}>
              <div className="project-card-grid">
                
                {/* Left: Architecture & Specs */}
                <div className="project-spec-col">
                  <div>
                    <div className="project-index">04 / 04 · {projects[3].category}</div>
                    <h3 className="project-title">{projects[3].title[lang]}</h3>
                    <p className="project-desc">{projects[3].description[lang]}</p>
                    
                    <ul className="project-highlights-list">
                      {projects[3].highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="highlight-icon" />
                          <span>{h[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tags-wrap">
                    {projects[3].stack.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: In-Card Interactive Sandbox */}
                <div className="project-sandbox-col">
                  <div className="sandbox-header">
                    <span className="sandbox-title">Algorithmic Pipeline Inspector</span>
                    <span className="sandbox-badge mono-data">Telkom Lab Assistant Suite</span>
                  </div>

                  {/* Snippet Selector Tabs */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    {pythonSnippets.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSnippetIndex(idx)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                          background: activeSnippetIndex === idx ? 'var(--accent-subtle)' : 'var(--bg-surface)',
                          color: activeSnippetIndex === idx ? 'var(--accent)' : 'var(--text-muted)',
                          fontWeight: activeSnippetIndex === idx ? '700' : '500'
                        }}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>

                  <div className="python-code-box">
                    <div style={{ color: '#64748b', marginBottom: '8px' }}>
                      # Python 3.10 — Asisten Praktikum Algoritma Telkom University
                    </div>
                    <div>
                      <span style={{ color: '#7dd3fc' }}>def</span>{' '}
                      <span style={{ color: '#f8fafc', fontWeight: '600' }}>
                        {activeSnippetIndex === 0 ? "binary_search" : activeSnippetIndex === 1 ? "traverse_tree" : "api_handler"}
                      </span>
                      (data, query):
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      <span style={{ color: '#94a3b8' }}># Complexity: </span>
                      <span style={{ color: '#38bdf8', fontWeight: '700' }}>
                        {pythonSnippets[activeSnippetIndex]?.complexity || "O(log n)"}
                      </span>
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      low, high = 0, len(data) - 1
                    </div>
                    <div style={{ paddingLeft: '16px' }}>
                      while low &lt;= high:
                    </div>
                    <div style={{ paddingLeft: '32px' }}>
                      mid = (low + high) // 2
                    </div>
                    <div style={{ paddingLeft: '32px' }}>
                      if data[mid] == query: <span style={{ color: '#7dd3fc' }}>return</span> mid
                    </div>
                    <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#34d399', fontSize: '0.75rem' }}>
                      ✓ Syntax verified · Executed in Telkom Lab environment
                    </div>
                  </div>
                </div>

              </div>
            </article>
          )}

        </div>

      </div>
    </section>
  );
}
