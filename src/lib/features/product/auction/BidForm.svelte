<script lang="ts">
  import type { Listing } from '$lib/sku-item/types';
  import { createEventDispatcher } from 'svelte';
  import { createForm } from 'felte';
  import { mdiArrowRight } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import { user } from '$lib/user';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency, formatDate } from '$util/format';

  export let listing: Listing;
  export let maxPlacedBid: number;
  export let fee: number;

  const dispatch = createEventDispatcher();

  $: acceptedBidPrice = maxPlacedBid ? maxPlacedBid + listing.auctionBidIncrement : listing.minBid;

  // this could suffer from rounding issues
  // ie, not accepting the exact displayed available balance due to upwards rounding
  $: availableBalanceForBiding = $user?.availableBalance;

  const { form, reset } = createForm({
    onSubmit: async ({ placeBid }: { placeBid: string }) => {
      if (!$user) {
        return toast.danger('Please, login to place a bid.');
      }
      if (placeBid === '') {
        return toast.danger(`Bid amount is required.`);
      }

      const amount = Number.parseFloat(placeBid);

      if (Number.isNaN(amount)) {
        return toast.danger(`Not a valid number.`);
      }
      if (amount < acceptedBidPrice) {
        return toast.danger(`Amount must be greater or equal than ${formatCurrency(acceptedBidPrice)}.`);
      }
      if (amount + amount * fee > availableBalanceForBiding) {
        return toast.danger(
          `Amount must be less or equal than your available balance ${formatCurrency(availableBalanceForBiding)}.`
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
        <TimeDifference date={listing?.endDate} />
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
    animate={false}
    class="flex gap-2 h-20 md:h-auto w-full md:w-48 lg:w-96 text-2xl"
    type="submit"
    --button-border-radius="0"
    >Place a bid <Icon path={mdiArrowRight} size="1.5" />
  </Button>
</form>

<style lang="postcss">
  input {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#101010, #101010) padding-box,
      linear-gradient(90deg, var(--gradient-start) 0%, var(--gradient-end) 100%) border-box;
  }
</style>
