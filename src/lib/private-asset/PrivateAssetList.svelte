<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { PrivateAssets } from './types';
  import { getContext } from 'svelte';
  import { mdiDownloadCircleOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatBytes } from '$util/format';
  import { getPreSignedUrl } from './private-asset.api';

  const privateAssets: Writable<PrivateAssets> = getContext('PrivateAssets');

  $: assets = $privateAssets?.assets || [];
  $: isOwner = $privateAssets?.isOwner;
  $: productId = $privateAssets?.productId;

  async function download(key: string, filename: string) {
    await getPreSignedUrl({ productId, key, filename });
  }

  $: assetList = assets.map((asset) => {
    return {
      ...asset,
      filename: asset.key.split('/').pop(),
    };
  });
</script>

{#if !isOwner}
  <div class="text-lg py-4">Only owners of this collectible are granted access to download these assets.</div>
{/if}
{#if assetList.length > 0}
  <div class="divide-y divide-white divide-opacity-25">
    {#each assetList as asset}
      <div class="flex gap-2 justify-between py-6">
        <div class="flex-grow flex flex-col gap-4">
          <div>{asset.filename}</div>
          <div class="flex justify-between w-full max-w-sm">
            <span>Type: {asset.type?.split('/')[0]}</span><span>Size: {formatBytes(asset.size)}</span>
          </div>
        </div>
        {#if isOwner}
          <div class="flex-none flex items-center justify-center px-6">
            <button type="button" on:click={() => download(asset.key, asset.filename)}
              ><Icon path={mdiDownloadCircleOutline} size="1.6" /></button
            >
          </div>
        {/if}
      </div>
    {/each}
  </div>
{/if}
