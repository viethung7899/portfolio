<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    seek,
    timestamp,
    fileName
  } from "./audio";
  import Icon from "@iconify/svelte";

  const toggle = () => {
    $isPlaying = !$isPlaying;
    if ($isPlaying) play();
    else pause();
  };


  onDestroy(() => {
    if ($isPlaying) pause();
  });
</script>

<style>
  .not-available {
    opacity: 50%;
  }
</style>

<div class="w-full max-w-[500px] bg-primary/10 rounded-xl">
  <slot />
  <div class="pb-4">
    <div class="-translate-y-2">
      <input
        type="range"
        class="range range-primary range-xs"
        min={0}
        max={$duration}
        value={$currentTime}
        on:change={(e) => {
          seek(e.currentTarget.valueAsNumber);
        }}
      />
      <div class="w-full flex justify-between font-mono px-4">
        <span>{timestamp($currentTime)}</span>
        <span>{timestamp($duration)}</span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-2xl font-bold" class:not-available={$fileName.length <= 0}>
        {$fileName.length > 0 ? $fileName : "Upload audio file..."}
      </h3>
      <div class="w-full flex justify-center pt-4">
        <button
          class="btn btn-primary rounded-full aspect-square"
          on:click={toggle}
          disabled={!fileName}
        >
          <Icon
            class="w-6 h-6"
            icon={!$isPlaying ? "fa6-solid:play" : "fa6-solid:pause"}
          />
        </button>
      </div>
    </div>
  </div>
</div>
