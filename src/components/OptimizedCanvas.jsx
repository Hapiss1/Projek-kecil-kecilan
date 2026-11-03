import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

/**
 * ShaderPrewarmer Component
 * Memaksa driver WebGL pada GPU untuk mengompilasi seluruh shader material
 * dan meng-upload buffer ke VRAM sebelum frame pertama terlihat oleh pengguna.
 */
function ShaderPrewarmer({ onWarmedUp }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    try {
      // 1. Kompilasi program shader di scene secara asinkron di belakang layar
      gl.compile(scene, camera);
      // 2. Eksekusi 1 render frame tunggal untuk memanaskan pipeline GPU
      gl.render(scene, camera);
      if (onWarmedUp) onWarmedUp();
    } catch (err) {
      // Fallback diam tanpa menghentikan runtime jika driver WebGL membatasi manual compile
      if (onWarmedUp) onWarmedUp();
    }
  }, [gl, scene, camera, onWarmedUp]);

  return null;
}

/**
 * OptimizedCanvas Component
 * Membungkus R3F Canvas dengan 3 pilar optimasi ekstrem:
 * 1. Strict DPR Limiting [1, 1.5] (Mencegah thermal throttling pada retina display)
 * 2. Dynamic Rendering via IntersectionObserver (Frameloop 'never' saat di luar layar = 0% GPU)
 * 3. GPU Shader Pre-warming (Mencegah jank/stutter saat transisi layar pertama)
 */
export function OptimizedCanvas({
  children,
  onWarmedUp,
  camera = { position: [0, 0, 5], fov: 45 },
  className = '',
  ...props
}) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Dynamic Rendering: Culling render loop saat canvas berada di luar viewport
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        // Margin 100px agar render loop aktif sesaat sebelum masuk ke viewport
        rootMargin: '100px 0px 100px 0px',
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <Canvas
        // 1. Strict DPR Limiting: Maksimal 1.5x terlepas dari retina 3x/4x
        dpr={[1, 1.5]}
        camera={camera}
        // 2. Dynamic Rendering: Freeze render loop saat canvas di luar viewport (0% GPU)
        frameloop={isInView ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        {...props}
      >
        {/* 3. GPU Shader Pre-warming */}
        <ShaderPrewarmer onWarmedUp={onWarmedUp} />
        {children}
      </Canvas>
    </div>
  );
}

