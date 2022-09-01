<script>
  import Icon from '@iconify/svelte';
  const styles = "text-xl hover:text-orange-500 hover:dark:text-teal-600 hover:scale-[1.1] transition-all"
</script>

<div class="flex items-center space-x-4 py-2">
  <button
    class="p-2 rounded-lg text-white bg-orange-500 dark:bg-teal-600 hover:show-md hover:dark:bg-teal-700 transition hover:scale-[1.05]"
  >
    View my Resumé
  </button>
  <a class={styles} href="Github">
    <Icon icon="fa6-brands:github" />
  </a>
  <a class={styles} href="Linkedin">
    <Icon icon="fa6-brands:linkedin" />
  </a>
</div>
