import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;

  void main() {
    vUv = uv;
    vec3 pos = position;
    // Gelombang distorsi dinamis pada permukaan bidang 3D
    float wave = sin(pos.x * 2.5 + uTime * 3.0) * 0.12 * uHover;
    float waveY = cos(pos.y * 2.0 + uTime * 2.5) * 0.08 * uHover;
    pos.z += wave + waveY;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Liquid ripple wave displacement
    float rippleX = sin(uv.y * 16.0 + uTime * 3.5) * 0.025 * uHover;
    float rippleY = cos(uv.x * 14.0 + uTime * 3.0) * 0.02 * uHover;
    vec2 distortedUv = uv + vec2(rippleX, rippleY);

    // Chromatic aberration (RGB splitting di tepian distorsi gelombang)
    float split = 0.008 * uHover;
    float r = texture2D(uTexture, distortedUv + vec2(split, 0.0)).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(split, 0.0)).b;
    float a = texture2D(uTexture, distortedUv).a;

    // Output dengan fade alpha proporsional terhadap hover
    gl_FragColor = vec4(r, g, b, a * uHover);
  }
`;

/**
 * FloatingMesh
 * Bidang 3D yang mengikuti kursor mouse dengan inersia dan merender shader distorsi cairan
 */
function FloatingMesh({ activeProject, mousePos, textures }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => {
    // Default placeholder 1x1 transparent texture
    const emptyCanvas = document.createElement('canvas');
    emptyCanvas.width = 1;
    emptyCanvas.height = 1;
    const defaultTex = new THREE.CanvasTexture(emptyCanvas);

    return {
      uTexture: { value: defaultTex },
      uHover: { value: 0 },
      uTime: { value: 0 }
    };
  }, []);

  // Sinkronisasi texture saat proyek aktif berubah
  useEffect(() => {
    if (!materialRef.current) return;
    if (activeProject && textures[activeProject.id]) {
      materialRef.current.uniforms.uTexture.value = textures[activeProject.id];
    }
  }, [activeProject, textures]);

  useFrame((_, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    // Update waktu untuk shader wave
    materialRef.current.uniforms.uTime.value += delta;

    // Transisi hover yang mulus (fade in / fade out)
    const targetHover = activeProject ? 1.0 : 0.0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      0.12
    );

    // Konversi mouse screen coordinate (0..1) ke koordinat 3D viewport Three.js
    const target3DX = (mousePos.x - 0.5) * viewport.width;
    const target3DY = -(mousePos.y - 0.5) * viewport.height;

    // Inertia spring lerp untuk mengikuti kursor
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, target3DX, 0.09);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, target3DY, 0.09);

    // Kemiringan rotasi dinamis (tactile tilt)
    const tiltX = (target3DY - meshRef.current.position.y) * 0.15;
    const tiltY = (target3DX - meshRef.current.position.x) * 0.15;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tiltX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, tiltY, 0.08);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Rasio aspek 16:10 untuk mockup editorial */}
      <planeGeometry args={[3.2, 2.0, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * ProjectDistortionCanvas
 * Container Canvas WebGL yang menangani mouse movement dan viewport culling
 */
export function ProjectDistortionCanvas({ activeProject, mousePos, projects }) {
  const [textures, setTextures] = React.useState({});

  // Preload semua gambar preview proyek menjadi texture Three.js
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loaded = {};

    projects.forEach((proj) => {
      if (proj.image) {
        loader.load(
          proj.image,
          (tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
            loaded[proj.id] = tex;
            setTextures((prev) => ({ ...prev, [proj.id]: tex }));
          },
          undefined,
          (err) => {
            console.warn(`Gagal memuat texture proyek ${proj.id}:`, err);
          }
        );
      }
    });

    return () => {
      Object.values(loaded).forEach((tex) => tex.dispose());
    };
  }, [projects]);

  return (
    <div className="project-distortion-canvas-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <FloatingMesh
          activeProject={activeProject}
          mousePos={mousePos}
          textures={textures}
        />
      </Canvas>
    </div>
  );
}

