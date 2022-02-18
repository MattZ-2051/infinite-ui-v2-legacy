<script lang="ts">
  import type { Sku, Product, Listing } from '$lib/sku-item/types';
  import { FilePreview } from '$ui/file';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import OrderProductPricing from '$lib/features/order/OrderProductPricing.svelte';
  import { getBuyingFee, getSkuBuyingFee } from '$lib/features/product/product.fee';

  export let sku: Sku = undefined;
  export let product: Product = undefined;
  export let listing: Listing;
  export let rate: number = undefined;

  const _sku = product ? product.sku : sku;
  const listingPrice = listing?.saleType === 'giveaway' ? 0 : listing?.price;
  const marketplaceFee = product ? getBuyingFee(product) : getSkuBuyingFee(sku);
</script>

<article class="py-6 mx-auto max-w-xl xl:max-w-sm">
  <header><h3 class="text-2xl">Order Summary</h3></header>
  <figure class="m-10">
    <FilePreview item={_sku.nftPublicAssets?.[0]} preview />
  </figure>
  <section>
    <ProductModalInfo sku={_sku} />
  </section>
  <section class="mt-4 pt-6">
    <OrderProductPricing price={listingPrice} {marketplaceFee} currency={_sku.currency} {rate} />
  </section>
</article>
