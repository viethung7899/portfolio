<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onDestroy } from "svelte";
  import {
    currentTime,
    duration,
    fileName,
    isPlaying,
    pause,
    seek,
    toggle
  } from "./audio";

  export const timestamp = (time: number) => {
    const round = Math.round(time);
    const minutes = Math.floor(round / 60);
    const seconds = round % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  onDestroy(() => {
    if ($isPlaying) pause();
  });
</script>

<!-- <div class="pb-4">
  <div class="-translate-y-2">
    <input
      type="range"
      class="range range-primary range-xs"
      min={0}
      max={$duration}
      value={$currentTime}
      step={0.01}
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
        on:click={$toggle}
        disabled={!fileName}
      >
        <Icon
          class="w-6 h-6"
          icon={!$isPlaying ? "fa6-solid:play" : "fa6-solid:pause"}
        />
      </button>
    </div>
  </div>
</div> -->

<div
  class="fixed bg-secondary w-full max-w-screen-lg bottom-0 mb-14 player text-primary-content"
>
  <div class="-translate-y-2">
    <input
      type="range"
      class="range range-primary range-xs"
      min={0}
      max={$duration}
      value={$currentTime}
      step={0.01}
      on:change={(e) => {
        seek(e.currentTarget.valueAsNumber);
      }}
    />
    <div class="w-full flex justify-between font-mono px-4">
      <span>{timestamp($currentTime)}</span>
      <span>{timestamp($duration)}</span>
    </div>
  </div>
  <div class="flex justify-between">
    <button
      class="btn btn-primary rounded-full aspect-square"
      on:click={$toggle}
      disabled={!fileName}
    >
      <Icon
        class="w-6 h-6"
        icon={!$isPlaying ? "fa6-solid:play" : "fa6-solid:pause"}
      />
    </button>
  </div>
</div>

<style>
  .player {
    left: 50%;
    transform: translateX(-50%);
  }
</style>
