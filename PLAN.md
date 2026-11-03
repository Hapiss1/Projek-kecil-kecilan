# Architectural Blueprint: Master Awwwards Editorial & Ambient WebGL Portfolio
## Muhammad Hafizh Farsya — Information Systems & Software Engineer

> **Core Philosophy**: *"Most portfolios try to impress. This one tries to communicate."*  
> **Performance Directive**: Extreme Optimization. Instant FCP, rock-solid 60 FPS on mid-range smartphones, zero thermal throttling (prevent phone overheating), and zero stutter on initial load or scroll.

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

## 2. Extreme Performance Architecture (ADR)

| Decision | Rationale |
|---|---|
| **GPU Shader Pre-warming (`gl.compile`)** | Calls `gl.compile(scene, camera)` and `gl.render(scene, camera)` inside the R3F initialization hook during the Preloader phase. Guarantees VRAM upload and shader compilation finish before the curtain opens, eliminating first-second frame drops. |
| **Strict DPR Limiting (`[1, 1.5]`)** | Clamps canvas pixel ratio to a maximum of 1.5x. Prevents 3x/4x mobile retina screens from calculating excessive fragment shader pixels, preventing GPU thermal throttling. |
| **Dynamic Viewport Culling (`frameloop={isInView ? 'always' : 'never'}`)** | IntersectionObserver actively halts R3F `useFrame` render loop when off-screen. Drops GPU utilization to 0% when the visitor reads other sections. |
| **Hardware-Accelerated GSAP Only** | Exclusively animates composite-layer GPU properties (`yPercent`, `xPercent`, `scale`, `rotation`, `opacity`). Zero animation of reflow properties (`width`, `height`, `top`, `left`, `margin`), preventing Layout Thrashing. |
| **Code Splitting & Asynchronous Suspense** | Decouples Three.js (~750kb) and below-the-fold modules from the critical render path using `React.lazy()` and `<Suspense>`. |
| **Rollup Manual Chunk Splitting** | Isolates `three-vendor`, `react-r3f-vendor`, and `animation-vendor` into distinct immutable chunks for maximal HTTP/2 parallel downloading and browser caching. |

---

## 3. Implemented Master Components

- [OptimizedCanvas.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/OptimizedCanvas.jsx): Encapsulates strict DPR, GPU shader pre-warming, and IntersectionObserver dynamic culling.
- [App.jsx](file:///d:/Project%20kecil-kecilan/testing/src/App.jsx): Master application coordinator with `React.lazy()` & `<Suspense>`, Lenis scroll loop, CSS skew velocity sync.
- [AmbientFluidCanvas.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/AmbientFluidCanvas.jsx): GLSL Simplex noise domain-warping fluid mesh running on R3F.
- [HeroSection.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/HeroSection.jsx): Staggered Split-Text reveal + 3D Mouse Tilt Avatar Card + Ambient WebGL Canvas.
- [CinematicPreloader.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/CinematicPreloader.jsx): Minimal theater curtain preloader (0-100%).
- [ScrollDirectionalMarquee.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/ScrollDirectionalMarquee.jsx): Dynamic running text with velocity acceleration.
- [MagneticCursor.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/MagneticCursor.jsx): Difference precision cursor with contextual micro-copy.
- [EditorialProjects.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialProjects.jsx): Magazine list layout with pure GSAP floating image preview masking.
- [EditorialCapabilities.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialCapabilities.jsx): "The One Live Thing" interactive architecture inspector.
- [EditorialProfileEducation.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialProfileEducation.jsx): Academic pedigree & Telkom University foundation with author portrait.
- [EditorialContactFooter.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EditorialContactFooter.jsx): Direct communication cards and editorial colophon.
- [EngineeringToggle.jsx](file:///d:/Project%20kecil-kecilan/testing/src/components/EngineeringToggle.jsx): Engineering Easter Egg (3D Wireframe + FPS HUD).
