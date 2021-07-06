<script lang="ts">
  import type { UserProfile } from '$lib/user/types';
  import type { Sku, Product } from '$lib/sku-item/types';
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
  let profile: UserProfile;
</script>

{#if profile}
  <Account {skus} {products} />
{:else}
  <FullScreenLoader class="text-black" />
{/if}
