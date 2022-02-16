<script lang="ts">
  import type { Product, Sku } from '$lib/sku-item/types';

  let _sku: Sku = undefined;
  let _product: Product = undefined;

  const product = _sku ? _sku : _product;

  export { _sku as sku };
  export { _product as product };
</script>

<div>checkout page</div>
<h1>product {product._id}</h1>
