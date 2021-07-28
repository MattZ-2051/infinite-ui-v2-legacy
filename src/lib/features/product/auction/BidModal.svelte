<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { User } from '$lib/user/types';
  import { variables } from '$lib/variables';
  import { closeModal, Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import { placeBidFx } from './auction.store';

  export let isOpen = false;
  export let product: Product;
  export let amount: number;
  export let user: User;

  const marketplaceFee = variables.marketplaceFee;
  const waitingForAPI = placeBidFx.pending;

  $: listing = product.listing;
  $: bid = formatCurrency(amount);
  $: fee = formatCurrency(marketplaceFee * amount);
  $: total = formatCurrency(amount * (1 + marketplaceFee));

  let acceptedTerms = false;

  async function onPlaceBid() {
    if (!acceptedTerms) {
      toast.danger('Please agree to the terms and conditions.');
      return;
    }

    await placeBidFx({ listing, amount });
    closeModal();
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="text-2xl font-medium" slot="title">Confirm your bid</div>
    <div class="px-10 pb-6 text-center font-medium text-green-500">
      Your current balance {formatCurrency(user.availableBalance)}
    </div>
    <div class="flex flex-col px-10 py-2">
      <div class="flex gap-8 justify-between border-solid border-t border-b border-gray-200 py-4">
        <ProductModalInfo sku={product.sku} serial={product.serialNumber} />
      </div>
      <div class="flex justify-between border-solid pt-4 mb-2 text-gray-400 font-medium">
        <span>Your Bid:</span>
        <span class="text-black">{bid}</span>
      </div>
      <div class="flex justify-between border-solid border-b border-gray-200 pb-4 text-gray-400 font-medium">
        <span>MarketPlace fee ({marketplaceFee * 100}%)</span>
        <span>{fee}</span>
      </div>
      <div class="flex justify-between font-medium pt-4">
        <span>Total cost <span class="text-gray-400">(if you win)</span>:</span>
        <span class="font-semibold text-xl">{total}</span>
      </div>
    </div>
    <div class="bg-gray-100 text-gray-500 my-4 py-6">
      <div class="max-w-md m-auto text-center">
        Placing a bid will freeze the associated funds from your wallet until the auction ends. Bids cannot be canceled
        but can be increased as the auction progresses.
      </div>
    </div>
    <div class="flex items-center justify-center py-4 my-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          bind:checked={acceptedTerms}
          class="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black mr-2"
        />
        I accept the <a href="/terms" class="ml-1 underline">Terms & Conditions</a>
      </label>
    </div>
    <div class="text-gray-400 px-10 py-4 my-4">
      <div class="max-w-md m-auto text-center">
        All resales of this product are subject to a {product.sku.royaltyFeePercentage}% royalty fee set by and to be
        paid to the original creator.
      </div>
    </div>
    <div class="w-full px-10  mb-6">
      <Button type="button" disabled={$waitingForAPI} on:click={onPlaceBid}>Place Bid</Button>
    </div>
  </Modal>
{/if}
