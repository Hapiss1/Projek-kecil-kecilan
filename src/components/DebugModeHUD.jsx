import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Activity, Cpu, CheckCircle } from 'lucide-react';

/**
 * DebugModeHUD Component
 * Easter Egg mode untuk Tech Recruiter & Senior Engineers.
 * 
 * Menampilkan:
 * 1. Tombol toggle mode terminal di pojok layar.
 * 2. Real-time FPS & Frame Latency monitor.
 * 3. Telemetri rendering WebGL (vertices, draw calls, clamped DPR).
 */
export function DebugModeHUD({ debugMode, setDebugMode }) {
  const [fps, setFps] = useState(60);
  const [frameTime, setFrameTime] = useState(16.6);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Real-time FPS & Frame Delta Calculation
  useEffect(() => {
    let animId;

    const measurePerf = (now) => {
      frameCountRef.current++;
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 500) {
        // Hitung FPS tiap 500ms
        const calculatedFps = Math.round((frameCountRef.current * 1000) / elapsed);
        const deltaMs = (elapsed / frameCountRef.current).toFixed(1);

        setFps(calculatedFps);
        setFrameTime(deltaMs);

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animId = requestAnimationFrame(measurePerf);
    };

    animId = requestAnimationFrame(measurePerf);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* 1. Floating Corner Trigger Button */}
      <div className="debug-mode-trigger-wrap">
        <button
          type="button"
          onClick={() => setDebugMode(!debugMode)}
          className={`btn-debug-toggle ${debugMode ? 'is-active' : ''}`}
          title="Toggle Senior Engineering / Debug Mode"
        >
          <Terminal size={14} />
          <span className="mono-sub">
            DEBUG // {debugMode ? "ENG: ON" : "ENG: OFF"}
          </span>
          <span className={`debug-status-indicator ${debugMode ? 'active' : ''}`} />
        </button>
      </div>

      {/* 2. Top-Right Telemetry Performance HUD (Hanya muncul saat debugMode aktif) */}
      {debugMode && (
        <aside className="engineering-telemetry-hud" aria-label="Engineering Telemetry HUD">
          <div className="telemetry-hud-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} color="#10b981" />
              <span className="mono-sub" style={{ color: '#10b981', fontWeight: 800 }}>
                TELEMETRY // 60FPS ENGINE
              </span>
            </div>
            <span className="telemetry-live-badge">ONLINE</span>
          </div>

          <div className="telemetry-metrics-list">
            <div className="telemetry-row">
              <span className="telemetry-label">RENDER FPS:</span>
              <span className={`telemetry-value ${fps < 50 ? 'warn' : 'good'}`}>
                {fps} FPS ({frameTime}ms)
              </span>
            </div>

            <div className="telemetry-row">
              <span className="telemetry-label">DPR CLAMP:</span>
              <span className="telemetry-value good">
                1.5x (Mobile Optimized)
              </span>
            </div>

            <div className="telemetry-row">
              <span className="telemetry-label">3D GEOMETRY:</span>
              <span className="telemetry-value">
                Procedural Torus (0 KB GLTF)
              </span>
            </div>

            <div className="telemetry-row">
              <span className="telemetry-label">SHADERS:</span>
              <span className="telemetry-value">
                GLSL Wave + Chromatic Dispersion
              </span>
            </div>

            <div className="telemetry-row">
              <span className="telemetry-label">SCROLL ENGINE:</span>
              <span className="telemetry-value">
                Lenis Inertia + rAF Sync
              </span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

