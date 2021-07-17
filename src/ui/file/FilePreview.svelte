<script lang="ts">
  import type { FileAsset } from './types';
  import { mdiVolumeSource } from '@mdi/js';
  import IntersectionObserver from 'svelte-intersection-observer';

  import Icon from '$ui/icon/Icon.svelte';
  import Image from '$ui/image/Image.svelte';
  import ariaLogo from '$static/aria-logo-comp.png?w=700&format=avif;webp;png&metadata';
  import { getFileType } from './file-utils';

  export let item: FileAsset;
  export let preview = false;

  let showFallbackImage = false;
  let videoElement: HTMLVideoElement;

  $: fileType = getFileType(item);
</script>

{#if !item || showFallbackImage}
  <Image src={ariaLogo} alt="N/A" class="w-full h-full object-contain p-8" />
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
      />
    </IntersectionObserver>
  {:else}
    <video class="h-full" playsinline autoplay controls={true} loop muted src={item.url} />
  {/if}
{:else if fileType === 'image'}
  <img
    src={item.url}
    alt="preview"
    class="h-full {preview ? 'w-full object-cover' : 'object-contain'}"
    on:error={() => (showFallbackImage = true)}
    loading="lazy"
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
