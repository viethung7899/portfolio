<script lang="ts">
  import Square from "./components/Square.svelte";
  import Sudoku from "./lib/sudoku";

  let sudoku = new Sudoku();
</script>

<div class="w-full flex">
  <div class="sudoku-grid inline-grid grid-cols-9 m-auto">
    {#each sudoku.board as row, i}
      {#each row as value, j}
        <Square 
          value={value} 
          position={[i, j]}
          onChange={(value) => sudoku.setCell([i, j], value)} />
      {/each}
    {/each}
  </div>
</div>
<div class="flex my-6 items-center justify-center gap-3">
  <select class="select select-bordered">
    <option>Backtracking</option>
    <option>Dacing Link</option>
  </select>
  <button class="btn btn-primary btn-outline">
    Randomize
  </button>
  <button class="btn btn-primary" >
    Solve
  </button>
</div>
