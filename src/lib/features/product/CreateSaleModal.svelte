<script lang="ts">
  import type { Product, Sku, ListingSalePayload } from '$lib/sku-item/types';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext } from 'svelte';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { toast } from '$ui/toast';
  import { FormElement } from '$lib/components/form';
  import Button from '$lib/components/Button.svelte';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { formatCurrency } from '$util/format';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import routes from '$project/routes';
  import {
    getSellingFee as getProductSellingFee,
    getRoyaltyFee as getProductRoyaltyFee,
  } from '$lib/features/product/product.fee';
  import {
    getSellingFee as getSkuSellingFee,
    getRoyaltyFee as getSkuRoyaltyFee,
  } from '$lib/features/sku-auction/sku-auction.fee';
  import { saleStarted } from '$lib/features/product/product.store';
  import { createSale } from '$lib/features/product/product.api';

  export let product: Product = undefined;
  export let sku: Sku = undefined;
  export let isOpen: boolean;

  const schema = yup.object({
    price: yup
      .number()
      .typeError('Enter a valid number.')
      .moreThan(0, 'Enter a positive amount.')
      .required('Amount is required.'),
  });

  const { form, errors, data, isSubmitting } = createForm<{ price: number }>({
    onSubmit: async () => {
      startSale();
    },
    validate: validateSchema(schema),
  });

  async function startSale() {
    const listing: ListingSalePayload = {
      price: $data.price,
      type: product ? 'product' : 'sku',
      product: product?._id,
      saleType: 'fixed',
      startDate: new Date(),
      issuer: product ? product.owner?._id : sku.issuer?._id,
      sku: product ? product.sku?._id : sku?._id,
      supply: 1,
    };
    try {
      await createSale({ listing });
      saleStarted({ sku, product });
      closeModal();
      toast.success('Congrats! Your sale has kicked off!');
    } catch {
      toast.danger(
        `An error occured when creating your sale. Please, try again or <a href=${routes.help}>contact support</a> if this issue continues.`
      );
    }
  }

  $: marketplaceFee = product ? getProductSellingFee(product) : getSkuSellingFee(sku);
  $: royaltyFee = product ? getProductRoyaltyFee(product) : getSkuRoyaltyFee(sku);
  $: royaltyFeePrice = Math.max($data.price * royaltyFee || 0, 0);
  $: marketplaceFeePrice = Math.max($data.price * marketplaceFee || 0, 0);
  $: total = Math.max($data.price * (1 - marketplaceFee - royaltyFee) || 0, 0);
  $: nftPublicAssets = product
    ? product?.nftPublicAssets?.[0] || product.sku.nftPublicAssets?.[0]
    : sku?.nftPublicAssets?.[0];

  setContext('errors', errors);
</script>

{#if isOpen}
  <Modal title="List your NFT for sale" class="max-w-md">
    <form use:form>
      <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={nftPublicAssets} preview />
        </div>
        <ProductModalInfo {product} sku={product ? product.sku : sku} />
        <div class="flex flex-col gap-2">
          <FormElement
            class="bg-gray-50 py-3 mt-4 mb-2"
            variant="rounded"
            data-initial-focus
            name="price"
            type="number"
            placeholder="Enter price"
            before="$"
          />
        </div>
        <div class="border-b border-gray-200 text-gray-500 font-medium mb-2">
          <div class="flex justify-between pb-1 mb-1">
            <span>Marketplace fee ({marketplaceFee * 100}%):</span>
            <span>{formatCurrency(marketplaceFeePrice)}</span>
          </div>
          {#if royaltyFee > 0}
            <div class="flex justify-between pb-1 mb-1">
              <span>Creator royalty fee ({royaltyFee * 100}%):</span>
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
        <div class="text-sm text-gray-500">
          Once someone purchases your item on the marketplace, payment will be transferred to your wallet.
        </div>
        <Button variant="brand" class="w-full mt-6" type="submit" disabled={$isSubmitting}>Start Sale</Button>
      </div>
    </form>
  </Modal>
{/if}
