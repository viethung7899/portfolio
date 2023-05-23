<script lang="ts">
  import Square from "./components/Square.svelte";
  import { DIMENSION, VALUES } from "./lib/constants";
</script>

<div
  class="sudoku-grid inline-grid m-auto"
  style={`grid-template-columns: repeat(${DIMENSION}, minmax(0, 1fr))`}
>
  {#each VALUES as row}
    {#each VALUES as col}
      <Square rowIndex={row - 1} colIndex={col - 1} />
    {/each}
  {/each}
</div>
