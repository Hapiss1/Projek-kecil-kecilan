import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Eye, EyeOff } from 'lucide-react';

export function EngineeringToggle({ isWireframe, onToggleWireframe, velocityRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animId;

    const measureFps = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 500) {
        setFps(Math.round((frameCountRef.current * 1000) / elapsed));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-mono text-xs select-none">
      
      {/* Telemetry Panel (When Open) */}
      {isOpen && (
        <div className="p-4 bg-ink text-base border border-neutral-line/40 shadow-2xl space-y-2 mb-2 w-64 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-neutral-line/40 pb-2 text-[11px] text-neutral-line uppercase">
            <span className="flex items-center gap-1.5 text-earth-taupe">
              <Activity className="w-3.5 h-3.5" />
              ENGINEERING HUD
            </span>
            <span className="text-earth-terracotta">v2.6</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-neutral-line">Frame Rate:</span>
              <span className={`font-semibold ${fps >= 55 ? 'text-green-400' : 'text-amber-400'}`}>
                {fps} FPS
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-line">WebGL Shader:</span>
              <span className="text-base font-semibold">
                {isWireframe ? 'WIREFRAME (ON)' : 'ORGANIC FLUID'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-line">Inertia Engine:</span>
              <span className="text-base">Lenis + GSAP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-line">Scroll Skew:</span>
              <span className="text-earth-taupe">Active (Clamped)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-line/40">
            <button
              onClick={onToggleWireframe}
              className="w-full py-1.5 px-2 bg-neutral-line/20 hover:bg-earth-terracotta hover:text-base text-base transition-colors duration-200 text-center uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isWireframe ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {isWireframe ? 'Disable Wireframe' : 'Enable 3D Wireframe'}
            </button>
          </div>
        </div>
      )}

      {/* Discrete Corner Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-base/90 backdrop-blur-sm border border-neutral-line/40 hover:border-earth-terracotta text-ink hover:text-earth-terracotta transition-all duration-200 uppercase tracking-widest text-[10px] flex items-center gap-2 cursor-pointer shadow-sm"
        aria-label="Toggle Engineering Telemetry Mode"
      >
        <span className={`w-2 h-2 rounded-full ${isWireframe ? 'bg-earth-terracotta animate-ping' : 'bg-green-500'}`} />
        <span>{isOpen ? 'Close Telemetry' : 'Debug HUD'}</span>
      </button>

    </div>
  );
}

