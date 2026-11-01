# Active Task Board & Sprint Tracker — Portfolio Hafizh Farsya

> **Current Objective**: Inisialisasi Vite + React scaffolding, konfigurasi dependencies (lucide-react), dan rancang struktur data portofolio dari CV ATS.  
> **Status**: In Progress  
> **Last Updated**: 2026-10-28 (Sprint 1 Active)

---

## 📌 Active Checklist

Legend:
- `[ ]` Pending
- `[/]` In Progress (`[CURRENT FOCUS]`)
- `[x]` Completed & Empirically Verified

### Sprint 1: Setup & Scaffolding
- [x] Ekstraksi data lengkap dari CV ATS Hafizh Farsya *(Verified)*
- [x] Susun arsitektur dan sistem token desain di `PLAN.md` *(Verified)*
- [/] Inisialisasi proyek Vite + React & pasang `lucide-react` `[CURRENT FOCUS]`
- [ ] Buat data schema portofolio terstruktur (`src/data/portfolioData.js`) dengan dukungan bilingual (ID/EN)
- [ ] Konfigurasi token CSS global dan reset anti-slop di `src/index.css`

### Sprint 2: Core Components & Layout
- [ ] Implementasi Navigation Bar dengan status ketersediaan PKL dan selector bahasa (ID/EN)
- [ ] Implementasi Hero Section (Mematuhi aturan headline ≤ 2 baris, tanpa eyebrow pill, high-contrast)
- [ ] Implementasi "One Live Thing": **Interactive Project Workbench & Simulator** (Live E-Commerce simulator, Telkom Achievement portal inspector, Flutter Mobile app frame)
- [ ] Implementasi Featured Projects Deep Dive dengan geometri layout variatif (tanpa grid 3-kartu malas)
- [ ] Implementasi Technical Skills & Competency Matrix (dikelompokkan per domain: Mobile, Web, Backend, Database, Design)
- [ ] Implementasi Education & SMK Telkom Banjarbaru Journey Timeline

### Sprint 3: Interaction, Contact & Polish
- [ ] Implementasi Quick Contact modal/section dengan tombol direct WhatsApp (+62811-5003-018), Email, dan salin kontak instan
- [ ] Implementasi fitur download/preview CV ATS resmi
- [ ] Themed browser surfaces (`::selection`, custom scrollbar, caret color, `:focus-visible`)
- [ ] Verifikasi build produksi (`npm run build`) dan pastikan zero warnings/errors
- [ ] Verifikasi tampilan responsif (Desktop, Tablet, Mobile)

---

## 🚧 Blockers, Findings & Technical Notes

- *Findings*: CV ATS memuat detail lengkap: Siswa RPL SMK Telkom Banjarbaru, stack Flutter, Firebase, PHP, Laravel, MySQL, UI/UX (Figma/Canva), 3 proyek sekolah konkret (E-Commerce, Web Prestasi Siswa, Aplikasi Portofolio).
- *Decision*: Menggunakan React murni dengan token CSS modular agar performa maksimal dan tidak bergantung pada CSS framework eksternal yang seragam.

---

## 🎯 Next Immediate Steps

1. Inisialisasi package.json dan instalasi react, react-dom, lucide-react, serta vite.
2. Buat file `src/data/portfolioData.js` memuat seluruh konten CV dalam format terstruktur.
3. Rancang arsitektur CSS di `src/index.css` sesuai aturan Anti-Slop.
