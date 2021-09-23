<script lang="ts">
  import { mdiEmail } from '@mdi/js';
  import { createForm } from 'felte';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import Icon from '$ui/icon/Icon.svelte';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { subscribe } from './subscribe.api';

  /**
   * Class to be added on the title.
   */
  export let titleClass = 'text-base font-medium';

  /**
   * Class to be added on the form.
   */
  let _class = '';
  export { _class as class };

  const schema = yup.object({
    email: yup.string().email('Please enter a properly formatted email address'),
  });

  const { form, errors, reset, isSubmitting } = createForm<{ email: string }>({
    onSubmit: async (values) => {
      const toastId = 'subscribe-form';
      if (!values.email) {
        return toast.danger('Please enter your email address.', { toastId });
      }

      try {
        await subscribe(values);
        toast.success('You have successfully joined our newsletter! Check your email for more information.', {
          toastId,
        });
        reset();
      } catch {
        toast.danger(
          'Whoops! We were not able to subscribe you to our mailing list. Please try again or contact support if this issue continues.',
          { toastId }
        );
      }
    },
    validate: validateSchema(schema),
  });
</script>

<div class="text-center text-white {titleClass}">Never miss an exclusive drop!</div>

<div class="flex flex-col items-center justify-center my-6">
  <form
    use:form
    class="focus-within:ring-2 flex relative max-w-lg w-full rounded-full h-10 {_class}"
    autocomplete="off"
  >
    <Icon class="text-gray-700 absolute transform -translate-y-1/2 top-1/2 left-4" path={mdiEmail} />
    <input
      class="bg-transparent min-w-0 text-gray-700 placeholder-gray-600 font-extrabold italic text-base pl-12 flex-1 rounded-full focus:outline-none"
      name="email"
      placeholder="email"
    />
    <div class="">
      <Button
        variant="brand"
        --button-padding="7px 0"
        class="whitespace-nowrap w-28 md:w-40 relative -top-px -right-px"
        type="submit"
        disabled={$isSubmitting}
        >{#if $isSubmitting}Joining...{:else}Join now{/if}</Button
      >
    </div>
  </form>
  {#if $errors.email}
    <div class="text-center pt-2 text-sm text-red-600">{$errors.email}</div>
  {/if}
</div>

<div class="text-center text-xs max-w-2xl mx-auto">
  By providing your email, you are consenting to receive updates from ARIA Exchange on NFT releases, exclusive
  experiences, updates and other communications from ARIA Exchange and its affiliates and partners.
</div>

<style lang="postcss">
  form {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#191919, #191919) padding-box,
      linear-gradient(360deg, var(--gradient-start), var(--gradient-end)) border-box;
  }
</style>
