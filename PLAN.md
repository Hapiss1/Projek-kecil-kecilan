# Architectural Blueprint: Editorial, Tactile & Cinematic 3D Portfolio
## Muhammad Hafizh Farsya — Creative Developer & Systems Architect

> **Art Direction**: *Editorial, Tactile, dan Cinematic* (Awwwards SOTD / FWA Standards).  
> **Core Pillars**: Typographic Masking, Asymmetric High-Fashion Editorial Layout, Film Grain Texture, Contextual Color Morphing, Bespoke Easing & Scroll Velocity Skew.  
> **Tech Stack**: React 18 (Vite), Three.js & React Three Fiber (R3F v8), GSAP v3, Lenis.

---

## 1. Architectural Decisions (ADR)
| Decision | Rationale |
|---|---|
| **Global Film Grain Overlay** | Tekstur film grain SVG statis beresolusi tinggi pada layer z-index teratas dengan `pointer-events: none` dan `mix-blend-mode: overlay` untuk memberikan sensasi taktil seperti kertas cetak/majalah analog. |
| **Bespoke Cubic Easing & Velocity Tracking** | Menggantikan ease standar dengan kurva bespoke `cubic-bezier(0.16, 1, 0.3, 1)` dan menghubungkan kecepatan inersia Lenis (`e.velocity`) ke transformasi skew UI (`transform: skewY(...)`). |
| **Cinematic Curtain Preloader** | Hitungan persentase monospaced 0%-100% yang menyembunyikan inisialisasi shader & WebGL, diakhiri dengan tarikan tirai teater GSAP yang mulus tanpa lag. |
| **Typographic Masking Hero (Next Iteration)** | Teks nama raksasa dengan `background-clip: text` atau WebGL render target mask, sehingga objek 3D interaktif hanya terlihat di dalam rongga huruf. |
| **Asymmetric Editorial Layout (Next Iteration)** | Grid asimetris ala majalah editorial high-fashion dengan teks dan visual yang saling overlap secara harmonis. |

---

## 2. Iteration Roadmap
- [/] **Iteration 1: Foundation, Lenis Scroll, Cinematic Preloader, & Global Film Grain Overlay** `[CURRENT FOCUS]`
- [ ] **Iteration 2: Typographic Masking Hero Section with Procedural R3F WebGL**
- [ ] **Iteration 3: Asymmetric Editorial Showcase & Liquid Ripple Shader with Magnetic Micro-Copy**
- [ ] **Iteration 4: Contextual Color Morphing on Scroll (GSAP ScrollTrigger)**
- [ ] **Iteration 5: Performance Verification & 60 FPS Mobile Audit**
