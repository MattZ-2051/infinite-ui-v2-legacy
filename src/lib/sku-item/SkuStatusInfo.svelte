<script lang="ts">
  import type { Status } from './types';

  export let unique = false;
  export let serialNumber = '';
  export let supplyType: 'variable' | 'fixed' | '' = '';
  export let status: Status = 'no-sale';
  export let circulatingSupply = 0;
  export let totalSupplyLeft = 0;
  export let totalSupply = 0;

  $: isActive = status === 'active';
  $: notForSale = status === 'no-sale';
  $: isVariable = supplyType === 'variable';
  $: isFixed = supplyType === 'fixed';
</script>

{#if unique}
  <div class="flex items-center">
    <img class="w-5 h-5 mr-1 " src="/fire.png" alt="fire" loading="lazy" />
    <span class="card-uniqueitem">Unique item!</span>
  </div>
{:else if serialNumber}
  <span class="card-serial mr-1">Serial:</span>
  <span class="card-serial-number">{serialNumber}</span>
{:else if isActive}
  {#if isVariable && circulatingSupply > 0}
    <span class="card-serial ml-1">{circulatingSupply} Released</span>
  {:else if isFixed}
    <span class="card-serial ml-1">{totalSupplyLeft} of {totalSupply} For Sale</span>
  {/if}
{:else if notForSale}
  {#if isVariable && totalSupply > 0}
    <span class="card-serial ml-1">{totalSupply} Released</span>
  {:else if isFixed}
    <span class="card-serial ml-1">{totalSupply} of {totalSupply} For Sale</span>
  {/if}
{/if}

<style>
  .card-uniqueitem {
    color: #ff0000;
  }
  .card-serial {
    color: #9e9e9e;
  }
  .card-serial-number {
    color: var(--card-serial-number-color, #000000);
  }
</style>
