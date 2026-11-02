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
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { DebugModeHUD } from './components/DebugModeHUD';
import { soundEngine } from './utils/soundEngine';

/**
 * App.jsx — Awwwards Creative Engineering Foundation Architecture
 * 
 * 5 Fitur Unggulan Terintegrasi:
 * 1. Cinematic WebGL Curtain Preloader (0% -> 100% shader compilation)
 * 2. Magnetic Custom Cursor dengan blend-mode difference & snapping physics
 * 3. Engineering / Debug Mode Toggle (hacker wireframe + real-time FPS telemetry)
 * 4. Subtle UI Sound Design via Web Audio API (prosedural micro-audio & velocity hum)
 * 5. Fluid Page Transitions (Liquid wave case study view tanpa hard reload)
 */
export default function App() {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const [debugMode, setDebugMode] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const lenisRef = useRef(null);

  // 1. Inisialisasi Global Smooth Inertia Scrolling & Sound Velocity Listener
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

    // Sinkronisasi kecepatan scroll dengan Web Audio ambient hum
    lenis.on('scroll', (e) => {
      soundEngine.updateScrollHum(e.velocity);
    });

    // Loop requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`portfolio-app-root ${debugMode ? 'debug-mode-active' : ''}`}>
      
      {/* 1. Cinematic WebGL Curtain Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 2. Magnetic Precision Custom Cursor */}
      <CustomCursor />

      {/* 3. Engineering / Debug Mode Telemetry & Toggle */}
      <DebugModeHUD 
        debugMode={debugMode} 
        setDebugMode={setDebugMode} 
      />

      {/* 4. R3F Procedural WebGL Canvas (Fixed Interactive Background) */}
      <div className="webgl-canvas-fixed" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]} // Clamped DPR untuk 60 FPS mobile
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <ProceduralSceneRig debugMode={debugMode} />
        </Canvas>
      </div>

      {/* Persistent Floating HUD Navigation */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        content={portfolioData} 
      />

      {/* Main Editorial Content Flow */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <HeroSection 
          content={portfolioData} 
          lang={lang} 
        />

        {/* Selected Works dengan WebGL Liquid Distortion & Fluid Case Studies */}
        <ProjectsShowcase 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Swiss Technical Matrix */}
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
