<script>
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import { toast } from '$ui/toast';
  import lastPic from './assets/lastPic.png';
  import lastPicMobile from './assets/lastPicMobile.png';
  import { hsSubscribeEmail } from '../hubspot';

  const schema = yup.object({
    email: yup.string().email('Please enter a properly formatted email address').required('Please, enter your email'),
  });
  const { form, errors, reset, isSubmitting } = createForm({
    onSubmit: async (values) => {
      const toastId = 'subscribe-form';
      try {
        await hsSubscribeEmail(values.email);
        toast.success('Successfully subscribed.', {
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

<div class="py-10 pb-40 lg:py-52 flex justify-center max-w-7xl w-auto">
  <div class="pb-52 flex justify-center max-w-7xl w-auto">
    <div class="bg-white rounded-2xl flex flex-col sm:flex-row md:justify-between">
      <div class="px-6 md:px-16 lg:w-8/12 sm:w-7/12 ">
        <div class="font-medium text-3xl lg:text-4xl pt-10 md:pt-8 lg:pt-14 pb-4">
          Etiam eu efficitur est. Aliquam mi lacus, dapibus soliicitudin fringilla
        </div>
        <div class="pb-6 lg:pb-20 md:pb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor nibh at mi ullamcorper, in porta magna
          accumsan. Suspendisse potenti.
        </div>
        <form use:form autocomplete="off" class="flex flex-col lg:flex-row justify-between xl:pb-28 pb-10 md:pb-4">
          <input
            type="text"
            name="email"
            class="focus:outline-none border-none border-b border-black-opacity-10 w-full mr-10 placeholder-black-opacity-10 text-black mb-6  lg:mb-0"
            placeholder="Enter your email and don’t miss a drop!"
          />
          <button
            type="submit"
            class="bg-black subscribe-button cursor-pointer px-8 py-3 md:py-2 rounded-3xl text-white text-center"
            disabled={$isSubmitting}
          >
            {#if $isSubmitting}Subscribing...{:else}Subscribe{/if}
          </button>
        </form>
        {#if $errors.email}
          <div class="text-center pt-2 text-sm text-red-600">{$errors.email}</div>
        {/if}
      </div>
      <div class="lg:w-4/12 sm:w-5/12 " style="max-height:450px">
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

<style>
  input {
    border: none;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  }

  .subscribe-button:hover {
    background: rgb(87, 57, 193);
  }
</style>
