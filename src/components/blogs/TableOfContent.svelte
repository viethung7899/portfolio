<script lang="ts">
  import type { MarkdownHeading } from "astro";
  let scrollY: number;

  export let headings: MarkdownHeading[];
</script>

<svelte:window bind:scrollY />
<h3 class="uppercase font-bold opacity-50">On this page</h3>
{#each headings as heading}
  {@const styles = heading.depth <= 2 ? "text-md" : "text-sm ml-4"}
  <a
    href={`#${heading.slug}`}
    class={`${styles} hover:text-orange-500 hover:dark:text-teal-500`}
    >{heading.text}</a
  >
{/each}
<p
  class="text-xs pt-4 cursor-pointer hover:text-orange-500 hover:dark:text-teal-500"
  on:click|preventDefault={() => {
    document.body.scrollIntoView();
  }}
>
  Back to top
</p>
