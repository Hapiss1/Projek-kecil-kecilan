import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { portfolioData } from './data/portfolioData';
import { ProceduralSceneRig } from './components/ProceduralHeroScene';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationTimeline } from './components/EducationTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

/**
 * App.jsx — Awwwards-Standard Foundation Architecture
 * 
 * Integrasi Inti:
 * 1. Global Lenis Inertia Scroll: Loop RAF 60fps dengan easing eksponensial.
 * 2. React Three Fiber (R3F) Canvas: Scene WebGL prosedural berbobot ringan (0 KB gltf assets).
 * 3. Hero Section: Tipografi editorial raksasa + staggered text reveal via GSAP context.
 */
export default function App() {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const lenisRef = useRef(null);

  // 1. Inisialisasi Global Smooth Inertia Scrolling via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Loop requestAnimationFrame untuk sinkronisasi render & scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Cleanup saat unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      
      {/* 2. R3F Procedural WebGL Canvas (Fixed Background / Interactive Layer) */}
      <div className="webgl-canvas-fixed" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]} // Clamped DPR: Menjamin stabilitas 60 FPS di layar Retina & HP
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ProceduralSceneRig />
        </Canvas>
      </div>

      {/* Floating HUD Navigation */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        content={portfolioData} 
      />

      {/* Main Content Flow */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* 3. Hero Section dengan Tipografi Editorial & GSAP Text Reveal */}
        <HeroSection 
          content={portfolioData} 
          lang={lang} 
        />

        {/* Selected Works / Projects Showcase (Akan dirombak menjadi WebGL Image Distortion pada langkah berikutnya) */}
        <ProjectsShowcase 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Technical Matrix */}
        <SkillsMatrix 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Academic Journey */}
        <EducationTimeline 
          lang={lang} 
          content={portfolioData} 
        />

        {/* High-Impact Contact */}
        <ContactSection 
          lang={lang} 
          content={portfolioData} 
        />
      </main>

      {/* Minimalist Footer */}
      <Footer 
        lang={lang} 
        content={portfolioData} 
      />

    </div>
  );
}
