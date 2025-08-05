/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        spinY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        spinY: 'spinY 5s linear infinite',
      },
    },
  },
  plugins: [],
}

