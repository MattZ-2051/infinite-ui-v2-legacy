<script lang="ts">
  import type { PrivateAssets } from './types';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { user } from '$lib/user';
  import { getPrivateAssets } from './private-asset.api';

  export let skuId: string;

  const privateAssets = writable<PrivateAssets>(undefined);

  setContext('PrivateAssets', privateAssets);

  async function loadPrivateAssets() {
    privateAssets.set(await getPrivateAssets({ skuId, ownerId: $user._id }));
  }

  $: $user && loadPrivateAssets();
</script>

{#if $privateAssets?.total > 0}
  <slot
    assets={$privateAssets.assets}
    total={$privateAssets.total}
    isOwner={$privateAssets.isOwner}
    productId={$privateAssets.productId}
  />
{/if}
