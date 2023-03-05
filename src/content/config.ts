import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional()
  })
});

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    imageURL: z.string(),
    github: z.string(),
    demo: z.string().optional(),
  })
});

export const collections = {
  'posts': postCollection,
  'projects': projectCollection
}