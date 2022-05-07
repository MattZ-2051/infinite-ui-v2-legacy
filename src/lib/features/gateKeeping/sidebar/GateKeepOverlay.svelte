<script>
  import { gateKeepSkus, clearRequiredSkus } from '$lib/features/gateKeeping/gateKeeping.store';

  $: activeGateKeepSkus = $gateKeepSkus.some((gateKeepSku) => gateKeepSku.status !== 'owned');
</script>

{#if activeGateKeepSkus}
  <div on:click={() => clearRequiredSkus()} class="overlay" />
{/if}

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
