<script lang="ts">
  export let path: string;
  export let title: string;
  export let isMobile = false;
</script>

<a
  href={path}
  class={`
    link
    link-hover
    font-bold
    hover:text-primary
    ${isMobile ? '' : 'hidden sm:block'}`}
  on:mousedown|preventDefault
>
  {title}
</a>
