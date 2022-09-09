import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import image from "@astrojs/image";
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypePrettyCodeOptions } from './plugins/rehypePrettyCode';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ]
  },
  integrations: [tailwind(), svelte(), mdx(), react(), image()],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  }
});