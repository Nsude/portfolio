/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['HaasRegular', 'sans-serif'],
      serif: ['AppleG Italic', 'serif'],
      appleG: 'AppleG'
    },
    fontSize: {
      base: '14px'
    }, 
    extend: {
      colors: {
        myGray: {
          100: '#DDDDDD', // bg
          200: '#EDEDED', // lighter gray
          300: "#C8C8C8" // projects-bg gray
        },
        myblack: '#0A0A0A',
        opacityBg: 'rgba(var(--opacity-color), 0.2)'
      },
      borderRadius: {
        'lg': '15px',
        'sm': '5px',
        'full': '50%'
      },
      aspectRatio: {
        myRatio: '0.87 / 1'
      }
    },
  },
  plugins: [],
}

