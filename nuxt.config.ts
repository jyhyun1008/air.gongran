// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-07-05",
  future: { compatibilityVersion: 4 },
  modules: ["@nuxt/content"],
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/sample", "/project", "/blog", "/contact"],
    },
  },
  app: {
    head: {
      title: "GONGRAN | 공란공항",
      htmlAttrs: { lang: "ko" },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
});
