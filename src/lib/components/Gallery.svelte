<script lang="ts">
  import type { FileAsset } from '$ui/file';
  import { FileThumbnail, FilePreview } from '$ui/file';

  export let items: FileAsset[] = [];

  let selectedItem: FileAsset;

  $: activeItem = selectedItem || items?.[0];
</script>

<div class="flex flex-col gap-2 justify-between items-center h-full p-6 text-white relative z-0">
  <div><!-- empty --></div>
  <div class="p-8 max-w-2xl">
    <FilePreview item={activeItem} />
  </div>
  {#if items?.length > 1}
    <div class="flex flex-wrap w-full justify-left">
      {#each items as item}
        <div
          class="cursor-pointer hover:opacity-100 {activeItem === item ? '' : 'opacity-50'}"
          on:click={() => (selectedItem = item)}
        >
          <FileThumbnail {item} />
        </div>
      {/each}
    </div>
  {/if}
  <div class="absolute top-0 left-0 right-0 bottom-0 -z-1 overflow-hidden">
    <FilePreview item={activeItem} preview blur={20} />
  </div>
</div>
