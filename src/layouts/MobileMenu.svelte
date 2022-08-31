<script lang="ts">
  import { slide } from 'svelte/transition';
  import Link from "./Link.svelte"
  let show = false;
</script>

<button class="block sm:hidden cursor-pointer" on:click={() => (show = !show)}>
  <i class="fa-solid fa-bars hover:text-orange-400 hover:dark:text-teal-500" />
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
