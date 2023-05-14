<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onDestroy } from "svelte";
  import AudioUploadButton from "./AudioUploadButton.svelte";
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

<div
  class="fixed bg-secondary/50 backdrop-blur-lg w-full max-w-screen-lg bottom-0 py-2 px-4 mb-14 player text-secondary-content flex gap-4 items-center rounded-md"
>
  <button
    class="btn btn-circle btn-secondary"
    on:click={$toggle}
    disabled={!$fileName}
  >
    <Icon class="w-6 h-6" icon={"fa6-solid:play"} />
  </button>
  <div class="flex-grow flex gap-4 items-center">
    <span class="font-mono">{timestamp($currentTime)}</span>
    <input
      type="range"
      class="flex-grow range range-secondary range-xs"
      min={0}
      max={$duration}
      value={$currentTime}
      step={0.01}
      on:change={(e) => {
        seek(e.currentTarget.valueAsNumber);
      }}
    />
    <span class="font-mono">{timestamp($duration)}</span>
  </div>
  <AudioUploadButton />
</div>

<style>
  .player {
    left: 50%;
    transform: translateX(-50%);
  }
</style>
