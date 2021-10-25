<script>
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { toast } from '$ui/toast';
  import { CLIENT_COMPANY_NAME } from '$project/variables';
  import routes from '$project/routes';
  import Button from '$lib/components/Button.svelte';
  import lastPic from './assets/lastPic.png';
  import lastPicMobile from './assets/lastPicMobile.png';
  import { hsSubscribeEmail } from '../hubspot';

  const schema = yup.object({
    email: yup.string().email().required(),
  });
  const { form, reset, isSubmitting } = createForm({
    onSubmit: async (values) => {
      const toastId = 'subscribe-form';
      const isValidEmail = await schema.isValid({ email: values.email });
      if (!isValidEmail) {
        toast.danger('Please enter a valid email address.');
        return;
      }

      try {
        await hsSubscribeEmail(values.email);
        toast.success(
          `Thanks for signing up for the ${CLIENT_COMPANY_NAME} newsletter! Stay tuned for more updates coming soon.`,
          {
            toastId,
          }
        );
        reset();
      } catch {
        toast.danger(
          `Whoops! We were not able to subscribe you to our mailing list. Please try again or <a href=${routes.help}>contact support</a> if this issue continues.`,
          { toastId }
        );
      }
    },
  });
</script>

<div class="py-4 pb-20 lg:py-26 flex justify-center max-w-7xl w-auto">
  <div class="flex justify-center max-w-7xl w-auto">
    <div class="bg-white rounded-2xl flex flex-col sm:flex-row md:justify-between">
      <div class="px-6 md:px-16 lg:w-8/12 sm:w-7/12 mb-8 sm:mb-0">
        <div class="font-medium text-3xl lg:text-4xl pt-10 md:pt-8 lg:pt-14 pb-4">
          Our next Seva.Love collection will feature exclusive access to insights for transforming wellbeing with
          renowned author and integrative medicine pioneer Deepak Chopra.
        </div>
        <div class="pb-6 lg:pb-20 md:pb-10">
          Subscribe to our newsletter to learn about upcoming drops and special offers. By Subscribing to our list you
          agree to receive marketing emails from us. You can unsubscribe at any time by clicking the link in the footer
          of our emails.
        </div>
        <form use:form autocomplete="off" class="flex flex-col lg:flex-row justify-between">
          <div class="w-full rounded-full border flex justify-between p-1  mb-6 mr-10  lg:mb-0">
            <input
              type="text"
              name="email"
              class="focus:outline-none rounded-full border-none w-full p-3 pl-4 placeholder-black-opacity-70 text-black"
              placeholder="Enter your email"
            />
            <Button type="submit" class="lg:block hidden" variant="brand" disabled={$isSubmitting}>
              {#if $isSubmitting}Subscribing...{:else}Subscribe{/if}
            </Button>
          </div>
          <Button type="submit" variant="brand" class=" lg:hidden h-14" disabled={$isSubmitting}>
            {#if $isSubmitting}Subscribing...{:else}Subscribe{/if}
          </Button>
        </form>
      </div>
      <div class="lg:w-4/12 sm:w-5/12 ">
        <img
          src={lastPic}
          alt="founder pic"
          class="hidden sm:block md:w-full sm:rounded-r-2xl sm:h-full lg:h-full object-cover"
        />
        <img src={lastPicMobile} alt="founder pic" class="sm:hidden w-full object-cover" />
      </div>
    </div>
  </div>
</div>
