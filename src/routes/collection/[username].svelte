<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Profile } from '$lib/sku-item/types';
  import { loadProductsFx, loadProfileFx, loadSkusFx } from '$lib/features/collection/collection.store';

  export async function load({ page, fetch }: LoadInput) {
    const { username } = page.params;
    const profile = await loadProfileFx({ username, fetch });
    const tab = page.query.get(`tab`) || (profile.role === 'issuer' ? 'Releases' : 'NFTs');
    const _page = +page.query.get(`page`) || 1;

    if (tab === 'Releases') {
      await loadSkusFx({ page: _page, profileId: profile._id, fetch });
    } else if (tab === 'NFTs') {
      await loadProductsFx({ page: _page, profileId: profile._id, fetch });
    }
    return {
      props: { profile },
    };
  }
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Collection from '$lib/features/collection/Collection.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';

  export let profile: Profile;
</script>

<Seo title={profile.username} image={profile.bannerPhotoUrl} />

{#if profile}
  <Collection {profile} />
{:else}
  <FullScreenLoader />
{/if}
