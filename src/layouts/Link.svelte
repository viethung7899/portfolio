<script lang="ts">
  export let path: string;
  export let title: string;
  export let isMobile = false;
</script>

<a
  href={path}
  class={`
    font-bold
    hover:text-transparent 
    hover:bg-clip-text 
    hover:bg-gradient-to-r 
    hover:from-red-600 
    hover:to-yellow-600 
    hover:dark:from-blue-400 
    hover:dark:to-green-400
    ${isMobile ? "" : "hidden sm:block"}`}
  >{title}</a
>
