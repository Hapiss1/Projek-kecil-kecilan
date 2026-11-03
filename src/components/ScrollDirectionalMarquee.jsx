import React, { useRef, useEffect } from 'react';

export function ScrollDirectionalMarquee({ velocityRef }) {
  const marqueeInnerRef = useRef(null);
  const offsetRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    let animId;

    const loop = () => {
      const vel = velocityRef?.current || 0;

      // Ubah arah jika scroll ke atas vs scroll ke bawah
      if (vel > 0.1) directionRef.current = 1;
      else if (vel < -0.1) directionRef.current = -1;

      // Kecepatan dasar + akselerasi proporsional dari scroll velocity
      const baseSpeed = 0.8;
      const boostSpeed = Math.abs(vel) * 0.12;
      const step = (baseSpeed + boostSpeed) * directionRef.current;

      offsetRef.current -= step;

      // Seamless wrap reset (berdasarkan panjang konten)
      if (offsetRef.current <= -1000) {
        offsetRef.current += 1000;
      } else if (offsetRef.current >= 0) {
        offsetRef.current -= 1000;
      }

      if (marqueeInnerRef.current) {
        marqueeInnerRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [velocityRef]);

  const marqueeText = "MUHAMMAD HAFIZH FARSYA — SYSTEMS ARCHITECTURE & FRONTEND — TELKOM UNIVERSITY — AVAILABLE FOR WORK — ";

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-neutral-line/30 bg-base py-5 select-none"
    >
      <div
        ref={marqueeInnerRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-ink uppercase flex items-center gap-6">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </span>
      </div>
    </div>
  );
}

