<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import { setTheme } from "./themeStore"

  $: theme = localStorage.getItem("theme") || "light";
  let isMounted = false;

  const toggle = () => {
    if (theme === "light") theme = "dark";
    else theme = "light";
    setTheme();
  };

  onMount(() => {
    isMounted = true;
  });

  $: {
    if (isMounted) {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "night");
      } else {
        document.documentElement.setAttribute("data-theme", "emerald");
      }
      localStorage.setItem("theme", theme);
      setTheme();
    }
  }
</script>

<button on:click={toggle} class="text-right">
  <Icon
    icon={!isMounted || theme === "light" ? "fa6-solid:sun" : "fa6-solid:moon"}
    class="w-6 h-6 hover:text-primary"
  />
</button>
