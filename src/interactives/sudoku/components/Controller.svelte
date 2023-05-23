<script lang="ts">
  import { sleep } from "@interactives/common/utils";
  import type {
    SudokuAlgorithm,
    SudokuSolvingGenerator,
    SudokuSolvingState
  } from "../lib/solver";
  import { algorithm, noSolution, solving } from "../lib/solver";
  import {
    Sudoku,
    randomizeSoduoku,
    showPossibleValues,
    sudoku
  } from "../lib/sudoku";

  let hasSolution = false;
  let playing = false;

  let state: SudokuSolvingState | undefined;
  let generator: SudokuSolvingGenerator | undefined;

  let name: SudokuAlgorithm = "Backtracking";
  $: delay = name === "Backtracking" ? 10 : 100;

  const solve = async () => {
    playing = true;
    if (!generator) generator = algorithm[name]($sudoku);
    while (playing) {
      state = generator.next();
      if (state.done) {
        playing = false;
        hasSolution = state.value;
      } else {
        $sudoku = state.value;
        await sleep(delay);
      }
    }
  };
  $: isSolved = state?.done;
  $: {
    solving.set(state !== undefined && !state.done);
    noSolution.set(!!isSolved && !hasSolution);
  }

  const reset = () => {
    state = undefined;
    generator = undefined;
    hasSolution = false;
  };
</script>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Show hints</span>
    <input
      type="checkbox"
      class="checkbox checkbox-primary"
      bind:checked={$showPossibleValues}
    />
  </label>
</div>
<select
  class="select select-bordered"
  bind:value={name}
  disabled={playing || $solving}
>
  {#each Object.keys(algorithm) as option}
    <option value={option}>{option}</option>
  {/each}
</select>
{#if playing}
  <button class="btn btn-warning" on:click={() => (playing = false)}>
    Pause
  </button>
{:else}
  <button
    class={`btn btn-primary ${playing ? "btn-outline" : ""}`}
    disabled={isSolved}
    on:click={solve}
  >
    {$solving ? "Resume" : "Solve"}
  </button>
{/if}
<button
  class="btn"
  on:click={() => {
    sudoku.set(randomizeSoduoku());
    reset();
  }}
  disabled={playing}>Randomize</button
>
<div class="flex gap-4">
  <button
    class="btn btn-primary btn-outline flex-1"
    on:click={() => {
      sudoku.update((sudoku) => sudoku.reset());
      reset();
    }}
    disabled={playing}>Reset</button
  >
  <button
    class="btn btn-outline flex-1"
    on:click={() => {
      sudoku.set(new Sudoku());
      reset();
    }}
    disabled={playing}>Clear</button
  >
</div>
