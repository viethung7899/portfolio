<script lang="ts">
  import {
    algorithms,
    type Item,
    type SortGenerator,
    type SortingState,
    randomizeArray,
    type Algorithm,
  } from "./lib";
  import SortingItem from "./SortingItem.svelte";

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
  };
  
  let playing = false;
  let algoName: Algorithm = "Quicksort";
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
      Number of elements: <strong class="accent">{count}</strong
      >
    </label>
    <input
      id="count"
      type="range"
      min="10"
      max="100"
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
    class={`h-60 rounded-md border-2 border-slate-500/25 flex ${
      items.length <= 50 ? "gap-1" : "gap-[1px]"
    } p-2 items-end`}
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
