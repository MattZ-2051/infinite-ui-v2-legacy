<script context="module" lang="ts">
  import type { Sku, Product } from '$lib/sku-item/types';
  import { loadReleases } from '$lib/features/celebrity/celebrity.api';

  export async function load({ fetch }) {
    return {
      props: await loadReleases({ username: 'MayPang', fetch }),
    };
  }
</script>

<script lang="ts">
  import Account from '$lib/features/account/Account.svelte';

  export let skus: Sku[];
  export let products: Product[];
</script>

<Account {skus} {products} />
