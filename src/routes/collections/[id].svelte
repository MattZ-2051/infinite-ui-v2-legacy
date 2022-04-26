<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadSkuCollectionFx, setSkuCollection, skuCollection } from '$lib/features/collections/collections.store';
  import routes from '$project/routes';

  const COLLECTIONS_PHASE_ENABLED = import.meta.env?.VITE_CURRENT_PHASE;

  export const load: Load = async ({ params, fetch }) => {
    if (COLLECTIONS_PHASE_ENABLED && COLLECTIONS_PHASE_ENABLED === '1') {
      return {
        status: 302,
        redirect: routes.index,
      };
    }

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
</script>

<Seo title={$skuCollection.name} />

<CollectionContainer />
