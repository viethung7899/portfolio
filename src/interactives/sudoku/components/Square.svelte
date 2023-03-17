<script lang="ts">
  import type { Position } from "../lib/sudoku";

  export let value: number;
  export let position: Position;
  export let onChange: (value: number) => void;
  export let canModify = false;
</script>

<input
  class={`border border-slate-500 bg-transparent
  w-12 h-12 p-2 cursor-pointer text-xl 
  focus:outline-none text-center
  focus:bg-primary/30`}
  class:modify={canModify}
  class:top={position[0] % 3 === 0}
  class:left={position[1] % 3 === 0}
  class:right={position[1] === 8}
  class:bottom={position[0] === 8}
  type="number"
  value={value > 0 ? value : ""}
  min="0"
  max="9"
  on:input={(ev) => {
    value = ev.currentTarget.valueAsNumber;
    if (value > 9) {
      value = 9;
    };
    onChange(value);
  }}
/>

<style>
  input {
    @apply box-border;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .modify {
    @apply text-primary font-bold;
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
