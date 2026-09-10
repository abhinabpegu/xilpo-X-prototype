/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // TatiSaathi palette — drawn from Mising handloom dye traditions
        cotton: "#F7F1E3", // undyed handspun cotton (eri/muga base cloth)
        indigo: {
          DEFAULT: "#24365C", // natural indigo dye, primary brand color
          light: "#3C548A",
          dark: "#182543",
        },
        madder: {
          DEFAULT: "#B4432E", // madder-root red, used for CTAs
          light: "#CB5B44",
          dark: "#8F3423",
        },
        ochre: {
          DEFAULT: "#E3A83B", // turmeric/ochre dye, secondary accent
          light: "#EFC372",
        },
        paddy: "#587A4B", // paddy-field green, used for success states
        ink: "#2A2622", // near-black warm ink for text
      },
      fontFamily: {
        display: ['"Baloo 2"', "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        phone: "0 30px 60px -15px rgba(42, 38, 34, 0.35)",
      },
      borderRadius: {
        phone: "2.75rem",
      },
    },
  },
  plugins: [],
};
