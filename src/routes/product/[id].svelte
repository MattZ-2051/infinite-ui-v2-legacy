<script context="module" lang="ts">
  import type { LoadInput } from '@sveltejs/kit';
  import type { Product } from '$lib/sku-item/types';
  import { get } from 'svelte/store';
  import { browser } from '$app/env';
  import { loadProduct, loadProductAuctions, loadProductTransactions } from '$lib/features/product/product.api';
  import { hasAuction } from '$lib/features/product/product.service';
  import ProductPage from '$lib/features/product/Product.svelte';
  import {
    transactions,
    totalTransactions,
    auctions,
    totalAuctions,
    product as product$,
    reset,
  } from '$lib/features/product/product.store';

  export async function load({ page, fetch }: LoadInput) {
    const { id } = page.params;
    const page_ = +page.query.get(`page`) || 1;

    let product = browser ? get(product$) : undefined;
    if (id !== product?._id) {
      product = await loadProduct({ id, fetch });
      reset(product);
    }

    const tab = page.query.get(`tab`);

    if (hasAuction(product) && (tab === 'auctions' || !tab)) {
      const { total, data } = await loadProductAuctions({
        id: product.activeProductListings[0]?._id,
        page: page_,
        fetch,
      });
      totalAuctions.set(total);
      auctions.set(data);
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
  import { Seo } from '$lib/seo';

  export let product: Product;

  function resetStore(path: string) {
    // Leaving current product page
    if (path && path !== `/product/${product._id}`) {
      reset();
    }
  }

  $: resetStore($navigating?.to?.path);
</script>

<Seo
  title={`${product.sku.name} / #${product.serialNumber}`}
  image={product.sku.nftPublicAssets?.find((item) => item.type.includes('image'))}
/>

<ProductPage {product} />
