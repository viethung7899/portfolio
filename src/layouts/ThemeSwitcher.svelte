<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  let theme = localStorage.getItem('theme') || 'light';
  let isMounted = false;

  const toggle = () => {
    if (theme === 'light') theme = 'dark';
    else theme = 'light';
  };

  onMount(() => {
    isMounted = true;
  });

  $: {
    if (isMounted) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }
</script>

<button on:click={toggle} class="text-right">
  <Icon
    icon={!isMounted || theme === 'light' ? 'fa6-solid:sun' : 'fa6-solid:moon'}
    class="w-6 h-6 hover:text-orange-500 hover:dark:text-teal-500 transition-colors"
  />
</button>
