<script lang="ts">
  import type { FileAsset } from '$ui/file/types';
  import { skuCollection } from '$lib/features/collections/collections.store';
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import Community from '../common/Community/Community.svelte';
  import CollectionBanner from './CollectionBanner.svelte';
  import CollectionAbout from './CollectionAbout.svelte';
  import CollectionFeatured from './CollectionFeatured.svelte';

  const CURRENT_PHASE = import.meta.env.VITE_CURRENT_PHASE;

  $: phase = CURRENT_PHASE ?? '1';

  const skuCollectionAboutFileAsset = { url: bucketAssets.collection.aboutSection } as FileAsset;
</script>

<div class="space-y-40 md:space-y-60 lg:space-y-80 bg-none">
  <CollectionBanner name={$skuCollection.name} mainFileAsset={$skuCollection.mainFileAsset} />
  <CollectionAbout
    name={$skuCollection.name}
    description={$skuCollection.description}
    fileAssets={[skuCollectionAboutFileAsset]}
  />
  {#if $skuCollection?.featuredSkuId}
    <CollectionFeatured
      featuredSkuId={$skuCollection.featuredSkuId}
      collectionName={$skuCollection.name}
      isPhase3={phase === '3'}
    />
  {/if}
  <Community />
</div>
