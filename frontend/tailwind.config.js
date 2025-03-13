/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          200: '#e0e7ff',
          500: '#5a52d2',
          600: '#5046e4'
        },
        gray:{
          100: '#eeeef',
          200: '#f9fafb',
          600: '#4d5665'
        }
      }
    },
  },
  plugins: [],
}

