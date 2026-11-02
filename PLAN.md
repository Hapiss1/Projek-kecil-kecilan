# Architectural Blueprint: Awwwards-Level Procedural 3D WebGL Portfolio
## Muhammad Hafizh Farsya — Creative Developer & Systems Architect

> **Vision**: Portofolio 3D interaktif berstandar Awwwards SOTD untuk calon Software Engineer & Mahasiswa Sistem Informasi.  
> **Aesthetic Tone**: *Clean, Intentional, High Technical Depth* (Anti-Slop, Deep Midnight `#080C14` & Ice Blue `#7DD3FC`, Swiss Editorial Typography, 60fps Mobile Performance).  
> **Tech Stack**: React 18 (Vite), Three.js & React Three Fiber (`@react-three/fiber` v8, `@react-three/drei` v9), GSAP v3, Lenis.

---

## 1. Architectural Decisions (ADR)
| Decision | Rationale |
|---|---|
| **React Three Fiber (R3F) v8 + Drei v9** | Kompatibel penuh dengan React 18, arsitektur deklaratif scene graph WebGL, efisien mengelola shader & animasi per-frame via `useFrame`. |
| **Procedural 3D Object (No GLTF)** | Objek 3D dibuat murni dengan formula matematika / vertex-fragment shader (fluid glass torus knot / organic particle wave), ukuran 0KB asset download, 60 FPS di mobile. |
| **GSAP Context + ScrollTrigger** | Animasi teks staggered reveal (translateY + clip-path) yang terkoordinasi dengan lifecycle React (`gsap.context()` untuk zero memory leak). |
| **Studio Freight Lenis Global Engine** | Inertia scrolling yang sinkron dengan loop requestAnimationFrame WebGL, menjamin pergerakan halaman berbobot dan mulus (*buttery smooth*). |
| **Hover WebGL Liquid Image Distortion** | Untuk showcase proyek (E-Commerce, Portal Prestasi, Flutter Mobile), menggantikan kartu generik dengan tipografi raksasa yang memicu canvas WebGL distorsi cairan saat kursor di-hover. |

---

## 2. Phased Roadmap
- [x] **Phase 1: Project Setup & Core Dependencies** (Vite, R3F v8, Drei v9, GSAP v3, Lenis, DPR management)
- [/] **Phase 2: Core Foundation & Hero Section** (`App.jsx` + `SmoothScrollProvider` + R3F Canvas + Procedural Mesh + GSAP Reveal)
- [ ] **Phase 3: WebGL Liquid Distortion Project Showcase** (Editorial Typography list + Floating WebGL Image Displacement Shader)
- [ ] **Phase 4: Skills Matrix & Academic Track** (Editorial Data Layout, Zero dead code)
- [ ] **Phase 5: Performance Audit & 60fps Mobile Verification**
