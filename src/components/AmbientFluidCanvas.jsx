import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// GLSL 2D Simplex Noise & Domain Warping
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uVelocity;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distorsi gelombang vertex 3D organik yang dipengaruhi kecepatan scroll Lenis
    float waveX = sin(pos.x * 2.0 + uTime * 0.8) * 0.12;
    float waveY = cos(pos.y * 2.0 + uTime * 0.6) * 0.12;
    float velocityEffect = clamp(uVelocity * 0.05, -0.6, 0.6) * sin(pos.x * 3.5 + pos.y * 2.5);

    pos.z += waveX + waveY + velocityEffect;

    // Efek dorongan mikro mouse
    float mouseDist = distance(pos.xy, uMouse * 2.0);
    pos.z += exp(-mouseDist * 2.0) * 0.15;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uVelocity;
  uniform vec2 uMouse;
  uniform vec3 uColorBase;
  uniform vec3 uColorTaupe;
  uniform vec3 uColorTerracotta;
  uniform vec3 uColorEspresso;
  uniform float uWireframe;

  // GLSL Simplex Noise Functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion (fBm)
  float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      total += snoise(p) * amplitude;
      p = p * 2.02 + vec2(1.2, 3.4);
      amplitude *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 p = vUv * 2.2 - vec2(1.1);
    
    // Domain Warping: Cairan organik merespons waktu dan kecepatan scroll
    float timeSpeed = uTime * 0.15 + abs(uVelocity) * 0.04;
    vec2 q = vec2(fbm(p + vec2(0.0, timeSpeed * 0.4)), fbm(p + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2 + timeSpeed * 0.2)), 
                  fbm(p + 3.0 * q + vec2(8.3, 2.8)));

    float f = fbm(p + 3.5 * r);

    // Normalisasi intensitas ke rentang [0.0, 1.0]
    float intensity = clamp((f + 0.5) * 0.8, 0.0, 1.0);

    // Gradasi subtle earth tones murni tanpa clashing:
    // Dasar: #FDFDFD -> Taupe: #CEB3A6 -> Terracotta: #9C6455 -> Espresso: #5E3A30
    vec3 color = mix(uColorBase, uColorTaupe, smoothstep(0.15, 0.55, intensity));
    color = mix(color, uColorTerracotta, smoothstep(0.55, 0.85, intensity) * 0.7);
    color = mix(color, uColorEspresso, smoothstep(0.85, 1.0, intensity) * 0.4);

    // Transparansi halus agar teks tipografi di depan tetap 100% kontras dan terbaca
    float alpha = smoothstep(0.1, 0.8, intensity) * 0.55;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function AmbientFluidMesh({ velocityRef, isWireframe = false }) {
  const meshRef = useRef();
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const lerpedMouse = useRef(new THREE.Vector2(0, 0));
  const lerpedVelocity = useRef(0);

  const { viewport } = useThree();

  // Strict Palette Hex -> Three.js Color Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBase: { value: new THREE.Color('#FDFDFD') },
      uColorTaupe: { value: new THREE.Color('#CEB3A6') },
      uColorTerracotta: { value: new THREE.Color('#9C6455') },
      uColorEspresso: { value: new THREE.Color('#5E3A30') },
      uWireframe: { value: isWireframe ? 1.0 : 0.0 },
    }),
    [isWireframe]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const currentVelocity = velocityRef?.current || 0;

    // Interpolasi halus (lerp) untuk mouse dan scroll velocity
    lerpedMouse.current.lerp(mouseRef.current, 0.05);
    lerpedVelocity.current = THREE.MathUtils.lerp(
      lerpedVelocity.current,
      currentVelocity,
      0.08
    );

    const material = meshRef.current.material;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uVelocity.value = lerpedVelocity.current;
    material.uniforms.uMouse.value.copy(lerpedMouse.current);
    material.uniforms.uWireframe.value = isWireframe ? 1.0 : 0.0;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Plane geometri yang beradaptasi persis dengan ukuran viewport R3F */}
      <planeGeometry args={[viewport.width * 1.4, viewport.height * 1.4, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        wireframe={isWireframe}
      />
    </mesh>
  );
}
