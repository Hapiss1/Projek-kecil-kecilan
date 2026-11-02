import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Background3DCanvas Component
 * Vanilla Three.js WebGL Canvas with procedural wireframe crystal,
 * pointer inertia tilt, and scroll-linked depth travel.
 *
 * Designed with 60-120 FPS performance floor and full lifecycle cleanup.
 */
export function Background3DCanvas({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene setup
    const scene = new THREE.Scene();
    
    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Procedural Geometry & Material (Ice Blue Wireframe Crystal)
    const baseGeometry = new THREE.IcosahedronGeometry(2.4, 1);
    const wireframeGeometry = new THREE.WireframeGeometry(baseGeometry);
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.38,
      linewidth: 1
    });

    const mesh = new THREE.LineSegments(wireframeGeometry, lineMaterial);
    scene.add(mesh);

    // Inner subtle secondary crystal for spatial depth
    const innerGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const innerWireframe = new THREE.WireframeGeometry(innerGeometry);
    const innerMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22
    });
    const innerMesh = new THREE.LineSegments(innerWireframe, innerMaterial);
    scene.add(innerMesh);

    // 5. Mouse Interaction with Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Window Resize Handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 7. Animation Loop with Visibility Check
    let animationFrameId;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Smooth pointer lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const currentScroll = scrollRef.current || 0;

      if (!prefersReducedMotion) {
        // Base idle rotation + pointer inertia
        mesh.rotation.x += 0.0015;
        mesh.rotation.y += 0.002;

        mesh.rotation.x = mouse.y * 0.45 + currentScroll * Math.PI * 0.8;
        mesh.rotation.y = mouse.x * 0.45 + currentScroll * Math.PI * 1.2;

        innerMesh.rotation.x -= 0.002;
        innerMesh.rotation.y -= 0.003;
      }

      // Camera Z-travel & horizontal drift linked to scroll
      camera.position.z = 7 + currentScroll * 2.5;
      camera.position.y = -currentScroll * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Lifecycle Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      baseGeometry.dispose();
      wireframeGeometry.dispose();
      lineMaterial.dispose();
      innerGeometry.dispose();
      innerWireframe.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="background-3d-canvas-container"
      aria-hidden="true" 
    />
  );
}

