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
          primary: '#0f4d3a',
          'primary-dark': '#093326',
          'primary-light': '#1a5c47',
          secondary: '#c9a24b',
          'secondary-light': '#d4af5f',
          'secondary-dark': '#b8902f',
          bg: '#fdfcf8',
          'bg-alt': '#f7f3ea',
          ink: '#1a2e22',
          'ink-soft': '#4a5a4f',
          'ink-muted': '#8a9a8f',
          line: '#e8e0d0',
        },
        dept: {
          hifz: { base: '#123a70', accent: '#e07b1f' },
          school: { base: '#0f4d3a', accent: '#c9a24b' },
          halqa: { base: '#15479c', accent: '#f5941f' },
          charity: { base: '#1a56b8', accent: '#f5821f', heart: '#e63946' },
        },
      },
      fontFamily: {
        sans: ['"Cairo"', '"Tajawal"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        display: ['"Tajawal"', '"Cairo"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(15,77,58,0.06)',
        card: '0 4px 24px rgba(15,77,58,0.08)',
        'card-hover': '0 12px 40px rgba(15,77,58,0.14)',
        gold: '0 4px 20px rgba(201,162,75,0.15)',
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
