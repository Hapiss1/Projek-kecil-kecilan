import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  esbuild: {
    // Menghapus console.log dan debugger otomatis di build produksi untuk menghemat memori
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Pemisahan Vendor Chunk Tanpa Circular Dependency
        manualChunks: {
          'three-vendor': ['three'],
          'react-r3f-vendor': ['react', 'react-dom', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap', 'lenis'],
          'icons-vendor': ['lucide-react'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
