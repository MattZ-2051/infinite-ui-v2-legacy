<script lang="ts">
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  // import { hsSubscribeEmail } from '../hubspot';
  import routes from '$project/routes';

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
        // await hsSubscribeEmail(values.email);
        toast.success(`Thanks for signing up for McLaren newsletter! Stay tuned for more updates coming soon.`, {
          toastId,
        });
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

<div>
  <form use:form autocomplete="off" class="flex flex-col lg:flex-row justify-between">
    <div class="w-full rounded-full flex justify-between p-1 mb-6 mr-10  lg:mb-0 border border-white-opacity-20">
      <input
        type="text"
        name="email"
        class="focus:outline-none rounded-full w-full p-3 pl-4  text-white bg-transparent placeholder-white border-none"
        placeholder="Enter your email"
      />
      <Button
        type="submit"
        class="text-xs w-52 h-14 font-medium tracking-widest hidden md:block"
        variant="brand"
        disabled={$isSubmitting}
        >{#if $isSubmitting}Subscribing...{:else}Subscribe{/if}</Button
      >
    </div>
    <Button type="submit" variant="brand" class=" md:hidden h-14 min-w-0">Subscribe</Button>
  </form>
</div>
