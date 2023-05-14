<script lang="ts">
  import AudioUploadButton from "./AudioUploadButton.svelte";
  import { fileName } from "./audio";
</script>

<div
  class={`mb-4 w-full border border-secondary rounded-lg flex flex-col gap-2 p-4 items-center justify-center aspect-[3/2] ${
    !$fileName ? "" : "hidden"
  }`}
>
  <div>Upload any audio file to see visualization</div>
  <AudioUploadButton />
</div>
