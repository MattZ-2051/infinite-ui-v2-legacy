<script lang="ts">
  import type { Product, ListingSalePayload } from '$lib/sku-item/types';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { toast } from '$ui/toast';
  import Rarity from '$lib/rarity/Rarity.svelte';
  import Button from '$lib/components/Button.svelte';
  import { closeModal, Modal } from '$ui/modals';
  import { formatCurrency } from '$util/format';
  import IconRedeem from '$lib/sku-item/IconRedeem.svelte';
  import { saleStarted } from './product.store';
  import { createSale } from './product.api';
  import { getSellingFee, getRoyaltyFee } from './product.fee';

  export let product: Product;
  export let isOpen: boolean;

  let price;
  let disabled = false;

  $: marketplaceFee = getSellingFee(product);
  $: royaltyFee = getRoyaltyFee(product);
  $: royaltyFeePrice = Math.max(price * royaltyFee || 0, 0);
  $: marketplaceFeePrice = Math.max(price * marketplaceFee || 0, 0);
  $: total = Math.max(price * (1 - marketplaceFee - royaltyFee) || 0, 0);

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
      saleStarted({ product });
      closeModal();
      toast.success('Congrats! Your sale has started.');
    } catch {
      toast.danger('Whoops, something went wrong - please try again.');
    } finally {
      disabled = false;
    }
  }

  const schema = yup.object({
    price: yup
      .number()
      .typeError('Enter a valid number.')
      .moreThan(0, 'Enter a positive amount.')
      .required('Amount is required.'),
  });

  const { form, errors } = createForm({
    onSubmit: async () => {
      startSale();
    },
    validate: validateSchema(schema),
  });
</script>

{#if isOpen}
  <Modal title="List your NFT for sale" on:close={closeModal} class="max-w-md">
    <form use:form>
      <div class="flex flex-col px-10 mb-4">
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
                <IconRedeem class="mr-1" />
                / Redeemable
              {/if}
            </div>
            <div class="flex justify-self-end ml-4">
              <span class="text-gray-400">Serial:</span>
              <span>#{product.serialNumber}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 my-6">
          <div class="input-container flex flex-col items-center relative">
            <input
              data-initial-focus
              name="price"
              type="number"
              bind:value={price}
              placeholder="Enter price"
              class="relative w-full bg-gray-100 py-3 pl-8 pr-2 outline-none rounded-2xl text-center border-0 text-xl"
              class:border-red-600={!!$errors.price}
            />
          </div>
          {#if $errors.price}
            <div class="text-red-500 font-extrabold italic text-sm ">{$errors.price}</div>
          {/if}
          <div class="flex justify-between text-gray-400">
            <span>Marketplace fee ({marketplaceFee}%):</span>
            <span>{formatCurrency(marketplaceFeePrice)}</span>
          </div>
          {#if royaltyFee > 0}
            <div class="flex justify-between text-gray-400">
              <span>Creator royalty fee ({royaltyFee}%):</span>
              <span>{formatCurrency(royaltyFeePrice)}</span>
            </div>
          {/if}
        </div>
        <div class="flex flex-col gap-5 pt-5 border-t border-gray-200">
          <div class="flex justify-between  font-bold">
            <span>Final Payout:</span>
            <span class="text-xl">{formatCurrency(total)}</span>
          </div>
          <div class="flex flex-col text-gray-400 justify-items-center items-center">
            <span class="text-center">
              If your NFT is bought on the marketplace, payment will be transferred to your INFINITE wallet.
            </span>
          </div>
        </div>
        <div class="flex items-center py-4">
          <Button type="submit" {disabled}>Start Sale</Button>
        </div>
      </div>
    </form>
  </Modal>
{/if}

<style>
  .input-container::before {
    content: '$';
    position: absolute;
    left: 12px;
    bottom: 12px;
    z-index: 1;
    @apply text-xl;
    @apply text-gray-400;
  }
</style>
