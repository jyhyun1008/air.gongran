import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const tags = z.array(z.string()).default([]);

export default defineContentConfig({
  collections: {
    // per-project docs: content/project/<slug>/docs/**/*.md is served at
    // /project/<slug>/docs/... (the project page itself stays project/<slug>.md)
    docs: defineCollection({
      type: "page",
      source: "project/*/docs/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        // shorter label to show in the sidebar, when the full title is too long
        navTitle: z.string().optional(),
      }),
    }),
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
