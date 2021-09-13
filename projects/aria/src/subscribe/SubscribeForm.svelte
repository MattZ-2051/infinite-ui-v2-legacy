<script lang="ts">
  import { mdiEmail } from '@mdi/js';
  import { createForm } from 'felte';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import Icon from '$ui/icon/Icon.svelte';
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
    email: yup.string().email('Email is not correct'),
  });

  const { form } = createForm<{ email: string }>({
    onSubmit: async (values) => {
      await subscribe(values.email);
    },
    validate: validateSchema(schema),
  });
</script>

<div class="text-center text-white {titleClass}">Never miss an exclusive drop!</div>

<div class="flex justify-center my-6">
  <form use:form class="flex relative max-w-md w-full rounded-full h-10 {_class}" autocomplete="off">
    <Icon class="text-gray-300 absolute transform -translate-y-1/2 top-1/2 left-4" path={mdiEmail} />
    <input
      class="text-gray-300 placeholder-gray-400 font-extrabold italic text-base pl-14 flex-1 rounded-full focus:outline-none focus:ring-2"
      name="email"
      placeholder="email"
    />
    <div class="absolute transform -translate-y-1/2 top-1/2 right-0">
      <Button --button-padding="9px 48px" animate={false} class="whitespace-nowrap text-sm font-medium" type="submit"
        >Join now</Button
      >
    </div>
  </form>
</div>

<div class="text-center text-xs max-w-2xl mx-auto">
  By providing your email, you are consenting to receive updates from ARIA Exchange on NFT releases, exclusive
  experiences, updates and other communications from ARIA Exchange and its affiliates and partners.
</div>

<style lang="postcss">
  input {
    @apply border border-transparent bg-origin-border;
    background: linear-gradient(#191919, #191919) padding-box,
      linear-gradient(360deg, var(--gradient-start), var(--gradient-end)) border-box;
  }
</style>
