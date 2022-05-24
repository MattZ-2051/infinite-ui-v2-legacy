<script lang="ts">
  import { onMount } from 'svelte';
  import type { SkuPurchaseTransaction } from './types';
  import type { Listing, Sku, Product } from '$lib/sku-item/types';
  import { user } from '$lib/user';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { formatCurrency } from '$util/format';
  import routes from '$project/routes';
  import { goto } from '$app/navigation';
  import OrderDetails from '../order/OrderDetails.svelte';
  import { getBuyingFee, getSkuBuyingFee } from '../product/product.fee';
  import { wallet } from '../wallet/wallet.store';
  import {
    checkTerms,
    claimGiveAway,
    handleCheckoutStateChange,
    handlePurchaseResult,
    purchaseItem,
  } from './checkout.service';
  import Information from './Information.svelte';
  import { isOwner } from '../product/product.service';
  import Agreement from './Agreement.svelte';
  import InsufficientFundsModal from './InsufficientFundsModal.svelte';

  export let product: Product = undefined;
  export let sku: Sku = undefined;
  export let listing: Listing;

  let result: SkuPurchaseTransaction;
  let showInfficientFundsModal = false;

  $: userBalance = undefined;
  $: marketplaceFee = sku ? getSkuBuyingFee(sku) : getBuyingFee(product);
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > +userBalance;
  $: priceWFee = Number.parseFloat(total.toFixed(5));
  $: acceptedTerms = false;
  const listingPrice = listing.saleType === 'giveaway' ? 0 : listing.price;
  const LOW_KYC_LVL_DEPOSIT_LIMIT_USD = import.meta.env?.VITE_LOW_KYC_LVL_DEPOSIT_LIMIT_USD;
  const currency = sku ? sku?.currency : product?.sku?.currency;

  onMount(async () => {
    if (!$user) {
      handleCheckoutStateChange('method-select');
    } else {
      userBalance = $wallet?.balanceInfo.find((x) => x.currency === currency).totalBalance;
    }
  });

  const submitOrder = async () => {
    if (insufficientFunds) {
      showInfficientFundsModal = true;
      return;
    }
    if (!checkTerms(acceptedTerms)) {
      return;
    }
    if ($wallet.kycRequired) {
      kycRequired();
      return;
    }

    if (isOwner(product, $user._id)) {
      toast.danger('You cannot purchase your own product.');
      return;
    }

    const isGiveAway = listing?.saleType === 'giveaway';
    if (isGiveAway) {
      await claimGiveAway(listing);
    } else {
      result = await purchaseItem(listing);
      handlePurchaseResult(result, sku, product);
    }
  };

  export const kycRequired = () => {
    return toast.danger(
      `Your wallet balance is currently >= ${formatCurrency(
        LOW_KYC_LVL_DEPOSIT_LIMIT_USD
      )}, therefore, you will not be able to make deposits, withdrawals, purchases, or bids until you complete KYC level 2.`
    );
  };

  const onCheckedTerms = (event: Event) => {
    acceptedTerms = (event.target as HTMLInputElement).checked;
  };
</script>

<div class="w-full h-full flex flex-col">
  {#if showInfficientFundsModal}
    <InsufficientFundsModal
      totalCost={`${total}`}
      insufficientFunds={`${total - userBalance}`}
      handleDeposit={() => goto(routes.wallet)}
      handleOtherPaymentMethod={() => handleCheckoutStateChange('method-select')}
      closeModal={() => {
        showInfficientFundsModal = false;
      }}
    />
  {/if}
  <div>
    <OrderDetails {sku} {listingPrice} {marketplaceFee} {userBalance} {insufficientFunds} hideProductInfo {product} />
  </div>
  <div class="mt-6 sm:mt-24">
    <Information />
    <div class="flex items-center justify-start mb-3">
      <Agreement {acceptedTerms} {onCheckedTerms} />
    </div>
    <div class="grid mt-12 grid-flow-row sm:grid-flow-col">
      <Button
        variant="outline-brand"
        --button-padding="20px 48px"
        class="sm:order-1 order-2 mr-0 mt-2 sm:mt-0 sm:mr-3"
        on:click={() => handleCheckoutStateChange('method-select')}
      >
        Back to Payment Method
      </Button>
      <Button variant="brand" class="sm:order-2 order-1" on:click={submitOrder} disabled={!acceptedTerms}>
        Buy now for {formatCurrency(priceWFee)}
      </Button>
    </div>
  </div>
</div>
