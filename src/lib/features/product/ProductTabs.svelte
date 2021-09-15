<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { Tabs } from '$ui/tabs';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import routes from '$project/routes';
  import ProductHistory from './ProductHistory.svelte';
  import ProductAuction from './auction/ProductAuction.svelte';
  import { hasAuction } from './product.service';

  export let product: Product;

  $: showAuction = hasAuction(product);

  function redirect({ detail }: CustomEvent<'auction' | 'history' | 'owner'>) {
    goto(`${routes.product(product._id)}?tab=${detail}`, { keepfocus: true });
  }

  // TODO(tasos): move to route to avoid unnecessary call for transactions
  $: tab = $page.query.get(`tab`) || (showAuction ? 'auction' : 'history');

  function getItems(totalPrivateAssets: number) {
    let items = [
      {
        id: 'auction',
        title: 'Auction',
      },
      {
        id: 'history',
        title: 'History',
      },
    ];

    if (totalPrivateAssets > 0) {
      items.push({ id: 'owner', title: 'Owner Access' });
    }

    return items;
  }
</script>

<PrivateAsset skuId={product.sku._id} let:total={totalPrivateAssets}>
  <Tabs
    class="px-4 md:pl-8"
    items={getItems(totalPrivateAssets)}
    itemClass="text-xl lg:text-2xl items-center"
    menuBreakpoint="sm"
    defaultSelectedId={tab}
    on:select={redirect}
    --tab-border-color-active="transparent"
  />

  <div class="flex-grow px-4 lg:px-12 pb-4 lg:pb-12" style="background-color: var(--product-tabs-bg);">
    {#if tab === 'auction'}
      <ProductAuction {product} />
    {/if}
    {#if tab === 'history'}
      <ProductHistory />
    {/if}
    {#if tab === 'owner'}
      <PrivateAssetList />
    {/if}
  </div>
</PrivateAsset>
