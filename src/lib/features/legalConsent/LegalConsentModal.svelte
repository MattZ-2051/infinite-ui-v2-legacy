<script lang="ts">
  import { createForm } from 'felte';
  import { setContext, onMount } from 'svelte';
  import type { User } from '$lib/user/types';
  import { closeModal, Modal } from '$ui/modals';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';
  import { onSignOut } from '$lib/user';
  import { addLegalConsent, getLegalConsent } from '$lib/features/legalConsent/legalConsent.api';
  import { handleUserApiError } from '$lib/features/account/account.service';
  import TermsAndPoliciesLink from './LegalConsentLink.svelte';
  import { getConsentsToAgree, getModalBodyText, getModalTitle } from './legalConsent.service';

  export let legalConsentRecord: { title: string };
  export let user: User;

  const consentsToAgree = getConsentsToAgree(user);
  let title = '';
  let bodyText = '';
  onMount(async () => {
    if (!legalConsentRecord) {
      legalConsentRecord =
        consentsToAgree.length > 1 ? { title: 'terms & policies' } : await getLegalConsent(consentsToAgree[0]);
      title =
        consentsToAgree.length > 1
          ? getModalTitle('terms & policies', modalType)
          : getModalTitle(legalConsentRecord.title, modalType);
      bodyText =
        consentsToAgree.length > 1
          ? getModalBodyText('terms & policies', modalType)
          : getModalBodyText(legalConsentRecord.title, modalType);
    }
  });
  const modalType = user?.acceptedLegalConsentIds.length === 0 ? 'firstTime' : 'update';

  const { form, errors, isSubmitting, data } = createForm<{
    termsAndConditionsConsentGiven: boolean;
  }>({
    initialValues: {
      termsAndConditionsConsentGiven: false,
    },
    onSubmit: async () => {
      try {
        await Promise.all(consentsToAgree.map((c) => addLegalConsent(c)));
        closeModal();
      } catch (error) {
        handleUserApiError(error);
      }
    },
  });

  $: canSave = $data.termsAndConditionsConsentGiven;

  setContext('errors', errors);
</script>

<Modal persistent={true} closeButton={false} class="max-w-xs md:max-w-md">
  <header class="flex items-center gap-2 pt-8 px-8 md:px-10">
    <div class="font-medium text-[29px] md:text-[32px] leading-[34px] md:leading-[45px]">{title}</div>
  </header>
  {#if $isSubmitting}
    <div class="form-overlay" />
  {/if}
  <div class="px-8 md:px-10 mt-8 text-base">
    <div class="text-gray-500 font-medium mb-6">
      {bodyText}
    </div>
    <form use:form autocomplete="off">
      <div class="flex gap-3 mb-8">
        <input
          id="termsAndConditionsConsentGiven"
          name="termsAndConditionsConsentGiven"
          type="checkbox"
          class="border-gray-200 w-5 h-5 text-black bg-white"
        />

        <label for="termsAndConditionsConsentGiven" class="text-gray-500 font-medium"
          >I read and accept the {#if modalType !== 'firstTime'}
            updated
          {/if}
          {#if modalType === 'firstTime' || legalConsentRecord?.title.toLowerCase().includes('terms & policies')}
            <TermsAndPoliciesLink href={routes.terms} content="Terms of Service" /> ,
            <TermsAndPoliciesLink href={routes.privacy} content="Privacy Policy" /> &
            <TermsAndPoliciesLink href={routes.cookies} content="Cookies Policy" />.
          {:else if legalConsentRecord?.title.toLowerCase().includes('terms of service')}
            <TermsAndPoliciesLink href={routes.terms} content="Terms of Service" />.
          {:else if legalConsentRecord?.title.toLowerCase().includes('privacy policy')}
            <TermsAndPoliciesLink href={routes.privacy} content="Privacy Policy" />.
          {:else if legalConsentRecord?.title.toLowerCase().includes('cookies policy')}
            <TermsAndPoliciesLink href={routes.cookies} content="Cookies Policy" />.
          {/if}
        </label>
      </div>
      <div class="flex flex-col text-base md:text-xl md:leading-8 mb-10">
        <Button variant="brand" disabled={!canSave} type="submit" class="mb-3 font-semibold">Sign In</Button>
        <Button variant="outline-brand" on:click={() => onSignOut()}>Decline & Log Out</Button>
      </div>
    </form>
  </div>
</Modal>
