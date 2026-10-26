/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        stone: { 50: '#FFF7EB', 100: '#F9F0E0', 200: '#EEE4D4', 300: '#DDD0BC', 400: '#A99B89', 500: '#7C6D5C', 600: '#625444', 700: '#4B4034', 800: '#362E27', 900: '#241F1A', 950: '#17130F' },
        amber: { 200: '#F7D9B2', 300: '#EEC18C', 400: '#DFA363', 500: '#C98245', 600: '#B66A35', 700: '#9D542D', 800: '#7E4028', 900: '#603020', 950: '#432117' },
        emerald: { 300: '#B7D7C3', 400: '#8EBB9D', 500: '#679A7A', 600: '#4D7F62', 700: '#3D654E', 800: '#314F40', 900: '#263D32' },
        rose: { 400: '#D86C7B', 500: '#CC3A63', 600: '#B52F55', 700: '#962743' },
      },
    },
  },
  plugins: [],
}
