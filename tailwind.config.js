/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      
      custom: "1024px",
      lg: "1215px",
    },
    
    extend: {},
  },
  plugins: [require("daisyui")],
}

