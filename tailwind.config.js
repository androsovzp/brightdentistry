/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f7a8d0',
          400: '#f472b6',
          500: '#ec4899', // primary brand pink
          600: '#db2777', // hover pink
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          dark: '#4a042e'
        },
        rosebrand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pink-soft': '0 10px 30px -10px rgba(236, 72, 153, 0.25)',
        'pink-glow': '0 0 25px rgba(236, 72, 153, 0.4)',
      }
    },
  },
  plugins: [],
}
