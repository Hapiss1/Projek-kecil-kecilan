import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export function EditorialContactFooter({ personal }) {
  return (
    <footer id="contact" className="relative px-6 sm:px-12 pt-24 sm:pt-32 pb-12 bg-base">
      
      {/* 1. Giant Call-To-Action Heading */}
      <div className="border-b border-neutral-line/30 pb-16 sm:pb-24">
        <span className="text-xs font-semibold tracking-widest text-neutral-line uppercase block mb-4">
          04 / DISPATCH
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.0] max-w-4xl">
          Let’s Build Meaningful &amp; Engineered Systems.
        </h2>
        <p className="mt-8 text-base sm:text-xl text-ink-secondary font-light max-w-2xl leading-relaxed">
          Terbuka untuk diskusi arsitektur perangkat lunak, tawaran magang rekayasa software,
          maupun kolaborasi proyek skala enterprise.
        </p>

        {/* Direct Action Links Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Email Card */}
          <a
            href={`mailto:${personal.email}`}
            className="p-6 border border-neutral-line/40 hover:border-earth-terracotta hover:bg-earth-terracotta hover:text-base group transition-all duration-200 flex flex-col justify-between h-40"
          >
            <div className="flex items-center justify-between text-neutral-line group-hover:text-base/80">
              <span className="text-xs uppercase tracking-wider font-semibold">Email</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight break-all text-ink group-hover:text-base">
              {personal.email}
            </span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${personal.phoneClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-neutral-line/40 hover:border-earth-espresso hover:bg-earth-espresso hover:text-base group transition-all duration-200 flex flex-col justify-between h-40"
          >
            <div className="flex items-center justify-between text-neutral-line group-hover:text-base/80">
              <span className="text-xs uppercase tracking-wider font-semibold">WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-ink group-hover:text-base">
              {personal.phone}
            </span>
          </a>

          {/* GitHub Profile */}
          <a
            href="https://github.com/hapissf3001"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-neutral-line/40 hover:border-earth-taupe hover:bg-earth-taupe hover:text-ink group transition-all duration-200 flex flex-col justify-between h-40"
          >
            <div className="flex items-center justify-between text-neutral-line group-hover:text-ink/80">
              <span className="text-xs uppercase tracking-wider font-semibold">GitHub</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-ink">
              @hapissf3001
            </span>
          </a>

          {/* Location & Status */}
          <div className="p-6 border border-neutral-line/40 bg-earth-taupe/10 flex flex-col justify-between h-40">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-line">
              Base Location
            </span>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-ink block">
                Bandung, ID
              </span>
              <span className="text-xs text-earth-terracotta font-medium mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-earth-terracotta animate-pulse" />
                Available Worldwide
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Colophon & Fine Print */}
      <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-neutral-line">
        <div className="md:col-span-6">
          <p className="font-semibold text-ink">
            Muhammad Hafizh Farsya Syahputra
          </p>
          <p className="mt-1 font-light">
            S1 Sistem Informasi · Telkom University · Alumni RPL SMK Telkom Banjarbaru.
          </p>
        </div>

        <div className="md:col-span-3">
          <span className="font-semibold uppercase tracking-wider block text-ink mb-1">
            Design Standards
          </span>
          <p className="font-light">
            Minimalist Editorial &amp; Clean Brutalism. Strict Hex #FDFDFD &amp; #0A0909.
          </p>
        </div>

        <div className="md:col-span-3 md:text-right">
          <span className="font-semibold uppercase tracking-wider block text-ink mb-1">
            Engineered With
          </span>
          <p className="font-light">
            React 18 · Vite · GSAP · Lenis · TailwindCSS
          </p>
          <p className="mt-1 text-[11px] text-neutral-line/70">
            &copy; 2026. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

