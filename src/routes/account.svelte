<script lang="ts">
  import type { Sku, Product, Profile } from '$lib/sku-item/types';
  import Account from '$lib/features/account/Account.svelte';
  import { loadReleases } from '$lib/features/account/account.api';
  import { user } from '$lib/user';

  async function load() {
    const response = await loadReleases({ username: $user.username, fetch });
    skus = response.skus;
    profile = response.profile;
    products = response.products;
  }
  $: $user && load();
  let skus: Sku[];
  let products: Product[];
  let profile: Profile;
</script>

<Account {skus} {products} {profile} />
