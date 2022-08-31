<script>
  import { onMount } from 'svelte';

  let theme = localStorage.getItem('theme') || 'light';
  $: isDark = theme === 'dark';
  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  $: {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }
</script>

{#if mounted}
  {#if isDark}
    <button on:click={() => (theme = 'light')}>
      <i class="fas fa-moon hover:text-teal-500 w-6" />
    </button>
  {:else}
    <button on:click={() => (theme = 'dark')}>
      <i class="fas fa-sun hover:text-orange-500 w-6" />
    </button>
  {/if}
{/if}
