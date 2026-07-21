/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
      },
      colors: {
        brand: {
          // Main organization palette: Emerald Green primary, Golden Brown secondary.
          // Emerald + gold is a classic premium pairing; gold is used sparingly as an accent.
          primary: '#047857',
          'primary-dark': '#064e3b',
          'primary-light': '#059669',
          secondary: '#925E06',
          'secondary-light': '#b87826',
          'secondary-dark': '#6f4704',
          bg: '#fdfcf8',
          'bg-alt': '#f3f8f5',
          ink: '#0f2a1f',
          'ink-soft': '#3f574a',
          'ink-muted': '#7a9a8a',
          line: '#dce8e2',
        },
        dept: {
          // Memorization Center: Marian Blue + Orange Peel (center logo pairing).
          hifz: { base: '#023E8A', accent: '#FF9E00' },
          // School (Medresa): Forest Green — a true green, distinct from the org's blue-green emerald.
          school: { base: '#15803d', accent: '#BF8414' },
          // Study Circle: deep navy-teal + amber/gold (circle logo pairing).
          halqa: { base: '#023047', accent: '#FFB703' },
          // Charity: Dark Navy + Orange Accent, sparingly paired with heart-red.
          charity: { base: '#0F172A', accent: '#F97316', heart: '#e63946' },
        },
      },
      fontFamily: {
        sans: ['"Cairo"', '"Tajawal"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        display: ['"Tajawal"', '"Cairo"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(4,120,87,0.06)',
        card: '0 4px 24px rgba(4,120,87,0.08)',
        'card-hover': '0 12px 40px rgba(4,120,87,0.14)',
        gold: '0 4px 20px rgba(146,94,6,0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
