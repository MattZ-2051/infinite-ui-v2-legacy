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
  export let showToolTip = true;

  $: ({ statusLabel, hasButton, statusLabelColor } = getStatusLabelAndColor(status, '', '', false));
</script>

<div class="flex justify-between p-4 rounded-lg border border-gray-200">
  <div class="flex content-center items-center">
    <FilePreview item={sourceImg} />
    <div class="flex flex-col pl-4 items-start">
      <span class="text-sm text-gray-500">Name</span>
      <p class="text-base">
        {name}
      </p>
    </div>
  </div>
  <div class="flex flex-col items-start justify-center">
    {#if hasButton}
      <Button variant="brand" class="rounded-lg" on:click={handleClick}>Buy now</Button>
    {:else}
      <div class="flex flex-col items-start justify-center gate_keeping_status border-l border-gray-900  px-4">
        <span class="text-sm text-gray-500">Status</span>
        <p class={`text-base ${statusLabelColor}`} style={`color: ${statusLabelColor};`}>{statusLabel}</p>
      </div>
    {/if}
  </div>
</div>
{#if showToolTip}
  <p class="text-sm font-light text-gray-500 pl-10 py-8">Then you'll be able to buy this:</p>
{/if}
