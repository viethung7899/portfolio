<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import AudioController from "./AudioController.svelte";
  import { frequencyData, loadAudioFile } from "./audio";

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
    const hsl = getComputedStyle(canvas).getPropertyValue("--s");
    ctx.fillStyle = `hsl(${hsl})`;
    for (let i = 0; i < length; i++) {
      const h = $frequencyData[i];
      ctx.fillRect(i * w, height - h, w, h);
    }
  }
</script>

<AudioController>
  <canvas class="w-full" bind:this={canvas} />
</AudioController>

<div class="my-4">
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
      loadAudioFile(files[0]);
    }}
  />
</div>
