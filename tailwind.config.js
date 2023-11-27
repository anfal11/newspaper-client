/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      
      md: '768px',
      lg: '1215px'
     
    },
    
    extend: {},
  },
  plugins: [require("daisyui")],
}

