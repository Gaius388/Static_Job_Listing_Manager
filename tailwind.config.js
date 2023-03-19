/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      leagueSpartan: ["League Spartan", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "header-bg": "url('/public/images/bg-header-desktop.svg')",
      },
      colors: {
        "header-bg2": "hsl(180, 29%, 50%)",
        "main-bg": "hsl(180, 52%, 96%)",
        "filter-tab": "hsl(180, 31%, 90%)",
        "featured-tab": "hsl(180, 14%, 20%)",
      },
      gridTemplateColumns: {
        gridProfile: "0.5fr 2fr",
      },
    },
  },
  plugins: [],
};
