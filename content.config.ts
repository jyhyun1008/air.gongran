import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const tags = z.array(z.string()).default([]);

export default defineContentConfig({
  collections: {
    sample: defineCollection({
      type: "page",
      source: "sample/*.md",
      schema: z.object({
        title: z.string(),
        type: z.enum(["youtube", "audio", "illustration"]),
        comment: z.string().optional(),
        image: z.string().optional(),
        audioSrc: z.string().optional(),
        youtubeId: z.string().optional(),
        tags,
        date: z.string().optional(),
      }),
    }),
    project: defineCollection({
      type: "page",
      source: "project/*.md",
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        thumbnail: z.string().optional(),
        tags,
        date: z.string().optional(),
        link: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        thumbnail: z.string().optional(),
        tags,
        date: z.string().optional(),
      }),
    }),
  },
});
