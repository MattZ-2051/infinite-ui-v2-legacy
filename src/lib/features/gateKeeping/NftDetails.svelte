<script lang="ts">
  import type { FileAsset } from '$ui/file';
  import type { StatusGateKeeping } from './types';
  import FilePreview from '$ui/file/FilePreview.svelte';
  import Button from '$lib/components/Button.svelte';
  import { getStatusLabelAndColor } from './gateKeeping.service';

  export let sourceImg: FileAsset;
  export let name = '';
  export let status: StatusGateKeeping = 'nowViewing';
  export let handleClick: () => void;
  export let showToolTip = false;

  $: ({ statusLabel, hasButton, statusLabelColor } = getStatusLabelAndColor(status, '', '', false));
</script>

<div class="flex p-4 rounded-lg border border-gray-200 my-6">
  <div class="flex items-center w-full">
    <div class="w-20">
      <FilePreview item={sourceImg} preview />
    </div>
    <div class="flex flex-col pl-4 items-start">
      <span class="text-xs text-gray-500 md:text-sm">Name</span>
      <p class="text-sm whitespace-nowrap overflow-hidden text-ellipsis nft-name md:text-base pr-4">
        {name}
      </p>
    </div>
  </div>
  {#if hasButton}
    <div class="flex items-center justify-center">
      <Button variant="brand" class="rounded-lg w-24 h-12 md:w-32" on:click={handleClick} --button-padding="12px 12px"
        >Buy now</Button
      >
    </div>
  {:else}
    <div class="border-l border-gray-900 px-4 w-1/3 flex flex-col justify-center">
      <span class="text-xs text-gray-500 md:text-sm">Status</span>
      <p class={`text-sm ${statusLabelColor} whitespace-nowrap md:text-base`} style={`color: ${statusLabelColor};`}>
        {statusLabel}
      </p>
    </div>
  {/if}
</div>
{#if showToolTip && status === 'buyNow'}
  <div class="flex items-center">
    <p class="text-sm font-light text-gray-500 pl-2">Then you'll be able to buy this:</p>
  </div>
{/if}

<style>
  .nft-name {
    max-width: 200px;
  }
  @media only screen and (max-width: 768px) {
    .nft-name {
      max-width: 130px;
    }
  }
</style>
