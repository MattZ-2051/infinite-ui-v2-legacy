<script lang="ts">
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency, formatDate } from '$util/format';

  export let startDate: Date;
  export let price: number;
  export let type: 'sale' | 'auction';

  const messages = {
    sale: {
      startsIn: 'Sale starts in:',
      textOwner: 'Selling for',
      textNonOwner: 'Coming soon at',
      cancel: 'Cancel Sale',
    },
    auction: {
      startsIn: 'Auction starts in:',
      textOwner: 'Starting price',
      textNonOwner: 'Starts soon at',
      cancel: 'Cancel Auction',
    },
  };

  const textClass = 'text-2xl md:text-xl lg:text-2xl';
</script>

<div class="flex flex-col md:flex-row w-full h-full md:rounded-lg overflow-hidden" style="background-color: #313131;">
  <div class="flex flex-grow flex-col md:flex-row md:px-6 py-2 md:py-4 justify-center md:justify-between items-center">
    <div class="flex flex-row md:flex-col gap-1 items-center md:items-start">
      <div class="text-sm text-gray-500">{messages[type].startsIn}</div>
      <div class="flex gap-1">
        <TimeDifference date={startDate} on:zero />
        <div class="text-gray-300">
          — {formatDate(startDate)}
        </div>
      </div>
    </div>
    <div class={textClass}>
      {messages[type].textNonOwner}
      {formatCurrency(price)}
    </div>
  </div>
</div>
