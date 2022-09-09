import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import image from "@astrojs/image";
import rehypePrettyCode from 'rehype-pretty-code';

const rehypePrettyCodeOptions = {
  theme: {
    dark: "one-dark-pro",
    light: "github-light",
  },
}

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  markdown: {
    syntaxHighlight: false
  },
  integrations: [tailwind(), svelte(), mdx({
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ],
  }), react(), image()],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  }
});