/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffcdcd',
          300: '#ffa8a8',
          400: '#ff7575',
          500: '#ff4444',
          600: '#ee1d1d',
          700: '#c81717',
          800: '#a51616',
          900: '#891a1a',
        },
      },
    },
  },
  plugins: [],
}