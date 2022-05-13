<script lang="ts">
  import copy from 'clipboard-copy';
  import { onMount } from 'svelte';
  import type { ethers } from 'ethers';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { SkuPurchaseTransaction, ValidETHListingData } from './types';
  import type { Listing, Sku, Product, PaymentMethod } from '$lib/sku-item/types';
  import { isAuthenticated, onSignIn, userId } from '$lib/user';
  import {
    getWalletInfo,
    walletConnected,
    handleWalletConnection,
    sendEthPurchasePaymentForImmediateMinting,
  } from '$lib/metamask';
  import { closeModal, Modal } from '$ui/modals';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrency } from '$util/format';
  import { isEthAddress } from '$util/validateEthAddress';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import { productBought, pendingBuyCreated } from '$lib/features/product/product.store';
  import { getBuyingFee, getSkuBuyingFee } from '$lib/features/product/product.fee';
  import DualRingLoader from '$lib/components/DualRingLoader.svelte';
  import { toast } from '$ui/toast';
  import routes from '$project/routes';
  import { skuBought } from '$lib/features/sku/sku.store';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import StripeCheckout from '$lib/features/stripe/StripeCheckout.svelte';
  import { goto } from '$app/navigation';
  import { variables } from '$lib/variables';
  import visa from '$lib/components/icons/visa';
  import mastercard from '$lib/components/icons/mastercard';
  import applepay from '$lib/components/icons/applepay';
  import googlepay from '$lib/components/icons/googlepay';
  import americanExpress from './assets/american-express.svg';
  import { purchaseSkuListing, claimGiveawaySkuListing, validETHdirectPurchase } from '../checkout/checkout.api';
  import { handleSkuClaimError } from './order.service';
  import OrderDetails from './OrderDetails.svelte';

  export let isOpen: boolean;
  export let sku: Sku = undefined;
  export let product: Product = undefined;
  export let listing: Listing;
  export let stripeSucceded = false;
  export let validETHPurchase: ValidETHListingData;

  let purchasing = false;
  let result: SkuPurchaseTransaction;
  let directPurchaseResult: ethers.providers.TransactionResponse;
  let balance;

  $: _sku = product ? product.sku : sku;
  $: ethAddress = '';
  $: validEthAddress = undefined;
  $: directPurchasing = false;
  $: shortenEthAddress = `${ethAddress.slice(0, 21)}...${ethAddress.slice(36, 42)}`;

  onMount(async () => {
    try {
      const data = await getWalletInfo();
      balance = data.balance;
      ethAddress = data.address;
      validEthAddress = isEthAddress(ethAddress);
      if (!validETHPurchase) {
        validETHPurchase = await validETHdirectPurchase(listing._id);
      }
    } catch {
      if (!validETHPurchase) {
        goto(routes.sku(sku._id), { replaceState: true });
      } else {
        walletConnected.set(false);
      }
    }
  });

  export let paymentMethod: PaymentMethod = undefined;

  let acceptedTerms = false;
  let acceptedTermsNft = false;
  const listingPrice = listing.saleType === 'giveaway' ? 0 : listing.price;
  const LOW_KYC_LVL_DEPOSIT_LIMIT_USD = import.meta.env?.VITE_LOW_KYC_LVL_DEPOSIT_LIMIT_USD;

  const checkTerms = () => {
    if (!acceptedTerms || (_sku?.customNftTerms && !acceptedTermsNft)) {
      toast.danger('Please agree to the Terms and Conditions in order to move forward.', { toastId: 'TERMS' });
      return false;
    }
    return true;
  };

  const checkValidETHAddress = () => {
    if (_sku.currency === 'ETH' && !validEthAddress) {
      toast.danger('Please enter a valid ERC20 address to send the NFT to.', { toastId: 'INVALID_ETH' });
      return false;
    }
    return true;
  };

  const connectWallet = async () => {
    const success = await handleWalletConnection();
    if (success) {
      const data = await getWalletInfo();
      balance = data.balance;
      ethAddress = data.address;
      validEthAddress = isEthAddress(ethAddress);
    }
  };

  async function submitOrder() {
    if (checkTerms() && checkValidETHAddress()) {
      if ($walletConnected) {
        directPurchasing = true;
        await sendEthPurchasePaymentForImmediateMinting(
          validETHPurchase.externalPurchaseAddressEth,
          validETHPurchase.cost.totalCost,
          $userId
        )
          .then((response) => {
            directPurchaseResult = response;
            toast.success('Your request is being processed. Please note this may take up to 10 minutes.', {
              toastId: 'TXR_SUCCESS',
            });
            purchasing = true;
            closeModal();
            return;
          })
          .catch((error) => {
            toast.danger(error?.message, { toastId: 'TRX_ERROR' });
          })
          .finally(() => {
            directPurchasing = false;
          });
      } else {
        if ($wallet.kycRequired) {
          return toast.danger(
            `Your wallet balance is currently >= ${formatCurrency(
              LOW_KYC_LVL_DEPOSIT_LIMIT_USD
            )}, therefore, you will not be able to make deposits, withdrawals, purchases, or bids until you complete KYC level 2.`
          );
        }

        purchasing = true;
        const isGiveAway = listing.saleType === 'giveaway';

        if (isGiveAway) {
          try {
            await claimGiveawaySkuListing(listing._id);
            closeModal();
            skuBought();
            toast.success(
              'Your request is being processed. Minting of your giveaway NFT may take up to two (2) minutes.'
            );
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
    }
  }

  const selectPaymentMethod = (value?: PaymentMethod) => {
    if (value === 'stripe' && !$isAuthenticated) {
      onSignIn(`${window.location.pathname}?step=stripe-checkout`);
      return;
    }
    paymentMethod = value;
  };

  $: userBalance = balance;
  $: marketplaceFee = product ? getBuyingFee(product) : getSkuBuyingFee(sku);
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > +userBalance;

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

  const handleCloseModal = () => {
    if (stripeSucceded || paymentMethod) {
      goto(routes.sku(sku._id), { replaceState: true });
    }
    closeModal();
  };

  const handleNavigation = (route: string) => {
    if (stripeSucceded || paymentMethod) {
      goto(route, { replaceState: true });
    }
    closeModal();
  };

  const STRIPE_ENABLED = variables.stripe.enabled;

  $: isBuyNow = listing.saleType === 'fixed';
  $: isPrimarySale = listing.type === 'sku';

  $: isStripeAllowed = STRIPE_ENABLED && isBuyNow && isPrimarySale;

  $: {
    if (!isStripeAllowed) {
      paymentMethod = 'balance';
    }
  }

  let title = '';
  $: if (result?.status === 'success') {
    title === 'Yeah! Payment successful.';
  } else if (result?.status === 'pending' || purchasing || stripeSucceded) {
    title = `We're processing your order`;
  } else if (!$walletConnected) {
    title = 'Connect your wallet';
  } else if (isStripeAllowed && !paymentMethod) {
    title = 'Select Payment Method';
  } else if (isStripeAllowed && paymentMethod === 'stripe') {
    title = 'Buy now';
  } else if (isStripeAllowed && paymentMethod === 'balance') {
    title = 'Pay with Wallet Funds';
  } else {
    title = 'Complete your purchase';
  }
</script>

{#if isOpen}
  <Modal class="max-w-md" onClose={handleCloseModal}>
    <svelte:fragment slot="title"><span class="font-medium text-2xl">{title}</span></svelte:fragment>
    <div class="px-10 flex flex-col gap-6 pb-10">
      {#if result?.status === 'pending' || purchasing || stripeSucceded}
        <span
          >We’ll send you an email when your purchase has been completed. You can refresh the page to view the updated
          status.</span
        >
        <ProductModalInfo sku={_sku} />
        <div class="flex flex-col gap-5">
          <Button variant="brand" class="mt-6" on:click={() => handleNavigation(routes.marketplace)}
            >Back to Marketplace</Button
          >
          <Button class="font-medium self-center" on:click={() => handleNavigation(routes.wallet)}
            >View Pending Transactions</Button
          >
        </div>
      {:else if !$walletConnected}
        <span class="text-gray-400"
          >In order to purchase this NFT you need to be connected with MetaMask and an ERC20 address.</span
        >
        <Button variant="brand" on:click={connectWallet}>Connect MetaMask</Button>
      {:else if isStripeAllowed && !paymentMethod}
        <ProductModalInfo sku={_sku} />
        <Button variant="brand" disabled={purchasing} on:click={() => selectPaymentMethod('stripe')}>Buy Now</Button>
        <div class="flex w-56 self-center items-center justify-between">
          <Icon viewBox="0 0 36 24" style="width:36px; height:24px" path={visa} />
          <Icon viewBox="0 0 36 24" style="width:36px; height:24px" path={mastercard} />
          <img src={americanExpress} alt="American Express" />
          <Icon viewBox="0 0 36 24" style="width:36px; height:24px" path={applepay} />
          <Icon viewBox="0 0 36 24" style="width:36px; height:24px" path={googlepay} />
        </div>
        <div class="border-solid border-b border-gray-200" />
        <Button variant="outline-brand" disabled={purchasing} on:click={() => selectPaymentMethod('balance')}
          >Pay with MetaMask</Button
        >
      {:else if paymentMethod === 'balance'}
        {#if _sku.currency === 'ETH'}
          <div class="text-2xl font-normal pr-8">1. ETH address destination</div>
        {/if}
        {#if _sku.currency === 'ETH'}
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
        <OrderDetails {listingPrice} {marketplaceFee} sku={_sku} {insufficientFunds} {userBalance} {listing} />
        <div class="flex flex-col gap-5 text-gray-500">
          {#if $walletConnected && !directPurchasing && directPurchaseResult?.hash}
            <span>
              You can check the status of the transaction on the
              <a
                href={`https://goerli.etherscan.io/tx/${directPurchaseResult.hash}`}
                target="_blank"
                class="cursor-pointer font-bold"
                >block explorer
              </a>
            </span>
            <a class="font-medium self-center" href={routes.marketplace}> Back to Marketplace </a>
          {:else if result?.status === 'success'}
            <span>You successfully bought this item, and now is part of your collection.</span>
            <div class="flex flex-col gap-5">
              {#if result.product._id}
                <a href={routes.product(result.product._id)}>View Your Product</a>
              {/if}
              <a class="font-medium self-center" href={routes.marketplace}> Back to Marketplace </a>
            </div>
          {:else if insufficientFunds}
            <div class="flex flex-col items-center">
              <Button variant="brand" class="mt-6 w-full" href={routes.wallet}>Add Funds</Button>
              <span class="mt-4"> You need more funds to make this purchase. </span>
            </div>
          {:else}
            <div class="flex items-center justify-start mb-3">
              <label class="inline-flex items-center text-sm">
                <input type="checkbox" bind:checked={acceptedTerms} class="border-gray-400 border-2 text-black mr-2" />
                <div>
                  <p class="text-gray-500 inline">Read and agree to</p>
                  <a href={routes.terms} class="text-black" target="_blank" rel="noopener noreferrer"
                    >Terms and Conditions</a
                  >
                  <p class="text-gray-500 inline">and</p>
                  <a href={routes.privacy} class="text-black" target="_blank" rel="noopener noreferrer"
                    >Privacy Policy</a
                  >
                </div>
              </label>
            </div>
            {#if _sku?.customNftTerms}
              <div class="flex items-center justify-start mb-3">
                <label class="inline-flex items-center text-sm">
                  <input
                    type="checkbox"
                    bind:checked={acceptedTermsNft}
                    class="border-gray-400 border-2 text-black mr-2"
                  />
                  <span class="text-gray-500">I agree to the</span>
                  <a href={_sku.customNftTerms} class="ml-1 text-black" target="_blank" rel="noopener noreferrer"
                    >Nft Terms & Conditions</a
                  >
                </label>
              </div>
            {/if}
            <span class="text-sm text-gray-500 mt-4"
              >All resales of this product are subject to a 5% royalty fee set by and to be paid to the original
              creator.</span
            >
            <Button variant="brand" class="mt-6" disabled={purchasing} on:click={submitOrder}>Buy Now</Button>
            <Button variant="outline-brand" on:click={handleCloseModal}>Cancel</Button>
          {/if}
        </div>
      {:else if paymentMethod === 'stripe'}
        {#if !ethAddress}
          <div class="flex justify-center">
            <DualRingLoader />
          </div>
        {:else}
          <ProductModalInfo sku={_sku} />
          <Input
            name="eth-address"
            class={`px-6 mt-4 mb-2 border border-solid border-gray-50 rounded font-extralight text-center ${
              validEthAddress === false ? 'text-red-500' : ''
            }`}
            style="padding-bottom: 0.5rem; padding-top: 0.5rem; font-weight: 200;"
            variant="base"
            error={validEthAddress === false ? 'This does not appear to be a valid ERC20 address' : ''}
            label="We'll send the NFT to your MetaMask wallet address:"
            value={shortenEthAddress}
            placeholder="ERC20 Wallet address"
            disabled
          />
          <StripeCheckout {listing} mintToAddress={ethAddress} lazyMinting={false} />
        {/if}
      {/if}
      {#if isStripeAllowed && !!paymentMethod}
        <span class="text-center hover:underline cursor-pointer" on:click={() => selectPaymentMethod(undefined)}
          >Back to Payment Method</span
        >
      {/if}
    </div>
  </Modal>
{/if}
