import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Database, Smartphone, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function EditorialCapabilities({ skillCategories }) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const inspectorRef = useRef(null);

  // Animasi reveal saat section muncul di viewport
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.capabilities-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animasi snappy saat berpindah tab inspektor
  useEffect(() => {
    if (inspectorRef.current) {
      gsap.fromTo(
        inspectorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  const activeCategory = skillCategories[activeTab] || skillCategories[0];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative px-6 sm:px-12 py-24 sm:py-32 border-b border-neutral-line/30 bg-base"
    >
      {/* 1. Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20 capabilities-reveal">
        <div className="lg:col-span-3">
          <span className="text-xs font-semibold tracking-widest text-neutral-line uppercase">
            02 / CAPABILITIES
          </span>
        </div>
        <div className="lg:col-span-9">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05] max-w-3xl">
            Engineering Disciplines &amp; System Stacks
          </h2>
          <p className="mt-6 text-base sm:text-lg text-ink-secondary max-w-2xl font-light leading-relaxed">
            Fondasi komputasi yang berfokus pada arsitektur perangkat lunak yang dapat diuji,
            efisiensi basis data relasional, dan perancangan proses bisnis terstruktur.
          </p>
        </div>
      </div>

      {/* 2. "The One Live Thing": Interactive Architecture & Capability Inspector */}
      <div className="capabilities-reveal border border-neutral-line/40 bg-base">
        
        {/* Top Tab Bar: Editorial Filter Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-line/40">
          {skillCategories.map((category, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-4 sm:p-6 transition-all duration-200 border-r last:border-r-0 border-neutral-line/30 cursor-pointer ${
                  isActive
                    ? 'bg-earth-espresso text-base'
                    : 'bg-base text-ink hover:bg-earth-taupe/20'
                }`}
              >
                <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60 mb-1">
                  MODULE 0{idx + 1}
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-tight line-clamp-1">
                  {category.domain.id}
                </div>
              </button>
            );
          })}
        </div>

        {/* Inspector Display Panel */}
        <div ref={inspectorRef} className="p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Domain Overview */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-line/30 pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs font-semibold tracking-widest text-earth-terracotta uppercase block mb-2">
                Active Domain
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                {activeCategory.domain.id}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-ink-secondary font-light leading-relaxed">
                {activeCategory.description.id}
              </p>

              <div className="mt-8 pt-6 border-t border-neutral-line/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-line block mb-2">
                  Total Technologies
                </span>
                <span className="text-3xl font-bold text-ink">
                  {activeCategory.skills.length} <span className="text-sm font-normal text-neutral-line">Competencies</span>
                </span>
              </div>
            </div>

            {/* Skills Detailed Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCategory.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 border border-neutral-line/30 bg-base hover:border-earth-terracotta hover:bg-earth-taupe/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-ink tracking-tight group-hover:text-earth-espresso transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 border border-neutral-line/40 text-neutral-line group-hover:border-earth-terracotta group-hover:text-earth-terracotta transition-colors">
                        {skill.level}
                      </span>
                    </div>
                    <div className="text-xs text-earth-terracotta font-medium mb-1">
                      {skill.badge}
                    </div>
                    <p className="text-xs text-ink-secondary font-light leading-relaxed">
                      {skill.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

