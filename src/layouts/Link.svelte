<script lang="ts">
  export let path: string;
  export let title: string;
  export let isMobile = false;
</script>

<a
  href={path}
  class={`
    link
    font-bold
    hover:underline
    hover:underline-offset-4
    ${isMobile ? '' : 'hidden sm:block'}`}
  on:mousedown|preventDefault
>
  {title}
</a>
