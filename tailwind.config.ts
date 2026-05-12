import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#7B3F00',
          light: '#9B5000',
          dark: '#5C2E00',
        },
        gold: {
          DEFAULT: '#E6A817',
          light: '#F0C040',
          dark: '#C88A00',
        },
        cream: '#F9F6F2',
        wa: '#25D366',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-wa': 'pulse-wa 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-wa': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)' },
          '50%': { boxShadow: '0 0 0 12px rgba(37, 211, 102, 0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
