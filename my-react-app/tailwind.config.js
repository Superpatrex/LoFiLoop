/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#272C4C",
        secondary: "#4E314D",
        accent: "#CBC0BD",
        highlight: "#848AAB",
        dark: "#0A0722",
      },
    },
  },
  plugins: [],
};
