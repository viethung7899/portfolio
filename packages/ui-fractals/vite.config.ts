import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), dts()],
  build: {
    lib: {
      entry:"src/index.ts",
      name: "ui-fractals",
      fileName: "ui-fractals",
    }
  }
})
