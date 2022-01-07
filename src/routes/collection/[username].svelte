<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { onDestroy } from 'svelte';
  import { clearCollection, loadCollectionFx, setCollection } from '$lib/features/collection/collection.store';

  export async function load({ url, params, fetch }: LoadInput) {
    const { username } = params;
    const _page = +url.searchParams.get(`page`) || 1;
    const sortBy: string = url.searchParams.get('sortBy');

    const data = await loadCollectionFx({
      username,
      tab: url.searchParams.get(`tab`) as 'Releases' | 'NFTs',
      page: _page,
      sortBy,
      fetch,
    });

    return {
      props: { data },
    };
  }
</script>

<script lang="ts">
  import { Seo, chooseProfileSocialImage } from '$lib/seo';
  import Collection from '$lib/features/collection/Collection.svelte';

  export let data: Awaited<ReturnType<typeof loadCollectionFx>>;

  $: setCollection(data);

  onDestroy(() => {
    clearCollection();
  });
</script>

<Seo title={data.profile.username} image={chooseProfileSocialImage(data.profile)} />

<Collection />
