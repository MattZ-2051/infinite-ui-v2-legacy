<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { Listing, Sku, Product } from '$lib/sku-item/types';
  import type { SkuPurchaseTransaction } from './types';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrency, formatEthCurrency } from '$util/format';
  import { isEthAddress } from '$util/validateEthAddress';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import { productBought, pendingBuyCreated } from '$lib/features/product/product.store';
  import { getBuyingFee, getSkuBuyingFee } from '$lib/features/product/product.fee';
  import { toast } from '$ui/toast';
  import routes from '$project/routes';
  import { skuBought } from '$lib/features/sku/sku.store';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import OrderProductPricing from './OrderProductPricing.svelte';
  import { purchaseSkuListing, claimGiveawaySkuListing } from './order.api';
  import { handleSkuClaimError } from './order.service';

  export let isOpen: boolean;
  export let sku: Sku = undefined;
  export let product: Product = undefined;
  export let listing: Listing;

  let purchasing = false;
  let result: SkuPurchaseTransaction;
  $: _sku = product ? product.sku : sku;

  let acceptedTerms = false;
  let acceptedTermsNft = false;
  const listingPrice = listing.saleType === 'giveaway' ? 0 : listing.price;

  async function submitOrder() {
    if ($wallet.kycRequired) {
      return toast.danger(
        `Your wallet balance is currently >= ${formatCurrency(
          10_000
        )} USD, therefore, you will not be able to make deposits, withdrawals, purchases until you complete KYC level 2.`
      );
    }
    if (!acceptedTerms || (sku?.customNftTerms && !acceptedTermsNft)) {
      toast.danger('Please agree to the Terms and Conditions in order to move forward.');
      return;
    }

    if (_sku.currency === 'ETH' && !validEthAddress) {
      toast.danger('Please enter a valid ERC20 address to send the NFT to.');
      return;
    }

    purchasing = true;

    const isGiveAway = listing.saleType === 'giveaway';

    if (isGiveAway) {
      try {
        result = await claimGiveawaySkuListing(listing._id);
        if (result) {
          closeModal();
          skuBought();
          toast.success('Your NFT was successfully minted!');
        }
      } catch (error) {
        toast.danger(handleSkuClaimError(error));
      } finally {
        purchasing = false;
      }
    } else {
      try {
        if (_sku.currency === 'USD') {
          result = await purchaseSkuListing(listing._id);
        } else if (_sku.currency === 'ETH') {
          result = await purchaseSkuListing(listing._id, ethAddress);
        }

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
      } catch (error) {
        toast.danger(handleSkuClaimError(error));
      } finally {
        purchasing = false;
      }
    }
  }

  const userUsdBalance = $wallet?.balanceInfo.find((x) => x.currency === 'USD').totalBalance;
  const userEthBalance = $wallet?.balanceInfo.find((x) => x.currency === 'ETH').totalBalance;
  $: userBalance = _sku.currency === 'ETH' ? userEthBalance : userUsdBalance;

  $: marketplaceFee = product ? getBuyingFee(product) : getSkuBuyingFee(sku);
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > +userBalance;
  $: ethAddress = '';
  $: validEthAddress = undefined;

  function onEthAddressInput(event) {
    const { value } = event.target as HTMLInputElement;
    ethAddress = value;
    validEthAddress = isEthAddress(value);
  }

  let copiedLink = false;

  const onCopyLink = async () => {
    await copy(ethAddress);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };

  let title = '';
  $: if (result?.status === 'success') {
    title === 'Yeah! Payment successful.';
  } else if (result?.status === 'pending' || purchasing) {
    title = `We're processing your order!`;
  } else if (insufficientFunds) {
    title = 'Whoops, insufficient funds!';
  } else {
    title = 'Complete your purchase:';
  }
</script>

{#if isOpen}
  <Modal {title} class="max-w-md">
    <div class="px-10 flex flex-col gap-6 pb-10">
      {#if _sku.currency === 'ETH'}
        <div class="text-2xl font-normal pr-8">1. ETH address destination</div>
      {/if}
      {#if _sku.currency === 'USD'}
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={_sku.nftPublicAssets?.[0]} preview />
        </div>
      {:else if _sku.currency === 'ETH'}
        <div class="border-solid border-b border-gray-200 pb-8">
          <Input
            name="eth-address"
            class={`pb-10 px-6 bg-gray-50 mt-4 mb-2 border border-solid border-gray-50 rounded-xl ${
              validEthAddress === false ? 'text-red-500' : ''
            }`}
            style="padding-bottom: 1rem; padding-top: 1rem"
            variant="base"
            error={validEthAddress === false ? '*This does not appear to be a valid ERC20 address' : ''}
            label="Enter the wallet ERC20 address to send the NFT to:"
            value={ethAddress}
            on:input={onEthAddressInput}
          >
            <svelte:fragment slot="after">
              {#if validEthAddress === true}
                {#if copiedLink}
                  <Icon path={mdiCheckCircle} color="green" />
                {:else}
                  <Icon path={mdiContentCopy} class="group-hover:opacity-40 ml-2" on:click={onCopyLink} />
                {/if}
              {/if}
            </svelte:fragment>
          </Input>
        </div>
      {/if}
      {#if _sku.currency === 'ETH'}
        <div class="text-2xl font-normal pr-8">2. Confirm your purchase</div>
      {/if}
      <ProductModalInfo sku={_sku} />
      <div>
        {#if !result}
          <OrderProductPricing price={listingPrice} {marketplaceFee} currency={_sku.currency} />
        {/if}
        <div class={`flex justify-between ${insufficientFunds ? 'text-red-500' : 'text-green-500'}`}>
          <span> Your current balance: </span>
          <span>
            {#if _sku.currency === 'USD'}
              {formatCurrency(userBalance)}
            {:else if _sku.currency === 'ETH'}
              {formatEthCurrency(userBalance, 'symbol')}
            {/if}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-5 text-gray-500">
        {#if result?.status === 'success'}
          <span>You successfully bought this item, and now is part of your collection.</span>
          <div class="flex flex-col gap-5">
            {#if result.product._id}
              <a href={routes.product(result.product._id)}>View Your Product</a>
            {/if}
            <a class="font-medium self-center" href={routes.marketplace}> Back to Marketplace </a>
          </div>
        {:else if result?.status === 'pending' || purchasing}
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
              I agree to the
              <a href={routes.terms} class="ml-1 underline text-black" target="_blank" rel="noopener noreferrer"
                >Terms & Conditions</a
              >
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
                I agree to the
                <a href={sku.customNftTerms} class="ml-1 underline" target="_blank" rel="noopener noreferrer"
                  >Nft Terms & Conditions</a
                >
              </label>
            </div>
          {/if}
          <div class="text-sm text-gray-600">
            Confirming your order below will deduct this total from your current wallet balance.
          </div>
          <Button variant="brand" class="mt-6" disabled={purchasing} on:click={submitOrder}>Buy Now</Button>
          <Button variant="outline-brand" on:click={closeModal}>Cancel</Button>
        {/if}
      </div>
    </div>
  </Modal>
{/if}
