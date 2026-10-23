/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Theme: Warm Ivory (#EAE6DE), Deep Editorial Blue (#226192), Coral Orange (#EF8557)
        ivory: {
          DEFAULT: '#EAE6DE',
          50: '#FAF9F6',
          100: '#F4F1EA',
          200: '#EAE6DE', // Base Warm Ivory
          300: '#DDD7CA',
          400: '#CBC2B1',
          500: '#B5A791',
          600: '#9C8C73',
          700: '#7F715B',
          800: '#4A4337',
          900: '#2C271E',
        },
        editorial: {
          DEFAULT: '#226192',
          50: '#F0F6FA',
          100: '#DFECF4',
          200: '#BED9EA',
          300: '#92BFDC',
          400: '#5E9EC9',
          500: '#3B82B5',
          600: '#2B6EA0',
          700: '#226192', // Base Deep Editorial Blue
          800: '#1A4B72',
          900: '#133553',
          950: '#0C2032',
        },
        coral: {
          DEFAULT: '#EF8557',
          50: '#FEF5F1',
          100: '#FCE8DF',
          200: '#FAD3C3',
          300: '#F6B59D',
          400: '#F2936F',
          500: '#EF8557', // Base Coral Orange
          600: '#DE6F3E',
          700: '#BA5327',
          800: '#94411E',
          900: '#793519',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
