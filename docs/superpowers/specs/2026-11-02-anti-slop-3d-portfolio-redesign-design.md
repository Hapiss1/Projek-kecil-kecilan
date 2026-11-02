# Design Document: Anti-Slop 3D Portfolio Redesign
## Muhammad Hafizh Farsya Syahputra — Information Systems (Telkom University) & RPL Alumnus (SMK Telkom Banjarbaru)

- **Date**: 2026-11-02
- **Topic**: Total Frontend Redesign with Vanilla Three.js WebGL & Lenis Smooth Inertia Scroll (Updated with Latest CV ATS & Authentic Photo)
- **Status**: Approved by Builder Check & Ready for Implementation Planning
- **Author**: Antigravity Pair Programmer & Hafizh Farsya

---

## 1. Intent & The Why

### A. Context & Purpose
Muhammad Hafizh Farsya Syahputra adalah mahasiswa **S1 Sistem Informasi (Information Systems) di Telkom University** dan alumni **SMK Telkom Banjarbaru jurusan Rekayasa Perangkat Lunak (RPL)** yang saat ini berdomisili di **Bandung, Jawa Barat**. Portofolio ini dibangun untuk merefleksikan profil akademis dan teknis terkininya sebagai calon software engineer profesional, asisten praktikum Algoritma & Pemrograman, serta praktisi sistem informasi enterprise.

### B. The Core Problem
Tampilan portofolio web saat ini rentan terlihat seperti "rata-rata template AI/SaaS pada umumnya" (slop): pill badge dekoratif, gradien ungu generik, dan baris kartu seragam. Format tersebut tidak mencerminkan kredibilitas Telkom University & SMK Telkom, arsitektur software engineering yang solid, maupun pemahaman mendalam tentang performa web.

### C. The Vision & Chosen Identity
Membangun web portofolio personal berstandar **Awwwards Site of the Day (SOTD)** yang beraliran **Anti-Slop**:
- **Kesan 1: Matang dan Profesional (Clean & Intentional)**: Palet Deep Night Navy & Ice Blue, tipografi editorial Swiss berbobot tinggi, foto profil otentik Hafizh (`/hapiss.jpg`), tenang namun sangat percaya diri.
- **Kesan 2: Keahlian Teknis Tinggi (Performance-Aware)**: Objek 3D WebGL Three.js prosedural yang ringan (60–120 FPS tanpa lag bahkan di HP) berpadu dengan inersia scroll physics Lenis.
- **Kesan 3: Fokus pada Esensi, Bukan Ornamen**: Setiap interaksi mendukung pemahaman recruiter terhadap rekam jejak nyata Hafizh (E-Commerce, Portal Prestasi Siswa, Aplikasi Mobile Flutter, dan Logika Python).

---

## 2. Goals, Non-Goals & Anti-Goals

### A. Goals
1. Mengimplementasikan kanvas WebGL Three.js mandiri di latar belakang yang merender monolit wireframe arsitektural prosedural dengan interaksi mouse inersia halus dan kamera Z-depth travel yang sinkron dengan scroll.
2. Memasang engine *smooth inertia scrolling* menggunakan `lenis` untuk memberikan sensasi scrolling berbobot khas website peraih penghargaan internasional.
3. Menerapkan arsitektur layout **Sticky Depth Layer** pada showcase proyek: kartu proyek bertumpuk vertikal dengan reduksi skala kedalaman saat digulir.
4. Menerapkan **In-Card Interactive Sandbox ("The One Live Thing")** di setiap kartu proyek: sisi kiri menampilkan arsitektur dan studi kasus, sisi kanan langsung berupa simulator fungsional yang reaktif (keranjang e-commerce, pencarian indeks prestasi, dan mockup preview Flutter).
5. Memasang foto potret otentik Hafizh (`/hapiss.jpg`) dengan gaya editorial (clean mask, tanpa frame gradien slop) di area Hero / Profil.
6. Menampilkan identitas terkini sesuai CV ATS: Mahasiswa S1 Sistem Informasi Telkom University, Asisten Praktikum Algoritma, pemahaman BPM & ERP, serta penguasaan stack Laravel, Flutter, Python, Flask, dan CI4.
7. Mempertahankan fitur bilingual (ID/EN) dan modal CV ATS resmi yang dapat langsung diprint/diunduh oleh recruiter.
8. Memastikan performa 60 FPS stabil pada mobile dan desktop dengan bundle size WebGL minimal (~140KB).

### B. Non-Goals
1. Tidak menambahkan framework CSS eksternal (Bootstrap, Tailwind CSS, atau UI library berat lainnya). Seluruh styling menggunakan CSS Tokens murni di `src/index.css`.
2. Tidak membuat model 3D kompleks berbasis file GLTF/GLB berat yang lambat dimuat pada koneksi seluler.

### C. Anti-Goals (Absolute Bans / Anti-Slop Invariants)
1. 🚫 **No Eyebrow / Pill Badges**: Dilarang meletakkan badge kecil (`NEW ·`, `MY PROJECTS`, `SKILLS`) di atas judul. Judul harus memimpin dengan wibawa sendiri.
2. 🚫 **No 3-Card Generic Grids**: Dilarang membuat baris 3 kartu seragam berisi ikon + judul + 2 kalimat teks.
3. 🚫 **No SaaS Purple Gradients & Neon Halos**: Dilarang menggunakan gradien ungu SaaS klise atau glow shadow `0 0 20px #...`.
4. 🚫 **No Fake Monospace**: Font monospace diharamkan dipakai untuk teks deskripsi atau paragraf dekoratif; monospace hanya diizinkan untuk syntax kode asli dan data angka metrik tabular.
5. 🚫 **No Decorative Glassmorphism**: Dilarang menempatkan blur acak tanpa pemisahan tone warna yang jelas.
6. 🚫 **No Emoji as UI Icons**: Dilarang memakai emoji sebagai ikon antarmuka; seluruh ikon wajib menggunakan Lucide React SVG berbobot stroke konsisten (1.5px/1.75px).

---

## 3. Constraints

1. **Platform & Stack**: React 18, Vite, Three.js (`three`), Lenis (`lenis`), Lucide React (`lucide-react`).
2. **Device Performance**: Harus ringan dibuka di ponsel pintar Android/iOS penguji/recruiter tanpa lag atau frame drop (dukungan `prefers-reduced-motion` untuk aksesibilitas).
3. **Responsive Breakpoints**:
   - Desktop Wide: 1440px
   - Laptop / Tablet: 1024px & 768px
   - Mobile: 390px / 360px
4. **Zero Lint & Build Warnings**: `npm run build` wajib menghasilkan zero error.

---

## 4. Approaches Considered & Tradeoffs

| Pendekatan | Deskripsi | Kelebihan | Kekurangan / Tradeoff | Keputusan |
| :--- | :--- | :--- | :--- | :--- |
| **Pendekatan 1 (Terpilih)** | **Vanilla Three.js + Lenis + Pure CSS Tokens** | Performa maksimal 60–120 FPS, bundle ramping (~140KB), zero re-render overhead React saat simulator dimainkan, kontrol WebGL murni. | Membutuhkan pengaturan listener event manual dan lifecycle canvas via `useEffect`/`useRef`. | **DIPILIH** (Rekomendasi terbaik, disetujui pengguna & lolos Builder Check). |
| **Pendekatan 2** | **React Three Fiber (R3F) & Drei + Lenis** | Sintaksis komponen deklaratif seragam dengan JSX React. | Bundle membengkak (+250KB), rentan re-render canvas saat state interaktif simulator diubah. | Ditolak karena menambah overhead dependensi. |
| **Pendekatan 3** | **Pure CSS 3D Matrix Transforms + Lenis (No WebGL)** | Tanpa library 3D eksternal, sangat ringan. | Tidak ada pencahayaan spasial dinamis, bayangan, atau rotasi wireframe sejati khas Awwwards. | Ditolak karena tidak memenuhi standar visual Awwwards. |

---

## 5. Detailed Component Specifications

### A. Design Tokens & Color Roles (`src/index.css`)
- `--bg-ground`: `#080C14` (Deep Night Navy — latar belakang utama)
- `--bg-surface`: `#101726` (Tone step pemisah section)
- `--bg-surface-elevated`: `#162032` (Kartu proyek dan in-card sandbox)
- `--text-ink`: `#F8FAFC` (Putih tulang tajam, rasio kontras > 12:1)
- `--text-muted`: `#94A3B8` (Slate kelabu untuk body text dan label arsitektur)
- `--accent`: `#7DD3FC` (Ice Blue pastel — tombol aksi, highlight kode, dan wireframe monolit)
- `--accent-subtle`: `rgba(125, 211, 252, 0.12)` (Background aktif dan badge subtle)
- `--border-subtle`: `rgba(255, 255, 255, 0.08)` (Garis struktur quietly defined)

### B. Background 3D WebGL Canvas (`src/components/Background3DCanvas.jsx`)
- Komponen kanvas Three.js terpasang di latar belakang dengan posisi `fixed`, `inset: 0`, dan `z-index: 0`.
- **Geometri**: Objek prosedural *wireframe polyhedral crystal* (`IcosahedronGeometry` / `OctahedronGeometry` dengan material `LineSegments` wireframe bergradasi Ice Blue).
- **Animasi Inersia Mouse**: Sudut rotasi objek mengikuti kursor pengguna dengan interpolasi halus (*lerp* 0.05).
- **Sinkronisasi Scroll**: Kamera Three.js bergerak pada sumbu Z (depth travel) dan berotasi perlahan mengikuti progres scroll Lenis.
- **Optimasi**: Render loop menggunakan `requestAnimationFrame`. Berhenti merender saat tab tidak aktif (`document.hidden`) atau saat user mengaktifkan `prefers-reduced-motion`.

### C. Smooth Scroll Engine (`src/components/SmoothScrollProvider.jsx`)
- Inisialisasi instance `Lenis` di level root aplikasi.
- Opsi konfigurasi: `duration: 1.2s`, `smoothWheel: true`, `touchMultiplier: 1.5`.

### D. Navigation Bar (`src/components/Navbar.jsx`)
- Tampilan HUD minimalis:
  - Sisi Kiri: Nama "Hafizh Farsya" & indikator live waktu Bandung (WIB).
  - Sisi Tengah: Tautan cepat (Karya, Keahlian, Pendidikan, Kontak).
  - Sisi Kanan: Status Telkom University / Magang, tombol toggle bahasa (ID/EN), dan tombol cetak CV ATS.

### E. Hero Section with Authentic Portrait (`src/components/Hero.jsx`)
- Mematuhi **Two-Line Headline Rule**:
  - `h1`: *"Muhammad Hafizh Farsya."*  
    *"Information Systems & Engineering."*
- Tampilan potret otentik Hafizh (`/hapiss.jpg`) berbalut layout editorial asimetris berdampingan dengan 3D canvas anchor.
- Sub-lead: Mahasiswa S1 Sistem Informasi Telkom University & Alumni RPL SMK Telkom Banjarbaru.
- Aksi Primer: Tombol solid *"Jelajahi Karya"* dan tombol outline *"Unduh CV ATS"*.

### F. Projects Showcase: Sticky Depth Layer & In-Card Sandbox (`src/components/ProjectsShowcase.jsx`)
- Format **Sticky Depth Stacking**:
  - 4 Proyek Rekayasa (E-Commerce, Portal Prestasi Siswa, Aplikasi Mobile Flutter, Logika Algoritma Python).
  - Tata letak split: Sisi kiri narasi arsitektur dan spesifikasi, sisi kanan live interactive sandbox reaktif.

### G. Technical Skills & Enterprise Matrix (`src/components/SkillsMatrix.jsx`)
- Penyajian data ala Swiss Modern: Web & Backend (PHP, Laravel, CI4, Python, Flask), Mobile & Cloud (Flutter, Firebase, MySQL), Enterprise Systems & BPM (BPM, ERP, Asisten Lab), dan UI/UX Design (Figma, Canva, Git).

### H. Education & Telematics Track (`src/components/EducationTimeline.jsx`)
- Telkom University (2026 — Sekarang) & SMK Telkom Banjarbaru (2023 — 2026).
- Dokumentasi peran Asisten Praktikum Algoritma dan Pemrograman.

### I. Industrial Contact & ATS CV Modal (`src/components/ContactSection.jsx` & `src/components/CvModal.jsx`)
- Kontak langsung WhatsApp (+62811-5003-018), Email (`hapissf3001@gmail.com`), dan modal CV ATS printable.
