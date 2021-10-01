<script lang="ts">
  import { createForm } from 'felte';
  import { Modal, closeModal } from '$ui/modals';
  import Button from '$lib/components/Button.svelte';
  import PasswordInput from '$ui/password-input/PasswordInput.svelte';
  import { goto } from '$app/navigation';
  import routes from '$project/routes';

  export let isOpen: boolean;
  export let onConfirm: (newPassword: string, code: string, cognitoId: string) => unknown;

  async function onCancelButton() {
    goto(routes.signout);
  }

  const queryString = window.location.search;
  const urlParameters = new URLSearchParams(queryString);
  const code = urlParameters.get('code');
  const userCognitoId = urlParameters.get('user');

  const passwordCriteriaMessages = {
    lowercase: 'Password must contain a lower case letter',
    uppercase: 'Password must contain an upper case letter',
    number: 'Password must contain a number',
    special: 'Password must contain a special character',
    min: 'Password must contain at least 8 characters',
  };
  let passwordCriteria: { lowercase: boolean; uppercase: boolean; number: boolean; special: boolean; min: boolean };

  const { form, data, errors, isSubmitting, createSubmitHandler } = createForm<{ newPassword: string }>({
    onSubmit: async (values) => {
      await onConfirm(values.newPassword, code, userCognitoId);
    },
    validate: ({ newPassword }) => {
      passwordCriteria = {
        lowercase: new RegExp('.*[a-z].*').test(newPassword),
        uppercase: new RegExp('.*[A-Z].*').test(newPassword),
        number: new RegExp('.*\\d.*').test(newPassword),
        special: new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*').test(newPassword),
        min: newPassword?.length >= 8,
      };

      return Object.values(passwordCriteria).every(Boolean) ? {} : { newPassword: 'error' };
    },
  });
  const handleSubmit = createSubmitHandler();
</script>

{#if isOpen}
  <Modal on:close={closeModal} persistent={true} class="max-w-md">
    <svelte:fragment slot="title"><span class="text-2xl">Change Password</span></svelte:fragment>
    <div class="px-10">
      <div class="pt-10 pb-5">
        <form use:form autocomplete="off" data-style="container" class="flex flex-col gap-3">
          <PasswordInput
            label="New Password *"
            placeholder="Enter your new password"
            name="newPassword"
            maxlength={99}
            style="border-bottom-color: black; border-bottom-width: 1px; border-bottom-right-radius: 0; border-bottom-left-radius: 0;"
          />

          <div class="text-sm flex flex-col gap-2 mt-4">
            {#each ['lowercase', 'uppercase', 'special', 'number', 'min'] as criteria}
              <div class="whitespace-nowrap {!passwordCriteria[criteria] ? 'text-red-700' : 'text-green-700'}">
                {!passwordCriteria[criteria] ? '✖' : '✓'}
                {passwordCriteriaMessages[criteria]}
              </div>
            {/each}
          </div>
        </form>
      </div>
    </div>
    <div slot="footer" class="flex flex-col gap-4">
      <Button
        type="button"
        on:click={handleSubmit}
        disabled={$isSubmitting || !!$errors.newPassword || !$data.newPassword}>Change</Button
      >
      <Button type="button" on:click={onCancelButton} variant="outline-brand" disabled={$isSubmitting}>Cancel</Button>
    </div>
  </Modal>
{/if}
