<script lang="ts">
  import * as yup from 'yup';
  import { setContext } from 'svelte';
  import { validateSchema } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import { formatCurrency } from '$util/format';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import notifications from '$ui/toast/toast.store';
  import { maxBidAuction } from '$lib/features/product/product.store';

  export let minBidPrice: number;
  export let bidIncremenent: number;

  const acceptedBidPrice = ($maxBidAuction || minBidPrice) + bidIncremenent;

  const schema = yup.object({
    placeBid: yup
      .number()
      .typeError('Not a valid number.')
      .required('Bid amount is required.')
      .min(acceptedBidPrice, `Amount must be greater or equal than ${formatCurrency(acceptedBidPrice)}.`),
  });

  const { form, errors, reset } = createForm({
    onSubmit: async (values) => {
      notifications.success('Open Modal !!!!');
      reset();
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
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
    <div style="flex-grow:1;" class="flex justify-center  items-center ">
      <button
        class="button-style w-full max-w-xs px-12 py-4 text-xl rounded-3xl transition delay-100 hover:bg-white hover:text-black"
        >Place Bid</button
      >
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
