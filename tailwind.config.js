/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00474B",
        "secondary": "#26C2AE",
        "cover": "#C5E4E7",
        "header": "#5E7A7D"
      }
    },
  },
  plugins: [],
}

