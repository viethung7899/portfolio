<script lang="ts">
  export let path: string;
  export let title: string;
  import Icon from '@iconify/svelte';
</script>

<a
  href={path}
  class="text-black dark:text-white text-current hover:text-orange-500 hover:dark:text-teal-500 inline-flex items-center space-x-1"
>
  <span class="underline underline-offset-4">{title}</span>
  <Icon icon="fa6-solid:arrow-up" class="rotate-45" />
</a>
