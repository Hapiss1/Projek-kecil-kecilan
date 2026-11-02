/**
 * soundEngine.js — Procedural Web Audio API Micro-Synthesizer
 * 
 * 0 KB File Downloads: Semua audio disintesis langsung menggunakan Web Audio API internal browser.
 * Fitur:
 * 1. `playMechanicalClick`: Ketukan mekanis taktil yang sangat senyap saat klik tombol/link.
 * 2. `playHoverTick`: Suara tick halus saat hover tautan navigasi.
 * 3. `updateScrollHum`: Ambient drone berfrekuensi rendah (55Hz - 85Hz) yang frekuensi dan volumenya
 *    bereaksi secara proporsional terhadap kecepatan scroll (scroll velocity) Lenis.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.ambientOsc = null;
    this.ambientGain = null;
    this.isInitialized = false;
  }

  // Inisialisasi AudioContext setelah interaksi pertama pengguna
  init() {
    if (this.isInitialized && this.ctx) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();
      this.isInitialized = true;
      this.setupAmbientDrone();
    } catch (e) {
      console.warn("Web Audio API tidak didukung pada browser ini:", e);
    }
  }

  // Setup ambient drone untuk scroll velocity
  setupAmbientDrone() {
    if (!this.ctx) return;

    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Sub-bass hum 55Hz

      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
      this.ambientOsc.start();
    } catch (e) {
      console.warn("Gagal inisialisasi drone ambient:", e);
    }
  }

  toggleSound() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.playMechanicalClick();
    } else if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isEnabled;
  }

  // 1. Suara Ketukan Mekanis Halus (Button Click)
  playMechanicalClick() {
    if (!this.isEnabled || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.015);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.016);
    } catch (e) {
      // Abaikan bila audio dicegah browser policy
    }
  }

  // 2. Micro-tick saat hover elemen interaktif
  playHoverTick() {
    if (!this.isEnabled || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.009);
    } catch (e) {
      // Silent catch
    }
  }

  // 3. Modulasi frekuensi drone berdasarkan kecepatan scroll pengguna
  updateScrollHum(velocity) {
    if (!this.isEnabled || !this.ctx || !this.ambientGain || !this.ambientOsc) return;

    try {
      const now = this.ctx.currentTime;
      const speed = Math.min(Math.abs(velocity || 0), 100);
      
      if (speed < 1.0) {
        // Hening saat scroll diam
        this.ambientGain.gain.setTargetAtTime(0, now, 0.1);
      } else {
        // Frekuensi naik dari 55Hz ke 85Hz secara halus seiring bertambahnya kecepatan scroll
        const targetFreq = 55 + (speed / 100) * 30;
        const targetVol = Math.min(0.015, (speed / 100) * 0.015);

        this.ambientOsc.frequency.setTargetAtTime(targetFreq, now, 0.05);
        this.ambientGain.gain.setTargetAtTime(targetVol, now, 0.05);
      }
    } catch (e) {
      // Silent catch
    }
  }
}

export const soundEngine = new SoundEngine();
