<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuCollectionFx, setSkuCollection, skuCollection } from '$lib/features/collections/collections.store';

  export async function load({ params, fetch }: LoadInput) {
    const { id } = params;

    return {
      props: { data: await loadSkuCollectionFx({ collectionId: id, fetch }) },
    };
  }
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import CollectionContainer from '$project/collections/CollectionContainer.svelte';

  export let data: Awaited<ReturnType<typeof loadSkuCollectionFx>>;

  $: setSkuCollection(data);
</script>

<Seo title={$skuCollection.name} />

<CollectionContainer />
