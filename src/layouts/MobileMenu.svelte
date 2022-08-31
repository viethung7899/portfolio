<script lang="ts">
  import { slide } from 'svelte/transition';
  let show = false;
</script>

<button
  class="toggle block sm:hidden cursor-pointer"
  on:click={() => {
    show = !show;
  }}
>
  <i class="fa-solid fa-bars hover:text-orange-400 hover:dark:text-teal-500" />
</button>
{#if show}
  <nav
    class="absolute w-full flex items-start flex-col gap-4 p-4 top-full left-0 sm:hidden bg-white dark:bg-gray-800 border-b-2"
    transition:slide
  >
    <a
      href="/"
      class="font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:dark:from-blue-500 hover:dark:to-green-500"
      >Home</a
    >
    <a
      href="/projects"
      class="font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:dark:from-blue-500 hover:dark:to-green-500"
      >Projects</a
    >
    <a
      href="/blogs"
      class="font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:dark:from-blue-500 hover:dark:to-green-500"
      >Blogs</a
    >
    <a
      href="/contact"
      class="font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-500 hover:dark:from-blue-500 hover:dark:to-green-500"
      >Contact</a
    >
  </nav>
{/if}

