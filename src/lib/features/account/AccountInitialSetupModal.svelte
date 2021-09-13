<script lang="ts">
  import type { User } from '$lib/user/types';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext } from 'svelte';
  import * as yup from 'yup';
  import { closeModal, Modal } from '$ui/modals';
  import { logout } from '$lib/auth';
  import routes from '$project/routes';
  import { clearUser, patchUser } from '$lib/user';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import Button from '$lib/components/Button.svelte';
  import { handleUserApiError } from './account.service';

  export let isOpen: boolean;
  export let user: User;

  const schema = yup.object({
    firstName: yup
      .string()
      .required('First name is required.')
      .matches(/^[ A-Za-z]*$/, 'Please enter valid first name.'),
    lastName: yup
      .string()
      .required('Last name is required.')
      .matches(/^[ A-Za-z]*$/, 'Please enter valid last name.'),
    username: yup
      .string()
      .required('Username is required.')
      .min(3, 'Username is too short.')
      .max(18, 'Username is too long.'),
    tagline: yup.string().max(150, 'About me must be at most 150 characters.'),
  });

  const { form, errors, isSubmitting, data } = createForm<{
    firstName: string;
    lastName: string;
    tagline: string;
    username?: string;
    phoneNumber: string;
    phoneNumberConsentGiven: boolean;
  }>({
    initialValues: {
      firstName: '',
      lastName: '',
      tagline: '',
      username: user?.username || '',
      phoneNumber: '',
      phoneNumberConsentGiven: false,
    },
    onSubmit: async (values) => {
      // Backend API is failing if using the same username
      if (values.username === user.username) {
        let { username, ...rest } = values;
        values = rest;
      }
      try {
        await patchUser(values);
        closeModal();
      } catch (error) {
        handleUserApiError(error);
      }
    },
    validate: validateSchema(schema),
  });

  let termsAndConditionsConsentGiven: boolean;
  let privacyPolicyConsentGiven: boolean;

  $: canSave = termsAndConditionsConsentGiven && privacyPolicyConsentGiven;

  setContext('errors', errors);

  function onLogout() {
    clearUser();
    logout(`${window.location.origin}`);
  }
</script>

{#if isOpen}
  <Modal title="Profile Details" on:close={closeModal} persistent={true} closeButton={false}>
    <div class="flex flex-col max-w-sm border-t border-black-opacity-20 justify-evenly gap-5 px-10 py-6 relative">
      {#if $isSubmitting}
        <div class="form-overlay" />
      {/if}
      <span class="text-base text-black-opacity-95 text-center">
        Please, provide the following information to setup your profile.
      </span>
      <form data-style="container" use:form autocomplete="off" class="flex flex-col gap-3">
        <FormInput label="First name *" name="firstName" />
        <FormInput label="Last name *" name="lastName" />
        <FormInput label="About me" name="tagline" placeholder="Enter short bio" textarea rows="4" />
        <FormInput label="Username *" name="username" />
        <FormInput label="Phone Number" name="phoneNumber" />
        <div class="flex gap-4 justify-end" />
        <div class="flex gap-3 mb-4">
          <input
            id="phoneNumberConsentGiven"
            type="checkbox"
            name="phoneNumberConsentGiven"
            class="w-5 h-5 text-black bg-white"
            disabled={$data.phoneNumber === ''}
          />
          <label for="phoneNumberConsentGiven" class="text-black-opacity-90 text-sm"
            >By providing your phone number, you are consenting to receiving updates from ARIA Exchange on NFT releases,
            exclusive experiences, updates and other communications from ARIA Exchange and its affiliates and partners.</label
          >
        </div>
        <div class="flex gap-3 mb-4">
          <input
            id="termsAndConditionsConsentGiven"
            type="checkbox"
            class="w-5 h-5 text-black bg-white"
            bind:checked={termsAndConditionsConsentGiven}
          />
          <label for="termsAndConditionsConsentGiven" class="text-black-opacity-90 text-sm"
            >I accept the <a href={routes.terms} target="_blank" class="underline hover:no-underline"
              >Terms and Conditions</a
            >.</label
          >
        </div>
        <div class="flex gap-3 mb-4">
          <input
            id="privacyPolicyConsentGiven"
            type="checkbox"
            class="w-5 h-5 text-black bg-white"
            bind:checked={privacyPolicyConsentGiven}
          />
          <label for="privacyPolicyConsentGiven" class="text-black-opacity-90 text-sm"
            >I accept the <a href={routes.privacy} target="_blank" class="underline hover:no-underline"
              >Privacy Policy</a
            >.</label
          >
        </div>
        <div class="flex flex-col gap-4 pt-6 border-t border-black-opacity-20">
          <Button disabled={!canSave} type="submit">Save</Button>
          <Button on:click={onLogout}>Logout</Button>
        </div>
      </form>
    </div>
  </Modal>
{/if}
