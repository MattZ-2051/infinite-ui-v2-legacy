<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { Product } from '$lib/sku-item/types';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrency } from '$util/format';
  import { isEthAddress } from '$util/validateEthAddress';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import routes from '$project/routes';
  import { placeBidFx } from './auction.store';
  import { getBiddingFee } from '../product.fee';

  export let isOpen = false;
  export let product: Product;
  export let amount: number;

  const marketplaceFee = getBiddingFee(product);
  const waitingForAPI = placeBidFx.pending;

  $: listing = product.activeProductListing;
  $: bid = formatCurrency(amount, { currency: product.sku.currency });
  $: total = formatCurrency(amount * (1 + marketplaceFee), { currency: product.sku.currency });
  $: ethAddress = '';
  $: validEthAddress = undefined;

  let acceptedTerms = false;

  async function onPlaceBid() {
    if (product.sku.currency === 'USD') {
      await placeBidFx({ listing, amount });
    } else if (product.sku.currency === 'ETH') {
      await placeBidFx({ listing, amount, mintToAddress: ethAddress });
    }

    closeModal();
  }

  const userUsdBalance = +$wallet?.balanceInfo.find((x) => x.currency === 'USD').totalBalance;
  const userEthBalance = +$wallet?.balanceInfo.find((x) => x.currency === 'ETH').totalBalance;
  $: userBalance = product.sku.currency === 'ETH' ? userEthBalance : userUsdBalance;

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
</script>

{#if isOpen}
  <Modal title={`${product.sku.currency === 'ETH' ? '1. ETH address destination' : 'Confirm your bid:'}`}>
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      {#if product.sku.currency === 'USD'}
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={product.nftPublicAssets?.[0] || product.sku.nftPublicAssets?.[0]} preview />
        </div>
      {:else if product.sku.currency === 'ETH'}
        <div class="border-solid border-b border-gray-200 py-8">
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
      {#if product.sku.currency === 'ETH'}
        <div class="text-2xl font-normal pr-8">2. Confirm your bid</div>
      {/if}
      <ProductModalInfo {product} sku={product.sku} />
      <div class="flex justify-between border-solid font-medium">
        <span class="text-gray-500">Your Bid:</span>
        <span>{bid}</span>
      </div>
      <div class="flex justify-between border-solid border-b border-gray-200 pb-4 font-medium">
        <span class="text-gray-500">Marketplace fee ({marketplaceFee * 100}%)</span>
        <span>
          {formatCurrency(marketplaceFee * amount, { currency: product.sku.currency })}
        </span>
      </div>
      <div class="space-y-2 font-medium">
        <div class="flex justify-between">
          <span>Total cost (if you win):</span>
          <span>{total}</span>
        </div>
        <div class="text-green-500 flex justify-between">
          <span> Your current balance: </span>
          <span>{formatCurrency(userBalance, { currency: product.sku.currency })}</span>
        </div>
      </div>
      <div class="max-w-md text-gray-600 text-sm">
        Placing a bid will freeze the associated funds from your wallet until the auction ends. Bids cannot be canceled
        but can be increased as the auction progresses.
      </div>
      <div class="flex items-center">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            bind:checked={acceptedTerms}
            class="border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-black mr-2"
          />
          <div>
            <p class="text-gray-500 inline">Read and agree to</p>
            <a href={routes.terms} class="text-black" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
            <p class="text-gray-500 inline">and</p>
            <a href={routes.privacy} class="text-black" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </div>
        </label>
      </div>
      <div class="max-w-md text-gray-600 text-sm">
        All resales of this product are subject to a {product.sku.royaltyFeePercentage}% royalty fee set by and to be
        paid to the original creator.
      </div>
      <Button
        variant="brand"
        class="w-full mt-6"
        disabled={$waitingForAPI || !acceptedTerms || (product.sku.currency === 'ETH' && !validEthAddress)}
        on:click={onPlaceBid}>Place Bid</Button
      >
    </div>
  </Modal>
{/if}
