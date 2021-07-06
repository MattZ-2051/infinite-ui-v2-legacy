<script lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import Account from '$lib/features/account/Account.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { loadReleases } from '$lib/features/account/account.api';
  import { user } from '$lib/user';

  let skus: Sku[];
  let products: Product[];

  async function load() {
    ({ skus, products } = await loadReleases({ id: $user._id }));
  }
  $: $user && load();
</script>

{#if $user}
  <Account {skus} {products} />
{:else}
  <FullScreenLoader class="text-black" />
{/if}
