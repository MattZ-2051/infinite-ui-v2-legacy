<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { mdiChevronDown } from '@mdi/js';
  import { variables } from '$lib/variables';
  import { datePicker } from '$ui/datepicker/datepicker';
  import { closeModal, Modal } from '$ui/modals';
  import { toast } from '$ui/toast';
  import { formatCurrency, formatDate } from '$util/format';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { startAuction } from './auction.api';
  import { auctionStarted } from '../product.store';

  export let isOpen = false;
  export let product: Product;

  const marketplaceFee = variables.marketplaceFee;

  let startDate = new Date();

  startDate.setTime(startDate.getTime() - startDate.getSeconds() * 1000 - startDate.getMilliseconds());

  let endDate = new Date(startDate.getTime() + 60_000);
  let price: number;
  let waitingForAPI = false;

  $: fee = Math.max(marketplaceFee * price || 0, 0);
  $: total = Math.max(price * (1 - marketplaceFee) || 0, 0);

  function onChangeDateFrom([_startDate]) {
    startDate = _startDate;

    if (startDate >= endDate) {
      endDate = new Date(startDate.getTime() + 60_000);
    }
  }

  function onChangeDateTo([_endDate]) {
    endDate = _endDate;

    if (endDate <= startDate) {
      startDate = new Date(endDate.getTime() - 60_000);
    }
  }

  function onPriceChange() {
    if (price < 0) {
      price = 0;
    }
  }

  async function onStartAuction() {
    if (startDate <= new Date()) {
      toast.danger('The start date should be in the future.');
      return;
    }

    if (startDate >= endDate) {
      toast.danger('The end date should be greather than start date.');
      return;
    }

    if (!price) {
      toast.danger('Please, enter a minimum bid price.');
      return;
    }

    if (price <= 0) {
      toast.danger('Minimum bid should be more than 0.');
      return;
    }

    waitingForAPI = true;

    await startAuction(product, startDate, endDate, price)
      .then(() => {
        closeModal();
        toast.success('Congrats! Your auction has been created successfully.');
        auctionStarted({ product });
        return true;
      })
      .catch(() => toast.danger('Whoops, something went wrong - please try again.'))
      .finally(() => (waitingForAPI = false));
  }
</script>

{#if isOpen}
  <Modal on:close={closeModal}>
    <div class="text-2xl font-medium" slot="title">Create auction</div>
    <div class="px-10 pb-2 text-center">
      You wont be able to transfer or redeem this<br />
      item while your auction is in progress.
    </div>
    <div class="flex flex-col px-10 py-2">
      <div class="flex gap-8 justify-between border-solid border-t border-b border-gray-200 py-4">
        <ProductModalInfo sku={product.sku} serial={product.serialNumber} />
      </div>
      <div class="flex py-4 text-center">
        <div class="flex-grow flex flex-col">
          <div class="text-gray-500 mb-2">Start date</div>
          <div
            class="flex-grow px-2 py-2 whitespace-nowrap text-lg flex justify-center items-center"
            use:datePicker={{
              defaultDate: startDate,
              enableTime: true,
              minuteIncrement: 1,
              onChange: onChangeDateFrom,
            }}
          >
            <span>
              {formatDate(startDate, 'MMM D, YYYY')}<br />
              {formatDate(startDate, 'hh:mm A')}
            </span>
            <Icon path={mdiChevronDown} color="black" class="inline ml-1" />
          </div>
        </div>
        <div class="flex-grow flex flex-col">
          <div class="text-gray-500 mb-2">End date</div>
          <div
            class="flex-grow px-2 py-2 whitespace-nowrap text-lg flex justify-center items-center"
            use:datePicker={{ defaultDate: endDate, enableTime: true, minuteIncrement: 1, onChange: onChangeDateTo }}
          >
            <span>
              {formatDate(endDate, 'MMM D, YYYY')}<br />
              {formatDate(endDate, 'hh:mm A')}
            </span>
            <Icon path={mdiChevronDown} color="black" class="inline ml-1" />
          </div>
        </div>
      </div>
      <div class="input-container flex items-center relative py-4">
        <input
          type="number"
          min="0"
          class="relative w-full bg-gray-100 py-3 pl-8 pr-2 outline-none rounded-2xl text-center"
          bind:value={price}
          on:change={onPriceChange}
          placeholder="Enter min bid price"
        />
      </div>
      <div class="flex justify-between border-solid border-b border-gray-200 pb-1 mb-1 text-gray-400 font-medium">
        <span>MarketPlace fee ({marketplaceFee * 100}%)</span>
        <span>{formatCurrency(fee)}</span>
      </div>
      <div class="flex justify-between font-medium">
        <span>Minimum Final Payout:</span>
        <span class="font-semibold text-xl">{formatCurrency(total)}</span>
      </div>
      <div class="text-gray-400 text-center py-6">
        All resales of this product a subject to a {product.sku.royaltyFeePercentage}%<br />
        royalty fee set by and to be paid to the original<br />
        creator.
      </div>
      <div class="w-full mb-6">
        <Button type="button" disabled={waitingForAPI} on:click={onStartAuction}>Start Auction</Button>
      </div>
    </div>
  </Modal>
{/if}

<style>
  .input-container::before {
    content: '$';
    position: absolute;
    left: 10px;
    z-index: 1;
    @apply text-xl;
    @apply text-gray-400;
  }
</style>
