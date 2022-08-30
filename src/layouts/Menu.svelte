<script lang="ts">
  let show = false;

  const handleClick = () => (show = false);
</script>

<button
  class="toggle absolute left-4 hidden cursor-pointer"
  on:click={() => {
    show = !show;
  }}
>
  <i class={`fa-solid fa-bars text-2xl`} />
</button>
<div class={`links sm:flex ${!show ? 'hidden' : ''}`}>
  <ul class="flex gap-4">
    <li><a href="/">Home</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/blogs">Blogs</a></li>
    <li><a href="/contact">Contacts</a></li>
  </ul>
</div>

<style>
  a {
    @apply font-bold cursor-pointer;
  }

  a:hover {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500;
  }

  .toggle:hover,
  .toggle:focus {
    @apply text-orange-500;
  }

  @media (max-width: theme('screens.sm')) {
    .toggle {
      @apply block;
    }

    .links {
      @apply w-full;
    }

    .links > ul {
      @apply flex-col;
    }
  }
</style>
