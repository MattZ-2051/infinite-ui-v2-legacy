<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import Account from '$lib/features/account/Account.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import { loadMyProducts } from '$lib/features/account/account.api';
  import { user } from '$lib/user';

  let products: Product[];

  async function load() {
    products = await loadMyProducts();
  }
  $: $user && load();
</script>

{#if $user}
  <Account {products} />
{:else}
  <FullScreenLoader class="text-black" />
{/if}
