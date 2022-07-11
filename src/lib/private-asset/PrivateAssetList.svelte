<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { PrivateAssets } from './types';
  import { getContext } from 'svelte';
  import { mdiDownloadCircleOutline } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatBytes } from '$util/format';
  import { ENABLE_ASSET_FILE_SIZE } from '$project/variables';
  import { web3User } from '$lib/web3/web3.stores';
  import { getPreSignedUrl } from './private-asset.api';

  const privateAssets: Writable<PrivateAssets> = getContext('PrivateAssets');

  export let isProductOwner = false;

  $: assets = $privateAssets?.assets || [];
  $: isOwner = $web3User.walletConnected ? isProductOwner : $privateAssets?.isOwner;
  $: productId = $privateAssets?.productId;
  $: ethAddress = $web3User?.walletConnected && $web3User?.ethAddress;

  async function download(key: string, filename: string) {
    await getPreSignedUrl({ productId, key, filename, ethAddress });
  }

  $: assetList = assets.map((asset) => {
    return {
      ...asset,
      filename: asset.key.split('/').pop(),
    };
  });
</script>

{#if !isOwner}
  <div class="text-lg py-4">Once purchased, these files will be available for download.</div>
{/if}
{#if assetList.length > 0}
  <div class="divide-y divide-white divide-opacity-25">
    {#each assetList as asset}
      <div class="flex gap-2 justify-between py-6">
        <div class="min-w-0 flex-grow flex flex-col gap-4">
          <div class="break-words">{asset.filename}</div>
          <div class="flex justify-between w-full max-w-sm">
            <span>Type: {asset.type?.split('/')[0]}</span>
            {#if ENABLE_ASSET_FILE_SIZE}
              <span>Size: {formatBytes(asset.size)}</span>
            {/if}
          </div>
        </div>
        {#if isOwner}
          <div class="flex-none flex items-center justify-center lg:px-6">
            <button type="button" on:click={() => download(asset.key, asset.filename)}
              ><Icon path={mdiDownloadCircleOutline} size="1.6" /></button
            >
          </div>
        {/if}
      </div>
    {/each}
  </div>
{:else}
  <div class="text-lg py-4">No content available yet.</div>
{/if}
