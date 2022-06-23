<script lang="ts">
  import { onMount } from 'svelte';
  import type { providers } from 'ethers';
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { ValidETHListingData } from './types';
  import type { Listing, Sku } from '$lib/sku-item/types';
  import Input from '$lib/components/form/input/Input.svelte';
  import { page } from '$app/stores';
  import { user, userId } from '$lib/user';
  import { formatCurrency } from '$util/format';
  import { variables } from '$lib/variables';
  import { checkNetwork, getWalletInfo, sendEthPurchasePaymentForImmediateMinting } from '$lib/web3/web3.service';
  import { web3User } from '$lib/web3/web3.stores';
  import Icon from '$ui/icon/Icon.svelte';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { isEthAddress } from '$util/validateEthAddress';
  import OrderDetails from '../order/OrderDetails.svelte';
  import { getSkuBuyingFee } from '../product/product.fee';
  import { wallet } from '../wallet/wallet.store';
  import {
    checkTerms,
    checkValidETHAddress,
    connectWallet,
    handleCheckoutStateChange,
    validETHPurchase,
  } from './checkout.service';
  import Information from './Information.svelte';
  import { pendingProductCreated, updateCheckoutState } from './checkout.store';
  import Agreement from './Agreement.svelte';

  const MM_TEST_NETWORK_ENABLED = variables.metamask.testNetworkEnabled;
  const voucherCode = $page.url.searchParams.get('voucherCode');
  const options = { currency: 'ETH', maximumFractionDigits: 5 };

  export let sku: Sku;
  export let listing: Listing;
  export let gasFee = 0;
  export let conversionRate: number;

  $: validEthAddress = undefined;
  $: purchasing = false;
  $: ethAddress = '';
  $: userBalance = balance;
  $: marketplaceFee = getSkuBuyingFee(sku);
  $: total = listing.price * (1 + marketplaceFee);
  $: insufficientFunds = total > +userBalance;
  $: priceWFee = Number.parseFloat((total + gasFee).toFixed(5));
  $: acceptedTerms = false;
  let balance;
  let purchaseResult: providers.TransactionResponse;
  let purchaseInfo: ValidETHListingData;
  const listingPrice = listing.saleType === 'giveaway' ? 0 : listing.price;
  onMount(async () => {
    if (!$user) {
      handleCheckoutStateChange('method-select');
    } else {
      const isWalletConnected = await connectWallet();
      if (isWalletConnected) {
        const data = await getWalletInfo();
        purchaseInfo = await validETHPurchase(listing);
        balance = data.balance;
        ethAddress = data.address;
        validEthAddress = isEthAddress(ethAddress);
      } else {
        balance = $wallet?.balanceInfo.find((x) => x.currency === sku.currency).totalBalance;
      }
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
    if (checkValidETHAddress(sku.currency, isEthAddress(ethAddress)) && $web3User.walletConnected) {
      purchasing = true;
      const network = await checkNetwork();
      if (network.name === 'homestead' || (MM_TEST_NETWORK_ENABLED && network.name === 'goerli')) {
        await sendEthPurchasePaymentForImmediateMinting(
          purchaseInfo.externalPurchaseAddressEth,
          priceWFee,
          $userId,
          voucherCode
        )
          .then((response) => {
            purchaseResult = response;
            toast.success('Your request is being processed. Please note this may take up to 7 minutes.', {
              toastId: 'TRX_SUCCESS',
            });
            purchasing = true;
            updateCheckoutState('processing');
            pendingProductCreated({ txHash: purchaseResult.hash });
            return;
          })
          .catch((error) => {
            const errorMessage = error?.message?.includes('code=INSUFFICIENT_FUNDS')
              ? 'MetaMask insufficient funds'
              : error?.message;
            toast.danger(errorMessage, { toastId: 'TRX_ERROR' });
          })
          .finally(() => {
            purchasing = false;
          });
      } else {
        toast.warning(`You need to change to ${MM_TEST_NETWORK_ENABLED ? 'Goerli Test Network' : 'Ethereum Mainnet'}`, {
          toastId: 'INVALID_NETWORK',
        });
      }
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
  const onCheckedTerms = (event: Event) => {
    acceptedTerms = (event.target as HTMLInputElement).checked;
  };
</script>

<div class="w-full h-full flex flex-col">
  <Input
    name="eth-address"
    class={`pb-10 px-6 bg-gray-50 mt-4 mb-14 border border-solid border-gray-50 rounded-xl ${
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
      {listing}
      hideProductInfo
    />
  </div>
  <div class="mt-6 sm:mt-24">
    <Information {conversionRate} />
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
        Buy now for {formatCurrency(priceWFee, options)}
      </Button>
    </div>
  </div>
</div>
