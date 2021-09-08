<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiClose } from '@mdi/js';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency, formatDate } from '$util/format';

  export let startDate: Date;
  export let isProductOwner: boolean;
  export let price: number;
  export let type: 'sale' | 'auction';

  const dispatch = createEventDispatcher();

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
</script>

<div class="flex flex-row w-full h-full rounded-lg overflow-hidden" style="background-color: #313131;">
  <div class="flex flex-grow px-6 py-4 justify-between items-center">
    <div class="flex flex-col gap-2">
      <div class="text-sm text-white-opacity-50">{messages[type].startsIn}</div>
      <div class="flex gap-1">
        <TimeDifference date={startDate} />
        <div class="text-white-opacity-30">
          — {formatDate(startDate)}
        </div>
      </div>
    </div>
    <div class="text-2xl">
      {#if isProductOwner}
        {messages[type].textOwner}
      {:else}
        {messages[type].textNonOwner}
      {/if}
      {formatCurrency(price)}
    </div>
  </div>

  {#if isProductOwner}
    <button
      type="button"
      on:click={() => dispatch('cancel')}
      class="flex items-center gap-2 text-2xl px-6 bg-white text-black"
      >{messages[type].cancel}<Icon size="1.2" path={mdiClose} /></button
    >
  {/if}
</div>
