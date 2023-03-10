<script lang="ts">
  export let value: number;
  export let highlight: boolean;
  export let onClick: () => void;
</script>

<div
  class={`border border-slate-500 ${highlight ? "bg-secondary/50" : ""}
  w-12 h-12 p-2 
  flex items-center justify-center
  cursor-pointer text-xl`}
  on:click={onClick}
  on:keydown={undefined}
>
  {value > 0 && value < 10 ? value : ""}
</div>
