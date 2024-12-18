import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: "github-dark",
        dark: "github-dark",
      },
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  devToolbar: {
    enabled: false,
  },
});
