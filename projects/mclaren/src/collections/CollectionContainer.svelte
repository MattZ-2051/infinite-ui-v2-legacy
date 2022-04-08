<script lang="ts">
  import { page } from '$app/stores';
  import { skuCollection } from '$lib/features/collections/collections.store';
  import Community from '../common/Community/Community.svelte';
  import CollectionBanner from './CollectionBanner.svelte';
  import CollectionAbout from './CollectionAbout.svelte';
  import CollectionFeatured from './CollectionFeatured.svelte';

  $: phase = $page.url.searchParams.get('phase') ?? '1';
</script>

<div class="space-y-40 md:space-y-60 lg:space-y-80 xl:space-y-96 bg-none">
  <CollectionBanner name={$skuCollection.name} mainFileAsset={$skuCollection.mainFileAsset} />
  <CollectionAbout
    name={$skuCollection.name}
    description={$skuCollection.description}
    fileAssets={$skuCollection.fileAssets}
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
