<script lang="ts">
  import type { User } from '$lib/user/types';
  import { setContext, createEventDispatcher } from 'svelte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { createForm } from 'felte';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import { toast } from '$ui/toast';
  import { patchUser } from '$lib/user';

  export let user: User;

  const dispatch = createEventDispatcher();

  let saving;

  const schema = yup.object({
    username: yup.string().required('Username is required.'),
  });

  const { form, errors } = createForm({
    initialValues: {
      username: user.username || '',
      tagline: user.tagline || '',
    },
    onSubmit: async (values) => {
      // Backend API is failing if using the same username
      if (values.username === user.username) {
        delete values.username;
      }
      try {
        await (saving = patchUser(values));
        dispatch('closeForm');
      } catch (error) {
        let message;
        switch (error?.data?.appCode) {
          case 'USERNAME_RULES_TAKEN':
            message = 'The username you selected is already taken. Please choose a diffent one.';
            break;
          case 'USERNAME_RULES_TOO_SHORT':
            message = 'Username must have between 3 and 18 characters length.';
            break;
          case 'USERNAME_RULES_WEIRD_CHARS':
            message = 'Username can only contain letters, digits and special characters.';
            break;
          case 'USERNAME_RULES_BLANKS':
            message = 'Username cannot contain blank spaces.';
            break;
          default:
            message = 'There was an error submitting your request. Please try again.';
        }
        toast.danger(message);
      } finally {
        saving = undefined;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<form use:form autocomplete="off" class="flex flex-col gap-3 ">
  <FormInput name="username" />
  <FormInput name="tagline" />
  <div class="flex gap-4 justify-end">
    <button
      class="bg-primary p-1 w-16 text-sm  rounded-sm"
      disabled={!!saving}
      on:click|preventDefault={() => {
        dispatch('closeForm');
      }}>Cancel</button
    >
    <button type="submit" disabled={!!saving} class=" bg-primary p-1 w-16 text-sm  rounded-sm">Save</button>
  </div>
</form>
