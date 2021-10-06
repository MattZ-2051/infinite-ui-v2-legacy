<script lang="ts">
  import { onMount } from 'svelte';
  import type { Sku } from '$lib/sku-item/types';
  import { loadSku } from '$lib/features/sku/sku.api';
  import ExchangingGoodness from './exchangingGoodness/ExchangingGoodness.svelte';
  import ExchangeTeam from './exchangeTeam/ExchangeTeam.svelte';
  import NftDetails from './NftDetails.svelte';
  import GetInTouch from './GetInTouch.svelte';
  import Subscribe from './subscribe/Subscribe.svelte';

  let skuData: Sku;
  onMount(async () => {
    const result = await loadSku({ id: '615640e1e5b85e4affdb2316' });
    skuData = result.sku;
  });
</script>

{#if skuData}
  <ExchangingGoodness />
  <ExchangeTeam />
  <NftDetails {skuData} />
  <GetInTouch />
  <Subscribe />
{/if}
