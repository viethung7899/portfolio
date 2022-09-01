<script lang="ts">
  import Icon from '@iconify/svelte';

  export let title: string;
  export let description: string;
  export let image: string = '';
  export let repo: string = '';
  export let link: string = '';

  const hover =
    'hover:text-orange-500 hover:dark:text-teal-500 transition-colors hover:scale-[1.1]';
</script>

<div class="flex flex-col">
  {#if image}
    <img
      src={image}
      alt={title}
      class="border-[1px] border-black/30 dark:border-white/30 w-full aspect-[16/9] rounded-lg shadow-md shadow-orange-500 dark:shadow-teal-500 hover:scale-[1.05] transition-all"
    />
  {:else}
    <div
      class="border-[1px] border-black/30 dark:border-white/30 w-full aspect-[16/9] rounded-lg hover:scale-[1.03] transition-all"
    />
  {/if}
  <div class="flex items-center justify-between pt-6 pb-2">
    <a href={link} class={`text-xl font-bold ${hover}`}>{title}</a>
    <div class="gap-4 flex text-xl">
      {#if repo}<a href={repo} class={hover}>
          <Icon icon="fa6-solid:code" />
        </a>
      {/if}
      {#if link}<a href={link} class={hover}>
          <Icon icon="fa6-solid:window-maximize" />
        </a>
      {/if}
    </div>
  </div>
  <p class="font-sm text-black/50 dark:text-white/50">{description}</p>
</div>
