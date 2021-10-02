<script lang="ts">
  import type { Product } from '$lib/sku-item/types';
  import type { NewAuction } from './types';
  import { mdiChevronDown } from '@mdi/js';
  import dayjs from 'dayjs';
  import { createForm } from 'felte';
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

  function roundToMinute(date = new Date()) {
    return dayjs(date).startOf('minute').toDate();
  }

  const schema = yup.object({
    price: yup
      .number()
      .required('Amount is required.')
      .typeError('Enter a valid number.')
      .moreThan(0, 'Enter a positive amount.'),
    startDate: yup
      .date()
      .required('Start date is required.')
      .when('startImmediately', {
        is: false,
        then: yup.date().test(
          'is-same-or-after',
          'Start date must be in the future.',
          // similar to isSameOrAfter
          (value) => !dayjs(value).isBefore(roundToMinute())
        ),
      }),
    endDate: yup
      .date()
      .required('End date is required.')
      .when('startImmediately', {
        is: true,
        then: yup
          .date()
          .test('is-after', 'End date must be in the future.', (value) => dayjs(value).isAfter(roundToMinute())),
        otherwise: yup.date().min(yup.ref('startDate'), 'The end date should be greater than the start date.'),
      }),
  });

  const { form, data, errors, isSubmitting, setField } = createForm<NewAuction>({
    initialValues: {
      startDate: roundToMinute(),
      endDate: roundToMinute(dayjs(roundToMinute()).add(7, 'day').toDate()),
      price: undefined,
      startImmediately: false,
    },
    onSubmit: async ({ price, startDate, endDate, startImmediately }) => {
      const _startDate = startImmediately ? roundToMinute() : startDate;

      try {
        await startAuction(product, _startDate, endDate, price);
        closeModal();
        toast.success('Congrats! Your auction has been created successfully.');
        auctionStarted({ product });
      } catch {
        toast.danger('Whoops, something went wrong - please try again.');
      }
    },
    validate: validateSchema(schema),
  });

  function onStartDateChange([_startDate]) {
    setField('startDate', _startDate);
  }

  function onEndDateChange([_endDate]) {
    setField('endDate', _endDate);
  }

  $: royaltyFee = getRoyaltyFee(product);
  $: marketplaceFeePrice = Math.max(marketplaceFee * $data.price || 0, 0);
  $: royaltyFeePrice = Math.max(royaltyFee * $data.price || 0, 0);
  $: total = Math.max($data.price * (1 - marketplaceFee - royaltyFee) || 0, 0);
</script>

{#if isOpen}
  <Modal title="Create auction" on:close={closeModal}>
    <form use:form class="relative">
      {#if $isSubmitting}
        <div class="form-overlay" />
      {/if}
      <div class="px-10 flex flex-col gap-4 pb-10 max-w-md">
        <div class="flex justify-center items-center bg-black h-72">
          <FilePreview item={product.sku.nftPublicAssets?.[0]} preview />
        </div>
        <ProductModalInfo sku={product.sku} {product} />
        <div class="max-w-sm text-gray-500">
          You won’t be able to transfer or redeem this item while your auction is in progress.
        </div>
        <div class="grid grid-cols-2 gap-2 py-4 text-center">
          <div class="flex-grow flex flex-col relative">
            {#if $data.startImmediately}
              <div class="form-overlay" />
            {/if}
            <div class="text-black font-medium mb-2">Start date</div>
            <div
              class="flex-grow px-2 py-2 whitespace-nowrap text-base flex justify-center items-center filter"
              class:blur-sm={$data.startImmediately}
              use:datePicker={{
                defaultDate: $data.startDate,
                enableTime: true,
                minuteIncrement: 1,
                onChange: onStartDateChange,
              }}
            >
              <span>
                {formatDate($data.startDate, 'MMM D, YYYY')}<br />
                {formatDate($data.startDate, 'hh:mm A')}
              </span>
              <Icon path={mdiChevronDown} color="black" class="inline ml-1" />
            </div>
          </div>
          <div class="flex-grow flex flex-col">
            <div class="text-black font-medium mb-2">End date</div>
            <div
              class="flex-grow px-2 py-2 whitespace-nowrap text-base flex justify-center items-center"
              use:datePicker={{
                defaultDate: $data.endDate,
                enableTime: true,
                minuteIncrement: 1,
                onChange: onEndDateChange,
              }}
            >
              <span>
                {formatDate($data.endDate, 'MMM D, YYYY')}<br />
                {formatDate($data.endDate, 'hh:mm A')}
              </span>
              <Icon path={mdiChevronDown} color="black" class="inline ml-1" />
            </div>
          </div>

          <div class="flex justify-center gap-3">
            <input id="startImmediately" name="startImmediately" type="checkbox" class="w-5 h-5 text-black bg-white" />
            <label for="startImmediately" class="text-sm font-semibold">Start immediately</label>
          </div>
        </div>
        {#if $errors.startDate}
          <div class="text-red-500 text-sm mb-2">{$errors.startDate}</div>
        {/if}
        {#if $errors.endDate}
          <div class="text-red-500 text-sm mb-2">{$errors.endDate}</div>
        {/if}

        <div class="input-container flex items-center relative mt-4 mb-2">
          <input
            data-initial-focus
            type="number"
            name="price"
            class="relative w-full bg-gray-50 py-3 pl-8 pr-2 outline-none rounded-lg text-center border-0 text-xl"
            placeholder="Enter min bid price"
          />
        </div>
        {#if $errors.price}
          <div class="text-red-500 text-sm mb-2">{$errors.price}</div>
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
        <Button variant="brand" class="w-full mt-6" type="submit">Start Auction</Button>
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
