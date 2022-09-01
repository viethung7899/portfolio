import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx(), react()],
  output: 'server',
  adapter: vercel(),
});