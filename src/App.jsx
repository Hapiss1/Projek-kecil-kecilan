import React, { useState, useCallback } from 'react';
import { portfolioData } from './data/portfolioData';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { Background3DCanvas } from './components/Background3DCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationTimeline } from './components/EducationTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

/**
 * App Root Component
 * Wires the Lenis smooth scroll engine, background Three.js WebGL canvas,
 * and the Anti-Slop editorial components.
 */
export default function App() {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll callback forwarded from Lenis
  const handleScroll = useCallback((progress) => {
    setScrollProgress(progress);
  }, []);

  return (
    <SmoothScrollProvider onScroll={handleScroll}>
      <div className="portfolio-app-root">
        
        {/* Fixed 3D WebGL Background Layer */}
        <Background3DCanvas scrollProgress={scrollProgress} />

        {/* Minimalist HUD Navigation */}
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          content={portfolioData} 
          onOpenCv={() => setIsCvOpen(true)} 
        />

        {/* Main Foreground Architectural Content */}
        <main>
          {/* Hero Section with Authentic Portrait */}
          <Hero 
            lang={lang} 
            content={portfolioData} 
            onOpenCv={() => setIsCvOpen(true)} 
          />

          {/* Sticky Depth Projects Showcase & In-Card Interactive Sandbox */}
          <ProjectsShowcase 
            lang={lang} 
            content={portfolioData} 
          />

          {/* Swiss Editorial Skills & Enterprise Architecture Matrix */}
          <SkillsMatrix 
            lang={lang} 
            content={portfolioData} 
          />

          {/* Education & Academic Telematics Track */}
          <EducationTimeline 
            lang={lang} 
            content={portfolioData} 
          />

          {/* Industrial Contact & Direct Communication Channels */}
          <ContactSection 
            lang={lang} 
            content={portfolioData} 
          />
        </main>

        {/* Minimalist Baseline Footer */}
        <Footer 
          lang={lang} 
          content={portfolioData} 
        />

        {/* ATS CV Printable Modal */}
        <CvModal 
          isOpen={isCvOpen} 
          onClose={() => setIsCvOpen(false)} 
          content={portfolioData} 
        />

      </div>
    </SmoothScrollProvider>
  );
}
