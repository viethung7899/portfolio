<script lang="ts">
  export let value: number;
  export let onChange: (value: number) => void;
</script>

<input
  class={`border border-slate-500 bg-transparent
  w-12 h-12 p-2 cursor-pointer text-xl 
  focus:outline text-center
  focus:bg-primary/30`}
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
</style>
