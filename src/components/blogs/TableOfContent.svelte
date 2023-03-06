<script lang="ts">
  import type { MarkdownHeading } from "astro";
  let scrollY: number;

  export let headings: MarkdownHeading[];
</script>

<svelte:window bind:scrollY />
<h3 class="uppercase font-bold opacity-50">On this page</h3>
{#each headings as heading}
  <a
    href={`#${heading.slug}`}
    class={`${heading.depth <= 2 ? "text-md" : "text-sm ml-4"} hover:link-primary`}
    >{heading.text}</a
  >
{/each}
<a
  class="text-xs pt-4 hover:link-primary"
  href="#top"
>
  Back to top
</a>
