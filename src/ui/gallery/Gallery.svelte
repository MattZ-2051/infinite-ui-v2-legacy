<script lang="ts">
  import type { Media } from '$lib/sku-item/types';
  import { mdiVolumeHigh } from '@mdi/js';

  export let items: string[] = [];
  export let featuredItem: string;

  const mediaMapper = {
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    mov: 'video',
    mp4: 'video',
    mp3: 'audio',
    vectary: 'vector',
  };

  const checkType = (source): Media => {
    const extensions = source.split('.');
    if (mediaMapper[extensions[extensions.length - 1]]) {
      return mediaMapper[extensions[extensions.length - 1]];
    }
    return source.includes('vectary') ? 'vector' : undefined;
  };

  const setFeaturedItem = (image: string) => {
    featuredItem = image;
  };

  const getSource = (source, type: Media) => {
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

  $: featuredType = featuredItem && checkType(featuredItem);
</script>

<div class="relative justify-center h-full">
  {#if featuredType === 'image'}
    <img src={featuredItem} alt="preview" />
  {:else if featuredType === 'video'}
    <video class="w-full h-full" autoPlay={true} controls={true} loop={true} muted={true} src={featuredItem} />
  {:else if featuredType === 'audio'}
    <audio controls autoPlay muted>
      <source src={featuredItem} type="audio/mpeg" />
      Your browser does not support audio elements.
    </audio>
  {:else if featuredType === 'vector'}
    <iframe id={'3d-ar'} src={featuredItem} frameBorder="0" title="Product preview" class="w-full h-full" />
  {:else}
    Unrecognized type
  {/if}
  {#if items.length}
    <div class="absolute gap-2 bottom-3 left-5 hidden lg:flex">
      {#each items as item}
        <div class="border border-black cursor-pointer w-16 h-16" on:click={() => setFeaturedItem(item)}>
          {#if checkType(item) === 'video'}
            <video class="w-full" autoPlay={true} controls={false} loop={true} muted={true} src={item} />
          {:else}
            <img src={getSource(item, checkType(item))} alt="thumbnail" />
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
