<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { mdiClose } from '@mdi/js';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import TimeDifference from '$ui/timeDifference/TimeDifference.svelte';
  import { formatCurrency, formatDate } from '$util/format';
  import ProductStatusLayout from './ProductStatusLayout.svelte';

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

<ProductStatusLayout>
  <div class="flex flex-row lg:flex-col gap-1 items-center lg:items-start">
    <div class="text-sm text-gray-500">{messages[type].startsIn}</div>
    <div class="flex gap-1">
      <TimeDifference date={startDate} on:zero />
      <div class="text-gray-300">
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

  <svelte:fragment slot="action">
    {#if isProductOwner}
      <Button
        variant="brand"
        --button-border-radius="0"
        on:click={() => dispatch('cancel')}
        class="flex items-center gap-2 px-6 h-20 md:h-auto {textClass}"
        >{messages[type].cancel}<Icon size="1.2" path={mdiClose} /></Button
      >
    {/if}
  </svelte:fragment>
</ProductStatusLayout>
