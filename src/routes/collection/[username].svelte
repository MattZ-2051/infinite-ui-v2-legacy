<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Awaited } from 'ts-essentials';
  import type { SkuStatus } from '$lib/sku-item/types';
  import { onDestroy } from 'svelte';
  import { clearCollection, loadCollectionFx, setCollection } from '$lib/features/collection/collection.store';

  export const load: Load = async ({ url, params, fetch }) => {
    const { username } = params;
    const _page = +url.searchParams.get(`page`) || 1;
    const sortBy = url.searchParams.get('sortBy');
    const skuStatus: SkuStatus = (url.searchParams.get('status') as SkuStatus) || 'approved';

    const data = await loadCollectionFx({
      username,
      tab: url.searchParams.get(`tab`) as 'Releases' | 'NFTs',
      page: _page,
      sortBy,
      skuStatus,
      fetch,
    });

    return {
      props: { data },
    };
  };
</script>

<script lang="ts">
  import { Seo, chooseProfileSocialImage } from '$lib/seo';
  import Collection from '$lib/features/collection/Collection.svelte';
  import { InfiniteExtensionStore, MirrorNodeBalanceLoadFx } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { browser } from '$app/env';

  export let data: Awaited<ReturnType<typeof loadCollectionFx>>;

  $: setCollection(data);

  onDestroy(() => {
    clearCollection();
  });

  // Redirect when wallet is disconnected while external products tab is active
  $: if (
    browser &&
    ($page.url.searchParams.get(`tab`) === 'ExternalNFTs' || $page.url.searchParams.get(`tab`) === 'ExternalTokens') &&
    !$InfiniteExtensionStore.current?.id
  ) {
    goto(routes.collection($page.params.username));
  }

  // Load mirror node data for Infinite extension connected wallet balance
  $: if ($InfiniteExtensionStore.current?.id) {
    MirrorNodeBalanceLoadFx($InfiniteExtensionStore.current);
  }
</script>

<Seo title={data.profile.username} image={chooseProfileSocialImage(data.profile)} />

<Collection />
