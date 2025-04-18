// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  /* ... */
});

const reviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    slug: z.string().optional(),
    updateDate: z.string().optional(),
    author: z.object({
      name: z.string(),
      image: z.string(),
      bio: z.string(),
      expertise: z.array(z.string()),
    }),
    rating: z.number().min(0).max(10),
    category: z.string(),
    image: z.string().url(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    product: z.object({
      name: z.string(),
      brand: z.string(),
      image: z.string().url(),
      price: z.number(),
      sku: z.string(),
      specifications: z.array(
        z.object({
          category: z.string(),
          items: z.array(
            z.object({
              label: z.string(),
              value: z.string(),
            }),
          ),
        }),
      ),
    }),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, reviews };
