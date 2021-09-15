<script lang="ts">
  import type { Product, ListingSalePayload } from '$lib/sku-item/types';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { formatCurrency } from '$util/format';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
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
      <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={product.sku.nftPublicAssets?.[0]} preview />
        </div>
        <ProductModalInfo {product} sku={product.sku} />
        <div class="flex flex-col gap-2">
          <div class="input-container flex flex-col items-center mt-4 mb-2 relative">
            <input
              data-initial-focus
              name="price"
              type="number"
              bind:value={price}
              placeholder="Enter price"
              class="relative w-full bg-gray-50 py-3 pl-8 pr-2 outline-none rounded-lg text-center border-0 text-xl"
              class:border-red-600={!!$errors.price}
            />
          </div>
          {#if $errors.price}
            <div class="text-red-500 text-sm">{$errors.price}</div>
          {/if}
        </div>
        <div class="border-b border-gray-200 text-gray-400 font-medium mb-2">
          <div class="flex justify-between pb-1 mb-1">
            <span>Marketplace fee ({marketplaceFee}%):</span>
            <span>{formatCurrency(marketplaceFeePrice)}</span>
          </div>
          {#if royaltyFee > 0}
            <div class="flex justify-between pb-1 mb-1">
              <span>Creator royalty fee ({royaltyFee}%):</span>
              <span>{formatCurrency(royaltyFeePrice)}</span>
            </div>
          {/if}
        </div>
        <div class="flex flex-col">
          <div class="flex justify-between">
            <span class="font-semibold">Final Payout:</span>
            <span class="font-bold">{formatCurrency(total)}</span>
          </div>
        </div>
        <div class="text-sm text-gray-400">
          If your NFT is bought on the marketplace, payment will be transferred to your INFINITE wallet.
        </div>
        <Button class="w-full mt-6" type="submit" {disabled}>Start Sale</Button>
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
