<script>
  import { onMount } from 'svelte';

  $: theme = localStorage.getItem('theme') || 'light';
  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  $: {
    if (mounted) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }
</script>

{#if mounted}
  <button on:click={() => (theme = theme === 'light' ? 'dark' : 'light')}>
    <i class="fa-solid fa-sun" />
  </button>
{/if}
