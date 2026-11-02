import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ProceduralHeroMesh
 * Objek 3D WebGL Prosedural Berbobot Ringan (Tanpa GLTF).
 * Menggunakan kombinasi Torus Knot + Dynamic Shader Distortion Material.
 * Mendukung Engineering Debug Mode (beralih ke wireframe kerangka murni).
 */
export function ProceduralHeroMesh({ debugMode = false }) {
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
      speed={2}
      rotationIntensity={0.6}
      floatIntensity={0.8}
    >
      <group>
        {/* Core Mesh: Solid Liquid Distort di Mode Normal / Pure Wireframe di Debug Mode */}
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.2}>
          <torusKnotGeometry args={[1.1, 0.35, debugMode ? 64 : 128, debugMode ? 16 : 32]} />
          {debugMode ? (
            <meshBasicMaterial
              color="#10b981"
              wireframe={true}
              transparent={true}
              opacity={0.85}
            />
          ) : (
            <MeshDistortMaterial
              color="#0f172a"
              emissive="#0284c7"
              emissiveIntensity={0.15}
              roughness={0.1}
              metalness={0.85}
              distort={0.35}
              speed={2}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          )}
        </mesh>

        {/* Outer Wireframe Technical Cage */}
        <mesh ref={wireframeRef} position={[0, 0, 0]} scale={1.22}>
          <torusKnotGeometry args={[1.1, 0.35, 64, 16]} />
          <meshBasicMaterial
            color={debugMode ? "#34d399" : "#7dd3fc"}
            wireframe={true}
            transparent={true}
            opacity={debugMode ? 0.4 : 0.18}
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Lighting & Environment Rig
 */
export function ProceduralSceneRig({ debugMode = false }) {
  return (
    <>
      <ambientLight intensity={debugMode ? 0.8 : 0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={debugMode ? 1.0 : 1.5} 
        color={debugMode ? "#10b981" : "#ffffff"} 
      />
      <pointLight 
        position={[-10, -5, -5]} 
        intensity={1.2} 
        color={debugMode ? "#059669" : "#38bdf8"} 
      />
      <pointLight 
        position={[0, 5, 5]} 
        intensity={0.8} 
        color={debugMode ? "#34d399" : "#7dd3fc"} 
      />

      {/* Objek 3D Prosedural Utama */}
      <ProceduralHeroMesh debugMode={debugMode} />
    </>
  );
}
