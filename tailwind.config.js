/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./customer/**/*.html",
    "./vendors/**/*.html",
    "./partials/**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#5C2839",
          dark: "#3D1A25",
          footer: "#2E1620",
        },
        cream: {
          DEFAULT: "#EFECE4",
          light: "#F5F3EE",
        },
        lime: {
          DEFAULT: "#C5E866",
          dark: "#A8CC44",
        },
        pink: {
          brand: "#A84065",
        },
        lavender: "#D4C5F0",
        ink: "#1F1F1F",
        muted: "#878282",
        "card-bg": "#FFFFFF",
      },
      fontFamily: {
        display: ["BlackSansaPro", "sans-serif"],
        brand: ["GCMOXDemo", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "20px",
        "2xl": "24px",
        pill: "100px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        site: "960px",
      },
    },
  },
  plugins: [],
};
