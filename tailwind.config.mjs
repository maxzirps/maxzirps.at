/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
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
      },
    },
  },
  plugins: [],
};
