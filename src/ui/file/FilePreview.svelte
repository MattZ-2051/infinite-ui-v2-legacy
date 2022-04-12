<script lang="ts">
  import type { FileAsset, FileType } from './types';
  import { mdiVolumeSource } from '@mdi/js';
  import IntersectionObserver from 'svelte-intersection-observer';
  import Icon from '$ui/icon/Icon.svelte';
  import Image from '$ui/image/Image.svelte';
  import videoDisableOptions from '$ui/video-ext';
  import { styles } from '$util/styles';
  import fallback from '$project/assets/fallback.png?w=700&format=avif;webp;png&metadata=src;format;width;height';
  import { getFileType, getAspectRatioStyle } from './file-utils';

  /**
   * The asset to display.
   */
  export let item: FileAsset;

  /**
   * Wheter it should use the preview url.
   */
  export let preview = false;

  /**
   * Amount of blur filter.
   */
  export let blur = 0;

  /**
   * File type.
   * If not provided it will be derived from file extension.
   */
  export let fileType: FileType = getFileType(item);

  let showFallbackImage = false;
  let videoElement: HTMLVideoElement;

  export let borderRadius = '';

  $: style = styles({
    ...(item ? getAspectRatioStyle(item, preview) : {}),
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
    'border-radius': borderRadius ? borderRadius : undefined,
    'box-shadow': borderRadius ? '0px 10px 30px rgb(0 0 0 / 15%)' : undefined,
  });
</script>

{#if !item || showFallbackImage}
  <Image src={fallback} alt="N/A" class="w-full h-full object-contain p-8" {style} />
{:else if fileType === 'video'}
  {#if preview}
    <IntersectionObserver
      element={videoElement}
      once
      rootMargin={'150px'}
      on:intersect={() => (videoElement.src = item.previewUrl || item.url)}
    >
      <video
        bind:this={videoElement}
        class="w-full h-full object-cover"
        data-testid="filepreview-video"
        playsinline
        autoplay
        controls={false}
        loop
        muted
        {style}
      />
    </IntersectionObserver>
  {:else}
    <div class="relative h-full w-full">
      <video
        use:videoDisableOptions
        class="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full object-contain"
        data-testid="filepreview-video"
        playsinline
        autoplay
        controls
        loop
        muted
        src={item.url}
        {style}
      />
    </div>
  {/if}
{:else if fileType === 'image'}
  <div class="relative h-full w-full">
    <img
      src={preview && item.previewUrl ? item.previewUrl : item.url}
      alt="preview"
      class={preview
        ? 'w-full h-full object-cover'
        : 'absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full object-contain'}
      on:error={() => (showFallbackImage = true)}
      loading="lazy"
      {style}
    />
  </div>
{:else if fileType === 'audio'}
  {#if preview}
    <Icon path={mdiVolumeSource} size="3" data-testid="filepreview-audio-withpreview" />
  {:else}
    <audio controls autoplay muted>
      <source src={item.url} type="audio/mpeg" data-testid="filepreview-audio-src" />
      Your browser does not support audio elements.
    </audio>
  {/if}
{:else if fileType === 'vector'}
  <iframe
    id={'3d-ar'}
    src={item.url}
    frameBorder="0"
    title="Product preview"
    class="w-full h-full"
    data-testid="filepreview-vector"
  />
{:else}
  Unrecognized type
{/if}
