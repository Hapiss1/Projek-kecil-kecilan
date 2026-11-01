# Project Blueprint & Architecture Plan — Portfolio Muhammad Hafizh Farsya Syahputra

> **Note**: This file represents the strategic, architectural, and design decisions of the project. It acts as long-term memory to prevent drift and ensure consistency.

---

## 1. Project Overview & Scope
- **Project Name**: Hafizh Farsya Portfolio — Software Engineering & Digital Solutions
- **Vision**: Website portofolio personal kelas dunia untuk Muhammad Hafizh Farsya Syahputra (siswa Rekayasa Perangkat Lunak SMK Telkom Banjarbaru). Menampilkan profil, proyek nyata sekolah, stack teknologi (Flutter, Laravel, MySQL, Firebase), dan kesiapan menghadapi Praktik Kerja Lapangan (PKL) industri.
- **Surface Mode**: Experience & Persuade (Memikat recruiter industri dan pembimbing PKL dengan eksekusi teknis presisi dan interaktivitas nyata).
- **Primary User Action**: Menjelajahi proyek nyata secara interaktif dan menghubungi Hafizh langsung untuk tawaran PKL/proyek via WhatsApp/Email.

---

## 2. Technical Architecture & Invariants
- **Core Stack**: React 18 / 19, Vite, Lucide React (ikon SVG authored, bebas emoji slop), CSS Custom Properties (Design Tokens terpusat).
- **Styling Methodology**: Strict tokenized CSS architecture (`src/index.css`) dengan high contrast editorial aesthetics, fluid responsive layout, dan tone-step depth tanpa border hairlines generik.
- **State Management & Data Flow**: React state terdistribusi, stateful interactive workbench, tab navigasi proyek, dan bilingual content engine (ID / EN).
- **Hard Technical Invariants**:
  - Invariant 1: No external CSS frameworks (no bootstrap/tailwind bloat) — murni custom modern CSS tokens dengan performa kilat dan arsitektur rapi.
  - Invariant 2: Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) dengan ARIA accessibility lengkap.
  - Invariant 3: Zero console errors, zero lint warnings, audit lulus responsive di Desktop (1440px), Tablet (768px), dan Mobile (390px).
  - Invariant 4: Patuhi aturan Anti-Slop (headline ≤ 2 baris, tanpa pill kickers/eyebrows, tanpa gradien ungu SaaS, tanpa fake monospace).

---

## 3. Design System & Visual World
- **Palette Roles**:
  - `ground`: `#0a0e17` (Deep Obsidian Navy)
  - `surface`: `#111827` (Charcoal Blue tone step)
  - `surface-elevated`: `#1a2333` (Card/workbench elevated tone)
  - `ink`: `#f9fafb` (Crisp readable white)
  - `ink-muted`: `#94a3b8` (Slate secondary text)
  - `accent`: `#10b981` (Emerald Tech / Terminal Vitality)
  - `accent-surface`: `rgba(16, 185, 129, 0.12)` (Subtle highlight background)
- **Typography Scale**:
  - Primary Font: Plus Jakarta Sans / Inter / system-ui (Modern, clean, highly legible)
  - Code/Numbers Font: JetBrains Mono / Fira Code (Hanya untuk syntax code dan data tabular)
- **The Signature "One Live Thing"**:
  - **The Interactive Project Workbench & Simulator**: Pengunjung dapat langsung berinteraksi dengan simulasi fungsional dari 3 proyek unggulan Hafizh:
    1. *E-Commerce Interactive POS/Cart & Filter Simulator*
    2. *Student Achievement Data Inspector & Verifier*
    3. *Flutter Mobile App Interactive Screen Frame Preview*
  - Dilengkapi juga dengan Mini Developer Console untuk mengetes perintah langsung (`help`, `skills`, `contact`, `about`).

---

## 4. Architectural Decisions Log (ADR)

| Date | Decision | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| 2026-10-28 | Vite + React Single-Page Application | Kecepatan bundling super cepat, arsitektur modular, state management reaktif | Vanilla JS, Next.js (terlalu berat untuk portfolio statis) |
| 2026-10-28 | Lucide React for Icons | Konsistensi stroke weight, zero emoji icon slop, aksesibel | FontAwesome, inline unmaintained SVGs |
| 2026-10-28 | Bilingual Data Structure (ID/EN) | Hafizh mencantumkan Bahasa Indonesia & Inggris di CV; meningkatkan daya saing PKL | Hanya bahasa Indonesia |
| 2026-10-28 | Interactive Workbench as "One Live Thing" | Membuktikan kemampuan coding dan pemahaman alur aplikasi secara langsung | Video demo pasif atau screenshot statis |

---

## 5. Phase Milestones

- [x] **Phase 1**: Analisis CV ATS & Pemetaan Arsitektur Proyek
- [ ] **Phase 2**: Setup Scaffolding Vite + React, Dependencies, dan Design Tokens
- [ ] **Phase 3**: Implementasi Komponen Inti (Hero, Proyek Alternating Geometry, Skills Matrix, Timeline)
- [ ] **Phase 4**: Implementasi "One Live Thing" (Interactive Project Workbench & Console)
- [ ] **Phase 5**: Contact Section, CV Downloader, Responsive Verification & Anti-Slop Audit
