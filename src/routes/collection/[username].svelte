<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import type { Profile, SkuStatus } from '$lib/sku-item/types';
  import { onDestroy } from 'svelte';
  import { clearCollection, loadCollectionFx, setCollection } from '$lib/features/collection/collection.store';
  import { loadProfile } from '$lib/features/collection/collection.api';

  export const load: Load = async ({ params, fetch }) => {
    const { username } = params;
    const profile = await loadProfile({ username, fetch });

    return {
      props: { profile },
    };
  };
</script>

<script lang="ts">
  import { Seo, chooseProfileSocialImage } from '$lib/seo';
  import Collection from '$lib/features/collection/Collection.svelte';
  import { isAuthenticated, user } from '$lib/user';
  import { InfiniteExtensionStore, MirrorNodeBalanceLoadFx } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';
  import { browser } from '$app/env';

  export let profile: Profile;
  const _profile = profile;

  $: tab = $page.url.searchParams.get('tab') as 'Releases' | 'NFTs' | 'ExternalNFTs' | 'ExternalTokens';
  $: _page = +$page.url.searchParams.get('page') || 1;
  $: sortBy = $page.url.searchParams.get('sortBy');
  $: skuStatus = ($page.url.searchParams.get('status') as SkuStatus) || 'approved';

  // wait until auth is done (either $isAuthenticated is true the $user is set, or $isAuthenticated is false)
  $: (($isAuthenticated && $user) || $isAuthenticated === false) &&
    loadCollectionFx({
      // If profile is passed directly, loadCollectionFx is getting called twice every time any other param changes. Weird.
      profile: _profile,
      page: _page,
      tab,
      sortBy,
      skuStatus,
    }).then(setCollection);

  onDestroy(() => {
    clearCollection();
  });

  // Redirect when wallet is disconnected while external products tab is active
  $: if (browser && (tab === 'ExternalNFTs' || tab === 'ExternalTokens') && !$InfiniteExtensionStore.current?.id) {
    goto(routes.collection($page.params.username));
  }

  // Load mirror node data for Infinite extension connected wallet balance
  $: if ($InfiniteExtensionStore.current?.id) {
    MirrorNodeBalanceLoadFx($InfiniteExtensionStore.current);
  }
</script>

<Seo title={profile.username} image={chooseProfileSocialImage(profile)} />

<Collection {profile} />
