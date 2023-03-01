import { defineConfig } from "astro/config";

import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: 'text',
          value: ' ',
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
  tokensMap: {},
  keepBackground: false,
};

export default defineConfig({
  integrations: [
    mdx({
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      syntaxHighlight: false,
      smartypants: true,
      gfm: true,
    }),
    svelte(),
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp"
    })
  ],
  output: "server",
  adapter: vercel({})
});
