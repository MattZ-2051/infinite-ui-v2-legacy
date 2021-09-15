<script lang="ts">
  import { Pagination } from '$ui/pagination';
  import { page } from '$app/stores';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import Sort from '$lib/components/Sort.svelte';
  import {
    products,
    productsTotal,
    skus,
    skusTotal,
    changeTab,
    changePage,
    changeSort,
    perPageIssuer,
    perPageUser,
  } from './collection.store';

  export let isIssuer = false;
  export let own = false;
  export let owner: string;

  $: p = +$page.query.get(`page`) || 1;

  $: tab = $page.query.get(`tab`) || (isIssuer ? 'Releases' : 'NFTs');

  const perPage = isIssuer ? perPageIssuer : perPageUser;

  function onSelectTab({ detail }: CustomEvent<'Releases' | 'NFTs'>) {
    changeTab(detail);
  }

  function onChangePage(event: CustomEvent) {
    changePage(event.detail.value);
  }

  let items = [];
  $: items = [
    ...(isIssuer
      ? [
          {
            id: 'Releases',
            title: 'Collectibles for Sale',
            tooltip: `These Collectibles were created by ${owner} and are available for sale`,
          },
        ]
      : []),
    {
      id: 'NFTs',
      // prettier-ignore
      title: isIssuer ? 'Owned Collectibles' : (own ? 'My Collection' : 'Collection'),
      tooltip: isIssuer ? `These Collectibles are owned by ${owner}` : '',
    },
  ];

  const sort = (event: CustomEvent) => {
    changeSort(`${event.detail.value}:${event.detail.order}`);
  };
  const sortOptions = [
    {
      id: 1,
      name: 'Newest',
      order: 'desc',
      value: 'createdAt',
    },
    {
      id: 2,
      name: 'Oldest',
      order: 'asc',
      value: 'createdAt',
    },
  ];
</script>

<Tabs {items} defaultSelectedId={tab} class="text-2xl font-medium mt-6 md:mt-12 mb-4" on:select={onSelectTab}>
  <Tab id="Releases">
    {#if $skusTotal === 0}
      <div class="text-gray-500  text-center mt-12 text-2xl ">No releases found.</div>
    {:else if $skusTotal === null}
      <div class="text-gray-500 italic text-center mt-12 text-2xl font-light">Loading . . .</div>
    {:else}
      <SkuItemGrid skus={$skus} />
      <Pagination {perPage} total={$skusTotal} page={p} class="mt-4 flex justify-end" on:change={onChangePage} />
    {/if}
  </Tab>
  <Tab id="NFTs">
    {#if $productsTotal !== 0}
      <div class="text-gray-500  text-center mt-12 text-2xl ">No NFTs found.</div>
    {:else if $productsTotal === null}
      <div class="text-gray-500 italic text-center mt-12 text-2xl font-light">Loading . . .</div>
    {:else}
      <SkuItemGrid products={$products} />
      <Pagination {perPage} total={$productsTotal} page={p} class="mt-4 flex justify-end" on:change={onChangePage} />
    {/if}
  </Tab>
  <div slot="extra" class="justify-self-end self-center text-lg mb-4">
    <Sort on:select={sort} {sortOptions} />
  </div>
</Tabs>
