<script lang="ts">
  import { Application, Container, Filter } from "pixi.js";
  import { onMount } from "svelte";
  import base from "../lib/base.vert?raw";
  import mandelbrot from "../lib/mandelbrot.frag?raw";

  const ASPECT_RATIO = 4 / 3;
  const DISPLAY_MODES = ["Binary", "Grayscale", "Hallow", "Beautiful"]

  let width: number;

  let view: HTMLCanvasElement;
  let app: Application;
  let container = new Container();

  // Parametres
  let iterations = 64;
  let displayMode = 3;

  $: uniforms = {
    translate: new Float32Array([0, 0]),
    zoom: 1,
    iterations,
    displayMode: new Int32Array([displayMode])
  };

  onMount(() => {
    app = new Application({
      view,
      width,
      height: width / ASPECT_RATIO
    });
    app.stage.addChild(container);
    container.filterArea = app.renderer.screen;
  });

  $: {
    app?.renderer?.resize(width, width / ASPECT_RATIO);
  }

  $: {
    const filter = new Filter(base, mandelbrot, { ...uniforms });
    container.filters = [filter];
  }
</script>

<div class="w-full mb-6" bind:clientWidth={width}>
  <canvas bind:this={view} class="rounded-md border border-primary" />
</div>
<div class="mb-4 grid sm:grid-cols-2 gap-4 items-center">
  <label for="iterations">
    Iterations: <strong class="text-primary">{iterations}</strong>
  </label>
  <input
    id="iterations"
    type="range"
    min="1"
    max="128"
    step="1"
    bind:value={iterations}
    class="range range-sm range-primary"
  />
  <label for="display">
    Display mode
  </label>
  <select
    class="select select-bordered" 
    bind:value={displayMode}
    >
    {#each DISPLAY_MODES as mode, i}
      <option value={i}>{mode}</option>
    {/each}
  </select>
</div>
