<script lang="ts">
  import { algorithms, randomizeArray, sleep, type Item } from "../lib/sort";
  import SortingItem from "./SortingItem.svelte";

  let count = 25;
  let items = [] as Item[];
  let sorted = false;

  $: {
    items = randomizeArray(count);
    sorted = false;
  }

  const speeds = [
    { name: "Slow", value: 250 },
    { name: "Fast", value: 100 },
    { name: "Very Fast", value: 40 }
  ];

  let speed = speeds[0].value;
  let playing = false;
  let algoName: keyof typeof algorithms = "Bubble sort";

  const sort = async () => {
    const copy = [...items];
    const generator = algorithms[algoName](copy);
    playing = true;
    while (true) {
      const state = generator.next();
      if (state.done) break;
      else items = state.value;
      await sleep(speed);
    }
    playing = false;
    sorted = true;
  };
</script>

<div class="w-full my-8">
  <div class="mb-4 grid sm:grid-cols-2 gap-4 items-center">
    <label for="count">
      Number of elements: <strong class="text-orange-500 dark:text-teal-500"
        >{count}</strong
      >
    </label>
    <input
      id="count"
      type="range"
      min="10"
      max="50"
      step="1"
      bind:value={count}
      class="count rounded-full appearance-none w-full h-1 bg-slate-500/25 disabled:opacity-50"
      disabled={playing}
    />
    <label for="algos" class="flex">Sorting algorithm</label>
    <select id="algos" disabled={playing} bind:value={algoName}>
      {#each Object.keys(algorithms) as name}
        <option value={name}>{name}</option>
      {/each}
    </select>
    <label for="speed" class="flex">Speed</label>
    <select id="speed" bind:value={speed}>
      {#each speeds as speed}
        <option value={speed.value}>{speed.name}</option>
      {/each}
    </select>
  </div>

  <div
    class="h-60 rounded-md border-2 border-slate-500/25 flex gap-1 md:gap-2 p-2 items-end"
  >
    {#each items as item}
      <SortingItem {item} />
    {/each}
  </div>
  <div class="flex gap-2 w-full justify-end mt-4">
    <button
      class="
      border-2
      border-orange-500 text-orange-500 hover:enabled:bg-orange-500/30
      dark:border-teal-500 dark:text-teal-500 dark:hover:enabled:bg-teal-500/30"
      on:click={() => {
        items = randomizeArray(count);
        sorted = false;
      }}
      disabled={playing}
    >
      Randomize
    </button>
    <button
      class="text-white dark:text-gray-900
    bg-orange-500 hover:enabled:bg-orange-700
    dark:bg-teal-500 hover:enabled:dark:bg-teal-700"
      on:click={sort}
      disabled={playing || sorted}
    >
      Sort
    </button>
  </div>
</div>

<style>
  .count::-webkit-slider-thumb {
    @apply appearance-none w-3 h-3 rounded-full cursor-pointer bg-orange-500 disabled:bg-orange-700;
  }

  :global(.dark) .count::-webkit-slider-thumb {
    @apply bg-teal-500 disabled:bg-teal-700;
  }

  select {
    @apply w-full bg-transparent border-2 border-slate-500/50 rounded-md p-2 items-center focus:outline-none focus:border-orange-500 disabled:opacity-50;
  }

  :global(.dark) select {
    @apply focus:border-teal-500;
  }

  button {
    min-width: 4rem;
    @apply disabled:opacity-60 p-2 rounded-md focus:outline-none;
  }
</style>
