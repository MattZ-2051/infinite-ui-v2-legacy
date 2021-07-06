<script lang="ts">
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import Account from '$lib/features/account/Account.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { getMyProfile, loadReleases } from '$lib/features/account/account.api';
  import { user } from '$lib/user';

  async function load() {
    profile = await getMyProfile();
    ({ skus, products } = await loadReleases({ id: profile._id }));
  }
  $: $user && load();
  let skus: Sku[];
  let products: Product[];
  let profile: Profile;
</script>

{#if profile}
  <Account {skus} {products} {profile} />
{:else}
  <FullScreenLoader class="text-black" />
{/if}
