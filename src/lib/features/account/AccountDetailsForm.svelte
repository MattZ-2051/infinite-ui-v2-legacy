<script lang="ts">
  import type { User } from '$lib/user/types';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext, createEventDispatcher } from 'svelte';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import FormInput from '$lib/components/form/FormInput.svelte';
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
  });

  const { form, errors } = createForm({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      phoneNumberConsentGiven: user.phoneNumberConsentGiven || false,
    },
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

<form use:form autocomplete="off" class="flex flex-col gap-3 ">
  <FormInput label="First name" name="firstName" {disabled} />
  <FormInput label="Last name" name="lastName" {disabled} />
  <FormInput label="Phone Number" name="phoneNumber" {disabled} />
  <div class="flex gap-3 mb-4">
    <input type="checkbox" name="phoneNumberConsentGiven" class="w-5 h-5 mt-1" value="check" {disabled} />
    <span class="text-gray-300 text-sm"
      >By providing your phone number, you are consenting to receiving updates from ARIA Exchange on NFT releases,
      exclusive experiences, updates and other communications from ARIA Exchange and its affiliates and partners.</span
    >
  </div>
  <div style="height: 1px; background-color: #EBEBEB;" />
  <div class="flex gap-4 justify-end" class:hidden={disabled}>
    <button
      class=" bg-primary p-1 w-16 text-sm  rounded-sm"
      disabled={!!saving}
      on:click|preventDefault={() => {
        dispatch('closeForm');
      }}>Cancel</button
    >
    <button type="submit" disabled={!!saving} class=" bg-primary p-1 w-16 text-sm  rounded-sm">Save</button>
  </div>
</form>
