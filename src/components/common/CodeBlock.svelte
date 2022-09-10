<script lang="ts">
  import { convertLineNumbers, LineNumber } from "src/utils/line";

  export let title = "";
  export let lang = "";
  export let showLineNumbers = false;
  export let highlight: LineNumber[] = [];
  export let ins: LineNumber[] = [];
  export let del: LineNumber[] = [];

  let figure: HTMLElement | null;
  $: {
    if (!figure) break $;
    const codes = figure.querySelectorAll("code");
    codes.forEach((code) => {
      if (showLineNumbers) code.setAttribute("data-line-numbers", "");
      const lines = code.querySelectorAll(".line");
      convertLineNumbers(highlight).forEach(lineNumber => {
        lines[lineNumber - 1].classList.add("highlight");
      })
      convertLineNumbers(ins).forEach(lineNumber => {
        lines[lineNumber - 1].classList.add("insert");
      })
      convertLineNumbers(del).forEach(lineNumber => {
        lines[lineNumber - 1].classList.add("delete");
      })
    });

  }
</script>

<figure class="relative -z-10" bind:this={figure}>
  {#if title || lang}
    <figcaption class="text-orange-600 dark:text-teal-400">
      {title || lang?.toUpperCase()}
    </figcaption>
  {/if}
  <slot />
</figure>

<style>
  figcaption {
    @apply font-mono font-bold p-2 translate-y-2 rounded-t-md border-t-2 border-l-2 border-r-2 bg-orange-200 border-orange-500;
  }

  :global(.dark) figcaption {
    @apply bg-teal-900 border-teal-500 text-teal-500;
  }
</style>
