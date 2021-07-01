<script lang="ts">
  import type { Product, ListingSalePayload } from '$lib/sku-item/types';
  import { toast } from '$ui/toast';
  import { closeModal, Modal } from '$ui/modals';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Button from '$lib/components/Button.svelte';
  import { goto } from '$app/navigation';
  import { formatCurrency } from '$util/format';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { createSale } from './product.api';

  export let product: Partial<Product>;
  export let isOpen: boolean;
  let price: number;
  let disabled = false;

  $: marketplaceFee = product?.resaleSellersFeePercentage;
  $: marketplaceFeePrice = price && marketplaceFee ? (price * marketplaceFee) / 100 : 0;
  $: creatorRoyalFee = product?.resale && product?.royaltyFeePercentage;
  $: creatorRoyalFeePrice = price && creatorRoyalFee ? (price * creatorRoyalFee) / 100 : 0;
  $: total = price ? price - marketplaceFeePrice - creatorRoyalFeePrice : 0;

  async function startSale() {
    disabled = true;
    const listing: ListingSalePayload = {
      price: price,
      type: 'product',
      product: product?._id,
      saleType: 'fixed',
      startDate: new Date(),
      issuer: product?.owner?._id,
      sku: product.sku,
      supply: 1,
    };
    try {
      await createSale({ listing });
      closeModal();
      goto(`/product/${product._id}`);
      toast.success('Congrats! Your sale has started.');
    } catch {
      toast.danger('Whoops, something went wrong - please try again.');
    } finally {
      disabled = false;
    }
  }
</script>

{#if isOpen}
  <Modal title="List your NFTs for sale" on:close={closeModal}>
    <div class="flex flex-col w-80 px-10 mb-4">
      <div class="flex flex-col justify-evenly gap-3 py-5 align-middle border-t border-b border-gray-200">
        <div class="flex justify-between">
          <span>{product.sku.issuerName}</span>
          <Rarity rarity={product.sku.rarity} />
        </div>
        <span class="text-xl">{product.sku.name}</span>
        <div class="flex justify-between">
          <div class="flex items-center flex-wrap flex-grow">
            {#if product.sku?.series?.name}
              <span>{product.sku.series.name}</span>
            {/if}
            {#if product.sku?.redeemable}
              <IconRedeem size="0.7" class="mr-1" />
              / Redeemable
            {/if}
          </div>
          <div class="flex justify-self-end ml-4">
            <span class="text-gray-400">Serial:</span>
            <span>#{product.serialNumber}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-5 my-6">
        <div class="input-container flex relative">
          <input
            type="number"
            bind:value={price}
            class="relative w-full bg-gray-100 py-3 pl-8 pr-2 outline-none rounded-3xl"
          />
        </div>
        <div class="flex justify-between text-gray-400">
          <span>Marketplace fee ({marketplaceFee}%):</span>
          <span>{formatCurrency(marketplaceFeePrice)}</span>
        </div>
        {#if creatorRoyalFee}
          <div class="flex justify-between text-gray-400">
            <span>Creator royalty fee ({creatorRoyalFee}%):</span>
            <span>{formatCurrency(creatorRoyalFeePrice)}</span>
          </div>
        {/if}
      </div>
      <div class="flex flex-col gap-5 pt-5 border-t border-gray-200">
        <div class="flex justify-between  font-bold">
          <span>Final Payout:</span>
          <span class="text-xl">{formatCurrency(total)}</span>
        </div>
        <div class="flex flex-col text-gray-400 justify-items-center items-center">
          <span class="text-center"
            >Listing your NFT for sale on the marketplace will allow it to be purchased by other users. Once listed for
            sale it cannot be canceled</span
          >
          <a href="https://support.suku.world/" class="text-black underline font-bold">Click here to learn more.</a>
        </div>
      </div>
    </div>
    <div class="flex items-center" slot="footer">
      <Button disabled={disabled || !price} on:click={startSale}>Start Sale</Button>
    </div>
  </Modal>
{/if}

<style>
  .input-container::before {
    content: '$';
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
    @apply text-xl;
    @apply text-gray-400;
  }
</style>
