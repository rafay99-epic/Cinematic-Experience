import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypeExternalLinks from "rehype-external-links";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://astro-blog-template.netlify.app",
  integrations: [
    mdx(),
    svelte(),
    tailwind(),
    react({
      include: ["**/react/*"],
    }),
  ],
  build: {
    format: "file",
  },
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "nord",
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
    adapter: vercel({
      webAnalytics: {
        enabled: true,
      },
      imageService: true,
      maxDuration: 8,
    }),
  },
});
