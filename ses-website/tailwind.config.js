/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand navy (from the SES design system)
        navy: {
          50: '#EEF2F9',
          100: '#D5DEEE',
          200: '#A9BBDB',
          300: '#7B95C6',
          400: '#4E6FAF',
          500: '#2C4E8C',
          600: '#1D3A6E',
          700: '#16315A',
          800: '#13294B',
          900: '#0E2143',
          950: '#0A1A38',
        },
        // Accent orange (CTAs, underlines, icon accents)
        brand: {
          orange: '#F47A20',
          'orange-dark': '#D9650F',
          'orange-light': '#FB923C',
          royal: '#2155CC',
          'royal-dark': '#1A47AE',
        },
        surface: '#F5F7FA',
        line: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 33, 67, 0.06), 0 8px 24px rgba(16, 33, 67, 0.06)',
        'card-hover': '0 12px 32px rgba(16, 33, 67, 0.14)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1200px',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
