<script lang="ts">
  import AudioUploadPrompt from "./AudioUploadPrompt.svelte";

  import { baseContentHSL, secondaryHSL } from "@layouts/themeStore";
  import { onMount } from "svelte";
  import { currentTime, duration, fileName, waveformData } from "./audio";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  onMount(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.width / 1.5;
    ctx = canvas.getContext("2d");
  });

  $: {
    if (!ctx) break $;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.width / 1.5;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    if ($waveformData.length <= 0) break $;
    const length = $waveformData.length;
    const w = canvas.width / length;
    const progress = $currentTime / $duration;
    for (let i = 0; i < length; i++) {
      const color = i / length >= progress ? $baseContentHSL : $secondaryHSL;
      ctx.fillStyle = `hsl(${color})`;
      const h = ($waveformData[i] * height) / 2;
      ctx.fillRect(i * w, height / 2 - h / 2, w, h);
    }
  }
</script>

<AudioUploadPrompt />
<canvas
  class={`w-full border border-secondary mb-4 rounded-lg ${
    $fileName ? "" : "hidden"
  }`}
  bind:this={canvas}
/>
