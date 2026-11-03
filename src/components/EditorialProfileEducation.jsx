import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function EditorialProfileEducation({ personal, educationHistory }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.education-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 sm:px-12 py-24 sm:py-32 border-b border-neutral-line/30 bg-base"
    >
      {/* 1. Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20 education-reveal">
        <div className="lg:col-span-3">
          <span className="text-xs font-semibold tracking-widest text-neutral-line uppercase">
            03 / FOUNDATION
          </span>
        </div>
        <div className="lg:col-span-9">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.05] max-w-3xl">
            Academic Pedigree &amp; Engineering Roots
          </h2>
          <p className="mt-6 text-base sm:text-lg text-ink-secondary max-w-2xl font-light leading-relaxed">
            Kombinasi latar belakang vokasi rekayasa perangkat lunak dan keilmuan sistem informasi
            untuk merancang solusi teknologi yang berdampak nyata bagi organisasi.
          </p>
        </div>
      </div>

      {/* 2. Editorial Split: Biography & Academic History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start education-reveal">
        
        {/* Left Column: Personal Narrative & Focus */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 border border-neutral-line/40 bg-base">
            
            {/* Author Editorial Header with Avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-line/20">
              <img
                src="/avatar.jpg"
                alt="Muhammad Hafizh Farsya"
                className="w-16 h-16 rounded-full object-cover object-top border-2 border-earth-terracotta/40 shadow-sm"
              />
              <div>
                <h4 className="font-bold text-base text-ink tracking-tight">
                  Muhammad Hafizh Farsya S.
                </h4>
                <p className="text-xs text-neutral-line font-mono mt-0.5">
                  S1 Sistem Informasi · Telkom University
                </p>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
              Rekayasa Kode yang Terstruktur
            </h3>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-light mb-6">
              {personal.bio.id}
            </p>

            <div className="border-t border-neutral-line/30 pt-6 space-y-3 text-xs sm:text-sm text-ink font-medium">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Telkom University &amp; SMK Telkom Banjarbaru</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>{personal.availability.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Educational Timeline */}
        <div className="lg:col-span-7 space-y-8">
          {educationHistory.map((item, idx) => (
            <div
              key={idx}
              className="p-8 border border-neutral-line/40 bg-base hover:border-earth-terracotta transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-line/30">
                <div>
                  <span className="text-xs uppercase tracking-widest text-earth-terracotta font-semibold">
                    {item.status.id}
                  </span>
                  <h4 className="text-2xl font-bold text-ink tracking-tight mt-1">
                    {item.institution}
                  </h4>
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-line flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm sm:text-base font-semibold text-ink">
                  {item.major.id}
                </p>
                <p className="mt-2 text-sm text-ink-secondary leading-relaxed font-light">
                  {item.summary.id}
                </p>

                {/* Highlights List */}
                <div className="mt-6 pt-6 border-t border-neutral-line/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-line block mb-3">
                    Fokus Kurikulum &amp; Capaian:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-earth-terracotta shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

