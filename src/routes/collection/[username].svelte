<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import { loadCollectionFx, setCollection } from '$lib/features/collection/collection.store';

  export async function load({ page, fetch }: LoadInput) {
    const { username } = page.params;
    const _page = +page.query.get(`page`) || 1;
    const sortBy: string = page.query.get('sortBy');

    const data = await loadCollectionFx({
      username,
      tab: page.query.get(`tab`) as 'Releases' | 'NFTs',
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
  import { Seo } from '$lib/seo';
  import Collection from '$lib/features/collection/Collection.svelte';

  export let data: Awaited<ReturnType<typeof loadCollectionFx>>;

  $: setCollection(data);
</script>

<Seo title={data.profile.username} image={data.profile.bannerPhotoUrl} />

<Collection />
