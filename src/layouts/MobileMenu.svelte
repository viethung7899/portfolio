<script lang="ts">
  import { slide } from 'svelte/transition';
  import Icon from '@iconify/svelte'
  import Link from './Link.svelte';
  let show = false;
</script>

<button
  class="block sm:hidden"
  on:click={() => (show = !show)}
  on:blur|preventDefault={() => (show = false)}
>
  <Icon icon={show ? "fa6-solid:xmark" : "fa6-solid:bars"} class="w-6 h-6 hover:text-orange-400 hover:dark:text-teal-500" />
</button>
{#if show}
  <nav
    class="absolute w-full flex items-start flex-col gap-4 p-4 top-full left-0 sm:hidden bg-white dark:bg-gray-800 border-b-2"
    transition:slide
  >
    <Link path="/" title="Home" isMobile />
    <Link path="/projects" title="Projects" isMobile />
    <Link path="/blogs" title="Blogs" isMobile />
  </nav>
{/if}
