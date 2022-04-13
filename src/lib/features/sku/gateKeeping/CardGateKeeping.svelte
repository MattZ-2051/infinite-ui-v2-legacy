<script lang="ts">
  import type { StatusGateKeeping } from './types';
  import Button from '$lib/components/Button.svelte';

  export let sourceImg = '';
  export let name = '';
  export let hasButton: boolean;
  export let status: StatusGateKeeping = 'nowViewing';
  export let handleClick: () => void;

  let statuLabel = 'Now Viewing';
  let statusLabelColor = 'text-error';
  $: getStatusLabelAndColor(status);

  const getStatusLabelAndColor = (statusGateKeeping: StatusGateKeeping) => {
    if (statusGateKeeping === 'owned') {
      statuLabel = 'Owned';
      statusLabelColor = 'status-success';
    }
    if (statusGateKeeping === 'notOwnedYet') {
      statuLabel = 'Not Owned Yet';
      statusLabelColor = '';
    }
  };
</script>

<div class="flex justify-between p-4 rounded-lg border border-gray-200">
  <div class="flex content-center items-center">
    <div>
      <img src={sourceImg} class="gate_keeping_img rounded-lg" alt={name} />
    </div>
    <div class="flex flex-col pl-4  items-start">
      <span class="text-sm text-gray-500">Name</span>
      <p class="text-base">
        {name}
      </p>
    </div>
  </div>
  <div class="flex flex-col items-start justify-center">
    {#if hasButton}
      <Button variant="brand" class="rounded-lg" on:click={() => handleClick()}>Buy now</Button>
    {:else}
      <div class="flex flex-col items-start justify-center gate_keeping_status px-4">
        <span class="text-sm text-gray-500">Status</span>
        <p class={`text-base ${statusLabelColor}`}>{statuLabel}</p>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .gate_keeping_img {
    width: 4rem;
    height: 4rem;
  }
  .gate_keeping_status {
    @apply border-l border-gray-900;
  }
  .status-success {
    color: #ddf874;
  }
</style>
