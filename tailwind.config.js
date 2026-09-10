/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // xilpo-X palette — light mode only, minimal register (Mising Archives style)
        cream: "#FAF8F3", // page background
        cotton: "#F8F4EE", // alternate background used by the phone-card shell
        surface: "#FFFFFF", // cards, inputs
        line: "#E8E2D6", // hairline borders
        ink: {
          DEFAULT: "#2B2621", // primary text
          muted: "#7A7268", // secondary text
        },
        indigo: {
          DEFAULT: "#2B4A8F",
          dark: "#182543",
        },
        rust: "#A8452F", // single primary accent — reserved for the one action that matters
        ochre: "#C68A2E", // secondary accent — active language toggle only
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        bengali: ['"Noto Sans Bengali"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        phone: "32px",
      },
      boxShadow: {
        phone: "0 30px 80px rgba(24, 37, 67, 0.22)",
      },
    },
  },
  plugins: [],
};