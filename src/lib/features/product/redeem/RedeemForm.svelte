<script lang="ts">
  import type { RedeemInfo } from './types';
  import { setContext, createEventDispatcher } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import notifications from '$ui/toast/toast.store';
  import Button from '$lib/components/Button.svelte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import FormCountriesSelect from '$lib/components/form/FormCountriesSelect.svelte';
  import { redeemItem } from './redeem.api';

  const schema = yup.object({
    addressLine1: yup.string().required('Adress is required.'),
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

  const { form, errors, reset, isSubmitting } = createForm<RedeemInfo>({
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

<div class="flex flex-col gap-2 relative">
  {#if $isSubmitting}
    <div class="form-overlay" />
  {/if}

  <div class="flex gap-2 text-xl w-full">Shipping Information</div>
  <form use:form class="mt-2 flex flex-col gap-4" autocomplete="off">
    <FormInput name="addressLine1" label="Address Line 1  *" />
    <FormInput name="addressLine2" label="Address Line 2" />
    <FormInput name="postalCode" label="Postal Code *" />
    <FormInput name="city" label="City *" />
    <FormCountriesSelect name="country" label="Country *" />
    <FormInput name="district" label="State/Province *" />
    <FormInput name="shippingNotes" label="Shipping Notes" />

    <div class="text-xs text-gray-600 max-w-sm">
      Redeem this item and receive a copy on the following adress. Keep in mind that, by confirming this action, the
      digital and physical versions may suffer a price decrease.
    </div>
    <Button type="submit" disabled={!!saving} class="mt-6">Redeem Now</Button>
  </form>
</div>
