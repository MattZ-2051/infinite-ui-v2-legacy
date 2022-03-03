<script lang="ts">
  import type { User } from '$lib/user/types';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext } from 'svelte';
  import * as yup from 'yup';
  import { closeModal, Modal } from '$ui/modals';
  import routes from '$project/routes';
  import { patchUser, onSignOut } from '$lib/user';
  import { FormElement, Textarea } from '$lib/components/form';
  import Button from '$lib/components/Button.svelte';
  import { variables } from '$lib/variables';
  import { accountDetailsValidation, handleUserApiError, phoneNumberConsentText } from './account.service';

  export let isOpen: boolean;
  export let user: User;

  const schema = yup.object({
    ...accountDetailsValidation,
    username: yup
      .string()
      .required('Username is required.')
      .min(3, 'Username must be at least 3 characters long.')
      .max(18, 'Username must be shorter than 18 characters.')
      .matches(/^[\w.-]*$/, 'Only letters, digits, dashes (-), and underscores (_) are allowed.'),
    tagline: yup.string().max(150, 'About me must be at most 150 characters.'),
  });

  const { form, errors, isSubmitting, data } = createForm<{
    firstName: string;
    lastName: string;
    tagline: string;
    username?: string;
    phoneNumber: string;
    phoneNumberConsentGiven: boolean;
    termsAndConditionsConsentGiven: boolean;
    privacyPolicyConsentGiven: boolean;
  }>({
    initialValues: {
      firstName: '',
      lastName: '',
      tagline: '',
      username: '',
      phoneNumber: '',
      phoneNumberConsentGiven: false,
      termsAndConditionsConsentGiven: false,
      privacyPolicyConsentGiven: false,
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

  $: canSave =
    $data.termsAndConditionsConsentGiven &&
    $data.privacyPolicyConsentGiven &&
    ($data.phoneNumber === '' || hidePhoneConsent ? true : $data.phoneNumberConsentGiven);

  const hidePhoneConsent = variables.hidePhoneConsent || false;

  setContext('errors', errors);
</script>

{#if isOpen}
  <Modal persistent={true} closeButton={false}>
    <div slot="title" class="modal-title"><span>Profile Details</span></div>
    <div class="flex flex-col max-w-sm border-t border-gray-200 justify-evenly gap-5 px-10 py-6 relative">
      {#if $isSubmitting}
        <div class="form-overlay" />
      {/if}
      <span class="text-base text-gray-900 text-left">
        We love getting to know our community. Please tell us more about yourself in the form below.
      </span>
      <form use:form autocomplete="off" class="flex flex-col gap-3">
        <FormElement label="First name *" name="firstName" />
        <FormElement label="Last name *" name="lastName" />
        <FormElement component={Textarea} label="About me" name="tagline" placeholder="Enter short bio" rows="4" />
        <FormElement label="Username *" name="username" />
        <FormElement label="Phone Number" name="phoneNumber" />
        <div class="flex gap-4 justify-end" />
        {#if !hidePhoneConsent}
          <div class="flex gap-3 mb-4">
            <input
              id="phoneNumberConsentGiven"
              type="checkbox"
              name="phoneNumberConsentGiven"
              class="w-5 h-5 text-black bg-white"
              disabled={$data.phoneNumber === ''}
            />
            <label for="phoneNumberConsentGiven" class="text-gray-900 text-sm">{phoneNumberConsentText}</label>
          </div>
        {/if}
        <div class="flex gap-3 mb-4">
          <input
            id="termsAndConditionsConsentGiven"
            name="termsAndConditionsConsentGiven"
            type="checkbox"
            class="w-5 h-5 text-black bg-white"
          />
          <label for="termsAndConditionsConsentGiven" class="text-gray-900 text-sm"
            >I agree to the <a
              href={routes.terms}
              target="_blank"
              rel="noreferrer"
              class="underline hover:no-underline font-semibold">Terms and Conditions</a
            >.</label
          >
        </div>
        <div class="flex gap-3 mb-4">
          <input
            id="privacyPolicyConsentGiven"
            name="privacyPolicyConsentGiven"
            type="checkbox"
            class="w-5 h-5 text-black bg-white"
          />
          <label for="privacyPolicyConsentGiven" class="text-gray-900 text-sm"
            >I accept the <a
              href={routes.privacy}
              target="_blank"
              rel="noreferrer"
              class="underline hover:no-underline font-semibold">Privacy Policy</a
            >.</label
          >
        </div>
        <div class="flex flex-col gap-4 pt-6 border-t border-gray-200">
          <Button variant="brand" disabled={!canSave} type="submit" class="text-xs font-semibold">Save</Button>
          <Button on:click={() => onSignOut()} class="text-xs font-semibold">Logout</Button>
        </div>
      </form>
    </div>
  </Modal>
{/if}

<style lang="postcss">
  .modal-title {
    font-size: var(--account-initial-modal-title-font-size, 1.875rem);
    font-family: var(--account-initial-modal-title-font);
  }
</style>
