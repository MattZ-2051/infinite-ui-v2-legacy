<script lang="ts">
  import type { FileAsset } from '$ui/file';
  import { FileThumbnail, FilePreview } from '$ui/file';

  export let items: FileAsset[] = [];

  let selectedItem: FileAsset;

  $: activeItem = selectedItem || items?.[0];
</script>

<div class="flex relative justify-center items-center h-full text-white">
  <FilePreview item={activeItem} />
  {#if items?.length > 0}
    <div class="absolute gap-2 bottom-3 left-5 flex">
      {#each items as item}
        <div class="border border-black cursor-pointer w-16 h-16" on:click={() => (selectedItem = item)}>
          <FileThumbnail {item} />
        </div>
      {/each}
    </div>
  {/if}
</div>
