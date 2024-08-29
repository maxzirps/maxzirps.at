/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      heading2: ["Merriweather", "serif", "system-ui"],
      heading: ["Exo 2 Variable", "sans-serif", "system-ui"],
    },
    extend: {
      keyframes: {
        expand: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "-500%",
          },
          "100%": {
            "background-position": "500%",
          },
        },
      },
    },
  },
  plugins: [],
};
