<script lang="ts">
  import { onMount } from 'svelte';
  import IntersectionObserver from 'svelte-intersection-observer';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';
  import { loadAllSkuCollectionsFx, setAllSkuCollections } from '$lib/features/collections/collections.store';
  import { lazyLoadVideoSource } from '$util/lazyLoad';

  const collectionId = import.meta.env.VITE_DEFAULT_COLLECTION_ID;

  let skuId = undefined;
  let route = routes.skuCollections;

  let videoElement: HTMLVideoElement;

  onMount(async () => {
    const { collections } = await loadAllSkuCollectionsFx({ fetch });
    setAllSkuCollections({ collections });

    skuId = collections.find((collection) => collection.id === collectionId)?.featuredSkuId;
    route = routes.sku(skuId);
  });
</script>

<div class="bg-black">
  <div class="relative z-0 img-container">
    <div class="flex justify-center items-center h-full">
      <div
        class="text-white w-full z-10 flex flex-col max-w-6xl items-start xl:items-center justify-center container h-full"
      >
        <p class="text-base sm:text-lg font-normal pb-2 uppercase second-font" style="letter-spacing:0.2em;">
          featured drop
        </p>
        <p
          class="tracking-widest sm:text-5xl text-3xl font-light pb-5 sm:pb-3 second-font leading-10 sm:leading-normal"
        >
          MSO LAB GENESIS COLLECTION
        </p>
        <div class="text-lg text-left xl:text-center font-light max-w-8xl leading-9 pb-10">
          <p class="text-base">
            An exclusive, invitation-only NFT mint that marks McLaren Automotive’s move into the metaverse.
          </p>
          <p class="pt-6 md:pt-10 text-base">
            Unlock membership to MSO LAB through a pioneering collection of rare supercar NFTs centred around one of the
            most desirable, most storied cars McLaren has ever produced – the McLaren P1™.
          </p>
        </div>
        <Button
          variant="brand"
          class="h-12 sm:h-16 w-full sm:w-fit font-bold text-xs tracking-widest uppercase"
          on:click={() => goto(route)}
        >
          buy now
        </Button>
      </div>
    </div>
    <IntersectionObserver
      element={videoElement}
      once
      rootMargin={'150px'}
      on:intersect={() => lazyLoadVideoSource(videoElement)}
    >
      <video
        bind:this={videoElement}
        class="absolute top-0 -z-1 w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source data-src="/videos/mclarenTeaser_treatment01_v020.webm" type="video/webm" />
        <source data-src="/videos/mclarenTeaser_treatment01_v020.mp4" type="video/mp4" />
      </video>
    </IntersectionObserver>
  </div>
</div>

<style lang="postcss">
  .img-container {
    height: 70rem;
  }

  @media screen and (max-width: 768px) {
    .img-container {
      height: 50rem;
    }
  }
</style>
