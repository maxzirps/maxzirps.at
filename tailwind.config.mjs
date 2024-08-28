// /** @type {import('tailwindcss').Config} */

// const colors = require("tailwindcss/colors");

// export default {
//   content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#FAFAFA", // Very Light Gray
//         secondary: "#FFFFFF", // White
//         textPrimary: "#333333", // Charcoal
//         textSecondary: "#666666", // Medium Gray
//         accent: "#FF6F61", // Muted Coral
//         highlight: "#FFC107", // Soft Amber
//         border: "#E0E0E0", // Light Gray
//         success: "#3CB371", // Medium Sea Green
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      heading: ["Cormorant Garamond", "serif", "system-ui"],
      heading2: ["Merriweather", "serif", "system-ui"],
    },
    extend: {
      colors: {
        ...colors,
        black: "#010417",
        blue: "#0029c1",
        teal: "#2bb59c",
        yellow: "#f7dc09",
        red: "#e22b00",
        ...colors,
      },
    },
  },
  plugins: [],
};
