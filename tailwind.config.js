/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#FF5F00',
        customBlue:'#7CB9E8'
      },
    },
  },
  plugins: [],
} 