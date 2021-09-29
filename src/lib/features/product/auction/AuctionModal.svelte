<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import { mdiChevronDown } from '@mdi/js';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { toast } from '$ui/toast';
  import { formatCurrency, formatDate } from '$util/format';
  import { closeModal, Modal } from '$ui/modals';
  import { FilePreview } from '$ui/file';
  import { datePicker } from '$ui/datepicker/datepicker';
  import Button from '$lib/components/Button.svelte';
  import ProductModalInfo from '$lib/features/product/ProductModalInfo.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import { startAuction } from './auction.api';
  import { auctionStarted } from '../product.store';
  import { getSellingFee, getRoyaltyFee } from '../product.fee';

  export let isOpen = false;
  export let product: Product;

  const marketplaceFee = getSellingFee(product);

  let startDate = new Date();
  let errors;
  let isSubmitted = false;

  startDate.setTime(startDate.getTime() - startDate.getSeconds() * 1000 - startDate.getMilliseconds());

  let endDate = new Date(startDate.getTime() + 60_000);
  let price: number;
  let waitingForAPI = false;

  $: royaltyFee = getRoyaltyFee(product);
  $: marketplaceFeePrice = Math.max(marketplaceFee * price || 0, 0);
  $: royaltyFeePrice = Math.max(royaltyFee * price || 0, 0);
  $: total = Math.max(price * (1 - marketplaceFee - royaltyFee) || 0, 0);

  function onChangeDateFrom([_startDate]) {
    startDate = _startDate;
  }

  function onChangeDateTo([_endDate]) {
    endDate = _endDate;
  }

  async function validate(_price, _startDate, _endDate) {
    const schema = yup.object({
      price: yup
        .number()
        .required('Amount is required.')
        .typeError('Enter a valid number.')
        .moreThan(0, 'Enter a positive amount.'),
      startDate: yup
        .date()
        .required('Start date is required.')
        .min(new Date(), 'Date must be in the future.')
        .max(endDate, 'The end date should be greater than start date.'),
      endDate: yup.date().required('End date is required.'),
    });

    errors = await validateSchema(schema)({
      price: _price,
      startDate: formatDate(_startDate, 'YYYY/MM/DD HH:mm'),
      endDate: _endDate,
    });
  }

  $: isSubmitted && validate(price, startDate, endDate);

  async function onStartAuction() {
    isSubmitted = true;

    await validate(price, startDate, endDate);

    if (errors) {
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
  <Modal title="Create auction" on:close={closeModal}>
    <form on:submit|preventDefault={onStartAuction}>
      <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={product.sku.nftPublicAssets?.[0]} preview />
        </div>
        <ProductModalInfo sku={product.sku} {product} />
        <div class="max-w-sm text-gray-500">
          You won’t be able to transfer or redeem this item while your auction is in progress.
        </div>
        <div class="flex py-4 text-center">
          <div class="flex-grow flex flex-col">
            <div class="text-black font-medium mb-2">Start date</div>
            <div
              class="flex-grow px-2 py-2 whitespace-nowrap text-base flex justify-center items-center"
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
            <div class="text-black font-medium mb-2">End date</div>
            <div
              class="flex-grow px-2 py-2 whitespace-nowrap text-base flex justify-center items-center"
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
        {#if errors?.startDate}
          <div class="text-red-500 text-sm mb-2 text-center">{errors.startDate}</div>
        {/if}

        <div class="input-container flex items-center relative mt-4 mb-2">
          <input
            data-initial-focus
            type="number"
            name="price"
            class="relative w-full bg-gray-50 py-3 pl-8 pr-2 outline-none rounded-lg text-center border-0 text-xl"
            bind:value={price}
            placeholder="Enter min bid price"
          />
        </div>
        {#if errors?.price}
          <div class="text-red-500 text-sm mb-2">{errors.price}</div>
        {/if}
        <div class="border-b border-gray-200 text-gray-500 font-medium mb-2">
          <div class="flex justify-between pb-1 mb-1">
            <span>Marketplace fee ({marketplaceFee * 100}%)</span>
            <span>{formatCurrency(marketplaceFeePrice)}</span>
          </div>
          {#if royaltyFee > 0}
            <div class="flex justify-between pb-1 mb-1">
              <span>Creator royalty fee ({royaltyFee * 100}%)</span>
              <span>{formatCurrency(royaltyFeePrice)}</span>
            </div>
          {/if}
        </div>
        <div class="flex justify-between">
          <span class="font-medium">Minimum Final Payout:</span>
          <span class="font-semibold">{formatCurrency(total)}</span>
        </div>
        {#if royaltyFee > 0}
          <div class="text-sm text-gray-500 text-center pt-6">
            All resales of this product a subject to a {royaltyFee * 100}%<br />
            royalty fee set by and to be paid to the original<br />
            creator.
          </div>
        {/if}
        <Button variant="brand" class="w-full mt-6" type="submit" disabled={waitingForAPI}>Start Auction</Button>
      </div>
    </form>
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
