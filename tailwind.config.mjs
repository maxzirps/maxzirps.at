/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      heading: ["Cormorant Garamond", "serif", "system-ui"],
      heading2: ["Merriweather", "serif", "system-ui"],
    },
  },
  plugins: [],
};
