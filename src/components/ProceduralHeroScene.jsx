import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ProceduralHeroMesh
 * Objek 3D WebGL Prosedural Berbobot Ringan (Tanpa file .GLTF eksternal).
 * Menggunakan perpaduan Torus Knot + Dynamic Shader Distortion Material + Sparkles.
 * Didesain khusus untuk bersinar di balik Typographic Mask nama "MUHAMMAD HAFIZH FARSYA".
 */
export function ProceduralHeroMesh({ debugMode = false }) {
  const meshRef = useRef(null);
  const wireframeRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotasi kontinu prosedural yang anggun
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.25;

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = meshRef.current.rotation.x;
      wireframeRef.current.rotation.y = meshRef.current.rotation.y;
    }

    // Parallax responsif kursor mouse dengan interpolasi linear (lerp) halus
    const targetX = state.mouse.x * 1.1;
    const targetY = state.mouse.y * 0.9;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.06);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.06);
  });

  return (
    <Float
      speed={2.2}
      rotationIntensity={0.8}
      floatIntensity={0.9}
    >
      <group>
        {/* Core Mesh: Solid Liquid Distort di Mode Normal / Pure Wireframe di Debug Mode */}
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.35}>
          <torusKnotGeometry args={[1.15, 0.38, debugMode ? 64 : 128, debugMode ? 16 : 32]} />
          {debugMode ? (
            <meshBasicMaterial
              color="#10b981"
              wireframe={true}
              transparent={true}
              opacity={0.9}
            />
          ) : (
            <MeshDistortMaterial
              color="#091322"
              emissive="#0284c7"
              emissiveIntensity={0.25}
              roughness={0.08}
              metalness={0.92}
              distort={0.42}
              speed={2.2}
              clearcoat={1}
              clearcoatRoughness={0.08}
            />
          )}
        </mesh>

        {/* Outer Wireframe Technical Cage */}
        <mesh ref={wireframeRef} position={[0, 0, 0]} scale={1.38}>
          <torusKnotGeometry args={[1.15, 0.38, 64, 16]} />
          <meshBasicMaterial
            color={debugMode ? "#34d399" : "#38bdf8"}
            wireframe={true}
            transparent={true}
            opacity={debugMode ? 0.45 : 0.22}
          />
        </mesh>

        {/* Floating Ambient Sparkles (Iridescent Stardust di dalam Jendela Tipografi) */}
        <Sparkles
          count={debugMode ? 25 : 60}
          scale={5.5}
          size={debugMode ? 1.5 : 2.5}
          speed={0.4}
          opacity={debugMode ? 0.4 : 0.7}
          color={debugMode ? "#10b981" : "#7dd3fc"}
        />
      </group>
    </Float>
  );
}

/**
 * Lighting & Environment Rig
 * Disesuaikan untuk menghasilkan kilau kontras tinggi di dalam potongan huruf.
 */
export function ProceduralSceneRig({ debugMode = false }) {
  return (
    <>
      <ambientLight intensity={debugMode ? 0.9 : 0.6} />
      
      {/* Key Light */}
      <directionalLight 
        position={[8, 8, 8]} 
        intensity={debugMode ? 1.0 : 1.8} 
        color={debugMode ? "#10b981" : "#ffffff"} 
      />
      
      {/* Cyan Rim Light */}
      <pointLight 
        position={[-8, -4, -4]} 
        intensity={1.5} 
        color={debugMode ? "#059669" : "#38bdf8"} 
      />
      
      {/* Electric Blue Secondary Fill */}
      <pointLight 
        position={[0, 6, 4]} 
        intensity={1.2} 
        color={debugMode ? "#34d399" : "#6366f1"} 
      />

      {/* Amber/Gold Specular Accent untuk kilau editorial sinematik */}
      {!debugMode && (
        <pointLight 
          position={[6, -6, 2]} 
          intensity={0.8} 
          color="#38bdf8" 
        />
      )}

      {/* Objek 3D Prosedural Utama */}
      <ProceduralHeroMesh debugMode={debugMode} />
    </>
  );
}
