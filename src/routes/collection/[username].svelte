<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import { loadReleases } from '$lib/features/celebrity/celebrity.api';

  export async function load({ page, fetch }: LoadInput) {
    const { username } = page.params;
    return {
      props: await loadReleases({ username, fetch }),
    };
  }
</script>

<script lang="ts">
  import { Seo } from '$lib/seo';
  import Celebrity from '$lib/features/celebrity/Celebrity.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';

  export let skus: Sku[];
  export let products: Product[];
  export let profile: Profile;
</script>

<Seo title={profile.username} image={profile.bannerPhotoUrl} />

{#if profile}
  <Celebrity {skus} {products} {profile} />
{:else}
  <FullScreenLoader />
{/if}
