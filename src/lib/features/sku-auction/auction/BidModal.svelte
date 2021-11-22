<script lang="ts">
  import copy from 'clipboard-copy';
  import { mdiContentCopy, mdiCheckCircle } from '@mdi/js';
  import type { Sku } from '$lib/sku-item/types';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import Icon from '$ui/icon/Icon.svelte';
  import { formatCurrency } from '$util/format';
  import { isEthAddress } from '$util/validateEthAddress';
  import Button from '$lib/components/Button.svelte';
  import { Input } from '$lib/components/form';
  import routes from '$project/routes';
  import SkuAuctionModalInfo from '../SkuAuctionModalInfo.svelte';
  import { placeBidFx } from './auction.store';
  import { getBiddingFee } from '../sku-auction.fee';

  export let isOpen = false;
  export let sku: Sku;
  export let amount: number;

  const marketplaceFee = getBiddingFee(sku);
  const waitingForAPI = placeBidFx.pending;

  $: listing = sku.activeSkuListings[0]; // BE team words: ActiveProductListings can only have one element.
  $: bid = formatCurrency(amount, { currency: sku.currency });
  $: total = formatCurrency(amount * (1 + marketplaceFee), { currency: sku.currency });
  $: ethAddress = '';
  $: validEthAddress = isEthAddress(ethAddress);
  $: showEthAddressError = (submitted || ethAddress) && !validEthAddress;

  let acceptedTerms = false;
  let submitted = false;

  async function onPlaceBid() {
    submitted = true;

    if (sku.currency === 'USD') {
      await placeBidFx({ listing, amount });
    } else if (sku.currency === 'ETH') {
      if (!validEthAddress) {
        return;
      }
      await placeBidFx({ listing, amount, mintToAddress: ethAddress });
    }

    closeModal();
  }

  const userUsdBalance = +$wallet?.balanceInfo.find((x) => x.currency === 'USD').totalBalance;
  const userEthBalance = +$wallet?.balanceInfo.find((x) => x.currency === 'ETH').totalBalance;
  $: userBalance = sku.currency === 'ETH' ? userEthBalance : userUsdBalance;

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
  <Modal title={`${sku.currency === 'ETH' ? '1. ETH address destination' : 'Confirm your bid:'}`}>
    <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
      {#if sku.currency === 'USD'}
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={sku.nftPublicAssets?.[0]} preview />
        </div>
      {:else if sku.currency === 'ETH'}
        <div class="border-solid border-b border-gray-200 py-8">
          <Input
            name="eth-address"
            class={`pb-10 px-6 bg-gray-50 mt-4 mb-2 border border-solid border-gray-50 rounded-xl ${
              showEthAddressError ? 'text-red-500' : ''
            }`}
            style="padding-bottom: 1rem; padding-top: 1rem"
            variant="base"
            error={showEthAddressError ? '*This does not appear to be a valid ERC20 address' : ''}
            label="Enter the wallet ERC20 address to send the NFT to:"
            bind:value={ethAddress}
            data-initial-focus
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
      {#if sku.currency === 'ETH'}
        <div class="text-2xl font-normal pr-8">2. Confirm your bid</div>
      {/if}
      <SkuAuctionModalInfo {sku} />
      <div class="flex justify-between border-solid font-medium">
        <span class="text-gray-500">Your Bid:</span>
        <span>{bid}</span>
      </div>
      <div class="flex justify-between border-solid border-b border-gray-200 pb-4 font-medium">
        <span class="text-gray-500">Marketplace fee ({marketplaceFee * 100}%)</span>
        <span>
          {formatCurrency(marketplaceFee * amount, { currency: sku.currency })}
        </span>
      </div>
      <div class="space-y-2 font-medium">
        <div class="flex justify-between">
          <span>Total cost (if you win):</span>
          <span>{total}</span>
        </div>
        <div
          class={`${
            userBalance >= amount * (1 + marketplaceFee) ? 'text-green-500' : 'text-red-500'
          } flex justify-between`}
        >
          <span> Your current balance: </span>
          <span>{formatCurrency(userBalance, { currency: sku.currency })}</span>
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
          I accept the <a href={routes.terms} class="ml-1 underline">Terms & Conditions</a>
        </label>
      </div>
      <div class="max-w-md text-gray-600 text-sm">
        All resales of this product are subject to a {sku.royaltyFeePercentage}% royalty fee set by and to be paid to
        the original creator.
      </div>
      <Button variant="brand" class="w-full mt-6" disabled={$waitingForAPI || !acceptedTerms} on:click={onPlaceBid}
        >Place Bid</Button
      >
    </div>
  </Modal>
{/if}
