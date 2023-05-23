<script lang="ts">
  import { DIMENSION, SIZE, VALUES } from "../lib/constants";
  import { sudoku } from "../lib/sudoku";

  export let rowIndex: number;
  export let colIndex: number;

  $: cell = $sudoku.board[rowIndex][colIndex];

  const updateContent = (key: string) => {
    if (key === "Backspace" || key === "Delete") {
      sudoku.update((sudoku) => sudoku.unsetCell(rowIndex, colIndex));
      return;
    }
    const value = Number(key);
    if (isNaN(value) || value === 0) return;
    sudoku.update((sudoku) =>
      sudoku.unsetCell(rowIndex, colIndex).setCell(rowIndex, colIndex, value)
    );
  };

  const hasValue = (state: number, value: number) => {
    return (state & (1 << (value - 1))) !== 0;
  };
</script>

<div
  class="container w-12 h-12"
  tabindex="-1"
  on:keydown={(e) => updateContent(e.key)}
  class:top={rowIndex % SIZE === 0}
  class:left={colIndex % SIZE === 0}
  class:bottom={rowIndex === DIMENSION - 1}
  class:right={colIndex === DIMENSION - 1}
>
  {#if cell.value > 0}
    <div class="number">{cell.value}</div>
  {:else}
    <div
      class="states opacity-25"
      style={`grid-template-columns: repeat(${SIZE}, minmax(0, 1fr))`}
    >
      {#each VALUES as pvalue}
        <div class="relative" class:not-show={!hasValue(cell.state, pvalue)}>
          <p>{pvalue}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    @apply border border-slate-500 bg-transparent table cursor-pointer;
  }

  .container:focus {
    @apply bg-primary/25 outline-none;
  }

  .number {
    @apply w-full h-full
    text-center table-cell align-middle 
    font-bold text-4xl;
  }

  .states {
    @apply w-full h-full grid;
  }

  .states > div > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 8px;
  }

  .not-show {
    @apply invisible;
  }

  .top {
    @apply border-t-4;
  }

  .left {
    @apply border-l-4;
  }

  .bottom {
    @apply border-b-4;
  }

  .right {
    @apply border-r-4;
  }
</style>
