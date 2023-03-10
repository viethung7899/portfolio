<script lang="ts">
  import PiDisplay from "./PiDisplay.svelte";

  let number = "";
  let index: number;

  $: empty = number.length <= 0;
  $: isValid = /^\d+$/.test(number);

  $: message = empty
    ? "Type a sequence of digits"
    : !isValid
    ? "Only digits allowed"
    : undefined;

  $: result = !index
    ? undefined
    : index >= 0
    ? `Found at index ${index}`
    : "Not found in the first million digits";
</script>

<div class="form-control mb-6" class:invalid={!empty && !isValid}>
  <div class="input-group input-group-vertical">
    <PiDisplay bind:index={index} query={isValid ? number : ""} />
    <input
      class="input input-bordered input-lg"
      placeholder="Type here"
      id="number"
      bind:value={number}
    />
  </div>
  <div class="message label">
    <span class="label-text">{message || result || ""}</span>
  </div>
</div>

<style lang="scss">
  .invalid .message {
    @apply text-error;
  }

  input:focus {
    @apply input-primary;
  }

  .invalid {
    input {
      @apply input-error;
    }

    .message span {
      @apply text-error;
    }
  }
</style>
