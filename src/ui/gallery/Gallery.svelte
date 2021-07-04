<script lang="ts">
  import type { Media, NftAsset } from '$lib/sku-item/types';
  import { mdiVolumeHigh } from '@mdi/js';

  export let items: NftAsset[] = [];
  export let featuredItem = items.length > 0 && items[0];

  const mediaMapper = {
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    mov: 'video',
    mp4: 'video',
    mp3: 'audio',
    vectary: 'vector',
  };

  const checkType = (source: string): Media => {
    const extensions = source.split('.');
    if (mediaMapper[extensions[extensions.length - 1]]) {
      return mediaMapper[extensions[extensions.length - 1]];
    }
    return source.includes('vectary') ? 'vector' : undefined;
  };

  const setFeaturedItem = (image: NftAsset) => {
    featuredItem = image;
  };

  const getSource = (source: string, type: Media) => {
    if (type === 'image') {
      return source;
    }
    if (type === 'audio') {
      return mdiVolumeHigh;
    }
    if (type === 'vector') {
      const id = source.match(/(?:\w+-){4}\w+/g);
      return `https://www.vectary.com/viewer/data/${id}/gltf/${id}.viewerthumb.png`;
    }
    return '';
  };

  $: featuredUrl = featuredItem && featuredItem.url;
  $: featuredType = featuredItem && checkType(featuredUrl);
</script>

{#if featuredItem || items.length > 0}
  <div class="relative justify-center h-full">
    {#if featuredType === 'image'}
      <img src={featuredUrl} alt="preview" class="h-full" />
    {:else if featuredType === 'video'}
      <video class="w-full h-full" autoPlay={true} controls={true} loop={true} muted={true} src={featuredUrl} />
    {:else if featuredType === 'audio'}
      <audio controls autoPlay muted>
        <source src={featuredUrl} type="audio/mpeg" />
        Your browser does not support audio elements.
      </audio>
    {:else if featuredType === 'vector'}
      <iframe id={'3d-ar'} src={featuredUrl} frameBorder="0" title="Product preview" class="w-full h-full" />
    {:else}
      Unrecognized type
    {/if}
    {#if items.length}
      <div class="absolute gap-2 bottom-3 left-5 hidden lg:flex">
        {#each items as item}
          <div class="border border-black cursor-pointer w-16 h-16" on:click={() => setFeaturedItem(item)}>
            {#if checkType(item.url) === 'video'}
              <video class="w-full" autoPlay={true} controls={false} loop={true} muted={true} src={item.url} />
            {:else}
              <img src={getSource(item.url, checkType(item.url))} alt="thumbnail" />
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
