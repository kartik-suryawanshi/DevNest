/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "accent-cyan": "var(--color-accent-cyan)",
        "accent-amber": "var(--color-accent-amber)",
        "accent-violet": "var(--color-accent-violet)",
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        grid: "var(--color-grid)",
        "glow-cyan": "var(--color-glow-cyan)",
        "glow-amber": "var(--color-glow-amber)",
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        subheading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"VT323"', 'monospace'],
        code: ['"VT323"', 'monospace'],
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(99,210,255,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(255,171,64,0.15) 0px, transparent 50%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.15)', opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
