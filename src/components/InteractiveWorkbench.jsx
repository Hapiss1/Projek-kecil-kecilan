import React, { useState, useMemo } from 'react';
import { 
  Play, 
  ShoppingCart, 
  Search, 
  Smartphone, 
  Terminal, 
  Check, 
  Plus, 
  Minus, 
  Trash2, 
  Award, 
  Layers, 
  RotateCcw, 
  ExternalLink,
  Info,
  ChevronRight,
  BookOpen,
  Cpu,
  Package,
  Sparkles,
  Send
} from 'lucide-react';

export function InteractiveWorkbench({ lang, content }) {
  const [activeTab, setActiveTab] = useState('ecommerce'); // 'ecommerce' | 'portal' | 'mobile'

  // --- E-Commerce Simulator State ---
  const ecommerceData = content.projects.find(p => p.id === 'ecommerce-platform')?.interactiveSimulator?.demoProducts || [];
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [cart, setCart] = useState([
    { id: 1, name: "Buku Pemrograman Web Modern", price: 125000, qty: 1 }
  ]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Semua') return ecommerceData;
    return ecommerceData.filter(item => item.category === selectedCategory);
  }, [selectedCategory, ecommerceData]);

  const addToCart = (product) => {
    setCheckoutComplete(false);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCheckoutComplete(false);
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutComplete(false);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutComplete(true);
  };

  // --- Student Achievement Portal State ---
  const portalRecords = content.projects.find(p => p.id === 'prestasi-siswa')?.interactiveSimulator?.records || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('Semua');

  const filteredRecords = useMemo(() => {
    return portalRecords.filter(rec => {
      const matchTier = selectedTier === 'Semua' || rec.tier === selectedTier;
      const matchQuery = 
        rec.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.field.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTier && matchQuery;
    });
  }, [portalRecords, searchQuery, selectedTier]);

  // --- Mobile App Simulator State ---
  const mobileScreens = content.projects.find(p => p.id === 'mobile-portfolio')?.interactiveSimulator?.screens || [];
  const [activeMobileTab, setActiveMobileTab] = useState(0);

  // --- Terminal State ---
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: "Hafizh Dev Environment v2.4 initialized. Type 'help' or click presets below." }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  const executeCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    let responseText = "";

    switch(cmd) {
      case 'help':
        responseText = "Available commands: 'about', 'skills', 'projects', 'contact', 'pkl', 'clear'";
        break;
      case 'about':
        responseText = `${content.personal.name} - ${content.personal.school} (Rekayasa Perangkat Lunak). Berfokus pada Web & Mobile Development.`;
        break;
      case 'skills':
        responseText = "Keahlian Utama: Flutter (Dart), Laravel (PHP), MySQL, Firebase Firestore, HTML5/CSS3, Figma.";
        break;
      case 'projects':
        responseText = "1. Website E-Commerce (PHP/Laravel)\n2. Portal Prestasi Siswa Telkom (Laravel/MySQL)\n3. Aplikasi Portofolio Mobile (Flutter/Firebase)";
        break;
      case 'pkl':
        responseText = "Status: SIAP & TERSEDIA untuk Praktik Kerja Lapangan (PKL) / Magang Industri di Banjarbaru maupun Remote/Hybrid.";
        break;
      case 'contact':
        responseText = `Email: ${content.personal.email} | WhatsApp: ${content.personal.phone}`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        responseText = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: 'user', text: `$ ${cmdStr}` },
      { type: 'output', text: responseText }
    ]);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput);
  };

  return (
    <section id="workbench" className="workbench-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-wrap">
          <h2 className="section-headline">
            {lang === 'id' ? "Laboratorium Simulasi Proyek" : "Interactive Project Sandbox"}
          </h2>
          <p className="section-lead">
            {lang === 'id' 
              ? "Uji fungsionalitas dan logika alur data dari tiga proyek nyata Muhammad Hafizh Farsya secara langsung di browser Anda."
              : "Directly experience the functionality and data architecture of Hafizh's core projects inside this live interactive workbench."}
          </p>
        </div>

        {/* Workbench Container Frame */}
        <div className="workbench-frame">
          
          {/* Top Control Bar */}
          <div className="workbench-toolbar">
            <div className="workbench-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'ecommerce'}
                className={`wb-tab-btn ${activeTab === 'ecommerce' ? 'wb-tab-active' : ''}`}
                onClick={() => setActiveTab('ecommerce')}
              >
                <ShoppingCart size={16} />
                <span>E-Commerce Simulator</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'portal'}
                className={`wb-tab-btn ${activeTab === 'portal' ? 'wb-tab-active' : ''}`}
                onClick={() => setActiveTab('portal')}
              >
                <Award size={16} />
                <span>Portal Prestasi Telkom</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'mobile'}
                className={`wb-tab-btn ${activeTab === 'mobile' ? 'wb-tab-active' : ''}`}
                onClick={() => setActiveTab('mobile')}
              >
                <Smartphone size={16} />
                <span>Flutter Mobile App</span>
              </button>
            </div>

            <div className="workbench-status-badge">
              <span className="live-dot"></span>
              <span className="live-text">Interactive Live Sandbox</span>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="workbench-canvas">
            
            {/* TAB 1: E-COMMERCE SIMULATOR */}
            {activeTab === 'ecommerce' && (
              <div className="simulator-view ecommerce-sim">
                <div className="sim-meta-header">
                  <div className="sim-title-group">
                    <h3 className="sim-project-title">Toko Online Multi-Kategori (PHP & Laravel)</h3>
                    <p className="sim-project-desc">
                      Simulasi filter produk (Buku, Komputer, Sepatu) dan sistem cart kalkulatif.
                    </p>
                  </div>
                  <div className="sim-category-filter">
                    {["Semua", "Buku", "Peralatan Komputer", "Sepatu"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`cat-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ecommerce-grid-layout">
                  {/* Product Catalog */}
                  <div className="catalog-side">
                    <div className="catalog-items-grid">
                      {filteredProducts.map((prod) => (
                        <div key={prod.id} className="product-item-card">
                          <div className="product-category-tag">{prod.category}</div>
                          <h4 className="product-name">{prod.name}</h4>
                          <div className="product-price-row">
                            <span className="product-price mono-num">
                              Rp {prod.price.toLocaleString('id-ID')}
                            </span>
                            <span className="product-stock">Stok: {prod.stock}</span>
                          </div>
                          <button
                            type="button"
                            className="btn-add-cart"
                            onClick={() => addToCart(prod)}
                          >
                            <Plus size={15} />
                            <span>Tambah Keranjang</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reactive Cart Sidebar */}
                  <div className="cart-side">
                    <div className="cart-card">
                      <div className="cart-header">
                        <div className="cart-title-wrap">
                          <ShoppingCart size={18} />
                          <h4 className="cart-heading">Keranjang Belanja</h4>
                        </div>
                        {cart.length > 0 && (
                          <button 
                            type="button" 
                            className="btn-clear-cart" 
                            onClick={clearCart}
                            title="Kosongkan Keranjang"
                          >
                            <Trash2 size={14} />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>

                      <div className="cart-items-list">
                        {cart.length === 0 ? (
                          <div className="cart-empty-state">
                            <Package size={28} className="empty-icon" />
                            <p>Keranjang masih kosong.</p>
                            <span>Pilih produk di samping untuk simulasi transaksi.</span>
                          </div>
                        ) : (
                          cart.map((item) => (
                            <div key={item.id} className="cart-row">
                              <div className="cart-row-info">
                                <div className="cart-row-name">{item.name}</div>
                                <div className="cart-row-unit mono-num">
                                  Rp {item.price.toLocaleString('id-ID')}
                                </div>
                              </div>
                              <div className="cart-row-controls">
                                <button 
                                  type="button" 
                                  className="qty-btn"
                                  onClick={() => updateQty(item.id, -1)}
                                  aria-label="Kurangi kuantitas"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="qty-val mono-num">{item.qty}</span>
                                <button 
                                  type="button" 
                                  className="qty-btn"
                                  onClick={() => updateQty(item.id, 1)}
                                  aria-label="Tambah kuantitas"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {cart.length > 0 && (
                        <div className="cart-summary">
                          <div className="summary-row">
                            <span>Total Item</span>
                            <span className="mono-num">{cart.reduce((s, i) => s + i.qty, 0)} barang</span>
                          </div>
                          <div className="summary-row total-highlight">
                            <span>Total Pembayaran</span>
                            <span className="total-amount mono-num">
                              Rp {cartTotal.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="btn-checkout"
                            onClick={handleCheckout}
                          >
                            <span>Proses Checkout Simulator</span>
                            <ChevronRight size={16} />
                          </button>

                          {checkoutComplete && (
                            <div className="checkout-success-alert">
                              <Check size={18} className="alert-icon" />
                              <div className="alert-text">
                                <strong>Transaksi Berhasil Disimulasikan!</strong>
                                <p>Alur validasi order dan kalkulasi subtotal MySQL sukses tereksekusi.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PORTAL PRESTASI TELKOM SIMULATOR */}
            {activeTab === 'portal' && (
              <div className="simulator-view portal-sim">
                <div className="sim-meta-header">
                  <div className="sim-title-group">
                    <h3 className="sim-project-title">Portal Dokumentasi Prestasi Siswa SMK Telkom</h3>
                    <p className="sim-project-desc">
                      Pencarian data rekam jejak juara terindeks dengan filter tingkatan kompetisi.
                    </p>
                  </div>

                  <div className="portal-filter-bar">
                    <div className="search-input-box">
                      <Search size={16} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Cari nama peraih, kejuaraan, atau jurusan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-field"
                      />
                    </div>

                    <div className="tier-pills">
                      {["Semua", "Kota", "Regional", "Provinsi", "Nasional"].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          className={`tier-btn ${selectedTier === tier ? 'active' : ''}`}
                          onClick={() => setSelectedTier(tier)}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Data Table View */}
                <div className="table-responsive-wrapper">
                  <table className="portal-table">
                    <thead>
                      <tr>
                        <th>ID Arsip</th>
                        <th>Peraih Prestasi</th>
                        <th>Kompetisi / Kejuaraan</th>
                        <th>Tingkat</th>
                        <th>Pencapaian</th>
                        <th>Jurusan</th>
                        <th>Tahun</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="table-empty">
                            Tidak ditemukan data yang sesuai dengan pencarian "{searchQuery}".
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((rec) => (
                          <tr key={rec.id}>
                            <td className="mono-num td-id">{rec.id}</td>
                            <td className="td-student font-semibold">{rec.student}</td>
                            <td className="td-comp">{rec.competition}</td>
                            <td>
                              <span className={`badge-tier tier-${rec.tier.toLowerCase()}`}>
                                {rec.tier}
                              </span>
                            </td>
                            <td className="td-rank">
                              <span className="rank-text">{rec.rank}</span>
                            </td>
                            <td className="td-field">{rec.field}</td>
                            <td className="mono-num td-year">{rec.year}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="portal-table-footer">
                  <div className="footer-stat">
                    Menampilkan <strong>{filteredRecords.length}</strong> dari <strong>{portalRecords.length}</strong> rekam jejak terverifikasi.
                  </div>
                  <div className="footer-note">
                    Database MySQL · Terintegrasi sistem dokumentasi kesiswaan SMK Telkom Banjarbaru
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FLUTTER MOBILE APP SIMULATOR */}
            {activeTab === 'mobile' && (
              <div className="simulator-view mobile-sim">
                <div className="mobile-sim-layout">
                  
                  {/* Left Column: Screen details */}
                  <div className="mobile-sim-info">
                    <h3 className="sim-project-title">Aplikasi Portofolio Mobile (Flutter & Firebase)</h3>
                    <p className="sim-project-desc">
                      Uji navigasi antarmuka native Android/iOS pada bingkai smartphone interaktif di samping.
                    </p>

                    <div className="screen-detail-box">
                      <div className="screen-active-badge">
                        Layar Aktif: {mobileScreens[activeMobileTab]?.name}
                      </div>
                      <h4 className="screen-active-title">
                        {mobileScreens[activeMobileTab]?.title}
                      </h4>
                      <p className="screen-active-summary">
                        {mobileScreens[activeMobileTab]?.summary}
                      </p>
                      <div className="screen-active-meta">
                        <Info size={16} />
                        <span>{mobileScreens[activeMobileTab]?.stats}</span>
                      </div>
                    </div>

                    <div className="mobile-tech-tags">
                      <span className="tech-chip">Flutter SDK</span>
                      <span className="tech-chip">Dart OOP</span>
                      <span className="tech-chip">Firebase Firestore</span>
                      <span className="tech-chip">Figma UI/UX</span>
                    </div>
                  </div>

                  {/* Right Column: Interactive Phone Mock Frame */}
                  <div className="phone-mockup-wrapper">
                    <div className="phone-device-frame">
                      {/* Notch & Speaker */}
                      <div className="phone-notch">
                        <span className="phone-speaker"></span>
                        <span className="phone-camera"></span>
                      </div>

                      {/* Screen Content */}
                      <div className="phone-screen-content">
                        <div className="phone-app-header">
                          <span className="phone-app-brand">Hafizh Farsya</span>
                          <span className="phone-app-pill">v1.2</span>
                        </div>

                        <div className="phone-screen-body">
                          {activeMobileTab === 0 && (
                            <div className="phone-screen-home">
                              <div className="phone-avatar">HF</div>
                              <div className="phone-user-name">Muhammad Hafizh Farsya</div>
                              <div className="phone-user-sub">Siswa RPL SMK Telkom</div>
                              <div className="phone-status-tag">Status: Siap PKL Industri</div>

                              <div className="phone-card-mini">
                                <span className="mini-card-label">Keahlian Utama</span>
                                <p className="mini-card-text">Flutter, Laravel, PHP, MySQL, Firestore</p>
                              </div>

                              <div className="phone-card-mini">
                                <span className="mini-card-label">Lokasi</span>
                                <p className="mini-card-text">Kota Banjarbaru, Kalimantan Selatan</p>
                              </div>
                            </div>
                          )}

                          {activeMobileTab === 1 && (
                            <div className="phone-screen-projects">
                              <div className="phone-section-title">Katalog Proyek</div>
                              <div className="phone-proj-item">
                                <div className="proj-dot"></div>
                                <div>
                                  <div className="phone-proj-name">Website E-Commerce</div>
                                  <div className="phone-proj-desc">Laravel · Toko Buku & Komputer</div>
                                </div>
                              </div>
                              <div className="phone-proj-item">
                                <div className="proj-dot"></div>
                                <div>
                                  <div className="phone-proj-name">Web Prestasi Siswa</div>
                                  <div className="phone-proj-desc">Laravel · Dokumentasi Juara</div>
                                </div>
                              </div>
                              <div className="phone-proj-item">
                                <div className="proj-dot"></div>
                                <div>
                                  <div className="phone-proj-name">Mobile Portfolio</div>
                                  <div className="phone-proj-desc">Flutter · Cloud Firestore</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeMobileTab === 2 && (
                            <div className="phone-screen-skills">
                              <div className="phone-section-title">Teknologi & Tools</div>
                              <div className="phone-skill-list">
                                <div className="skill-line">
                                  <span>Flutter & Dart</span>
                                  <span className="skill-pct mono-num">Kompeten</span>
                                </div>
                                <div className="skill-line">
                                  <span>PHP & Laravel</span>
                                  <span className="skill-pct mono-num">Kompeten</span>
                                </div>
                                <div className="skill-line">
                                  <span>MySQL & Firestore</span>
                                  <span className="skill-pct mono-num">Kompeten</span>
                                </div>
                                <div className="skill-line">
                                  <span>HTML5 & CSS3</span>
                                  <span className="skill-pct mono-num">Mahir</span>
                                </div>
                                <div className="skill-line">
                                  <span>UI/UX (Figma/Canva)</span>
                                  <span className="skill-pct mono-num">Mahir</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeMobileTab === 3 && (
                            <div className="phone-screen-contact">
                              <div className="phone-section-title">Kanal Hubungi</div>
                              <p className="phone-contact-note">
                                Siap dihubungi untuk tawaran Praktik Kerja Lapangan (PKL) / Magang.
                              </p>
                              <a 
                                href={`https://wa.me/${content.personal.phoneClean}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="phone-contact-btn phone-wa-btn"
                              >
                                WhatsApp: +62811-5003-018
                              </a>
                              <a 
                                href={`mailto:${content.personal.email}`}
                                className="phone-contact-btn phone-mail-btn"
                              >
                                Email: hafizhfarsya@gmail.com
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Bottom Navigation Bar */}
                        <div className="phone-bottom-nav">
                          {mobileScreens.map((screen, idx) => (
                            <button
                              key={screen.name}
                              type="button"
                              className={`phone-nav-btn ${activeMobileTab === idx ? 'active' : ''}`}
                              onClick={() => setActiveMobileTab(idx)}
                            >
                              <span>{screen.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Mini Interactive Terminal Console */}
          <div className="workbench-terminal">
            <div className="terminal-header">
              <div className="terminal-title">
                <Terminal size={15} />
                <span>Developer Console (Type commands or click presets)</span>
              </div>
              <div className="terminal-presets">
                {['help', 'about', 'skills', 'projects', 'pkl', 'contact', 'clear'].map(cmd => (
                  <button
                    key={cmd}
                    type="button"
                    className="cmd-preset-btn"
                    onClick={() => executeCommand(cmd)}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            <div className="terminal-screen">
              {terminalHistory.map((item, index) => (
                <div key={index} className={`terminal-log-row ${item.type}`}>
                  <pre>{item.text}</pre>
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="terminal-input-bar">
              <span className="terminal-prompt">$</span>
              <input
                type="text"
                placeholder="type command (e.g. 'help', 'skills', 'pkl')..."
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="terminal-input-field"
              />
              <button type="submit" className="terminal-send-btn" title="Jalankan Perintah">
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

