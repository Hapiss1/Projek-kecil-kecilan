import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicPreloader } from './components/CinematicPreloader';
import { portfolioData } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CODE SPLITTING & LAZY LOADING (Memory Decoupling & Instant FCP)
// Dependensi Three.js, WebGL shader, dan modul di luar viewport dimuat
// secara asinkron di latar belakang tanpa memblokir bundle kritis HTML/CSS awal.
// ============================================================================
const HeroSection = lazy(() =>
  import('./components/HeroSection').then((m) => ({ default: m.HeroSection }))
);
const ScrollDirectionalMarquee = lazy(() =>
  import('./components/ScrollDirectionalMarquee').then((m) => ({
    default: m.ScrollDirectionalMarquee,
  }))
);
const EditorialProjects = lazy(() =>
  import('./components/EditorialProjects').then((m) => ({
    default: m.EditorialProjects,
  }))
);
const EditorialCapabilities = lazy(() =>
  import('./components/EditorialCapabilities').then((m) => ({
    default: m.EditorialCapabilities,
  }))
);
const EditorialProfileEducation = lazy(() =>
  import('./components/EditorialProfileEducation').then((m) => ({
    default: m.EditorialProfileEducation,
  }))
);
const EditorialContactFooter = lazy(() =>
  import('./components/EditorialContactFooter').then((m) => ({
    default: m.EditorialContactFooter,
  }))
);
const MagneticCursor = lazy(() =>
  import('./components/MagneticCursor').then((m) => ({
    default: m.MagneticCursor,
  }))
);
const EngineeringToggle = lazy(() =>
  import('./components/EngineeringToggle').then((m) => ({
    default: m.EngineeringToggle,
  }))
);

export default function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isShaderWarmed, setIsShaderWarmed] = useState(false);
  const lenisRef = useRef(null);
  const velocityRef = useRef(0);

  // 1. Inisialisasi Lenis Smooth Inertia Scroll & Sinkronisasi Ticker GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sinkronisasi frame-perfect antara Lenis & GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      velocityRef.current = e.velocity;

      // Hardware-Accelerated: Mengikat kecepatan scroll ke CSS transform skew mikro (maks ±1.5deg)
      const clampedSkew = Math.max(-1.5, Math.min(1.5, e.velocity * 0.03));
      document.documentElement.style.setProperty('--scroll-skew', `${clampedSkew}deg`);
    });

    // Jalankan Lenis pada clock frame tunggal GSAP ticker
    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (targetId) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetId, { offset: -30, duration: 1.2 });
    }
  };

  return (
    <div className="min-h-screen bg-base text-ink selection:bg-earth-taupe selection:text-ink">
      
      {/* 1. Cinematic WebGL Theater Curtain Preloader (0-100%) */}
      {!isPreloaderDone && (
        <CinematicPreloader onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* Critical Lightweight Top Bar (Loaded instantly with HTML/CSS) */}
      <header className="fixed top-0 left-0 w-full z-40 bg-base/90 backdrop-blur-sm border-b border-neutral-line/20 px-6 sm:px-12 py-5 flex items-center justify-between text-xs tracking-wider uppercase">
        <a
          href="#"
          data-microcopy="[Scroll to Top]"
          className="font-bold text-ink hover:text-earth-terracotta transition-colors duration-200"
        >
          MHF — 2026
        </a>
        <nav className="flex items-center gap-6 sm:gap-10">
          <button
            onClick={() => scrollToSection('#projects')}
            data-microcopy="[View Works]"
            className="text-neutral-line hover:text-ink transition-colors duration-200 uppercase font-medium cursor-pointer"
          >
            Archive
          </button>
          <button
            onClick={() => scrollToSection('#capabilities')}
            data-microcopy="[System Stack]"
            className="hidden sm:inline-block text-neutral-line hover:text-ink transition-colors duration-200 uppercase font-medium cursor-pointer"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollToSection('#about')}
            data-microcopy="[Foundation]"
            className="hidden sm:inline-block text-neutral-line hover:text-ink transition-colors duration-200 uppercase font-medium cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            data-microcopy="[Get in Touch]"
            className="px-3.5 py-1.5 border border-neutral-line/40 hover:bg-earth-terracotta hover:border-earth-terracotta hover:text-base transition-all duration-200 uppercase font-semibold text-[11px] cursor-pointer"
          >
            Dispatch
          </button>
        </nav>
      </header>

      {/* 2. React Suspense Lazy Boundary untuk Komponen Berat WebGL & Modules */}
      <Suspense fallback={null}>
        
        {/* Precision Magnetic Cursor */}
        <MagneticCursor />

        {/* Engineering Easter Egg Toggle (Wireframe & FPS HUD) */}
        <EngineeringToggle
          isWireframe={isWireframe}
          onToggleWireframe={() => setIsWireframe((prev) => !prev)}
          velocityRef={velocityRef}
        />

        {/* Main Content Flow dengan Velocity Skew */}
        <main style={{ transform: 'skewY(var(--scroll-skew, 0deg))', transition: 'transform 0.1s linear' }}>
          
          {/* Hero Section: Staggered Split-Text & Subtle Ambient R3F Canvas */}
          <HeroSection
            isPreloaderDone={isPreloaderDone}
            velocityRef={velocityRef}
            isWireframe={isWireframe}
            onShaderWarmedUp={() => setIsShaderWarmed(true)}
          />

          {/* Scroll-Directional Running Text Marquee */}
          <ScrollDirectionalMarquee velocityRef={velocityRef} />

          {/* 01. Editorial Project Showcase */}
          <EditorialProjects projects={portfolioData.projects} />

          {/* 02. Editorial Capabilities & "The One Live Thing" */}
          <EditorialCapabilities skillCategories={portfolioData.skillCategories} />

          {/* 03. Editorial Foundation & Academic Timeline */}
          <EditorialProfileEducation
            personal={portfolioData.personal}
            educationHistory={portfolioData.educationHistory}
          />

          {/* 04. Editorial Contact & Colophon Footer */}
          <EditorialContactFooter personal={portfolioData.personal} />
        </main>
      </Suspense>

    </div>
  );
}
