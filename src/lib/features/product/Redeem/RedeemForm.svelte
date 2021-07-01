<script lang="ts">
  import type { RedeemInfo } from './types';
  import { setContext, createEventDispatcher } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import notifications from '$ui/toast/toast.store';
  import Button from '$lib/components/Button.svelte';
  import CardFormInput from '$lib/features/card/CardFormInput.svelte';
  import CardFormCountriesSelect from '$lib/features/card/CardFormCountriesSelect.svelte';
  import { redeemItem } from './redeem.api';

  const schema = yup.object({
    addressLine1: yup.string().required('Adress line 1 is required.'),
    addressLine2: yup.string(),
    postalCode: yup.string().required('Postal code is required.'),
    city: yup.string().required('City is required.'),
    country: yup.string().required('Country is required.'),
    district: yup.string().required('State/Province is required.'),
    shippingNotes: yup.string(),
  });

  let saving: Promise<unknown>;
  export let id: string;
  const dispatch = createEventDispatcher();

  const { form, errors, reset } = createForm<RedeemInfo>({
    onSubmit: async (values) => {
      try {
        await (saving = redeemItem({ ...values }, id));
        notifications.success('Product has been redeemed successfully.');
        reset();
        dispatch('close');
      } catch {
        notifications.danger(`There was a problem redeeming your product.`);
      } finally {
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 text-xl border-b-2 border-black pb-3 w-full">Shipping Information</div>
  <form use:form class="mt-2 flex flex-col gap-3">
    <CardFormInput name="addressLine1" label="Address Line 1" />
    <CardFormInput name="addressLine2" label="Address Line 2" />
    <CardFormInput name="postalCode" label="Postal Code" />
    <CardFormInput name="city" label="City" />
    <CardFormCountriesSelect name="country" label="Country" />
    <CardFormInput name="district" label="State/Province" />
    <CardFormInput name="shippingNotes" label="Shipping Notes" />

    <div style="font-size:12px; line-height:19.2px;" class="gray-text flex flex-col items-center">
      <span>Redeem this item and receive a copy on the following</span>
      <span>address.</span>
      <span>Keep in mind that,by confirming this action,the digital</span>
      <span>and physical versions may suffer a price decrease.</span>
    </div>
    <Button type="submit" disabled={!!saving} class="mt-2">Redeem Now</Button>
  </form>
</div>

<style>
  .gray-text {
    color: #9e9e9e;
  }
</style>
