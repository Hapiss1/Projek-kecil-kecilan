# Active Sprint Board — Awwwards Procedural 3D WebGL Portfolio

> **Current Objective**: Membangun fondasi inisialisasi (Vite + R3F + GSAP + Lenis), arsitektur `App.jsx`, serta Hero Section dengan 3D procedural object & GSAP staggered text reveal.  
> **Status**: IN PROGRESS  
> **Last Updated**: 2026-11-02  

---

## 📌 Checklist Status

- [x] **Task 1: Core Dependencies Verified & Installed** (`@react-three/fiber@8.17.10`, `@react-three/drei@9.121.4`, `gsap@3.15.0`, `lenis@1.3.27`) *(Verified)*
- [/] **Task 2: Hero Procedural 3D WebGL Shader Component** (`HeroProceduralScene.jsx` dengan R3F, mouse parallax inertia, custom material/wireframe glass) `[CURRENT FOCUS]`
- [/] **Task 3: Hero Section with GSAP Staggered Text Reveal** (`HeroSection.jsx` dengan 2-line headline, editorial typography, `gsap.context()` cleanup) `[CURRENT FOCUS]`
- [/] **Task 4: Master Integration in App.jsx** (Lenis smooth scroll loop + R3F Canvas container + responsive DPR clamp) `[CURRENT FOCUS]`
- [ ] **Task 5: Empirical Verification** (`npm run build` & browser execution test)

---

## 🎯 Immediate Next Steps
1. Tulis komponen 3D prosedural menggunakan React Three Fiber dengan shader/material reflektif kaca & gelombang matematika halus yang bereaksi pada kursor dan scroll.
2. Tulis komponen Hero dengan tipografi editorial besar "Muhammad Hafizh Farsya" dan animasi GSAP clip-path / translateY staggered reveal.
3. Rangkai di `App.jsx` dengan loop Lenis yang sinkron dengan render WebGL.
4. Uji coba build produksi dan pastikan performa 60fps tanpa error.
