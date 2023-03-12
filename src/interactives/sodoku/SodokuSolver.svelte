<script lang="ts">
  import Square from "./components/Square.svelte";
  import Sodoku from "./lib/sodoku";

  let sodoku = new Sodoku();
  $: board = sodoku.board;
</script>

<div class="w-full flex">
  <div class="inline-grid grid-cols-3 border-2 border-slate-500 m-auto">
    {#each board as region, regionIndex}
      <div class="inline-grid grid-cols-3 border-2 border-slate-500">
        {#each region as row, rowIndex}
          {#each row as square, colIndex}
            <Square value={square} onChange={(value) => {
              sodoku = sodoku.setValue([regionIndex, rowIndex, colIndex], value);
            }} />
          {/each}
        {/each}
      </div>
    {/each}
  </div>
</div>
<div class="flex my-6 items-center justify-center gap-3">
  <select class="select select-bordered">
    <option>Backtracking</option>
    <option>Dacing Link</option>
  </select>
  <button class="btn btn-primary btn-outline" on:click={() => sodoku = sodoku.randomize()}>
    Randomize
  </button>
  <button class="btn btn-primary" >
    Solve
  </button>
</div>
