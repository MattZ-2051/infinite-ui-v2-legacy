<script lang="ts">
  import type { User } from '$lib/user/types';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext, createEventDispatcher } from 'svelte';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import Button from '$lib/components/Button.svelte';
  import notifications from '$ui/toast/toast.store';
  import { patchUser } from '$lib/user';

  let dispatch = createEventDispatcher();

  export let user: User;
  export let disabled = false;
  let saving;

  const schema = yup.object({
    firstName: yup
      .string()
      .required('First name is required.')
      .matches(/^[ A-Za-z]*$/, 'Please enter valid first name.'),
    lastName: yup
      .string()
      .required('Last name is required.')
      .matches(/^[ A-Za-z]*$/, 'Please enter valid last name.'),
    phoneNumber: yup
      .string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.')
      .optional(),
  });

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phoneNumber: user.phoneNumber || '',
    phoneNumberConsentGiven: user.phoneNumberConsentGiven || false,
  };

  const { form, errors, setFields } = createForm({
    initialValues,
    onSubmit: async (values) => {
      try {
        await (saving = patchUser(values));
        dispatch('closeForm');
      } catch {
        notifications.danger(`There was a problem`);
      } finally {
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<form data-style="container" use:form autocomplete="off" class="flex flex-col gap-3" class:disabled>
  <FormInput label={`First name${disabled ? '' : ' *'}`} name="firstName" {disabled} />
  <FormInput label={`Last name${disabled ? '' : ' *'}`} name="lastName" {disabled} />
  <FormInput label="Phone Number" name="phoneNumber" {disabled} />
  <div class="flex gap-3 mb-4">
    <input
      id="consent"
      type="checkbox"
      name="phoneNumberConsentGiven"
      class="w-5 h-5 mt-1 text-black bg-white"
      value="check"
      {disabled}
    />
    <label for="consent" class="text-gray-800 text-sm"
      >By providing your phone number, you are consenting to receiving updates from ARIA Exchange on NFT releases,
      exclusive experiences, updates and other communications from ARIA Exchange and its affiliates and partners.</label
    >
  </div>
  <div style="height: 1px; background-color: #EBEBEB;" />
  <div class="flex gap-4 justify-end" class:hidden={disabled}>
    <Button
      class="w-16 text-sm rounded-sm"
      disabled={!!saving}
      on:click={(event) => {
        event.preventDefault();
        setFields(initialValues);
        dispatch('closeForm');
      }}>Cancel</Button
    >
    <Button variant="brand" type="submit" disabled={!!saving} class="w-16 text-sm rounded-sm">Save</Button>
  </div>
</form>

<style>
  [data-style='container'] {
    --input-label-color: theme('colors.gray.500');
    --input-label-font-weight: 500;
    --button-padding: 6px 24px;
  }
  [data-style='container'].disabled {
    --input-container-border-width: 1px;
    --input-bg-color: transparent;
    --input-color: theme('colors.gray.500');
    --input-padding: 0;
  }
  .disabled input[type='checkbox'] {
    background-color: theme('colors.gray.400');
  }
</style>
