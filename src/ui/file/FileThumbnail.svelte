<script lang="ts">
  import type { FileAsset } from './types';
  import { mdiVolumeHigh } from '@mdi/js';
  import mdiArrowRight from '$ui/file/assets/arrow-right';
  import { styles } from '$util/styles';
  import Icon from '$ui/icon/Icon.svelte';
  import { getFileType } from './file-utils';

  export let item: FileAsset;
  export let alt = '';
  export let size = 72;

  function getVectorThumbImage() {
    const id = item.url.match(/(?:\w+-){4}\w+/g);
    return `https://www.vectary.com/viewer/data/${id}/gltf/${id}.viewerthumb.png`;
  }

  $: fileType = getFileType(item);
  $: style = styles({ 'width.px': size, 'height.px': size });
</script>

{#if fileType === 'video'}
  <video
    autoplay
    controls={false}
    loop
    muted
    src={item.previewUrl || item.url}
    class="object-cover custom-border-element"
    {style}
  />
{:else if fileType === 'image'}
  <img src={item.previewUrl || item.url} {alt} loading="lazy" class="object-cover custom-border-element" {style} />
{:else if fileType === 'audio'}
  <div class="bg-black flex items-center justify-center custom-border-element" {style}>
    <Icon path={mdiVolumeHigh} />
  </div>
{:else if fileType === 'vector'}
  <div class="relative flex items-center gap-4 text-lg md:px-2 custom-vector-element min-w-max">
    <img src={getVectorThumbImage()} {alt} loading="lazy" class="object-cover md:object-contain" {style} />
    <div class="hidden md:flex items-center gap-2">
      Experience AR
      <Icon path={mdiArrowRight} size="1.2" />
    </div>
    <div class="md:hidden absolute top-0.5 right-0.5 text-sm font-medium text-gray-500">AR</div>
  </div>
{/if}

<style lang="postcss">
  .custom-border-element {
    border-radius: var(--file-thumbnail-border-radius, 0px);
  }
  .custom-vector-element {
    border-radius: var(--file-thumbnail-border-radius, 0px);
    border: var(--file-thumbnail-border, 0px);
    border-color: var(--file-thumbnail-border-color, transparent);
    color: var(--file-thumbnail-color, #ffffff);
    background-color: var(--file-thumbnail-bg-color, rgba(255, 255, 255, 0.5));
  }
</style>
