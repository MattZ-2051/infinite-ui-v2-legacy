<script lang="ts">
  import { Pagination, PaginationCursor } from '$ui/pagination';
  import { page } from '$app/stores';
  import { Tabs, Tab } from '$ui/tabs';
  import { SkuItemGrid } from '$lib/sku-item';
  import routes from '$project/routes';
  import Sort from '$lib/components/Sort.svelte';
  import Button from '$lib/components/Button.svelte';
  import FullScreenLoader from '$lib/components/FullScreenLoader.svelte';
  import {
    InfiniteExtensionStore,
    nftBalance,
    tokenBalance,
  } from '$lib/features/infinite-wallet/infinite-wallet.store';
  import {
    products,
    productsTotal,
    skus,
    hasNear,
    changeTab,
    changePage,
    changeSort,
    changeStatus,
    perPageIssuer,
    perPageUser,
    loadCollectionFx,
    changeNear,
  } from './collection.store';

  export let isIssuer = false;
  export let own = false;

  export let items = [
    ...(isIssuer
      ? [
          {
            id: 'Releases',
            title: 'Releases',
          },
        ]
      : []),
    {
      id: 'NFTs',
      title: 'Collectibles',
    },
  ];

  const pending = loadCollectionFx.pending;

  const sortOptions = [
    { name: 'Newest', value: 'createdAt:desc' },
    { name: 'Oldest', value: 'createdAt:asc' },
  ];

  const statusOptions = [
    { name: 'All', value: '' },
    { name: 'Approved', value: 'approved' },
    { name: 'Pending', value: 'pending' },
    { name: 'Rejected', value: 'rejected' },
  ];

  $: externalTabs = [
    $nftBalance?.length && {
      id: 'ExternalNFTs',
      title: 'External Wallet NFTs',
      tooltip: `These NFTs are owned by wallet ${$InfiniteExtensionStore?.current?.id}`,
    },
    $tokenBalance?.length && {
      id: 'ExternalTokens',
      title: 'External Wallet Tokens',
      tooltip: `These tokens are owned by wallet ${$InfiniteExtensionStore?.current?.id}`,
    },
  ];

  $: visibleTabs = $InfiniteExtensionStore.loggedIn
    ? (visibleTabs = [...items, ...externalTabs.filter(Boolean)])
    : items;

  $: p = +$page.url.searchParams.get(`page`) || 1;

  $: tab = $page.url.searchParams.get(`tab`) || (isIssuer ? 'Releases' : 'NFTs');

  const perPage = isIssuer ? perPageIssuer : perPageUser;
  let tabContainer: HTMLElement;

  function onSelectTab({ detail }: CustomEvent<'Releases' | 'NFTs' | 'ExternalNFTs' | 'ExternalTokens'>) {
    changeTab(detail);
  }

  function onChangePage(event: CustomEvent) {
    tabContainer.scrollIntoView();
    changePage(event.detail.value);
  }

  function onNext() {
    tabContainer.scrollIntoView();
    changeNear(false);
  }

  function onPrevious() {
    tabContainer.scrollIntoView();
    changeNear(true);
  }

  const onSort = (event: CustomEvent) => {
    changeSort(event.detail.value);
  };

  const onChangeStatus = (event: CustomEvent) => {
    changeStatus(event.detail.value);
  };
</script>

<div bind:this={tabContainer} style="scroll-margin-top: var(--header-height);">
  <Tabs
    items={visibleTabs}
    defaultSelectedId={tab}
    class="text-2xl font-medium mt-6 md:mt-12 mb-4 section-title"
    on:select={onSelectTab}
  >
    <Tab id="Releases">
      {#if $skus.length === 0}
        <div class="text-gray-500  text-center mt-12 text-2xl ">No releases found.</div>
      {:else if $hasNear === null}
        <FullScreenLoader class="text-gray-500 italic text-center my-12 text-2xl font-light" />
      {:else}
        <SkuItemGrid skus={$skus} loading={$pending} />
        <PaginationCursor
          hasNext={$hasNear?.hasNext}
          hasPrevious={$hasNear?.hasPrevious}
          class="my-8 flex justify-end"
          on:change={onChangePage}
          on:next={onNext}
          on:prev={onPrevious}
        />
      {/if}
    </Tab>
    <Tab id="NFTs">
      {#if $productsTotal === 0}
        <div class="text-gray-500 text-center mt-12 text-lg space-y-12">
          <div>
            <p>No collectibles yet!</p>
          </div>
          <Button variant="brand" style="padding: 13px 3rem" href={routes.marketplace}>Explore the Marketplace</Button>
        </div>
      {:else if $productsTotal === null}
        <FullScreenLoader class="text-gray-500 italic text-center my-12 text-2xl font-light" />
      {:else}
        <SkuItemGrid products={$products} loading={$pending} />
        <Pagination {perPage} total={$productsTotal} page={p} class="my-8 flex justify-end" on:change={onChangePage} />
      {/if}
    </Tab>
    <Tab id="ExternalNFTs">
      {#if $productsTotal === 0}
        <div class="text-gray-500  text-center mt-12 text-2xl ">No NFTs found.</div>
      {:else if $productsTotal === null}
        <FullScreenLoader class="text-gray-500 italic text-center my-12 text-2xl font-light" />
      {:else}
        <SkuItemGrid products={$products} loading={$pending} />
        <Pagination {perPage} total={$productsTotal} page={p} class="my-8 flex justify-end" on:change={onChangePage} />
      {/if}
    </Tab>
    <Tab id="ExternalTokens">
      {#if $productsTotal === 0}
        <div class="text-gray-500  text-center mt-12 text-2xl ">No Tokens found.</div>
      {:else if $productsTotal === null}
        <FullScreenLoader class="text-gray-500 italic text-center my-12 text-2xl font-light" />
      {:else}
        <SkuItemGrid products={$products} loading={$pending} />
        <Pagination {perPage} total={$productsTotal} page={p} class="my-8 flex justify-end" on:change={onChangePage} />
      {/if}
    </Tab>
    <div slot="extra" class="justify-self-end self-center text-lg mb-4 flex gap-4">
      {#if own && tab === 'Releases'}
        <Sort on:select={onChangeStatus} sortOptions={statusOptions} key="status" label="Status:" iconType="filter" />
      {/if}
      <Sort on:select={onSort} {sortOptions} key="sortBy" />
    </div>
  </Tabs>
</div>
