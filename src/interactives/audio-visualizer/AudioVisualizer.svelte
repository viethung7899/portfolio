<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import {
    currentTime,
    duration,
    frequencyData,
    isPlaying,
    loadAudioFile,
    pause,
    play,
    seek
  } from "./audio";
  let fileName: string | null = null;

  const timestamp = (time: number) => {
    const round = Math.round(time);
    const minutes = Math.floor(round / 60);
    const seconds = round % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggle = () => {
    $isPlaying = !$isPlaying;
    if ($isPlaying) play();
    else pause();
  };

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  onMount(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.width / 1.5;
    ctx = canvas.getContext("2d");
  });

  $: {
    if (!ctx) break $;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const length = $frequencyData.length;
    const w = canvas.width / length;
    for (let i = 0; i < length; i++) {
      const h = $frequencyData[i];
      ctx.fillStyle = "white";
      ctx.fillRect(i * w, height - h, w, h);
    }
  }
</script>

<div class="min-w-[500px] bg-slate-800 rounded-xl">
  <canvas class="w-full" bind:this={canvas} />
  <div class="pb-4">
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
    <div class="px-2">
      <div class="w-full flex justify-between font-mono">
        <span>{timestamp($currentTime)}</span>
        <span>{timestamp($duration)}</span>
      </div>
      <h3 class="text-2xl font-bold py-2" class:not-available={!fileName}>
        {fileName || "Upload audio file..."}
      </h3>
      <div class="w-full flex justify-center">
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

<label class="btn btn-primary gap-2" for="audio-file">
  <Icon class="w-4 h-4" icon="fa6-solid:upload" /> Upload file
</label>
<input
  type="file"
  accept="audio/*"
  id="audio-file"
  class="hidden"
  on:change={async (e) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    fileName = file.name;
    loadAudioFile(file);
  }}
/>

<style>
  .not-available {
    opacity: 50%;
  }
</style>
