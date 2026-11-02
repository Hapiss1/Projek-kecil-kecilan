# Anti-Slop 3D Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun ulang seluruh tampilan frontend portofolio Muhammad Hafizh Farsya Syahputra (mahasiswa S1 Sistem Informasi Telkom University & alumni RPL SMK Telkom Banjarbaru) menjadi portofolio kelas dunia berstandar Awwwards SOTD dengan Three.js WebGL canvas, Lenis smooth inertia scroll, palet Deep Night Navy & Ice Blue, format Sticky Depth Layer, serta In-Card Interactive Sandbox fungsional.

**Architecture:** Menggunakan satu kanvas Three.js murni di latar belakang dengan requestAnimationFrame yang disinkronkan ke event listener scroll Lenis. Di atasnya, tata letak DOM menyajikan tipografi editorial Swiss 2 baris, kartu proyek bertumpuk vertikal dengan simulasi in-card interaktif, serta foto profil otentik yang bebas dari elemen dekoratif murahan (anti-slop).

**Tech Stack:** React 18, Vite, Three.js (`three`), Lenis (`lenis`), Lucide React (`lucide-react`), Vanilla CSS Custom Properties (Design Tokens terpusat).

**Spec:** `docs/superpowers/specs/2026-11-02-anti-slop-3d-portfolio-redesign-design.md`

## Global Constraints

- **Palette Roles**: Ground `#080C14`, Surface `#101726`, Surface Elevated `#162032`, Ink `#F8FAFC`, Muted `#94A3B8`, Accent `#7DD3FC`, Accent Subtle `rgba(125, 211, 252, 0.12)`.
- **Two-Line Headline Rule**: Setiap judul `h1`–`h3` wajib muat maksimal 2 baris pada desktop (1440px), tablet (768px), dan mobile (390px).
- **Anti-Slop Invariants**: Dilarang menggunakan pill badge di atas judul, grid 3 kartu seragam, gradien ungu SaaS, fake monospace, glassmorphism blur acak, dan emoji sebagai ikon.
- **Performance Floor**: Animasi 3D dan scroll wajib berjalan mulus 60–120 FPS tanpa frame drop; WebGL render loop wajib berhenti saat tab tidak aktif (`document.hidden`) atau `prefers-reduced-motion` aktif.
- **Zero Framework Bloat**: Dilarang menginstal Tailwind CSS, Bootstrap, atau UI library berat lainnya; seluruh styling wajib menggunakan token CSS murni di `src/index.css`.

## Review Focus

1. **Touch / Mobile Overflow on Sticky Cards**: Pada layar HP sempit (viewport height kecil), kartu sticky berisiko terpotong jika tingginya melebihi tinggi layar. *Expected Behavior*: Pada breakpoint mobile (<768px), tata letak otomatis beralih ke natural vertical flow tanpa overflow terpotong.
2. **WebGL Context Loss & Memory Leaks**: Komponen `Background3DCanvas` yang tidak membersihkan geometry, material, dan event listener saat unmount dapat menyebabkan memory leak. *Expected Behavior*: Cleanup menyeluruh pada `useEffect` return handler (`dispose()` pada geometry, material, renderer, dan `cancelAnimationFrame`).
3. **Lenis Scroll Interference with Interactive Sliders/Inputs**: Pengguna yang berinteraksi dengan form input atau menggeser mockup dalam sandbox tidak boleh memicu lompatan scroll window. *Expected Behavior*: Elemen sandbox interaktif mengisolasi touch/wheel event agar tidak terjadi scroll chaining yang tidak diinginkan.
4. **Print Stylesheet for ATS CV**: Pencetakan CV modal via browser (`window.print()`) tidak boleh mencetak background navy gelap atau kanvas WebGL 3D. *Expected Behavior*: CSS `@media print` mengubah warna teks menjadi hitam murni di atas kertas putih bersih tanpa kanvas 3D atau tombol navigasi.
5. **Slow Connection / Asset Loading**: Foto profil `/hapiss.jpg` tidak boleh menyebabkan cumulative layout shift (CLS) saat dimuat. *Expected Behavior*: Elemen `<img>` memiliki rasio aspek terdefinisi dan fallback skeleton halus.

---

### Task 1: Dependencies & Core Design Tokens

**Files:**
- Modify: `package.json`
- Modify: `src/index.css`

**Interfaces:**
- Produces: CSS design tokens global (`--bg-ground`, `--bg-surface`, `--bg-surface-elevated`, `--text-ink`, `--text-muted`, `--accent`, dll.), reset browser anti-slop, themed scrollbar, dan custom selection.
- Consumes: Library `three` dan `lenis`.

- [ ] **Step 1: Install dependencies `three` and `lenis`**
  Run: `npm install three lenis`
  Expected: Package `three` dan `lenis` terpasang di dependencies `package.json`.

- [ ] **Step 2: Definisikan CSS Tokens & Reset di `src/index.css`**
  Tulis tokens warna Deep Night Navy & Ice Blue, font scale clamp, reset typography 2-baris, themed selection, dan custom scrollbar.

- [ ] **Step 3: Verifikasi Build CSS**
  Run: `npm run build`
  Expected: Build Vite sukses tanpa error syntax CSS.

- [ ] **Step 4: Commit**
  ```bash
  git add package.json package-lock.json src/index.css
  git commit -m "chore: install three & lenis and configure anti-slop design tokens"
  ```

---

### Task 2: Background 3D Canvas WebGL Component

**Files:**
- Create: `src/components/Background3DCanvas.jsx`

**Interfaces:**
- Produces: `<Background3DCanvas scrollProgress={number} />`
- Consumes: Three.js (`three`), token `--accent` (`#7DD3FC`).

- [ ] **Step 1: Buat komponen `Background3DCanvas.jsx`**
  Implementasikan scene Three.js dengan `IcosahedronGeometry`, `LineSegments` wireframe bergradasi Ice Blue, inersia pointer tilt (lerp 0.05), listener resize jendela, dan cleanup pada unmount (`renderer.dispose()`, `cancelAnimationFrame`).

- [ ] **Step 2: Tambahkan optimasi performa dan accessibility**
  Tambahkan pengecekan `window.matchMedia('(prefers-reduced-motion: reduce)')` dan `document.addEventListener('visibilitychange')` agar render loop otomatis berhenti saat tab tidak aktif.

- [ ] **Step 3: Uji render komponen dalam isolation**
  Pastikan kanvas 3D merender dengan FPS 60 stabil dan nol error console.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/Background3DCanvas.jsx
  git commit -m "feat: add vanilla Three.js procedural 3D background canvas"
  ```

---

### Task 3: Smooth Scroll Engine Provider

**Files:**
- Create: `src/components/SmoothScrollProvider.jsx`

**Interfaces:**
- Produces: `<SmoothScrollProvider onScroll={(progress, scrollY) => void}>{children}</SmoothScrollProvider>`
- Consumes: Library `lenis`.

- [ ] **Step 1: Buat komponen `SmoothScrollProvider.jsx`**
  Inisialisasi instance Lenis dengan durasi 1.2s dan exponential ease-out curve. Jalankan loop `requestAnimationFrame(lenis.raf)`. Teruskan callback scroll progress normalized (0.00 hingga 1.00) ke parent/canvas.

- [ ] **Step 2: Tambahkan penanganan cleanup lifecycle**
  Pastikan `lenis.destroy()` dipanggil saat unmount untuk mencegah memory leak.

- [ ] **Step 3: Verifikasi scrolling**
  Uji halaman panjang untuk memverifikasi scrolling terasa berbobot (*smooth inertia*) dan responsif terhadap trackpad maupun mouse wheel.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/SmoothScrollProvider.jsx
  git commit -m "feat: integrate Lenis smooth inertia scroll provider"
  ```

---

### Task 4: Minimalist HUD Navigation Bar

**Files:**
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Produces: `<Navbar lang={lang} setLang={fn} content={obj} onOpenCv={fn} />`
- Consumes: Lucide React (`FileText`, `Globe`, `Clock`), `portfolioData.personal`.

- [ ] **Step 1: Rancang tata letak HUD minimalis**
  Sisi kiri: Logo "Hafizh Farsya" dan waktu live Bandung (WIB).  
  Sisi tengah: Link navigasi teks tenang (Karya, Keahlian, Pendidikan, Kontak).  
  Sisi kanan: Indikator status Telkom University / Magang, tombol toggle ID/EN, dan tombol cetak CV ATS.

- [ ] **Step 2: Hilangkan seluruh badge/pill klise**
  Terapkan desain border-less yang memisahkan elemen menggunakan tone step transparan dan tipografi bersih.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/Navbar.jsx
  git commit -m "feat: redesign HUD minimalist navbar with live Bandung time"
  ```

---

### Task 5: Anti-Slop Hero Section with Authentic Portrait

**Files:**
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Produces: `<Hero lang={lang} content={obj} onOpenCv={fn} />`
- Consumes: `portfolioData.personal`, `/hapiss.jpg`, Lucide React (`ArrowDown`, `FileDown`, `Send`).

- [ ] **Step 1: Terapkan Two-Line Headline Rule**
  Tulis judul `h1` maksimal 2 baris:
  `"Muhammad Hafizh Farsya."`
  `"Information Systems & Engineering."`

- [ ] **Step 2: Integrasikan foto potret otentik `/hapiss.jpg`**
  Letakkan foto profil otentik Hafizh berdampingan dengan tipografi hero dalam komposisi asimetris berwibawa, dilengkapi subtle outline glow Ice Blue.

- [ ] **Step 3: Pasang sub-lead dan CTA langsung**
  Tampilkan deskripsi singkat mahasiswa S1 Sistem Informasi Telkom University & alumni RPL SMK Telkom Banjarbaru, tombol solid "Jelajahi Karya", dan tombol outline "Unduh CV ATS".

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/Hero.jsx
  git commit -m "feat: redesign Hero section with Two-Line headline & authentic portrait"
  ```

---

### Task 6: Sticky Depth Projects Showcase & In-Card Interactive Sandbox

**Files:**
- Modify: `src/components/ProjectsShowcase.jsx`

**Interfaces:**
- Produces: `<ProjectsShowcase lang={lang} content={obj} />`
- Consumes: `portfolioData.projects` (4 proyek: E-Commerce, Portal Prestasi, Mobile App, Python Logic).

- [ ] **Step 1: Rancang arsitektur Sticky Depth Layer**
  Gunakan layout sticky container di mana tiap kartu proyek berukuran penuh dan bertumpuk secara vertikal dengan efek kedalaman (depth scale).

- [ ] **Step 2: Bangun In-Card Interactive Sandbox**
  Sisi kiri: Nomor indeks proyek (01–04), judul, studi kasus arsitektur MVC/Stateful/Modular, highlights, dan tech stack pills.  
  Sisi kanan: Simulator fungsional reaktif:
  - Proyek 1: Simulator keranjang belanja e-commerce dengan kalkulasi harga dinamis.
  - Proyek 2: Simulator pencarian indeks prestasi siswa dengan filter tingkatan lomba.
  - Proyek 3: Mockup device ponsel Flutter dengan tab switch Profil, Karya, Keahlian, Kontak.
  - Proyek 4: Playground logika Python dengan penampil snippet algoritma dan kompleksitas waktu.

- [ ] **Step 3: Pastikan responsif pada mobile**
  Pada viewport <768px, ubah layout split 2-kolom menjadi single column scrollable yang nyaman digulir dengan jempol.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/ProjectsShowcase.jsx
  git commit -m "feat: implement Sticky Depth Projects Showcase with In-Card Interactive Sandbox"
  ```

---

### Task 7: Swiss Editorial Skills & Enterprise Architecture Matrix

**Files:**
- Modify: `src/components/SkillsMatrix.jsx`

**Interfaces:**
- Produces: `<SkillsMatrix lang={lang} content={obj} />`
- Consumes: `portfolioData.skillCategories`, `portfolioData.softSkills`, `portfolioData.languages`.

- [ ] **Step 1: Rancang tata letak matriks data ala Swiss**
  Kelompokkan keahlian ke dalam 4 domain:
  1. Pengembangan Web & Backend (PHP, Laravel, CI4, Python, Flask, JS, HTML/CSS).
  2. Aplikasi Mobile & Cloud (Flutter, Dart, Firebase, MySQL).
  3. Sistem Enterprise & Proses Bisnis (BPM, ERP, Asisten Praktikum Algoritma).
  4. Desain UI/UX & Tooling (Figma, Canva, Git/GitHub).

- [ ] **Step 2: Bersihkan fake metric bars**
  Hilangkan persentase palsu (misal 90%). Tampilkan level penguasaan nyata (Mahir, Kompeten, Memahami) dan detail teknis implementasi konkrit.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/SkillsMatrix.jsx
  git commit -m "feat: redesign Skills Matrix into Swiss clean data presentation"
  ```

---

### Task 8: Education & Telematics Track

**Files:**
- Modify: `src/components/EducationTimeline.jsx`

**Interfaces:**
- Produces: `<EducationTimeline lang={lang} content={obj} />`
- Consumes: `portfolioData.educationHistory`.

- [ ] **Step 1: Sajikan riwayat pendidikan ganda**
  - **Telkom University (2026 — Sekarang)**: Mahasiswa Aktif S1 Sistem Informasi, Asisten Praktikum Algoritma & Pemrograman, BPM, ERP.
  - **SMK Telkom Banjarbaru (2023 — 2026)**: Alumni Rekayasa Perangkat Lunak, proyek e-commerce, portal prestasi, dan mobile app.

- [ ] **Step 2: Desain timeline minimalis**
  Gunakan garis vertikal subtil dengan penanda waktu Ice Blue tanpa ornamen berlebih.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/EducationTimeline.jsx
  git commit -m "feat: update Education Timeline with Telkom University & SMK Telkom track"
  ```

---

### Task 9: Direct Contact HUD & ATS CV Printable Modal

**Files:**
- Modify: `src/components/ContactSection.jsx`
- Modify: `src/components/CvModal.jsx`
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Produces: `<ContactSection />`, `<CvModal />`, `<Footer />`
- Consumes: `portfolioData.personal`, kontak WhatsApp `+62811-5003-018`, email `hapissf3001@gmail.com`.

- [ ] **Step 1: Redesign Contact Section**
  Tampilkan kartu kontak langsung dengan tombol interaktif WhatsApp (+62811-5003-018), tautan email instan, dan aksi salin kontak satu klik.

- [ ] **Step 2: Perbarui CV Modal untuk ramah cetak ATS (`@media print`)**
  Sertakan data lengkap terbaru: Telkom University, SMK Telkom, asisten praktikum, 4 proyek unggulan, dan keahlian teknis lengkap. Pastikan saat dicetak ke PDF/kertas, outputnya berformat ATS standar industri hitam di atas putih bersih.

- [ ] **Step 3: Perbarui Footer**
  Footer minimalis dengan copyright, status live Bandung WIB, dan tautan balik ke atas.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/ContactSection.jsx src/components/CvModal.jsx src/components/Footer.jsx
  git commit -m "feat: update Contact HUD, ATS CV printable modal, and footer"
  ```

---

### Task 10: App Assembly, Verification & Production Build

**Files:**
- Modify: `src/App.jsx`
- Modify: `PLAN.md` & `TASK.md`

**Interfaces:**
- Produces: Aplikasi portofolio lengkap terpadu.

- [ ] **Step 1: Rangkai seluruh komponen di `src/App.jsx`**
  Bungkus aplikasi dengan `<SmoothScrollProvider>`, pasang `<Background3DCanvas>` di layer background, lalu susun `<Navbar>`, `<Hero>`, `<ProjectsShowcase>`, `<SkillsMatrix>`, `<EducationTimeline>`, `<ContactSection>`, `<Footer>`, dan `<CvModal>`. Hapus import `InteractiveWorkbench` lama karena sudah terintegrasi rapi di dalam kartu proyek.

- [ ] **Step 2: Uji build produksi**
  Run: `npm run build`
  Expected: Build Vite menghasilkan bundle `dist/` dengan nol error atau lint warning.

- [ ] **Step 3: Verifikasi responsif & performa**
  Periksa tampilan di Desktop (1440px), Tablet (768px), dan Mobile (390px). Pastikan 60 FPS stabil.

- [ ] **Step 4: Update `PLAN.md` dan `TASK.md`**
  Tandai seluruh tahapan selesai dan terverifikasi secara empiris.

- [ ] **Step 5: Final Commit & Push ke GitHub**
  ```bash
  git add .
  git commit -m "feat: complete Awwwards-caliber Anti-Slop 3D portfolio redesign"
  git push origin main
  ```

