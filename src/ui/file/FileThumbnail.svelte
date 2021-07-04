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
  <video autoplay={true} controls={false} loop={true} muted={true} src={item.url} />
{:else if fileType === 'image'}
  <img src={item.url} {alt} loading="lazy" />
{:else if fileType === 'audio'}
  <Icon path={mdiVolumeHigh} />
{:else if fileType === 'vector'}
  <img src={getVectorThumbImage()} {alt} loading="lazy" />
{/if}
