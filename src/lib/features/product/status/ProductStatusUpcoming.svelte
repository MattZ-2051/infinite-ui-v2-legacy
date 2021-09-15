<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiClose } from '@mdi/js';
  import Button from '$lib/components/Button.svelte';
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

  const textClass = 'text-2xl md:text-xl lg:text-2xl';
</script>

<div class="flex flex-col md:flex-row w-full h-full md:rounded-lg overflow-hidden" style="background-color: #313131;">
  <div class="flex flex-grow flex-col md:flex-row md:px-6 py-2 md:py-4 justify-center md:justify-between items-center">
    <div class="flex flex-row md:flex-col gap-1 items-center md:items-start">
      <div class="text-sm text-gray-600">{messages[type].startsIn}</div>
      <div class="flex gap-1">
        <TimeDifference date={startDate} on:zero />
        <div class="text-gray-400">
          — {formatDate(startDate)}
        </div>
      </div>
    </div>
    <div class={textClass}>
      {#if isProductOwner}
        {messages[type].textOwner}
      {:else}
        {messages[type].textNonOwner}
      {/if}
      {formatCurrency(price)}
    </div>
  </div>

  {#if isProductOwner}
    <Button
      --button-border-radius="0"
      animate={false}
      on:click={() => dispatch('cancel')}
      class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
      >{messages[type].cancel}<Icon size="1.2" path={mdiClose} /></Button
    >
  {/if}
</div>
