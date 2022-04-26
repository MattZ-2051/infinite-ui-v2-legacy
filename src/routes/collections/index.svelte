<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadAllSkuCollectionsFx, setAllSkuCollections } from '$lib/features/collections/collections.store';
  import routes from '$project/routes';

  const COLLECTIONS_PHASE_ENABLED = import.meta.env?.VITE_CURRENT_PHASE;

  export const load: Load = async ({ fetch }) => {
    if (COLLECTIONS_PHASE_ENABLED && COLLECTIONS_PHASE_ENABLED !== '2') {
      return {
        status: 302,
        redirect: routes.index,
      };
    }

    return {
      props: { data: await loadAllSkuCollectionsFx({ fetch }) },
    };
  };
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Collections from '$project/collections/Collections.svelte';

  export let data: Awaited<ReturnType<typeof loadAllSkuCollectionsFx>>;

  $: setAllSkuCollections(data);
</script>

<Seo title="Collections" />

<Collections />
