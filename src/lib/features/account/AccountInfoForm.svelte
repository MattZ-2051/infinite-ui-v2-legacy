<script lang="ts">
  import type { User } from '$lib/user/types';
  import { setContext, createEventDispatcher } from 'svelte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import { FormElement, Textarea } from '$lib/components/form';
  import Button from '$lib/components/Button.svelte';
  import { patchUser } from '$lib/user';
  import { handleUserApiError } from './account.service';

  export let user: User;

  const dispatch = createEventDispatcher();

  let saving;

  const schema = yup.object({
    username: yup
      .string()
      .required('Username is required.')
      .min(3, 'Username must be at least 3 characters long.')
      .max(18, 'Username must be shorter than 18 characters.')
      .matches(/^[\w.-]*$/, 'Only letters, digits, dashes (-), and underscores (_) are allowed.'),
    tagline: yup.string().max(150, 'About me must be at most 150 characters.'),
  });

  const { form, errors } = createForm<{ username?: string; tagline: string }>({
    initialValues: {
      username: user.username || '',
      tagline: user.tagline || '',
    },
    onSubmit: async (values) => {
      // Backend API is failing if using the same username
      if (values.username === user.username) {
        const { username, ...rest } = values;
        values = rest;
      }
      try {
        await (saving = patchUser(values));
        dispatch('closeForm');
      } catch (error) {
        handleUserApiError(error);
      } finally {
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<form data-style="container" use:form autocomplete="off" class="flex flex-col gap-3 ">
  <FormElement variant="rounded" class="form-element-rounded-white" name="username" label="Username" />
  <FormElement
    variant="rounded"
    class="form-element-rounded-white"
    component={Textarea}
    name="tagline"
    placeholder="Enter short bio"
    label="About me"
    rows="4"
  />
  <div class="flex gap-4 justify-end">
    <Button
      class="w-16 text-sm rounded-sm"
      disabled={!!saving}
      on:click={(event) => {
        event.preventDefault();
        dispatch('closeForm');
      }}>Cancel</Button
    >
    <Button variant="brand" type="submit" disabled={!!saving} class=" w-16 text-sm  rounded-sm">Save</Button>
  </div>
</form>

<style>
  [data-style='container'] {
    --button-padding: 6px 24px;
  }
</style>
