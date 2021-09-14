<script lang="ts">
  import type { Product, Sku } from '$lib/sku-item/types';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { userId } from '$lib/user';
  import UserLink from '$lib/components/UserLink.svelte';
  import TalentLink from '$lib/components/talent/TalentLink.svelte';
  import ProductActions from './actions/ProductActions.svelte';

  export let product: Product;

  let sku: Sku;
  $: sku = product.sku;

  const cellClass = 'flex flex-col gap-1.5 py-4 px-6 overflow-hidden';
  const headerClass = 'text-white-opacity-50 text-sm';
</script>

<div
  class="rounded-lg border border-white-opacity-20 text-white overflow-hidden grid grid-cols-2 lg:grid-cols-none lg:grid-flow-col lg:divide-x lg:divide-white-opacity-20 flex-grow"
>
  <div class={cellClass}>
    <div class={headerClass}>Owner</div>
    <div><UserLink username={product.owner.username} /></div>
  </div>
  <div class={cellClass}>
    <div class={headerClass}>Status</div>
    <div class="flex gap-2">
      {#if sku.redeemable || true}
        <IconRedeem />
        <span>Redeemable</span>
      {/if}
    </div>
  </div>
  <div class={cellClass}>
    <div class={headerClass}>Created by</div>
    <div><TalentLink profile={sku.issuer} /></div>
  </div>
  <div class={cellClass}>
    <div class={headerClass}>Hedera Token</div>
    <div class="truncate"><a class="link" href={product.explorerLink}>{product.tokenId}</a></div>
  </div>
  <ProductActions {product} userId={$userId} />
</div>
