<script lang="ts">
  import Icon from "@iconify/svelte";
  import { loadAudioFile } from "./audio";
</script>

<div class="my-4">
  <label class="btn btn-secondary gap-2" for="audio-file">
    <Icon class="w-4 h-4" icon="fa6-solid:upload" /><span class="xs:hidden sm:show">Upload audio</span>
  </label>
  <input
    type="file"
    accept="audio/*"
    id="audio-file"
    class="hidden"
    on:change={async (e) => {
      const files = e.currentTarget.files;
      if (!files || files.length === 0) return;
      await loadAudioFile(files[0]);
    }}
  />
</div>
