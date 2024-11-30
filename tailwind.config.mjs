/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ghost Sans", ...fontFamily.sans],
        mono: ["Ghost Mono", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "hsl(222.2, 47.4%, 11.2%)",
        "primary-foreground": "hsl(210, 40%, 98%)",
      },
    },
  },
};
