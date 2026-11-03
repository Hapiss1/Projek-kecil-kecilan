# Architectural Blueprint: Master Awwwards Editorial & Ambient WebGL Portfolio
## Muhammad Hafizh Farsya — Information Systems & Software Engineer

> **Core Philosophy**: *"Most portfolios try to impress. This one tries to communicate."*  
> **Aesthetic Synthesis**: Minimalist Editorial & Clean Brutalism fused with Subtle Ambient WebGL & Advanced GSAP.  
> **Guiding Principle**: Extreme whitespace, giant typography, zero visual clutter. WebGL acts as a subtle, organic ambient layer (low-key earth tones) responding to interaction, not an overwhelming spectacle.

---

## 1. Strict Color Palette (Hex Codes)

| Role | Token Name | Hex Code | Purpose |
|---|---|---|---|
| **Base / Canvas** | `base` | `#FDFDFD` | Off-white canvas, extreme whitespace |
| **Primary Ink** | `ink` | `#0A0909` | Bold headlines, primary copy, maximum contrast |
| **Borders & Dividers** | `neutral-line` | `#707070` | Hairline grid lines, editorial borders, muted metadata |
| **Earth Highlight 1** | `earth-taupe` | `#CEB3A6` | Ambient fluid tone 1, soft hover washes, badges |
| **Earth Highlight 2** | `earth-terracotta` | `#9C6455` | Ambient fluid tone 2, accent hover, focus markers |
| **Earth Highlight 3** | `earth-espresso` | `#5E3A30` | Ambient fluid tone 3, deep brutalist grounding |

---

## 2. Master Feature Roadmap

### Iteration 1: Infrastructure & Hero Foundations `[VERIFIED]`
- [x] Install & verify Vite + TailwindCSS + GSAP + Lenis + Three.js + R3F.
- [x] Configure strict color tokens in `tailwind.config.js`.
- [x] Build root `App.jsx` with global Lenis inertia scrolling & scroll-velocity tracking.
- [x] Build `CinematicPreloader.jsx` (0-100% numerical counter with theater curtain lift).
- [x] Build `HeroSection.jsx` with Staggered Split-Text reveal (micro-rotation, masked overflow).

### Iteration 2: Subtle Ambient WebGL Shader & Interactive Systems `[VERIFIED]`
- [x] Implement custom GLSL shader (simplex noise organic fluid/fBm) in strict earth tones (`#CEB3A6`, `#9C6455`, `#5E3A30`).
- [x] Connect Lenis velocity (`velocityRef`) to shader frequency/distortion uniforms and CSS skew without triggering React re-renders.
- [x] Build `ScrollDirectionalMarquee.jsx` reacting to scroll velocity and reversing direction when scrolling up.
- [x] Build `MagneticCursor.jsx` with difference dot & 10px monospace micro-copy (`[Stack: ...]`, `[Inspect Case Study]`).
- [x] Build `EngineeringToggle.jsx` Easter Egg switching 3D mesh to wireframe and rendering real-time FPS telemetry.

---

## 3. Implemented Master Components

- [App.jsx](file:///d:/Project%20kecil-kecilan/testing/src/App.jsx): Master application coordinator, Lenis scroll loop, CSS skew velocity sync.
- [AmbientFluidCanvas.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/AmbientFluidCanvas.jsx): GLSL Simplex noise domain-warping fluid mesh running on R3F.
- [HeroSection.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/HeroSection.jsx): Staggered Split-Text reveal with micro-rotation and ambient canvas.
- [CinematicPreloader.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/CinematicPreloader.jsx): Minimal theater curtain preloader (0-100%).
- [ScrollDirectionalMarquee.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/ScrollDirectionalMarquee.jsx): Dynamic running text with velocity acceleration.
- [MagneticCursor.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/MagneticCursor.jsx): Difference precision cursor with contextual micro-copy.
- [EditorialProjects.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialProjects.jsx): Magazine list layout with pure GSAP floating image preview masking.
- [EditorialCapabilities.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialCapabilities.jsx): "The One Live Thing" interactive architecture inspector.
- [EditorialProfileEducation.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialProfileEducation.jsx): Academic pedigree & Telkom University foundation.
- [EditorialContactFooter.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialContactFooter.jsx): Direct communication cards and editorial colophon.
- [EngineeringToggle.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EngineeringToggle.jsx): Engineering Easter Egg (3D Wireframe + FPS HUD).
