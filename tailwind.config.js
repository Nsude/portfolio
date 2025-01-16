/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gray: {
        100: '#DDDDDD', // bg
        200: '#EDEDED' // lighter gray
      },
      'black': '#0A0A0A'
    },
    fontFamily: {
      haas: ['HaasRegular', 'sans-serif'],
      garamond: ['Garamond', 'serif']
    },
    extend: {
      borderRadius: {
        'lg': '15px',
        'sm': '5px',
        'full': '50%'
      }
    },
  },
  plugins: [],
}

