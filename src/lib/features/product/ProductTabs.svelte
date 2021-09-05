<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { Tabs, Tab } from '$ui/tabs';
  import { userId } from '$lib/user';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { PrivateAsset, PrivateAssetList } from '$lib/private-asset';
  import routes from '$lib/routes';
  import ProductHistory from './ProductHistory.svelte';
  import ProductAuction from './auction/ProductAuction.svelte';
  import { hasAuction, isOwner } from './product.service';

  export let product: Product;

  $: userOwnsProduct = isOwner(product, $userId);
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
  <Tabs items={getItems(totalPrivateAssets)} menuBreakpoint="sm" defaultSelectedId={tab} on:select={redirect}>
    <Tab id="auction">
      <ProductAuction {product} canBid={!userOwnsProduct} />
    </Tab>
    <Tab id="history">
      <ProductHistory />
    </Tab>
    <Tab id="owner">
      <PrivateAssetList />
    </Tab>
  </Tabs>
</PrivateAsset>
