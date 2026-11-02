# Architectural Blueprint: Awwwards-Level Procedural 3D WebGL Portfolio
## Muhammad Hafizh Farsya — Creative Developer & Systems Architect

> **Vision**: Portofolio 3D interaktif berstandar Awwwards SOTD untuk calon Software Engineer & Mahasiswa Sistem Informasi.  
> **Aesthetic Tone**: *Clean, Intentional, High Technical Depth* (Anti-Slop, Deep Midnight `#080C14` & Ice Blue `#7DD3FC`, Swiss Editorial Typography, 60fps Mobile Performance).  
> **Tech Stack**: React 18 (Vite), Three.js & React Three Fiber (`@react-three/fiber` v8, `@react-three/drei` v9), GSAP v3, Lenis, Web Audio API.

---

## 1. Architectural Decisions (ADR)
| Decision | Rationale |
|---|---|
| **Cinematic WebGL Preloader** | Loading screen editorial minimalis 0%-100% yang menyembunyikan kompilasi shader WebGL dan membuka tirai transisi via GSAP (`power4.inOut`). |
| **Magnetic Custom Cursor** | Kursor presisi tinggi dengan `mix-blend-mode: difference` dan kalkulasi vektor jarak untuk daya tarik magnetis pada tautan & baris proyek. |
| **Engineering / Debug Mode** | Mode hacker-style monokromatik (`#030704` & `#10B981`), memicu wireframe 3D murni dan FPS telemetry counter untuk memukau senior engineer. |
| **Micro-Audio Sound Design (Web Audio API)** | Sintesis suara prosedural murni menggunakan `AudioContext` (0 KB audio file download) untuk ketukan mekanis subtil dan ambient hum responsif terhadap scroll velocity. |
| **Fluid Case Study Page Transition** | Transisi layar penuh tanpa reload kasar dengan transisi gelombang cairan WebGL menuju studi kasus arsitektur mendalam. |

---

## 2. Phased Roadmap
- [x] **Phase 1: Project Setup & Core Dependencies** (Vite, R3F v8, Drei v9, GSAP v3, Lenis, DPR management)
- [x] **Phase 2: Core Foundation & Hero Section** (`App.jsx` + R3F Canvas + Procedural Mesh + GSAP Reveal)
- [x] **Phase 3: WebGL Liquid Distortion Project Showcase** (Editorial Typography list + Floating WebGL Image Displacement Shader + Architectural Drawer)
- [x] **Phase 4: Skills Matrix & Academic Track** (Editorial Data Layout, Zero dead code, GSAP Staggered Scroll Reveals)
- [x] **Phase 5: High-Impact Direct Contact HUD, Zero Dead Code Cleanup & Production Verification**
- [/] **Phase 6: Awwwards Polish: Preloader, Magnetic Cursor, Debug Mode, Micro-Audio & Fluid Transitions** `[CURRENT FOCUS]`
