<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import AudioController from "./AudioPlayer.svelte";
  import { frequencyData, loadAudioFile } from "./audio";
  import { secondaryHSL } from "@layouts/themeStore";

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
    ctx.fillStyle = `hsl(${$secondaryHSL})`;
    for (let i = 0; i < length; i++) {
      const h = $frequencyData[i];
      ctx.fillRect(i * w, height - h, w, h);
    }
  }
</script>

<canvas class="w-full" bind:this={canvas} />
