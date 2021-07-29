<script lang="ts">
  import type { FileAsset } from './types';
  import { mdiVolumeSource } from '@mdi/js';
  import IntersectionObserver from 'svelte-intersection-observer';

  import Icon from '$ui/icon/Icon.svelte';
  import Image from '$ui/image/Image.svelte';
  import { styles } from '$util/styles';
  import fallbackImage from '$static/logo_purpleglow.png?w=700&format=avif;webp;png&metadata';
  import { getFileType, getAspectRatioStyle } from './file-utils';

  export let item: FileAsset;
  export let preview = false;

  let showFallbackImage = false;
  let videoElement: HTMLVideoElement;

  $: fileType = getFileType(item);
  $: style = item ? styles({ ...getAspectRatioStyle(item), ...{ 'max-height': '60vh' } }) : '';
</script>

{#if !item || showFallbackImage}
  <Image src={fallbackImage} alt="N/A" class="w-full h-full object-contain p-8" />
{:else if fileType === 'video'}
  {#if preview}
    <IntersectionObserver
      element={videoElement}
      once
      rootMargin={'150px'}
      on:intersect={() => (videoElement.src = item.url)}
    >
      <video
        bind:this={videoElement}
        class="w-full h-full object-cover"
        playsinline
        autoplay
        controls={false}
        loop
        muted
        {style}
      />
    </IntersectionObserver>
  {:else}
    <video class="w-full" playsinline autoplay controls={false} loop muted src={item.url} {style} />
  {/if}
{:else if fileType === 'image'}
  <img
    src={preview && item.previewUrl ? item.previewUrl : item.url}
    alt="preview"
    class="w-full {preview ? 'h-full object-cover' : 'object-contain'}"
    on:error={() => (showFallbackImage = true)}
    loading="lazy"
    {style}
  />
{:else if fileType === 'audio'}
  {#if preview}
    <Icon path={mdiVolumeSource} size="3" />
  {:else}
    <audio controls autoplay muted>
      <source src={item.url} type="audio/mpeg" />
      Your browser does not support audio elements.
    </audio>
  {/if}
{:else if fileType === 'vector'}
  <iframe id={'3d-ar'} src={item.url} frameBorder="0" title="Product preview" class="w-full h-full" />
{:else}
  Unrecognized type
{/if}
