<script lang="ts">
  import type { User } from '$lib/user/types';
  import type { NewBankAccount } from './types';
  import type { PlaidLinkToken, PlaidPublicToken, PlaidSuccessMetadata } from './plaid';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import { createEventDispatcher, setContext } from 'svelte';
  import { createForm } from 'felte';
  import { toast } from '$ui/toast';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import FormCountriesSelect from '$lib/components/form/FormCountriesSelect.svelte';
  import FormDistrictsSelect from '$lib/components/form/FormDistrictsSelect.svelte';
  import { openPlaid } from './plaid';
  import { getAchLinkToken, getAchAccessToken } from './account-add.api';

  export let onSubmit: (handler: () => void) => void;
  export let user: User;

  const dispatch = createEventDispatcher();

  $: isDistrictRequired = ['US', 'CA'].includes($data.country);

  const schema = yup.object({
    holderName: yup
      .string()
      .required('Account holder name is required')
      .matches(/^[A-Za-z]+\s+([A-Za-z]+\s*)+$/, 'Please enter a valid name'),
    addressLine1: yup.string().required('Address is required'),
    addressLine2: yup.string().optional(),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'),
    email: yup.string().email().required('Email is required'),
    postalCode: yup.string().required('Postal code is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    district: yup
      .string()
      .when('country', () =>
        isDistrictRequired ? yup.string().required('State/Province is required') : yup.string().notRequired()
      ),
  });

  let submit: HTMLElement;
  let showBackdrop = false;
  let destroyPlaid;

  const { form, errors, data, reset } = createForm<NewBankAccount>({
    initialValues: {
      country: 'US',
    },
    onSubmit: async (formValues: NewBankAccount) => {
      await getAchLinkToken()
        .then(async (linkToken: PlaidLinkToken) => {
          reset();

          showBackdrop = true;

          destroyPlaid = await openPlaid(
            linkToken,
            () => {
              dispatch('close');
            },
            async (publicToken: PlaidPublicToken, metadata: PlaidSuccessMetadata) =>
              await onPlaidSuccess(publicToken, metadata, formValues),
            () => {
              destroyPlaid();
            }
          );

          return true;
        })
        .catch(() => toast.danger('There was a problem adding your bank account.'));
    },
    validate: validateSchema(schema),
  });

  async function onPlaidSuccess(
    publicToken: PlaidPublicToken,
    metadata: PlaidSuccessMetadata,
    formValues: NewBankAccount
  ) {
    await getAchAccessToken(publicToken, metadata, formValues)
      .then(() => {
        dispatch('account-added');
        toast.success('Bank account added successfully.');
        return true;
      })
      .catch(() => toast.danger('There was a problem adding your bank account.'))
      .finally(() => destroyPlaid());
  }

  setContext('errors', errors);

  onSubmit(() => submit.click());
</script>

{#if showBackdrop}
  <div class="fixed top-0 left-0 bottom-0 right-0 z-40 w-full h-full bg-black" />
{/if}

<div class="container flex flex-col gap-2 items-center">
  <div class="w-80">
    <form use:form class="mt-6 flex flex-col gap-3" autocomplete="off">
      <FormInput name="holderName" label="Account holder name *" />
      <FormInput name="addressLine1" label="Address Line 1 *" />
      <FormInput name="addressLine2" label="Address Line 2" />
      <div class="grid grid-cols-2 gap-4">
        <FormInput name="phoneNumber" label="Phone Number *" />
        <FormInput name="email" label="Email *" klass="flex-grow" value={user.email} />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <FormInput name="city" label="City *" />
        <FormInput name="postalCode" label="Postal Code *" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <FormCountriesSelect name="country" label="Country *" />
        <FormDistrictsSelect
          countryISO2={$data.country}
          name="district"
          label="State/Province{isDistrictRequired ? ' *' : ''}"
        />
      </div>
      <button class="hidden" bind:this={submit} />
    </form>
  </div>
</div>
