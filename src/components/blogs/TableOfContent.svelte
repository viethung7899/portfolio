<script lang="ts">
  import type { MarkdownHeading } from 'astro';

  export let headings: MarkdownHeading[];
</script>

<h3 class="uppercase font-bold opacity-50">On this page</h3>
{#each headings as heading}
  {@const styles = heading.depth <= 2 ? 'text-md' : 'text-sm ml-4'}
  {@const href = `#${heading.slug}`}
  <a
    {href}
    class={`${styles} hover:text-orange-500 hover:dark:text-teal-500`}
    on:click|preventDefault={() => {
      const e = document.querySelector(href);
      e?.scrollIntoView({
        behavior: 'smooth',
      });
    }}>{heading.text}</a
  >
{/each}
<p
  class="text-xs opacity-50 pt-4 cursor-pointer hover:text-orange-500 hover:dark:text-teal-500"
  on:click|preventDefault={() => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  }}
>
  Back to top
</p>
