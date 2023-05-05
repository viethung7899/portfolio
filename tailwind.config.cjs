/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,css,scss}"],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  darkMode: "class",
  daisyui: {
    themes: ["emerald", "night"],
    darkTheme: "night"
  }
};
