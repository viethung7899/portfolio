<script lang="ts">
  import Square from "./components/Square.svelte";
  import Sodoku, { equal, type CellPosition } from "./lib/sodoku";
  const INVALID_POSITION = [-1, -1, -1] as CellPosition;

  let sodoku = new Sodoku();
  $: board = sodoku.board;
  let selected: CellPosition = INVALID_POSITION;

  $: isSelected = !equal(selected, INVALID_POSITION);
  $: isValidSodoku = sodoku.isValid();

  const onKeyPress = (ev: KeyboardEvent) => {
    if (!isSelected) return;
    const number = +ev.key;
    if (Number.isNaN(number)) return;
    sodoku = sodoku.setValue(selected, number);
  }
</script>

<svelte:window on:keypress={onKeyPress} />
<div class="w-full flex">
  <div class="inline-grid grid-cols-3 border-2 border-slate-500 m-auto">
    {#each board as region, regionIndex}
      <div class="inline-grid grid-cols-3 border-2 border-slate-500">
        {#each region as row, rowIndex}
          {#each row as square, colIndex}
            <Square
              value={square}
              highlight={equal(selected, [regionIndex, rowIndex, colIndex])}
              onClick={() => (selected = [regionIndex, rowIndex, colIndex])}
            />
          {/each}
        {/each}
      </div>
    {/each}
  </div>
</div>
<div class="flex my-6 items-center justify-center gap-3">
  <button 
    class="btn" 
    disabled={equal(selected, INVALID_POSITION)}
    on:click={() => selected = INVALID_POSITION}>
    Deselect
  </button>
  <button class="btn btn-primary btn-outline" on:click={() => sodoku = sodoku.randomize()}>
    Randomize
  </button>
  <button class="btn btn-primary" >
    Solve
  </button>
</div>
