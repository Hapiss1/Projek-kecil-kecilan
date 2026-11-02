import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from './data/portfolioData';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationTimeline } from './components/EducationTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CinematicPreloader } from './components/CinematicPreloader';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
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

  // 1. Inisialisasi Global Smooth Inertia Scrolling & GSAP ScrollTrigger Integration
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    // Sinkronisasi frame-perfect antara Lenis, ScrollTrigger, dan Velocity Skew
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      soundEngine.updateScrollHum(e.velocity);
      // Sinkronisasi skew organik (maksimal 2.5 deg agar tidak mendistorsi keterbacaan)
      const clampedSkew = Math.max(-2.5, Math.min(2.5, e.velocity * 0.04));
      document.documentElement.style.setProperty('--scroll-skew', `${clampedSkew}deg`);
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
      
      {/* Global Cinematic Film Grain Overlay (Procedural SVG 0% GPU penalty) */}
      <FilmGrainOverlay />

      {/* 1. Cinematic WebGL Curtain Preloader */}
      {!preloaderDone && (
        <CinematicPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 2. Magnetic Precision Custom Cursor */}
      <CustomCursor />

      {/* 3. Engineering / Debug Mode Telemetry & Toggle */}
      <DebugModeHUD 
        debugMode={debugMode} 
        setDebugMode={setDebugMode} 
      />

      {/* Persistent Floating HUD Navigation */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        content={portfolioData} 
      />

      {/* Main Editorial Content Flow dengan Velocity Skew Responsive Transform */}
      <div className="velocity-skew-wrap">
        <main style={{ position: 'relative', zIndex: 2 }}>
          {/* Hero Section dengan WebGL Typographic Masking */}
          <HeroSection 
            content={portfolioData} 
            lang={lang} 
            debugMode={debugMode}
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
      </div>

      {/* Minimalist Footer */}
      <Footer 
        lang={lang} 
        content={portfolioData} 
      />

    </div>
  );
}
