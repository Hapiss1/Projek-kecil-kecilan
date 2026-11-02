# Architectural Blueprint: Awwwards-Level Anti-Slop 3D Portfolio
## Muhammad Hafizh Farsya Syahputra — Information Systems (Telkom University) & RPL Alumnus (SMK Telkom Banjarbaru)

> **Status**: Completed & Verified (Sprint 1 to 4 fully implemented)  
> **Repository**: [https://github.com/Hapiss1/Projek-kecil-kecilan](https://github.com/Hapiss1/Projek-kecil-kecilan)

---

## 1. Project Overview & Scope
- **Subject**: Muhammad Hafizh Farsya Syahputra — Mahasiswa S1 Sistem Informasi (Telkom University, 2026) & Alumni Rekayasa Perangkat Lunak (SMK Telkom Banjarbaru, 2023-2026).
- **Surface Mode**: **Experience & Persuade** (Portfolio calon software engineer profesional, asisten praktikum Algoritma, dan praktisi sistem informasi enterprise).
- **Visual Identity**: **Deep Night Navy & Ice Blue** (`#080C14` / `#7DD3FC`).
- **Core Invariant**: Anti-Slop (No pill kickers, Two-Line headline rule, Swiss editorial typography, tone-step surfaces, no generic 3-card rows, zero purple SaaS gradients).

---

## 2. Technical Architecture
1. **WebGL 3D Canvas**: Vanilla Three.js (`Background3DCanvas.jsx`) rendering a procedural wireframe icosahedron crystal with mouse inertia tilt (lerp 0.05), scroll camera travel, and visibility pause.
2. **Smooth Scroll Engine**: Lenis (`SmoothScrollProvider.jsx`) running a 60 FPS rAF loop with exponential ease-out curve.
3. **Showcase Layout**: Sticky Depth Stacking (`ProjectsShowcase.jsx`) with 4 featured systems.
4. **"The One Live Thing"**: In-Card Interactive Sandbox directly embedded into each project card (E-Commerce POS, Student Achievement Search, Flutter Device Preview, Python Algorithmic Inspector).
5. **Authentic Imagery**: Portrait photo `/hapiss.jpg` in school uniform seamlessly integrated into the Hero grid.
6. **ATS Resume**: Printable CV modal with `@media print` black-and-white output.

---

## 3. Milestones & Completion Matrix

- [x] **Phase 1**: Brainstorming & Visual Companion Exploration *(Completed)*
- [x] **Phase 2**: Spec & Design Doc Approval + Builder Check Review *(Completed)*
- [x] **Phase 3**: Dependency Setup & Design Tokens (`three`, `lenis`, `src/index.css`) *(Verified)*
- [x] **Phase 4**: Background 3D Canvas & Smooth Scroll Engine *(Verified)*
- [x] **Phase 5**: HUD Minimalist Navbar with Live Bandung Time (WIB) *(Verified)*
- [x] **Phase 6**: Hero Section with Two-Line Headline & Authentic Portrait *(Verified)*
- [x] **Phase 7**: Sticky Depth Projects Showcase & In-Card Interactive Sandbox *(Verified)*
- [x] **Phase 8**: Swiss Editorial Skills & Enterprise Architecture Matrix *(Verified)*
- [x] **Phase 9**: Education & Academic Telematics Track *(Verified)*
- [x] **Phase 10**: Contact HUD, ATS CV Printable Modal, and Footer *(Verified)*
- [x] **Phase 11**: App Assembly, Bundle Optimization, and Git Push *(Verified)*
