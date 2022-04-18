<script lang="ts">
  import type { FileAsset } from '$ui/file';
  import type { StatusGateKeeping } from './types';
  import FilePreview from '$ui/file/FilePreview.svelte';
  import Button from '$lib/components/Button.svelte';
  import { getStatusLabelAndColor } from './gateKeeping.service';
  import chevronIcon from './assets/chevron.svg';

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
      <span class="text-sm text-gray-500">Name</span>
      <p class="text-base">
        {name}
      </p>
    </div>
  </div>
  {#if hasButton}
    <div class="flex items-center justify-center">
      <Button variant="brand" class="rounded-lg w-40 h-12" on:click={handleClick}>Buy now</Button>
    </div>
  {:else}
    <div class="border-l border-gray-900 px-4 w-1/3 flex flex-col justify-center">
      <span class="text-sm text-gray-500">Status</span>
      <p class={`text-base ${statusLabelColor} whitespace-nowrap`} style={`color: ${statusLabelColor};`}>
        {statusLabel}
      </p>
    </div>
  {/if}
</div>
{#if showToolTip && status === 'buyNow'}
  <div class="flex items-center">
    <img src={chevronIcon} alt="chevron icon" />
    <p class="text-sm font-light text-gray-500 pl-2">Then you'll be able to buy this:</p>
  </div>
{/if}
