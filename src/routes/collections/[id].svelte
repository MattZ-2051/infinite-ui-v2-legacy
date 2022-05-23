<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuCollectionFx, setSkuCollection, skuCollection } from '$lib/features/collections/collections.store';

  export const load: Load = async ({ params, fetch }) => {
    const { id } = params;

    return {
      props: { data: await loadSkuCollectionFx({ collectionId: id, fetch }) },
    };
  };
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import CollectionContainer from '$project/collections/CollectionContainer.svelte';

  export let data: Awaited<ReturnType<typeof loadSkuCollectionFx>>;

  $: setSkuCollection(data);
  $: seoTitle = $skuCollection?.seoMetadata?.title ? $skuCollection?.seoMetadata?.title : $skuCollection?.name;
  $: seoDescription = $skuCollection?.seoMetadata?.description
    ? $skuCollection?.seoMetadata?.description
    : $skuCollection?.descriptionShort;
</script>

<Seo
  title={seoTitle}
  ogDescription={seoDescription}
  description={seoDescription}
  useGivenTitle={Boolean($skuCollection?.seoMetadata?.title)}
/>

<CollectionContainer />
