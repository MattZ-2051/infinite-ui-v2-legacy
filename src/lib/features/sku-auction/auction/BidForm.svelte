<script lang="ts">
  import type { Listing, Sku } from '$lib/sku-item/types';
  import Big from 'big.js';
  import { createEventDispatcher } from 'svelte';
  import { createForm } from 'felte';
  import Icon from '$ui/icon/Icon.svelte';
  import { user } from '$lib/user';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatDate, formatCurrency } from '$util/format';
  import routes from '$project/routes';
  import { loadWalletFx, wallet } from '$lib/features/wallet/wallet.store';
  import arrowRight from '../assets/arrow-right';
  import { auctionEnded } from '../sku-auction.store';

  export let sku: Sku;
  export let listing: Listing;
  export let maxPlacedBid: number;
  export let fee: number;

  const dispatch = createEventDispatcher();

  loadWalletFx();

  $: acceptedBidPrice = maxPlacedBid ? new Big(maxPlacedBid).add(listing.auctionBidIncrement) : new Big(listing.minBid);

  const { form, reset } = createForm({
    onSubmit: async ({ placeBid }: { placeBid: string }) => {
      if (!$user) {
        return toast.danger('Please, login to place a bid.');
      }
      if (!placeBid) {
        return toast.danger(`Whoops! Please let us know how much you'd like to bid for this collectible.`);
      }
      if ($wallet.kycRequired) {
        return toast.danger(
          `Your wallet balance is currently >= ${formatCurrency(
            10_000
          )} USD, therefore, you will not be able to make deposits, withdrawals, purchases, or bids until you complete KYC level 2.`
        );
      }

      let amount: Big;
      try {
        amount = new Big(placeBid);
      } catch {
        return toast.danger(`Not a valid number.`);
      }
      const amountWithFee = amount.times(1 + fee);
      const userUsdBalance = $wallet?.balanceInfo.find((x) => x.currency === 'USD').totalBalance;
      const userEthBalance = $wallet?.balanceInfo.find((x) => x.currency === 'ETH').totalBalance;
      const userBalance = new Big(sku.currency === 'ETH' ? userEthBalance : userUsdBalance);

      if (amount.lt(acceptedBidPrice)) {
        return toast.danger(
          `Whoops! Your bid amount is lower than the current highest bid. Please place a higher bid to participate in this auction.`
        );
      }
      if (amountWithFee.gt(userBalance)) {
        return toast.danger(
          `Whoops! You don't have sufficient funds in your wallet to make this purchase! Your available balance is ${userBalance.toNumber()} and you need ${amountWithFee.toNumber()} to cover the bid and marketplace fee. <a href=${
            routes.wallet
          }>Click here</a> to deposit more funds.`
        );
      }

      dispatch('place-bid', { amount: amount.toNumber() });
      reset();
    },
  });
</script>

<form
  use:form
  class="flex flex-col md:flex-row w-full h-full md:rounded-lg overflow-hidden whitespace-nowrap"
  style="background-color: #313131;"
>
  <div class="flex md:px-6 py-2 md:py-4 justify-center md:justify-between items-center">
    <div class="flex flex-row md:flex-col gap-1 items-center md:items-start">
      <div class="text-sm text-gray-500">Auction ends in:</div>
      <div class="flex gap-1">
        <TimeDifference date={listing?.endDate} on:zero={() => auctionEnded()} />
        <div class="text-gray-300">
          — {formatDate(listing?.endDate)}
        </div>
      </div>
    </div>
  </div>

  <div class="relative w-full">
    <input
      type="number"
      min="0"
      step="0.000000000000000001"
      autocomplete="off"
      class="h-20 md:h-full w-full text-default placeholder-gray-200 text-2xl text-center pb-8 px-10 md:pl-10 md:text-left focus:outline-none focus:border-blue-500 bg-transparent overflow-hidden"
      name="placeBid"
      placeholder="Enter bid"
    />
    <span class="absolute bottom-9 left-4 text-2xl text-gray-500">{sku.currency === 'USD' ? '$' : 'Ξ'}</span>
    <div class="absolute left-4 bottom-4 text-sm text-gray-500" style="position:absolute;">
      *Min. bid amount is {formatCurrency(acceptedBidPrice.toNumber(), { currency: sku.currency })}
    </div>
  </div>

  <Button
    variant="brand"
    class="flex gap-2 h-20 md:h-auto w-full md:w-48 lg:w-96 text-2xl"
    type="submit"
    --button-border-radius="0"
    >Place a bid <Icon path={arrowRight} size="1.5" />
  </Button>
</form>

<style lang="postcss">
  input {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#101010, #101010) padding-box,
      linear-gradient(90deg, var(--gradient-start-color) 0%, var(--gradient-end-color) 100%) border-box;
  }
</style>
