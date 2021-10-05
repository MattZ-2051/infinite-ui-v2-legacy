<script lang="ts">
  import type { Listing, Sku, Product } from '$lib/sku-item/types';
  import type { SkuPurchaseTransaction } from './types';
  import type { User } from '$lib/user/types';
  import { variables } from '$lib/variables';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { formatCurrency } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import { productBought, pendingBuyCreated } from '$lib/features/product/product.store';
  import { getBuyingFee } from '$lib/features/product/product.fee';
  import { toast } from '$ui/toast';
  import routes from '$project/routes';
  import { skuBought } from '$lib/features/sku/sku.store';
  import OrderProductPricing from './OrderProductPricing.svelte';
  import { purchaseSkuListing } from './order.api';

  export let isOpen: boolean;
  export let sku: Sku = undefined;
  export let product: Product = undefined;
  export let listing: Listing;
  export let user: User;

  let purchasing = false;
  let result: SkuPurchaseTransaction;
  $: _sku = product ? product.sku : sku;

  let acceptedTerms = false;
  let acceptedTermsNft = false;

  async function submitOrder() {
    if (!acceptedTerms || (sku?.customNftTerms && !acceptedTermsNft)) {
      toast.danger('Please agree to the Terms and Conditions in order to move forward.');
      return;
    }

    purchasing = true;
    try {
      result = await purchaseSkuListing(listing._id);
      if (product) {
        if (result?.status === 'pending') {
          pendingBuyCreated(product._id);
        } else if (result?.status === 'success') {
          productBought({ product });
        }
      } else {
        if (result?.status === 'pending') {
          pendingBuyCreated(_sku._id);
        } else if (result?.status === 'success') {
          skuBought();
        }
      }

      if (!result || result.errorLog || result.status === 'error') {
        throw new Error('error');
      }
    } catch {
      toast.danger(
        `There was an error processing your purchase. Please, try again or <a href=${routes.help}>contact support</a> if this issue continues.`
      );
    } finally {
      purchasing = false;
    }
  }

  $: marketplaceFee = product ? getBuyingFee(product) : variables.initialBuyersFeePercentage;
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > user.availableBalance;

  let title = '';
  $: if (result?.status === 'success') {
    title === 'Yeah! Payment successful.';
  } else if (result?.status === 'pending') {
    title = `We're processing your order!`;
  } else if (insufficientFunds) {
    title = 'Whoops, insufficient funds!';
  } else {
    title = 'Confirm your order:';
  }
</script>

{#if isOpen}
  <Modal {title} class="max-w-md" on:close={closeModal}>
    <div class="px-10 flex flex-col gap-4 pb-10">
      <div class="flex justify-center items-center bg-black h-72">
        <FilePreview item={_sku.nftPublicAssets?.[0]} preview />
      </div>
      <div class={insufficientFunds ? 'text-red-500' : 'text-green-500'}>
        Your current balance {formatCurrency(user.availableBalance)}
      </div>
      <ProductModalInfo sku={_sku} />
      {#if !result}
        <div>
          <hr class="h-px w-full my-4" />
          <OrderProductPricing price={listing.price} {marketplaceFee} />
        </div>
      {/if}
      <div class="flex flex-col gap-5 text-gray-500">
        {#if result?.status === 'success'}
          <span>You successfully bought this item, and now is part of your collection.</span>
          <div class="flex flex-col gap-5">
            {#if result.product._id}
              <a href={routes.product(result.product._id)}>View Your Product</a>
            {/if}
            <a class="font-medium self-center" href={routes.marketplace}> Back to Marketplace </a>
          </div>
        {:else if result?.status === 'pending'}
          <span
            >We will send your an email when your purchase has been completed. Refresh the page to view the updated
            status.</span
          >
          <div class="flex flex-col gap-5">
            <Button variant="brand" class="mt-6" on:click={closeModal}>Continue</Button>
            <Button class="font-medium self-center" href={routes.wallet}>View Pending Transactions</Button>
          </div>
        {:else if insufficientFunds}
          <span> You need more funds to make this purchase. </span>
          <Button variant="brand" class="mt-6" href={routes.wallet}>Add Funds</Button>
        {:else}
          <div class="flex items-center justify-start">
            <label class="inline-flex items-center">
              <input type="checkbox" bind:checked={acceptedTerms} class="border-gray-400 border-2 text-black mr-2" />
              I accept the <a href={routes.terms} class="ml-1 underline">Terms & Conditions</a>
            </label>
          </div>
          {#if sku?.customNftTerms}
            <div class="flex items-center justify-start">
              <label class="inline-flex items-center">
                <input
                  type="checkbox"
                  bind:checked={acceptedTermsNft}
                  class="border-gray-400 border-2 text-black mr-2"
                />
                I accept the <a href={sku.customNftTerms} class="ml-1 underline">Nft Terms & Conditions</a>
              </label>
            </div>
          {/if}
          <div class="text-sm text-gray-500">
            Confirming this action will deduct the associated funds from your wallet.
          </div>
          <Button variant="brand" class="mt-6" disabled={purchasing} on:click={submitOrder}>Place Order</Button>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
