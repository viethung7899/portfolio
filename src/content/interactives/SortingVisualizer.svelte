<script lang="ts">
  import { algorithms, type Item, type SortingState, type SortGenerator } from "../lib/sort";
  import SortingItem from "./SortingItem.svelte";

  // Randomize array
  const randomizeArray = (count: number) => {
    return Array.from(
      { length: count },
      () =>
        ({
          value: Math.ceil(Math.random() * 100),
          status: "none"
        } as Item)
    );
  };

  let count = 25;
  let items: Item[] = [];
  $: {
    reset(count);
  }

  const speeds = [
    { name: "Slow", value: 250 },
    { name: "Fast", value: 100 },
    { name: "Very Fast", value: 40 }
  ];

  let speed = speeds[0].value;
  $: sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, speed));
  }
  let playing = false;
  let algoName: keyof typeof algorithms = "Bubble sort";
  let state: SortingState | undefined;
  let generator: SortGenerator | undefined;

  const reset = (count: number) => {
    items = randomizeArray(count);
    generator = undefined;
    state = undefined;
  };

  const play = async () => {
    playing = true;
    if (!generator) generator = algorithms[algoName]([...items]);
    while (playing) {
      state = generator.next();
      if (state.done) {
        playing = false;
      } else {
        items = state.value;
        await sleep();
      }
    }
  };

  $: isSorting = state && !state.done;
  $: isSorted = state?.done;
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
      disabled={playing || isSorting}
    />
    <label for="algos" class="flex">Sorting algorithm</label>
    <select id="algos" disabled={playing || isSorting} bind:value={algoName}>
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
      on:click={() => reset(count)}
      disabled={isSorting}
    >
      Randomize
    </button>
    {#if playing}
      <button class="fill" on:click={() => (playing = false)}>Pause</button>
    {:else}
      <button class="fill" disabled={isSorted} on:click={play}
        >{isSorting ? "Resume" : "Sort"}</button
      >
    {/if}
  </div>
</div>

<style>
  .fill {
    @apply text-white bg-orange-500 hover:enabled:bg-orange-700;
  }

  :global(.dark) .fill {
    @apply text-gray-900 bg-teal-500 hover:enabled:bg-teal-700;
  }

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
