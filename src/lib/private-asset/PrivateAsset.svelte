<script lang="ts">
  import type { PrivateAssets } from './types';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { userId } from '$lib/user';
  import { getPrivateAssets, getProductPrivateAssets } from './private-asset.api';

  export let skuId: string | undefined;
  export let productId: string | undefined;

  const privateAssets = writable<PrivateAssets>(undefined);

  setContext('PrivateAssets', privateAssets);

  async function loadPrivateAssets(id: string) {
    const assetsInfoSku = await getPrivateAssets({ skuId: id, ownerId: $userId });
    privateAssets.set(assetsInfoSku);
  }

  async function loadPrivateAssetsForProduct(id: string) {
    const assetsInfo = await getProductPrivateAssets({ productId: id, ownerId: $userId });
    privateAssets.set({ productId: id, ...assetsInfo });
  }

  $: productId && loadPrivateAssetsForProduct(productId);
  $: skuId && loadPrivateAssets(skuId);
</script>

<slot total={$privateAssets?.total} />
