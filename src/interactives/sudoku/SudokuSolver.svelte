<script lang="ts">
  import { sleep } from "@interactives/common/utils";
  import Square from "./components/Square.svelte";
  import { type AlgorithmName, algorithms } from "./lib";
  import Sudoku from "./lib/sudoku";
  import type { SudokuSolvingGenerator, SudokuSolvingState } from "./lib/types";

  let sudoku = new Sudoku();
  let board = sudoku.board;

  // Animaation states
  let state: SudokuSolvingState | undefined;
  let generator: SudokuSolvingGenerator | undefined;
  let playing = false;
  let hasSolution: boolean | undefined;

  // Algorithm
  let algoName: AlgorithmName = "Backtracking";

  const solve = async () => {
    playing = true;
    if (!generator) generator = algorithms[algoName](sudoku);
    while (playing) {
      state = generator.next();
      if (state.done) {
        playing = false;
        hasSolution = state.value;
      } else {
        board = [...state.value.board];
        await sleep(1);
      }
    }
  };

  $: isSolving = state && !state.done;
  $: isSolved = state?.done;
</script>

<div class="w-full flex">
  <div class="sudoku-grid inline-grid grid-cols-9 m-auto">
    {#each board as row, i}
      {#each row as cell, j}
        <Square
          value={cell.value}
          canModify={cell.canModify}
          position={[i, j]}
          onChange={(value) => {
            sudoku.setCell([i, j], value);
            board = [...sudoku.board];
          }}
        />
      {/each}
    {/each}
  </div>
</div>
<div class="flex my-6 items-center justify-center gap-3">
  <select
    class="select select-bordered"
    disabled={playing || isSolving}
    bind:value={algoName}
  >
    {#each Object.keys(algorithms) as name}
      <option value={name}>{name}</option>
    {/each}
  </select>
  <button
    class="btn btn-primary btn-outline"
    disabled={playing}
    on:click={() => {
      sudoku = sudoku.randomize();
      board = [...sudoku.board];
      state = undefined;
      generator = undefined;
      hasSolution = undefined;
    }}
  >
    Randomize
  </button>
  {#if playing}
    <button class="btn btn-warning" on:click={() => (playing = false)}
      >Pause</button
    >
  {:else}
    <button
      class="btn btn-success"
      class:btn-outline={playing}
      on:click={solve}
      disabled={isSolved}
    >
      {playing ? "Resume" : "Solve"}
    </button>
  {/if}
</div>
{#if hasSolution === false}
  <div class="text-error text-center">No solution found</div>
{/if}
