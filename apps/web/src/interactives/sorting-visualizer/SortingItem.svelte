<script lang="ts">
  import type {Item} from "./lib"

  export let item: Item;
</script>

<div
  class="flex-1 rounded-sm"
  style:height={`${item.value}%`}
  class:none={item.status === "none"}
  class:selected={item.status === "selected"}
  class:sorted={item.status === "sorted"}
  class:pivot={item.status === "pivot"}
/>

<style>
  .none {
    @apply bg-primary/50;
  }

  .selected {
    @apply bg-primary/50 outline outline-[1.5px] outline-primary;
  }

  .sorted {
    @apply bg-primary;
  }

  .pivot {
    @apply bg-primary/50 outline outline-[1.5px] outline-accent;
  }
</style>