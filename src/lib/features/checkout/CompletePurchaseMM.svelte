<script lang="ts">
  import type { providers } from 'ethers';
  import type { ValidETHListingData } from './types';
  import type { Listing, Sku } from '$lib/sku-item/types';
  import { onMount } from 'svelte';
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import Input from '$lib/components/form/input/Input.svelte';
  import Button from '$lib/components/Button.svelte';
  import { getWalletInfo, sendTransaction, walletConnected } from '$lib/user';
  import Icon from '$ui/icon/Icon.svelte';
  import { toast } from '$ui/toast';
  import routes from '$project/routes';
  import { isEthAddress } from '$util/validateEthAddress';
  import OrderDetails from '../order/OrderDetails.svelte';
  import { getSkuBuyingFee } from '../product/product.fee';
  import { wallet } from '../wallet/wallet.store';
  import { checkTerms, checkValidETHAddress, validETHPurchase } from './checkout.service';
  import { updateCheckoutState } from './checkout.store';

  export let sku: Sku;
  export let listing: Listing;

  $: validEthAddress = undefined;
  $: purchasing = false;
  $: ethAddress = '';
  $: userBalance = balance;
  $: marketplaceFee = getSkuBuyingFee(sku);
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > +userBalance;

  let balance;
  let purchaseResult: providers.TransactionResponse;
  let acceptedTerms = false;
  let purchaseInfo: ValidETHListingData;
  let gasFee: number;

  const listingPrice = listing.saleType === 'giveaway' ? 0 : listing.price;

  onMount(async () => {
    if ($walletConnected) {
      const data = await getWalletInfo();
      purchaseInfo = await validETHPurchase(listing);
      balance = data.balance;
      ethAddress = data.address;
      validEthAddress = isEthAddress(ethAddress);
    } else {
      balance = $wallet?.balanceInfo.find((x) => x.currency === sku.currency).totalBalance;
    }
  });

  const onEthAddressInput = (event) => {
    const { value } = event.target as HTMLInputElement;
    ethAddress = value;
    validEthAddress = isEthAddress(ethAddress);
  };

  const submitOrder = async () => {
    if (!checkTerms(acceptedTerms)) {
      return;
    }

    if (checkValidETHAddress(sku.currency, isEthAddress(ethAddress)) && $walletConnected) {
      purchasing = true;

      await sendTransaction(purchaseInfo.externalPurchaseAddressEth, purchaseInfo.cost.totalCost)
        .then((response) => {
          purchaseResult = response;
          toast.success('Your request is being processed. Minting of your NFT may take up to 30 minutes.', {
            toastId: 'TXR_SUCCESS',
          });
          purchasing = true;
          updateCheckoutState('success');
          return;
        })
        .catch((error) => {
          toast.danger(error?.message, { toastId: 'TRX_ERROR' });
        })
        .finally(() => {
          purchasing = false;
        });
    }
  };

  let copiedLink = false;

  const onCopyLink = async () => {
    await copy(ethAddress);
    copiedLink = true;
    setTimeout(() => {
      copiedLink = false;
    }, 5000);
  };
</script>

<div class="w-full h-full flex flex-col">
  <Input
    name="eth-address"
    class={`pb-10 px-6 bg-gray-50 mt-4 mb-24 border border-solid border-gray-50 rounded-xl ${
      validEthAddress === false ? 'text-red-500' : ''
    }`}
    style="padding-bottom: 1rem; padding-top: 1rem"
    variant="base"
    error={validEthAddress === false ? 'This does not appear to be a valid ERC20 address' : ''}
    label="We'll be sending the NFT to the following address"
    value={ethAddress}
    disabled
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
  <div>
    <OrderDetails
      {sku}
      {listingPrice}
      {marketplaceFee}
      {userBalance}
      {insufficientFunds}
      {gasFee}
      hideWalletBalance
      hideProductInfo
    />
  </div>
  <div class="mt-8">
    <p class="text-xs text-black-opacity-50 font-normal pb-4">
      All resales of this product are subject to a 5% royalty fee set by and to be paid to the original creator.
    </p>
    <div class="flex items-center justify-start mb-3">
      <label class="inline-flex items-center text-sm">
        <input type="checkbox" bind:checked={acceptedTerms} class="border-gray-400 border-2 text-black mr-2" />
        <span class="text-gray-500">I agree to the</span>
        <a href={routes.terms} class="ml-1 text-black" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
      </label>
    </div>
    <div class="grid grid-cols-2 mt-12">
      <Button variant="outline-brand" class="border-none" on:click={() => updateCheckoutState('method-select')}
        >Back to Payment Method</Button
      >
      <Button variant="brand" on:click={submitOrder} disabled={!acceptedTerms}
        >Buy now for ETH {total.toFixed(3)}</Button
      >
    </div>
  </div>
</div>
