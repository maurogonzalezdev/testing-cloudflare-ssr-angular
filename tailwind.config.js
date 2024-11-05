/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBF2FF",
          100: "#DBE8FF",
          200: "#B3CDFF",
          300: "#8FB6FF",
          400: "#669CFF",
          500: "#4385FF",
          600: "#0059FF",
          700: "#0044C2",
          800: "#002D80",
          900: "#001742",
          950: "#000B1F",
        },
        light: {
          50: "#FFFFFF",
          100: "#FCFCFC",
          200: "#FAFAFA",
          300: "#F7F7F7",
          400: "#F2F2F2",
          500: "#F0F0F0",
          600: "#EBEBEB",
          700: "#BDBDBD",
          800: "#8C8C8C",
          900: "#5E5E5E",
          950: "#2E2E2E",
        },
        dark: {
          50: "#EAEAEB",
          100: "#D5D5D7",
          200: "#A9A9AD",
          300: "#7F7F85",
          400: "#555559",
          500: "#2D2D2F",
          600: "#232324",
          700: "#1B1B1D",
          800: "#111112",
          900: "#0A0A0A",
          950: "#050505",
        },
        extra: {
          yellow: "#EBD669",
        },
      },
    },
    fontFamily: {
      'roboto-condensed': ["Roboto Condensed", "sans-serif"]
    }
  },
  plugins: [require("flowbite/plugin")],
};
