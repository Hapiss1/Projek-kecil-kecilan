import React from 'react';

/**
 * FilmGrainOverlay Component
 * 
 * Menghadirkan tekstur film grain / kertas analog taktil secara prosedural menggunakan SVG Filter.
 * - Berjalan statis dengan overhead GPU 0% (tidak membebani baterai).
 * - Menggunakan `mix-blend-mode: overlay` untuk memberikan kedalaman visual sinematik.
 * - `pointer-events: none` memastikan interaksi klik dan kursor mouse tetap tembus 100%.
 */
export function FilmGrainOverlay() {
  return (
    <div className="global-film-grain-overlay" aria-hidden="true">
      <svg className="film-grain-svg-filter" xmlns="http://www.w3.org/2000/svg">
        <filter id="cinematic-grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-grain-filter)" />
      </svg>
    </div>
  );
}

