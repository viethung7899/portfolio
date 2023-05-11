<script lang="ts">
  import { onMount } from "svelte";
  import AudioController from "./AudioController.svelte";
  import {waveformData} from "./audio"

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
    if ($waveformData.length <= 0) break $;
    const length = $waveformData.length;
    const w = canvas.width / length;
    const hsl = getComputedStyle(canvas).getPropertyValue("--s");
    ctx.fillStyle = `hsl(${hsl})`;
    for (let i = 0; i < length; i++) {
      const h = $waveformData[i] * height / 2;
      ctx.fillRect(i * w, height / 2 - h / 2, w, h);
    }
  }


</script>

<AudioController>
  <canvas class="w-full" bind:this={canvas}>
</AudioController>

<div>{JSON.stringify($waveformData)}</div>