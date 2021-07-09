<script lang="ts">
  import type { FileAsset } from './types';
  import { mdiVolumeHigh } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { getFileType } from './file-utils';

  export let item: FileAsset;
  export let alt = '';

  function getVectorThumbImage() {
    const id = item.url.match(/(?:\w+-){4}\w+/g);
    return `https://www.vectary.com/viewer/data/${id}/gltf/${id}.viewerthumb.png`;
  }

  $: fileType = getFileType(item);
</script>

{#if fileType === 'video'}
  <video autoplay controls={false} loop muted src={item.url} class="w-full h-full object-cover" />
{:else if fileType === 'image'}
  <img src={item.url} {alt} loading="lazy" class="w-full h-full object-cover" />
{:else if fileType === 'audio'}
  <div class="w-full h-full bg-black flex items-center justify-center"><Icon path={mdiVolumeHigh} /></div>
{:else if fileType === 'vector'}
  <img src={getVectorThumbImage()} {alt} loading="lazy" class="w-full h-full object-cover" />
{/if}
