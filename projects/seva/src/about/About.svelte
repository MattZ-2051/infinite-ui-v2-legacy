<script lang="ts">
  import { onMount } from 'svelte';
  import type { Sku } from '$lib/sku-item/types';
  import { loadSingleSku } from './about.api';
  import ExchangingGoodness from './exchangingGoodness/ExchangingGoodness.svelte';
  import ExchangeTeam from './exchangeTeam/ExchangeTeam.svelte';
  import NftDetails from './NftDetails.svelte';
  import GetInTouch from './GetInTouch.svelte';
  import Subscribe from './subscribe/Subscribe.svelte';

  let skuData: Sku;

  onMount(async () => {
    const { singleSkuData } = await loadSingleSku({ fetch });
    skuData = singleSkuData;
  });
</script>

{#if skuData}
  <ExchangingGoodness />
  <ExchangeTeam />
  <NftDetails {skuData} />
  <GetInTouch />
  <Subscribe />
{/if}
