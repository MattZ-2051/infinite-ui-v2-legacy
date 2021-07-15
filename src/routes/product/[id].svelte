<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Product } from '$lib/sku-item/types';
  import { get } from 'svelte/store';
  import { browser } from '$app/env';
  import { loadProduct, loadProductTransactions } from '$lib/features/product/product.api';
  import { loadProductBids } from '$lib/features/product/auction/auction.api';
  import { isActiveAuction } from '$lib/features/product/product.service';
  import ProductPage from '$lib/features/product/Product.svelte';
  import {
    transactions,
    totalTransactions,
    product as product$,
    resetProductStores,
  } from '$lib/features/product/product.store';
  import { resetAuctionStores, minAllowedBid } from '$lib/features/product/auction/auction.store';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    const page_ = +page.query.get(`page`) || 1;

    let product = browser ? get(product$) : undefined;
    if (id !== product?._id) {
      product = await loadProduct({ id, fetch });
      resetProductStores(product);
      resetAuctionStores();
    }

    const tab = page.query.get(`tab`);

    if (isActiveAuction(product) && (tab === 'auction' || !tab)) {
      minAllowedBid.set(product.activeProductListings[0].minBid);
      await loadProductBids({ id: product.activeProductListings[0]?._id, page: page_, fetch });
    }

    if (tab === 'history' || !tab) {
      const { total, data } = await loadProductTransactions({ id, page: page_, fetch });
      totalTransactions.set(total);
      transactions.set(data);
    }

    return {
      props: {
        product,
      },
    };
  }
</script>

<script lang="ts">
  import { navigating } from '$app/stores';
  import { Seo, chooseSkuSocialImage } from '$lib/seo';

  export let product: Product;

  function resetStore(path: string) {
    // Leaving current product page
    if (path && path !== `/product/${product._id}`) {
      resetProductStores();
      resetAuctionStores();
    }
  }

  $: resetStore($navigating?.to?.path);
</script>

<Seo title={`${product.sku.name} / #${product.serialNumber}`} image={chooseSkuSocialImage(product.sku)} />

<ProductPage {product} />
