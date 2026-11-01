import React, { useState } from 'react';
import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveWorkbench } from './components/InteractiveWorkbench';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationTimeline } from './components/EducationTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export default function App() {
  const [lang, setLang] = useState('id'); // 'id' or 'en'
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <div className="portfolio-app-root">
      {/* Navigation */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        content={portfolioData} 
        onOpenCv={() => setIsCvOpen(true)} 
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          lang={lang} 
          content={portfolioData} 
          onOpenCv={() => setIsCvOpen(true)} 
        />

        {/* The One Live Thing: Interactive Workbench */}
        <InteractiveWorkbench 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Featured Projects with Alternating Geometry */}
        <ProjectsShowcase 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Technical & Soft Skills Matrix */}
        <SkillsMatrix 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Education & SMK Telkom Banjarbaru Track */}
        <EducationTimeline 
          lang={lang} 
          content={portfolioData} 
        />

        {/* Contact & Industrial Connection */}
        <ContactSection 
          lang={lang} 
          content={portfolioData} 
        />
      </main>

      {/* Footer */}
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
  );
}

