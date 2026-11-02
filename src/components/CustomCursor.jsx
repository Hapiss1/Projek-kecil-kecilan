import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor Component (Magnetic Precision Cursor + Monospace Micro-Copy)
 * 
 * Fitur:
 * 1. Double cursor: Core dot + Inverted follower ring dengan `mix-blend-mode: difference`.
 * 2. Magnetic Pull: Menghitung jarak Euclidean ke elemen interaktif (tombol/kartu proyek).
 *    Saat berada dalam radius pengaruh, kursor secara elastis tertarik ke pusat elemen.
 * 3. Dynamic Monospace Micro-Copy: Membaca atribut `data-cursor-meta` (misal: `[Stack: React/Flutter] — [2026]`)
 *    dan merendernya dalam lencana monospace 10px yang melayang mengikuti posisi kursor.
 * 4. Otomatis dinonaktifkan pada perangkat sentuh (touchscreen) demi kenyamanan pengguna.
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const badgeRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorMeta, setCursorMeta] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hanya aktifkan di perangkat dengan mouse/pointer presisi
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let badgeX = -100;
    let badgeY = -100;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Core dot langsung mengikuti mouse tanpa latensi
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Deteksi elemen interaktif terdekat untuk efek magnetik & micro-copy
      const target = document.elementFromPoint(mouseX, mouseY);
      const interactiveEl = target?.closest('a, button, .project-asymmetric-card, .project-editorial-row, [data-magnetic], [data-cursor-meta]');

      if (interactiveEl) {
        setIsHovered(true);
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Vektor jarak ke pusat elemen
        const dist = Math.hypot(centerX - mouseX, centerY - mouseY);

        if (dist < 90) {
          // Magnetic snapping: tarik ring ke arah pusat elemen
          mouseX = centerX + (mouseX - centerX) * 0.35;
          mouseY = centerY + (mouseY - centerY) * 0.35;
        }

        // Baca micro-copy khusus proyek jika tersedia
        const metaText = interactiveEl.getAttribute('data-cursor-meta');
        if (metaText) {
          setCursorMeta(metaText);
        } else {
          setCursorMeta('');
        }

        // Tampilkan label kontekstual ring
        if (interactiveEl.classList.contains('project-asymmetric-card') || interactiveEl.classList.contains('project-editorial-row')) {
          setCursorText('VIEW');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
        setCursorMeta('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Loop animasi lerp (Linear Interpolation) untuk kelancaran cincin & micro-copy pengikut
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      badgeX += (mouseX - badgeX) * 0.12;
      badgeY += (mouseY - badgeY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${badgeX + 24}px, ${badgeY + 24}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <>
      {/* 1. Core Center Dot */}
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isVisible ? 'is-visible' : ''}`}
        aria-hidden="true" 
      />

      {/* 2. Magnetic Follower Ring dengan Blend-Mode Inversi */}
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isVisible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''}`}
        aria-hidden="true"
      >
        {cursorText && (
          <span className="cursor-label-text">
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Dynamic Monospace 10px Micro-Copy Chip */}
      <div
        ref={badgeRef}
        className={`cursor-microcopy-badge ${isVisible && cursorMeta ? 'is-active' : ''}`}
        aria-hidden="true"
      >
        {cursorMeta}
      </div>
    </>
  );
}
