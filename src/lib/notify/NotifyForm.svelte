<script lang="ts">
  import type { NotifyInfo } from './types';
  import { setContext, createEventDispatcher } from 'svelte';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import notifications from '$ui/toast/toast.store';
  import Button from '$lib/components/Button.svelte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import { notifyItem } from './notify.api';

  const schema = yup.object({
    email: yup.string().email('Email is not valid.').required('Email is required.'),
  });

  let saving: Promise<unknown>;
  const dispatch = createEventDispatcher();

  const { form, errors, reset } = createForm<NotifyInfo>({
    onSubmit: async (values) => {
      try {
        await (saving = notifyItem({ ...values }));
        notifications.success('You will now be notified of upcoming news from this creator.');
        reset();
        dispatch('close');
      } catch {
        notifications.danger(`There was a problem with your subscription.`);
      } finally {
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<div class="flex flex-col gap-2">
  <form use:form class="mt-2 flex flex-col gap-3" autocomplete="off">
    <FormInput name="email" label="Enter your e-mail:" />

    <Button type="submit" disabled={!!saving} class="mt-2">Subscribe</Button>
  </form>
</div>
