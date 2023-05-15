/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["softeal", "sans-serif"],
      },
      colors: {
        brand: {
          green: "#4fa9a0",
          violet: "#9fa2ce",
          blue: "#3c84a7",
          orange: "#da7b62",
          pink: "#c07088"
        }
      }
    },
  },
  plugins: [],
}
