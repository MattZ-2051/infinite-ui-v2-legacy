<script lang="ts">
  import { Pagination } from '$ui/pagination';
  import { page } from '$app/stores';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import {
    products,
    productsTotal,
    loadProductsFx,
    skus,
    skusTotal,
    loadSkusFx,
    changeTab,
    changePage,
  } from './collection.store';

  export let isIssuer: boolean;

  const productsLoading = loadProductsFx.pending;
  const skusLoading = loadSkusFx.pending;

  $: p = +$page.query.get(`page`) || 1;

  $: tab = $page.query.get(`tab`) || (isIssuer ? 'Releases' : 'NFTs');

  function onSelectTab({ detail }: CustomEvent<'Releases' | 'NFTs'>) {
    changeTab(detail);
  }

  function onChangePage(event: CustomEvent) {
    changePage(event.detail.value);
  }

  let items = [{ id: 'NFTs', title: 'NFTs' }];
  $: if (isIssuer) {
    items.unshift({ id: 'Releases', title: 'Releases' });
    items = items;
  }
</script>

<Tabs {items} defaultSelectedId={tab} class="mb-4" on:select={onSelectTab}>
  <Tab id="Releases">
    {#if $skusTotal === 0}
      <div class="text-gray-200  text-center mt-12 text-2xl ">No releases found.</div>
    {:else if $skusTotal === null}
      <div class="text-gray-200 italic text-center mt-12 text-2xl font-light">Loading . . .</div>
    {:else}
      <SkuItemGrid skus={$skus} class={$skusLoading ? 'opacity-40' : ''} />
      <Pagination perPage={8} total={$skusTotal} page={p} class="mt-4 flex justify-end" on:change={onChangePage} />
    {/if}
  </Tab>
  <Tab id="NFTs">
    {#if $productsTotal === 0 && !$productsLoading}
      <div class="text-gray-200  text-center mt-12 text-2xl ">No NFTs found.</div>
    {:else if $productsTotal === null}
      <div class="text-gray-200 italic text-center mt-12 text-2xl font-light">Loading . . .</div>
    {:else}
      <SkuItemGrid products={$products} class={$productsLoading ? 'opacity-40' : ''} />
      <Pagination perPage={8} total={$productsTotal} page={p} class="mt-4 flex justify-end" on:change={onChangePage} />
    {/if}
  </Tab>
</Tabs>
