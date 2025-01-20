/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['HaasRegular', 'sans-serif'],
      serif: ['Garamond', 'serif']
    },
    fontSize: {
      base: '14px'
    }, 
    extend: {
      colors: {
        myGray: {
          100: '#DDDDDD', // bg
          200: '#EDEDED' // lighter gray
        },
        myblack: '#0A0A0A',
        opacityBg: 'rgba(var(--opacity-color), 0.2)'
      },
      borderRadius: {
        'lg': '15px',
        'sm': '5px',
        'full': '50%'
      }
    },
  },
  plugins: [],
}

