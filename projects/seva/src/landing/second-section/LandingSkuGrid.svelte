<script lang="ts">
  // import * as yup from 'yup';
  // import { createForm } from 'felte';
  // import { toast } from '$ui/toast';
  // import { user } from '$lib/user';
  // import Button from '$lib/components/Button.svelte';
  import { SkuItemGrid } from '$lib/sku-item';
  // import { CLIENT_COMPANY_NAME } from '$project/variables';
  // import routes from '$project/routes';
  // import { hsSubscribeEmail, hsSubscribeUser } from '../../hubspot';

  export let skus;
  $: _skus = skus.splice(0, 4);
  // const schema = yup.object({
  //   email: yup.string().email().required(),
  // });

  // const { form, reset, isSubmitting } = createForm({
  //   onSubmit: async (values) => {
  //     const toastId = 'subscribe-form';
  //     const isValidEmail = await schema.isValid({ email: values.email });
  //     if (!isValidEmail) {
  //       toast.danger('Please enter a valid email address.');
  //       return;
  //     }
  //     try {
  //       await ($user ? hsSubscribeUser($user, values.email) : hsSubscribeEmail(values.email));
  //       toast.success(
  //         `Thanks for signing up for the ${CLIENT_COMPANY_NAME} newsletter! Stay tuned for more updates coming soon.`,
  //         {
  //           toastId,
  //         }
  //       );
  //       reset();
  //     } catch {
  //       toast.danger(
  //         `Whoops! We were not able to subscribe you to our mailing list. Please try again or <a href=${routes.help}>contact support</a> if this issue continues.`,
  //         { toastId }
  //       );
  //     }
  //   },
  // });
</script>

<div class="container px-6 mb-12 sm:mb-32">
  <div class="flex flex-col justify-center w-full mb-24">
    <div class="flex flex-col justify-center items-center">
      <div class="flex flex-col items-center max-w-4xl">
        <p class="text-4xl md:text-6xl font-semibold text-center leading-10 text-black">Welcome to the community!</p>
        <!-- {#if !$user}
          <p class="text-base text-black font-extralight text-center  mt-6">
            Subscribe to our newsletter to learn about upcoming drops and special offers. By Subscribing to our list you
            agree to receive marketing emails from us. You can unsubscribe at any time by clicking the link in the
            footer of our emails.
          </p>
        {/if} -->
      </div>
    </div>

    <div class=" mt-8 mb-24 sm:mb-14 ">
      <!-- {#if !$user}
        <div class="flex flex-col items-center justify-center ">
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
        </div>
      {/if} -->
    </div>

    <SkuItemGrid skus={_skus} />
  </div>
</div>
