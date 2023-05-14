<script lang="ts">
  import { secondaryHSL } from "@layouts/themeStore";
  import { onMount } from "svelte";
  import AudioUploadPrompt from "./AudioUploadPrompt.svelte";
  import { fileName, frequencyData } from "./audio";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  onMount(() => {
    ctx = canvas.getContext("2d");
  });

  $: {
    if (!ctx) break $;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.width / 1.5;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const length = $frequencyData.length;
    const w = canvas.width / length;
    ctx.fillStyle = `hsl(${$secondaryHSL})`;
    for (let i = 0; i < length; i++) {
      const h = $frequencyData[i];
      ctx.fillRect(i * w, height - h, w, h);
    }
  }
</script>

<AudioUploadPrompt />
<canvas
  class={`w-full border border-secondary mb-4 rounded-lg aspect-[3/2] ${
    $fileName ? "" : "hidden"
  }`}
  bind:this={canvas}
/>
