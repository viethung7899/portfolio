<script>
  import Icon from '@iconify/svelte';
  import Link from './Link.svelte';
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  let show = false;
  import { slide } from 'svelte/transition';

  const links = [
    {
      path: '/',
      title: 'Home',
    },
    {
      path: '/projects',
      title: 'Projects',
    },
    {
      path: '/blogs',
      title: 'Blogs',
    },
  ];
</script>

<nav class="sticky top-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg flex flex-col items-center border-b-2 border-slate-500/25 z-50">
  <div class="flex flex-row items-center justify-between p-4 w-full max-w-screen-lg">
    <button
      class="block sm:hidden"
      on:click={() => (show = !show)}
      on:blur|preventDefault={() => (show = false)}
    >
      <Icon
        icon={show ? 'fa6-solid:xmark' : 'fa6-solid:bars'}
        class="w-6 h-6 link"
      />
    </button>
    <a
      href="/"
      class="uppercase font-medium link"
      >Viet Hung Nguyen</a
    >
    <div class="flex items-center gap-4">
      {#each links as { title, path }}
        <Link {path} {title} />
      {/each}
      <ThemeSwitcher />
    </div>
  </div>
  {#if show}
  <div class="flex flex-col p-4 gap-4 w-full" transition:slide>
    {#each links as { title, path }}
        <Link {path} {title} isMobile />
      {/each}
  </div>
  {/if}
</nav>
