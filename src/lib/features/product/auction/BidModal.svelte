<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { formatCurrency } from '$util/format';
  import { user } from '$lib/user';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import routes from '$project/routes';
  import { placeBidFx } from './auction.store';
  import { getBiddingFee } from '../product.fee';

  export let isOpen = false;
  export let product: Product;
  export let amount: number;

  const marketplaceFee = getBiddingFee(product);
  const waitingForAPI = placeBidFx.pending;

  $: listing = product.activeProductListings[0]; // BE team words: ActiveProductListings can only have one element.
  $: bid = formatCurrency(amount);
  $: total = formatCurrency(amount * (1 + marketplaceFee));

  let acceptedTerms = false;

  async function onPlaceBid() {
    await placeBidFx({ listing, amount });
    closeModal();
  }
</script>

{#if isOpen}
  <Modal title="Confirm your bid:">
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      <div class="flex justify-center items-center bg-black h-72">
        <FilePreview item={product.sku.nftPublicAssets?.[0]} preview />
      </div>
      <div class="text-green-500">
        Your current balance {formatCurrency($user['0'].availableBalance)}
      </div>
      <ProductModalInfo {product} sku={product.sku} />
      <div class="flex justify-between border-solid font-medium">
        <span class="text-gray-500">Your Bid:</span>
        <span>{bid}</span>
      </div>
      <div class="flex justify-between border-solid border-b border-gray-200 pb-4 font-medium">
        <span class="text-gray-500">Marketplace fee ({marketplaceFee * 100}%)</span>
        <span>{formatCurrency(marketplaceFee * amount)}</span>
      </div>
      <div class="flex justify-between font-medium">
        <span>Total cost (if you win):</span>
        <span>{total}</span>
      </div>
      <div class="max-w-md text-gray-600 text-sm">
        Placing a bid will freeze the associated funds from your wallet until the auction ends. Bids cannot be canceled
        but can be increased as the auction progresses.
      </div>
      <div class="flex items-center">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            bind:checked={acceptedTerms}
            class="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black mr-2"
          />
          I accept the <a href={routes.terms} class="ml-1 underline">Terms & Conditions</a>
        </label>
      </div>
      <div class="max-w-md text-gray-600 text-sm">
        All resales of this product are subject to a {product.sku.royaltyFeePercentage}% royalty fee set by and to be
        paid to the original creator.
      </div>
      <Button variant="brand" class="w-full mt-6" disabled={$waitingForAPI || !acceptedTerms} on:click={onPlaceBid}
        >Place Bid</Button
      >
    </div>
  </Modal>
{/if}
