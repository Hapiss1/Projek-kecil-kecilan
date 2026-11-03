import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function MagneticCursor() {
  const cursorRef = useRef(null);
  const microCopyRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hanya aktifkan pada desktop yang memiliki mouse pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.15, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Deteksi hover pada elemen ber-data-microcopy
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-microcopy]');
      if (target) {
        setCursorText(target.getAttribute('data-microcopy'));
        setIsHovered(true);
      } else {
        const link = e.target.closest('a, button');
        if (link) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
      style={{ willChange: 'transform' }}
    >
      {/* Precision Difference Dot */}
      <div
        className={`rounded-full bg-base mix-blend-difference transition-all duration-200 ${
          isHovered ? 'w-8 h-8 scale-125' : 'w-3 h-3'
        }`}
      />

      {/* 10px Monospace Micro-Copy */}
      {cursorText && (
        <span
          ref={microCopyRef}
          className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-ink text-base border border-neutral-line/40 shadow-sm whitespace-nowrap animate-in fade-in"
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}

