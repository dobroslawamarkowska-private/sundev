import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

export const collections = {
  blog: defineCollection({ type: 'content', schema: baseSchema }),
  articles: defineCollection({ type: 'content', schema: baseSchema }),
};
