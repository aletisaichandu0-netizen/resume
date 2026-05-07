/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0906',
          900: '#0F0E0B',
          800: '#1A1916',
          700: '#222119',
          600: '#2A2825',
          500: '#333334',
        },
        sand: {
          50:  '#FAF7F4',
          100: '#F7F1ED',
          200: '#EDE4DC',
          300: '#D9C5B0',
          400: '#C4A98A',
          500: '#9C9378',
          600: '#7A7260',
        },
        sage: '#9B9DAB',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        1:  '4px',  2: '8px',  3: '12px', 4: '16px',
        5:  '20px', 6: '24px', 8: '32px', 10: '40px',
        12: '48px', 16: '64px', 20: '80px', 24: '96px',
        30: '120px', 40: '160px',
      },
      keyframes: {
        slideDown: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.4 },
        },
      },
      animation: {
        slideDown: 'slideDown 1.8s ease-in-out infinite',
        pulse:     'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
