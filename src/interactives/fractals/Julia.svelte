<script lang="ts">
  import katex from "katex";
  import { Application, Container, Filter } from "pixi.js";
  import { onMount } from "svelte";
  import base from "./lib/base.vert?raw";
  import julia from "./lib/julia.frag?raw";

  const ASPECT_RATIO = 4 / 3;
  const DISPLAY_MODES = ["Binary", "Grayscale", "Hallow", "Beautiful"];

  let width: number;

  let view: HTMLCanvasElement;
  let app: Application;
  let container = new Container();

  // Parametres
  let iterations = 64;
  let displayMode = 3;

  // Pointer
  let pointerX = 0;
  let pointerY = 0;

  $: constant = {
    x: (pointerX / (width / ASPECT_RATIO) - 0.5 * ASPECT_RATIO) * 3,
    y: -(pointerY / (width / ASPECT_RATIO) - 0.5) * 3
  };

  const displayComplex = (x: number, y: number) => {
    const rx = +x.toFixed(3);
    const ry = +y.toFixed(3);
    if (rx == 0 && ry == 0) return "0";
    const real = rx != 0 ? rx : "";
    const img = ry == 0 ? "" : ry > 0 ? `+${ry}` : ry;
    return `c = ${real}${img}i`;
  };

  $: uniforms = {
    translate: new Float32Array([0, 0]),
    zoom: 1,
    iterations,
    displayMode: new Int32Array([displayMode]),
    constant: new Float32Array([constant.x, constant.y])
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
    const filter = new Filter(base, julia, { ...uniforms });
    container.filters = [filter];
  }
</script>

<div class="w-full mb-6" bind:clientWidth={width}>
  <span class="mb-4"
    >Plotting {@html katex.renderToString(
      displayComplex(constant.x, constant.y),
      { displayMode: false }
    )}</span
  >
  <canvas
    bind:this={view}
    class="rounded-md border border-primary"
    on:mousemove={(event) => {
      pointerX = event.offsetX;
      pointerY = event.offsetY;
    }}
  />
</div>
<div class="w-full mb-6 grid grid-cols-2 gap-4 items-center">
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
    Display mode: {displayMode}
  </label>
  <select class="select select-bordered" bind:value={displayMode}>
    {#each DISPLAY_MODES as mode, i}
      <option value={i}>{mode}</option>
    {/each}
  </select>
</div>
