# Architectural Blueprint: Master Awwwards Editorial & Ambient WebGL Portfolio
## Muhammad Hafizh Farsya — Information Systems & Software Engineer

> **Core Philosophy**: *"Most portfolios try to impress. This one tries to communicate."*  
> **Aesthetic Synthesis**: Minimalist Editorial & Clean Brutalism fused with Subtle Ambient WebGL & Advanced GSAP (Inspired by Dribbble: Dymas Alfin — *Personal Portfolio Website Animations*).  
> **Guiding Principle**: Extreme whitespace, giant typography, zero visual clutter. WebGL acts as a subtle, organic ambient layer (low-key earth tones). The 3D avatar is presented in an interactive editorial card with 3D mouse parallax tilt.

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

### Iteration 1: Infrastructure & Split-Text Hero `[VERIFIED]`
- [x] Install & verify Vite + TailwindCSS + GSAP + Lenis + Three.js + R3F.
- [x] Configure strict color tokens in `tailwind.config.js`.
- [x] Build root `App.jsx` with global Lenis inertia scrolling & scroll-velocity tracking.
- [x] Build `CinematicPreloader.jsx` (0-100% numerical counter with theater curtain lift).
- [x] Build `HeroSection.jsx` with Staggered Split-Text reveal (micro-rotation, masked overflow).

### Iteration 2: Subtle Ambient WebGL Shader & Interactive Systems `[VERIFIED]`
- [x] Implement custom GLSL shader (simplex noise organic fluid/fBm) in strict earth tones (`#CEB3A6`, `#9C6455`, `#5E3A30`).
- [x] Connect Lenis velocity (`velocityRef`) to shader frequency/distortion uniforms and CSS skew.
- [x] Build `ScrollDirectionalMarquee.jsx` reacting to scroll velocity and reversing direction when scrolling up.
- [x] Build `MagneticCursor.jsx` with difference dot & 10px monospace micro-copy.
- [x] Build `EngineeringToggle.jsx` Easter Egg switching 3D mesh to wireframe and rendering real-time FPS telemetry.

### Iteration 3: 3D Avatar Portrait & Dribbble Motion (Dymas Alfin Inspiration) `[VERIFIED]`
- [x] Asymmetrical Hero layout balancing 8-column giant typography with 4-column framed portrait card.
- [x] GSAP clip-path entrance animation (`inset(12% -> 0% round 1.25rem)`) for the avatar card.
- [x] Interactive 3D mouse parallax tilt on the portrait card using GSAP `quickTo`.
- [x] Editorial floating status capsule: live pulsating terracotta indicator `Available for Roles · Bandung, ID`.
- [x] Profile/About section author avatar badge in `EditorialProfileEducation.jsx`.

---

## 3. Implemented Master Components

- [HeroSection.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/HeroSection.jsx): Staggered Split-Text reveal + 3D Mouse Tilt Avatar Card + Ambient WebGL Canvas.
- [AmbientFluidCanvas.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/AmbientFluidCanvas.jsx): GLSL Simplex noise domain-warping fluid mesh running on R3F.
- [CinematicPreloader.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/CinematicPreloader.jsx): Minimal theater curtain preloader (0-100%).
- [ScrollDirectionalMarquee.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/ScrollDirectionalMarquee.jsx): Dynamic running text with velocity acceleration.
- [MagneticCursor.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/MagneticCursor.jsx): Difference precision cursor with contextual micro-copy.
- [EditorialProjects.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialProjects.jsx): Magazine list layout with pure GSAP floating image preview masking.
- [EditorialCapabilities.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialCapabilities.jsx): "The One Live Thing" interactive architecture inspector.
- [EditorialProfileEducation.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialProfileEducation.jsx): Academic pedigree & Telkom University foundation with author portrait.
- [EditorialContactFooter.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialContactFooter.jsx): Direct communication cards and editorial colophon.
- [EngineeringToggle.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EngineeringToggle.jsx): Engineering Easter Egg (3D Wireframe + FPS HUD).
