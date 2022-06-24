/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentColor: "#ef5622",
        lightColor: "#fffde2",
        midColor: "#f7b48c",
        darkColor: "#7a250a",
      },
    },
  },
  plugins: [],
}
