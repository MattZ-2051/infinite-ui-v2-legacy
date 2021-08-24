<script lang="ts">
  import type { FileAsset } from './types';
  import { mdiVolumeHigh } from '@mdi/js';
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
  <video autoplay controls={false} loop muted src={item.url} class="object-cover" {style} />
{:else if fileType === 'image'}
  <img src={item.previewUrl || item.url} {alt} loading="lazy" class="object-cover" {style} />
{:else if fileType === 'audio'}
  <div class="bg-black flex items-center justify-center" {style}><Icon path={mdiVolumeHigh} /></div>
{:else if fileType === 'vector'}
  <img src={getVectorThumbImage()} {alt} loading="lazy" class="object-cover" {style} />
{/if}
