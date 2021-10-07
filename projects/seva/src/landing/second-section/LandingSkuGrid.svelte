<script lang="ts">
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import { toast } from '$ui/toast';
  import { user } from '$lib/user';
  import Button from '$lib/components/Button.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  import { hsSubscribeEmail, hsSubscribeUser } from '../../hubspot';

  export let skus;

  const schema = yup.object({
    email: yup.string().email('Please enter a properly formatted email address').required('Please, enter your email'),
  });
  const { form, errors, reset, isSubmitting } = createForm({
    onSubmit: async (values) => {
      const toastId = 'subscribe-form';
      try {
        await ($user ? hsSubscribeUser($user, values.email) : hsSubscribeEmail(values.email));
        toast.success('You have successfully joined our newsletter!', {
          toastId,
        });
        reset();
      } catch {
        toast.danger(
          'Whoops! We were not able to subscribe you. Please try again or contact support if this issue continues.',
          { toastId }
        );
      }
    },
    validate: validateSchema(schema),
  });
</script>

<div class="container px-6 mb-24 lg:mb-96">
  <div class="flex flex-col justify-center w-full mt-64 mb-24">
    <div class="flex flex-col justify-center items-center">
      <div class="flex flex-col items-center max-w-4xl">
        <p class="text-4xl md:text-6xl font-medium text-center  text-black">Welcome to the community!</p>
        <p class="text-base text-black font-extralight text-center  mt-6">
          Subscribe to our newsletter to learn about upcoming drops and special offers. By Subscribing to our list you
          agree to receive marketing emails from us. You can unsubscribe at any time by clicking the link in the footer
          of our emails.
        </p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-8 mb-48 md:mb-14">
      <form use:form class="flex flex-col md:relative max-w-lg w-full rounded-full h-16" autocomplete="off">
        <input
          class="text-center md:text-left text-black placeholder-black placeholder-opacity-70 text-sm md:text-base md:pl-6 flex-1 font-extralight rounded-full focus:outline-none focus:ring-2 md:py-0 py-6 stroke-1"
          name="email"
          placeholder="Enter your email"
        />
        <div
          class="items-center flex flex-col mx-2 mt-6 md:mt-0 md:absolute md:transform md:-translate-y-1/2 md:top-1/2 md:right-0"
        >
          <Button
            variant="brand"
            class="whitespace-nowrap md:mr-2 w-full py-12 md:py-0 text-xl md:text-base"
            type="submit"
            disabled={$isSubmitting}
          >
            {$isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>
      {#if $errors.email}
        <div class="text-center pt-2 text-sm text-red-600">{$errors.email}</div>
      {/if}
    </div>
    <SkuItemGrid {skus} />
  </div>
</div>
