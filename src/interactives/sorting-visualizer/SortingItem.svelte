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
    @apply bg-orange-500/50;
  }

  :global(.dark) .none {
    @apply bg-teal-500/50;
  }

  .selected {
    @apply bg-orange-500/50 outline outline-[1.5px] outline-orange-500;
  }

  :global(.dark) .selected {
    @apply bg-teal-500/50 outline-teal-500;
  }

  .sorted {
    @apply bg-orange-500;
  }

  :global(.dark) .sorted {
    @apply bg-teal-500;
  }

  .pivot {
    @apply bg-orange-500/50 outline outline-[1.5px] outline-blue-600;
  }

  :global(.dark) .pivot {
    @apply bg-teal-500/50 outline-yellow-600;
  }
</style>