import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#8CE0FF',
          50: '#F0FCFF',
          100: '#DFF7FF',
          200: '#BFEFFF',
          300: '#9FE6FF',
          400: '#8CE0FF',
          500: '#55CFFF',
          600: '#20B8F3',
          700: '#0F92C5',
          800: '#0F7196',
          900: '#0C5875'
        }
      },
      fontSize: {
        'hero': ['clamp(2.2rem, 6vw, 5rem)', { lineHeight: '0.95' }],
        'eyebrow': ['0.75rem', { letterSpacing: '0.14em', textTransform: 'uppercase' }]
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.35)'
      }
    },
  },
  plugins: [],
}
export default config
