<script lang="ts">
  import type { FileAsset, FileType } from '$ui/file';
  import { FileThumbnail, FilePreview, getFileType } from '$ui/file';

  export let items: FileAsset[] = [];
  let _class = '';
  export { _class as class };

  let selectedItem: FileAsset;
  let fileType: FileType;

  $: activeItem = selectedItem || items?.[0];
  $: fileType = getFileType(activeItem);
  $: useBlurBackground = fileType === 'image' || fileType === 'video';
</script>

<div
  class="flex flex-col gap-4 justify-between items-center h-full p-6 text-white relative z-0 {_class}"
  {...$$restProps}
>
  <div><!-- empty --></div>
  <div class="relative flex-1 w-full max-w-2xl">
    <FilePreview item={activeItem} {fileType} />
  </div>
  <div class="flex flex-wrap w-full justify-left">
    {#if items && items?.length > 1}
      {#each items as item}
        <div
          class="cursor-pointer hover:opacity-100 {activeItem === item ? '' : 'opacity-50'}"
          on:click={() => (selectedItem = item)}
        >
          <FileThumbnail {item} />
        </div>
      {/each}
    {/if}
  </div>
  <div class="absolute top-0 left-0 right-0 bottom-0 -z-1 overflow-hidden" class:bg-gray-100={!useBlurBackground}>
    {#if useBlurBackground}
      <FilePreview item={activeItem} {fileType} preview blur={20} />
    {/if}
  </div>
</div>
