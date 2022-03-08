<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadAllSkuCollectionsFx, setAllSkuCollections } from '$lib/features/collections/collections.store';

  export const load: Load = async ({ fetch }) => {
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
