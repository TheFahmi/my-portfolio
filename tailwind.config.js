/** @type {import('@tailwindcss/postcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary-color)',
        'primary-light': 'var(--primary-color-light)',
        'primary-medium': 'var(--primary-color-medium)',
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        card: 'var(--card-bg)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
      },
      boxShadow: {
        DEFAULT: '0 4px 6px var(--shadow-color)',
        md: '0 6px 10px var(--shadow-color)',
        lg: '0 10px 15px var(--shadow-color)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
        'wave': 'wave 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) translateX(15px) rotate(5deg)' },
          '50%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '75%': { transform: 'translateY(15px) translateX(-15px) rotate(-5deg)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  plugins: [],
};

module.exports = config;
