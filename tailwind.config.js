/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Palette Invariants
        base: '#FDFDFD', // Off-white canvas
        ink: {
          DEFAULT: '#0A0909', // Hitam pekat
          secondary: '#707070',
        },
        line: '#707070', // Borders / Lines netral
        neutral: {
          line: '#707070',
        },
        earth: {
          taupe: '#CEB3A6',      // Beige / Taupe
          terracotta: '#9C6455', // Terracotta
          espresso: '#5E3A30',   // Cokelat gelap
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        ultra: '-0.05em',
        tighter: '-0.03em',
        tight: '-0.015em',
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
