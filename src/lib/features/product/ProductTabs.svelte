<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { TabType, Tab } from '$lib/features/product/types';
  import { Tabs } from '$ui/tabs';
  import { goto } from '$app/navigation';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import routes from '$project/routes';
  import { PRODUCT_PAGE_TABS } from '$project/variables';
  import ProductHistory from './ProductHistory.svelte';
  import ProductAuction from './auction/ProductAuction.svelte';
  import SkuDescription from '../sku/SkuDescription.svelte';

  export let product: Product;
  export let tab: TabType;
  export let isProductOwner: boolean;

  function redirect({ detail }: CustomEvent<TabType>) {
    goto(`${routes.product(product._id)}?tab=${detail}`, { keepfocus: true });
  }

  let initialItems: Tab[] = [
    { id: 'description', title: 'Description' },
    {
      id: 'auction',
      title: 'Auction',
    },
    {
      id: 'history',
      title: 'History',
    },
    { id: 'owner', title: 'Unlockable Content' },
  ];

  function getItems() {
    const visibleItems = initialItems.filter((item) => PRODUCT_PAGE_TABS.includes(item.id));
    return visibleItems;
  }

  $: isTransactionLater = false;
  $: initialItems = isTransactionLater ? initialItems.filter((item) => item.id !== 'auction') : initialItems;
</script>

<PrivateAsset skuId={undefined} productId={product._id} let:total={totalPrivateAssets}>
  <Tabs
    class="mx-4 md:ml-8 lg:ml-12 product-tabs"
    items={getItems()}
    itemClass="text-xl lg:text-2xl items-center"
    menuBreakpoint="sm"
    defaultSelectedId={tab}
    on:select={redirect}
    --tab-border-color-active="transparent"
    --tab-border-color="var(--tab-border-color-product)"
  />

  <div class="flex-grow px-4 md:pl-8 lg:px-12 pb-4 lg:pb-12" style="background-color: var(--product-tabs-bg);">
    {#if tab === 'description'}
      <div class="py-10">
        <SkuDescription content={product?.description || product.sku.description} />
      </div>
    {/if}
    {#if tab === 'auction' && !isTransactionLater}
      <ProductAuction {product} />
    {/if}
    {#if tab === 'history'}
      <ProductHistory />
    {/if}
    {#if tab === 'owner'}
      <PrivateAssetList {isProductOwner} />
    {/if}
  </div>
</PrivateAsset>
