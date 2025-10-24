/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#FF3B30',
        'brand-green': '#00C853',
        'brand-dark': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'neumorphic-press': {
          '0%': { boxShadow: 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff' },
          '100%': { boxShadow: 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff' },
        }
      },
      animation: {
        'neumorphic-press': 'neumorphic-press 0.2s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
