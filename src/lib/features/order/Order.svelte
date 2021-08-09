<script lang="ts">
  import type { Listing, Sku, Product } from '$lib/sku-item/types';
  import type { SkuPurchaseTransaction } from './types';
  import type { User } from '$lib/user/types';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { formatCurrency } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import { productBought, pendingBuyCreated } from '$lib/features/product/product.store';
  import { getBuyingFee } from '$lib/features/product/product.fee';
  import { toast } from '$ui/toast';
  import routes from '$lib/routes';
  import OrderProductPricing from './OrderProductPricing.svelte';
  import { purchaseSkuListing } from './order.api';

  export let isOpen: boolean;
  export let sku: Sku = undefined;
  export let product: Product = undefined;
  export let serial: string = undefined;
  export let listing: Listing;
  export let user: User;

  let purchasing = false;
  let result: SkuPurchaseTransaction;
  $: _sku = product ? product.sku : sku;

  let acceptedTerms = false;

  async function submitOrder() {
    if (!acceptedTerms) {
      toast.danger('Please agree to the terms and conditions.');
      return;
    }

    purchasing = true;
    try {
      result = await purchaseSkuListing(listing._id);
      // result = { status: 'pending' } as any;
      if (product) {
        if (result?.status === 'pending') {
          pendingBuyCreated(product._id);
        } else if (result?.status === 'success') {
          productBought({ product });
        }
      }

      if (!result || result.errorLog || result.status === 'error') {
        throw new Error('error');
      }
    } catch {
      toast.danger(
        `There was an error processing your purchase. Please, try again or see the <a href=${routes.help}>help page</a> to learn more.`
      );
    } finally {
      purchasing = false;
    }
  }

  $: marketplaceFee = product ? getBuyingFee(product) : user.initialBuyersFeePercentage;
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > user.availableBalance;
</script>

{#if isOpen}
  <Modal on:close={closeModal} class="max-w-md">
    <div class="flex justify-center items-center bg-black h-56">
      <FilePreview item={_sku.nftPublicAssets?.[0]} preview />
    </div>
    <div class="px-8 py-6 flex flex-col items-center gap-5">
      <div class="flex flex-col gap-1 items-center font-medium">
        {#if result?.status === 'success'}
          <div class="text-2xl">🤘 Yeah! Payment successful.</div>
        {:else if result?.status === 'pending'}
          <div class="text-2xl">We're processing your order!</div>
        {:else}
          <div class="text-2xl">
            {#if insufficientFunds}⚠️ Whoops, insufficient funds!{:else}Confirm your order:{/if}
          </div>
          <div class={insufficientFunds ? 'text-red-500' : 'text-green-500'}>
            Your current balance {formatCurrency(user.availableBalance)}
          </div>
        {/if}
      </div>
      <div>
        <ProductModalInfo sku={_sku} {serial} />
        {#if !result}
          <hr class="h-px w-full my-4" />
          <OrderProductPricing price={listing.price} {marketplaceFee} />
        {/if}
      </div>
      <div class="flex flex-col max-w-xs gap-5 text-gray-500 font-bold text-center">
        {#if result?.status === 'success'}
          <span>You successfully bought this item, and now is part of your collection.</span>
          <div class="flex flex-col gap-5">
            {#if result.product._id}
              <a href={routes.product(result.product._id)}><Button type="button">View Your Product</Button></a>
            {/if}
            <a class="font-medium justify-self-center" href={routes.marketplace}> Back to Marketplace </a>
          </div>
        {:else if result?.status === 'pending'}
          <span
            >We will send your an email when your purchase has been completed. Refresh the page to view the updated
            status.</span
          >
          <div class="flex flex-col gap-5">
            <Button type="button" on:click={closeModal}>Continue</Button>
            <a class="font-medium justify-self-center" href={routes.wallet}>View Pending Transactions</a>
          </div>
        {:else if insufficientFunds}
          <span> You need more founds to make this purchase. </span>
          <Button href={routes.wallet}>Add Funds</Button>
        {:else}
          <div class="flex items-center justify-center py-4 my-4">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                bind:checked={acceptedTerms}
                class="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black mr-2"
              />
              I accept the <a href={routes.terms} class="ml-1 underline">Terms & Conditions</a>
            </label>
          </div>
          <span class="font-bold text-center">
            <!-- <div class="text-black">
              Royalty fee per unit aprox {formatCurrency(royaltyFee)} ({_sku.royaltyFeePercentage}%)
            </div> -->
            <div>Confirming this action will deduct the associated funds from your wallet.</div>
          </span>
          <Button type="button" disabled={purchasing} on:click={submitOrder}>Place Order</Button>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
