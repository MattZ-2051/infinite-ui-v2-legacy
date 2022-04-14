<script lang="ts">
  import type { StatusGateKeeping } from './types';
  import Button from '$lib/components/Button.svelte';
  import { getStatusLabelAndColor } from './gateKeeping.service';

  export let sourceImg = '';
  export let name = '';
  export let status: StatusGateKeeping = 'nowViewing';
  export let handleClick: () => void;

  $: ({ statusLabel, hasButton, statusLabelColor } = getStatusLabelAndColor(status, '', '', false));
</script>

<div class="flex justify-between p-4 rounded-lg border border-gray-200">
  <div class="flex content-center items-center">
    <img src={sourceImg} class="w-16 h-16 rounded-lg" alt={name} />
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
