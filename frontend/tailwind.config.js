/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        navy: {
          950: '#070b14',
          900: '#0b1220',
          800: '#111827',
          700: '#1a2438',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(34, 211, 238, 0.12)',
        card: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        flow: {
          '0%': { offsetDistance: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { offsetDistance: '100%', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        balanceFlash: {
          '0%': { backgroundColor: 'rgba(52, 211, 153, 0.25)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        flow: 'flow 1.8s linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        fadeUp: 'fadeUp 0.45s ease-out both',
        balanceFlash: 'balanceFlash 1.2s ease-out',
      },
    },
  },
  plugins: [],
}
