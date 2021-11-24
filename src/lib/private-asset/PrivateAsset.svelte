<script lang="ts">
  import type { PrivateAssets } from './types';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { userId } from '$lib/user';
  import { getPrivateAssets } from './private-asset.api';

  export let skuId: string;

  const privateAssets = writable<PrivateAssets>(undefined);

  setContext('PrivateAssets', privateAssets);

  async function loadPrivateAssets(id: string) {
    privateAssets.set(await getPrivateAssets({ skuId: id, ownerId: $userId }));
  }

  $: loadPrivateAssets(skuId);
</script>

<slot total={$privateAssets?.total} />
