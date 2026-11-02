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

/**
 * App Component
 * Redesigned to match Dymas Alfin's Dribbble editorial minimalist portfolio aesthetic:
 * Clean typography hierarchy, fluid smooth inertia scroll, and interactive project sandboxes.
 */
export default function App() {
  const [lang, setLang] = useState('id'); // 'id' | 'en'
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback((progress) => {
    setScrollProgress(progress);
  }, []);

  return (
    <SmoothScrollProvider onScroll={handleScroll}>
      <div className="portfolio-app-root">
        
        {/* Ambient WebGL 3D Layer */}
        <Background3DCanvas scrollProgress={scrollProgress} />

        {/* Minimalist Floating HUD Navigation */}
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          content={portfolioData} 
        />

        {/* Main Editorial Flow */}
        <main>
          {/* Hero Section */}
          <Hero 
            lang={lang} 
            content={portfolioData} 
          />

          {/* Selected Works / Projects Showcase */}
          <ProjectsShowcase 
            lang={lang} 
            content={portfolioData} 
          />

          {/* Services & Technical Matrix */}
          <SkillsMatrix 
            lang={lang} 
            content={portfolioData} 
          />

          {/* Education & Academic Journey */}
          <EducationTimeline 
            lang={lang} 
            content={portfolioData} 
          />

          {/* High-Impact Contact Section */}
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
    </SmoothScrollProvider>
  );
}
