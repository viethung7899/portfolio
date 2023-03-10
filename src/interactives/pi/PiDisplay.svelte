<script lang="ts">
  import { onDestroy } from "svelte";

  type Response = {
    index: number;
    before: string;
    between: string;
    after: string;
  };

  export let query = "";
  export let index: number | undefined;
  let timer: NodeJS.Timeout;

  const fetchNumber = async (query: string) => {
    const response = await fetch(`/api/pi-peek/${query}`);
    const data = (await response.json()) as Response;
    index = data.index;
    return data;
  };

  let promise: Promise<Response> | undefined;

  $: {
    clearTimeout(timer);
    if (query.length <= 0) {
      promise = undefined;
    } else {
      timer = setTimeout(async () => {
        promise = fetchNumber(query);
      }, 500);
    }
  }

  onDestroy(() => {
    clearTimeout(timer);
  });
</script>

<span class="text-[48px] md:text-[72px] overflow-scroll">
  {#await promise}
    <span>Peeking π...</span>
  {:then data}
    {#if !data}
      <span>Peeking π...</span>
    {:else}
      <span>{data.before}</span>
      <span class="highlight">{data.between}</span>
      <span>{data.after}</span>
    {/if}
  {/await}
</span>

<style lang="scss">
  span > span {
    @apply text-neutral m-0 p-0;

    &.highlight {
      @apply text-secondary;
    }
  }
</style>
