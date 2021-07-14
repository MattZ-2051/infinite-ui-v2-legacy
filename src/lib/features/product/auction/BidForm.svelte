<script lang="ts">
  import * as yup from 'yup';
  import { createEventDispatcher, setContext } from 'svelte';
  import { validateSchema } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import { user } from '$lib/user';
  import { toast } from '$ui/toast';
  import { formatCurrency } from '$util/format';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import { minAllowedBid } from './auction.store';

  export let bidIncremenent: number;

  const dispatch = createEventDispatcher();

  let submit: HTMLButtonElement;

  $: acceptedBidPrice = $minAllowedBid + bidIncremenent;

  // this could suffer from rounding issues
  // ie, not accepting the exact displayed available balance due to upwards rounding
  $: availableBalanceForBiding = $user?.availableBalance || Number.MAX_SAFE_INTEGER;

  $: schema = yup.object({
    placeBid: yup.lazy((value) => {
      return value === ''
        ? yup.string().required('Bid amount is required.')
        : yup
            .number()
            .typeError('Not a valid number.')
            .min(acceptedBidPrice, `Amount must be greater or equal than ${formatCurrency(acceptedBidPrice)}.`)
            .max(
              availableBalanceForBiding,
              `Amount must be less or equal than your available balance ${formatCurrency(availableBalanceForBiding)}.`
            );
    }),
  });

  const { form, errors, reset } = createForm({
    onSubmit: async ({ placeBid }: { placeBid: string }) => {
      dispatch('place-bid', { amount: Number.parseFloat(placeBid) });
      reset();
    },
    validate,
  });

  setContext('errors', errors);

  function validate(values) {
    return validateSchema(schema)(values);
  }

  function onPlaceBid() {
    if (!$user) {
      toast.danger('Please, login to place a bid.');

      return;
    }

    submit.click();
  }
</script>

<div class="bid-color py-6 px-6 rounded-xl mt-4">
  <form use:form class="w-full flex gap-6  flex-wrap" autocomplete="off">
    <div style="flex-grow:999;" class="flex gap-4">
      <FormInput
        class="w-full"
        name="placeBid"
        label="Place a bid higher or equal than {formatCurrency(acceptedBidPrice)} :"
      />
    </div>
    <div style="flex-grow:1;" class="flex justify-center  items-center">
      <button type="submit" class="hidden" bind:this={submit} />
      <button
        class="button-style w-full max-w-xs px-12 py-4 text-xl rounded-3xl transition delay-100 hover:bg-white hover:text-black"
        on:click={onPlaceBid}
      >
        Place Bid
      </button>
    </div>
  </form>
</div>

<style>
  .bid-color {
    background: #2e2e2e;
  }
  .button-style {
    background: #3b3b3b;
    color: #ffffff;
  }
  form {
    --form-input-color: theme('colors.gray.200');
  }
</style>
