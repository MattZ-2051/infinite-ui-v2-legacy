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

  const dispatch = createEventDispatcher();

  $: acceptedBidPrice = maxPlacedBid ? maxPlacedBid + listing.auctionBidIncrement : listing.minBid;

  // this could suffer from rounding issues
  // ie, not accepting the exact displayed available balance due to upwards rounding
  $: availableBalanceForBiding = $user?.availableBalance || Number.MAX_SAFE_INTEGER;

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
      if (amount > availableBalanceForBiding) {
        return toast.danger(
          `Amount must be less or equal than your available balance ${formatCurrency(availableBalanceForBiding)}.`
        );
      }

      dispatch('place-bid', { amount });
      reset();
    },
  });
</script>

<form use:form class="flex flex-row w-full h-full rounded-lg overflow-hidden" style="background-color: #313131;">
  <div class="flex px-6 py-4 justify-between items-center">
    <div class="flex flex-col gap-1">
      <div class="text-sm text-white-opacity-50">Auction ends in:</div>
      <div class="flex gap-1">
        <TimeDifference date={listing?.endDate} />
        <div class="text-white-opacity-30">
          — {formatDate(listing?.endDate)}
        </div>
      </div>
    </div>
  </div>

  <input
    type="text"
    class="flex-grow text-black placeholder-white-opacity-40 text-xl focus:outline-none focus:ring-2"
    name="placeBid"
    placeholder="Bid Amount $$"
  />
  <Button animate={false} class="bid-button flex gap-2 text-xl w-64" type="submit" --button-border-radius="0"
    >Place a bid <Icon class="ml-2" path={mdiArrowRight} size="1.5" />
  </Button>
</form>
