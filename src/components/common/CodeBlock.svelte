<script lang="ts">
  export let title = "";
  export let lang = "";
  export let showLineNumbers = false;

  let figure: HTMLElement | null;
  $: {
    if (figure && showLineNumbers) {
      const codes = figure.querySelectorAll("code");
      codes.forEach(code => {
        code.setAttribute("data-line-numbers", "");
      })
    }
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
