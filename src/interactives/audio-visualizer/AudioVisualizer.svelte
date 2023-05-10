<script lang="ts">
  import Icon from "@iconify/svelte";
  import { loadAudioFile, currentTime, duration, play, pause } from "./audio";
  let playing = false;
  let fileName: string | null = null;

  const timestamp = (time: number) => {
    const round = Math.round(time)
    const minutes = Math.floor(round / 60)
    const seconds = round % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const toggle = () => {
    playing = !playing
    if (playing) play()
    else pause()
  }
</script>

<div class="min-w-[500px] bg-slate-800 rounded-xl">
  <canvas class="w-full" />
  <div class="pb-4">
    <input 
      type="range" 
      class="range range-primary range-xs"
      min={0}
      max={$duration}
      value={$currentTime} />
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
            icon={!playing ? "fa6-solid:play" : "fa6-solid:pause"}
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
    const file = files[0]
    fileName = file.name
    await loadAudioFile(files[0]);
  }}
/>

<style>
  .not-available {
    opacity: 50%;
  }
</style>
