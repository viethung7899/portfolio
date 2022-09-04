<script lang="ts">
  let count = 25;
  let numbers = [] as number[];
  $: {
    numbers = Array(count)
      .fill(0)
      .map((_) => Math.ceil(Math.random() * 100));
  }

  const algos = ["Bubble Sort", "Selection Sort"];
  const speeds = ["Slow", "Fast", "Very Fast"]
</script>

<div class="w-full my-8">
  <div class="mb-4 grid sm:grid-cols-2 gap-4 items-center">
    <label for="count">
      Number of elements: <strong class="text-orange-500 dark:text-teal-500">{count}</strong>
    </label>
    <input
      id="count"
      type="range"
      min="10"
      max="50"
      step="1"
      bind:value={count}
      class="count rounded-full appearance-none w-full h-1 bg-slate-500/25"
    />
    <label for="algos" class="flex">Algorithm</label>
    <select id="algos">
      {#each algos as algo}
        <option>{algo}</option>
      {/each}
    </select>
    <label for="algos" class="flex">Speed</label>
    <select id="algos">
      {#each speeds as speed}
        <option>{speed}</option>
      {/each}
    </select>
  </div>

  <div
    class="h-60 rounded-md border-2 border-slate-500/25 flex gap-1 md:gap-2 p-2 items-end"
  >
    {#each numbers as value}
      <div
        class="flex-1 bg-orange-500 dark:bg-teal-500 rounded-sm"
        style:height={`${value}%`}
      />
    {/each}
  </div>
  <div class="flex gap-2 w-full justify-end mt-4">
    <button class="
      p-2 border-2 rounded-md focus:outline-none
      border-orange-500 text-orange-500 hover:bg-orange-500/30
      dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500/30">
      Reset
    </button>
    <button class="p-2 rounded-md text-white focus:outline-none
    bg-orange-500 hover:bg-orange-700
    dark:bg-teal-500 hover:dark:bg-teal-700">
      Play
    </button>
  </div>
</div>

<style lang="scss">
  .count::-webkit-slider-thumb {
    @apply appearance-none w-3 h-3 rounded-full cursor-pointer bg-orange-500;
  }

  :global(.dark) .count::-webkit-slider-thumb {
    @apply bg-teal-500;
  }

  select {
    @apply w-full bg-transparent border-2 border-slate-500/50 rounded-md p-2 items-center focus:outline-none focus:border-orange-500;
  }

  :global(.dark) select {
    @apply focus:border-teal-500;
  }

  button {
    width: 4rem;
  }
</style>
