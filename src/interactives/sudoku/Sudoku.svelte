<script lang="ts">
  import Controller from "./components/Controller.svelte";
  import Square from "./components/Square.svelte";
  import { DIMENSION, VALUES } from "./lib/constants";
  import { noSolution } from "./lib/solver";
</script>

<div
  class="sudoku-grid inline-grid m-auto relative"
  style={`grid-template-columns: repeat(${DIMENSION}, minmax(0, 1fr))`}
>
  {#each VALUES as row}
    {#each VALUES as col}
      <Square rowIndex={row - 1} colIndex={col - 1} />
    {/each}
  {/each}
  {#if $noSolution}
  <div class="absolute bg-secondary/40 text-secondary w-full h-full flex items-center">
    <p class="text-center text-xl font-bold w-full">No solution</p>
  </div>
  {/if}
</div>
<div class="mt-4 flex flex-col gap-4">
  <Controller />
</div>
