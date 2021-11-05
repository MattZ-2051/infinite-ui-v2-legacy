<script lang="ts">
  import type { Listing } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';
  import { createForm } from 'felte';
  import arrowRight from '$lib/features/product/assets/arrow-right';
  import Icon from '$ui/icon/Icon.svelte';
  import { user } from '$lib/user';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatDate, formatCurrency } from '$util/format';
  import routes from '$project/routes';
  import { wallet } from '$lib/features/wallet/wallet.store';
  import { auctionEnded } from '../product.store';

  export let listing: Listing;
  export let maxPlacedBid: number;
  export let fee: number;

  const dispatch = createEventDispatcher();

  $: acceptedBidPrice = maxPlacedBid ? maxPlacedBid + listing.auctionBidIncrement : listing.minBid;

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
          )} USD, therefore, you will not be able to make deposits, withdrawals, purchases, and sales until you complete KYC level 2.`
        );
      }

      const amount = Number.parseFloat(placeBid);
      const amountWithFee = amount + amount * fee;

      if (Number.isNaN(amount)) {
        return toast.danger(`Not a valid number.`);
      }
      if (amount < acceptedBidPrice) {
        return toast.danger(
          `The minimum bid amount is ${formatCurrency(acceptedBidPrice)}. Please place a higher bid.`
        );
      }
      if (amountWithFee > $user['0'].availableBalance) {
        return toast.danger(
          `Whoops! You don't have sufficient funds in your wallet to make this purchase! Your available balance is ${$user['0'].availableBalance} and you need ${amountWithFee} to cover the bid and marketplace fee. <a href=${routes.wallet}>Click here</a> to deposit more funds.`
        );
      }

      dispatch('place-bid', { amount });
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

  <input
    type="number"
    autocomplete="off"
    class="h-20 md:h-auto w-full text-default placeholder-gray-400 text-2xl text-center md:pl-10 md:text-left focus:outline-none focus:border-blue-500 bg-transparent"
    name="placeBid"
    placeholder="Bid Amount $$"
  />
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
