/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#c85a5a', // Средний бордовый для градиентов
          500: '#8B0000', // Dark red / Burgundy (основной цвет логотипа)
          600: '#722F37', // Maroon (для кнопок и акцентов)
          700: '#5C1F27', // Deep maroon (для hover состояний)
          800: '#4A181F', // Very dark maroon
          900: '#3D1419', // Almost black maroon
        },
      },
    },
  },
  plugins: [],
}