<script lang="ts">
  import type { User } from '$lib/user/types';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext, createEventDispatcher } from 'svelte';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { FormElement } from '$lib/components/form';
  import Button from '$lib/components/Button.svelte';
  import { patchUser } from '$lib/user';
  import { accountDetailsValidation, phoneNumberConsentText, handleUserApiError } from './account.service';

  let dispatch = createEventDispatcher();

  export let user: User;
  export let disabled = false;

  const schema = yup.object(accountDetailsValidation);

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phoneNumber: user.phoneNumber || '',
    phoneNumberConsentGiven: user.phoneNumberConsentGiven || false,
  };

  const { form, errors, setFields, data, isSubmitting } = createForm({
    initialValues,
    onSubmit: async (values) => {
      try {
        await patchUser(values);
        dispatch('closeForm');
      } catch (error) {
        handleUserApiError(error);
      }
    },
    validate: validateSchema(schema),
  });

  $: if ($data.phoneNumber === '') setFields('phoneNumberConsentGiven', false);

  setContext('errors', errors);

  $: variant = disabled ? 'base' : 'rounded';
  $: classes = disabled ? '' : 'form-element-rounded-white';
</script>

<form data-style="container" use:form autocomplete="off" class="flex flex-col gap-3" class:disabled>
  <FormElement class={classes} {variant} label={`First name${disabled ? '' : ' *'}`} name="firstName" {disabled} />
  <FormElement class={classes} {variant} label={`Last name${disabled ? '' : ' *'}`} name="lastName" {disabled} />
  <FormElement class={classes} {variant} label="Phone Number" name="phoneNumber" {disabled} />
  <div class="flex gap-3 my-4">
    <input
      id="consent"
      type="checkbox"
      name="phoneNumberConsentGiven"
      class="w-5 h-5 mt-1 text-black bg-white"
      value="check"
      disabled={disabled || $data.phoneNumber === ''}
    />
    <label for="consent" class="text-gray-800 text-sm">{phoneNumberConsentText}</label>
  </div>
  <div style="height: 1px; background-color: #EBEBEB;" />
  <div class="flex gap-4 justify-end" class:hidden={disabled}>
    <Button
      class="w-16 text-sm rounded-sm"
      disabled={!!$isSubmitting}
      on:click={(event) => {
        event.preventDefault();
        setFields(initialValues);
        dispatch('closeForm');
      }}>Cancel</Button
    >
    <Button
      variant="brand"
      type="submit"
      disabled={!!$isSubmitting || ($data.phoneNumber === '' ? false : !$data.phoneNumberConsentGiven)}
      class="w-16 text-sm rounded-sm">Save</Button
    >
  </div>
</form>

<style>
  [data-style='container'] {
    --button-padding: 6px 24px;
  }
  .disabled input[type='checkbox'] {
    background-color: theme('colors.gray.400');
  }
</style>
