import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const customDateFormat = z
  .string()
  .refine(
    (val) => {
      // Regular expression for DD.MM.YYYY format
      const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
      return regex.test(val);
    },
    {
      message: "Invalid date format. Expected DD.MM.YYYY.",
    },
  )
  .transform((val) => {
    // Manually parse the DD.MM.YYYY format into a Date object
    const [day, month, year] = val.split(".").map(Number);
    return new Date(year, month - 1, day); // Month is zero-indexed in JavaScript
  });

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: customDateFormat,
    heroImage: z.string().optional(),
    keywords: z.array(z.string()),
    heroImageDescription: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: file("./src/content/projects/projects.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    spotlight: z.boolean().optional(),
  }),
});

export const collections = { blog, projects };
