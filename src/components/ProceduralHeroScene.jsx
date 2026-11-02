import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ProceduralHeroScene
 * Objek 3D WebGL Prosedural Berbobot Ringan (Tanpa GLTF).
 * Menggunakan kombinasi Torus Knot + Dynamic Shader Distortion Material.
 * Bereaksi secara organik terhadap pergerakan mouse (parallax lerp) dan frame timing.
 */
export function ProceduralHeroMesh() {
  const meshRef = useRef(null);
  const wireframeRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotasi kontinu prosedural yang halus
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
    }

    // Parallax responsif kursor mouse dengan interpolasi linear (lerp)
    const targetX = state.mouse.x * 0.6;
    const targetY = state.mouse.y * 0.6;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
  });

  return (
    <Float
      speed={2} // Kecepatan osilasi melayang
      rotationIntensity={0.6} // Intensitas rotasi mengambang
      floatIntensity={0.8} // Intensitas jarak mengambang
    >
      <group>
        {/* Core Solid Procedural Mesh dengan Dynamic Liquid Distort */}
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.2}>
          <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color="#0f172a"
            emissive="#0284c7"
            emissiveIntensity={0.15}
            roughness={0.1}
            metalness={0.85}
            distort={0.35} // Distorsi wave prosedural
            speed={2} // Frekuensi gelombang shader
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Outer Wireframe Cage untuk Sentuhan Technical Precision Awwwards */}
        <mesh ref={wireframeRef} position={[0, 0, 0]} scale={1.22}>
          <torusKnotGeometry args={[1.1, 0.35, 64, 16]} />
          <meshBasicMaterial
            color="#7dd3fc"
            wireframe={true}
            transparent={true}
            opacity={0.18}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Lighting & Environment Rig
 */
export function ProceduralSceneRig() {
  return (
    <>
      {/* Pencahayaan Ambient & Directional untuk Kedalaman Skulptural */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -5]} intensity={1.2} color="#38bdf8" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#7dd3fc" />

      {/* Objek 3D Prosedural Utama */}
      <ProceduralHeroMesh />
    </>
  );
}

