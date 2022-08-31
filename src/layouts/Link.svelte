<script lang="ts">
  export let path: string;
  export let title: string;
  export let isMobile = false;
</script>

<a
  href={path}
  class={`
    font-bold
    hover:underline
    hover:underline-offset-4
    hover:text-orange-500
    hover:dark:text-teal-500
    transition
    ${isMobile ? '' : 'hidden sm:block'}`}
  on:mousedown|preventDefault
>
  {title}
</a>
