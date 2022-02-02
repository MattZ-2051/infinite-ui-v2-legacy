<script lang="ts">
  import type { User } from '$lib/user/types';
  import { createForm } from 'felte';
  import * as yup from 'yup';
  import { validateSchema } from '@felte/validator-yup';
  import { setContext } from 'svelte';
  import AccountPhotoUpload from '$lib/features/account/AccountPhotoUpload.svelte';
  import { FormElement, Textarea } from '$lib/components/form';
  import { accountDetailsValidation, handleUserApiError } from '$lib/features/account/account.service';
  import imageError from '$util/imageError';
  import { patchUser } from '$lib/user';
  import Button from '$lib/components/Button.svelte';
  import routes from '$project/routes';
  import { passwordResetRequested } from '$lib/features/account/account.store';
  import { toast } from '$ui/toast';
  import { goto } from '$app/navigation';
  import NoProfileImage from '../assets/no-profile-fallback.svelte';
  import ArrowLeft from '../assets/ArrowLeft.svelte';

  export let user: User;

  function onResetPassword() {
    passwordResetRequested({ email: user?.email });
  }

  const schema = yup.object({
    ...accountDetailsValidation,
    username: yup
      .string()
      .required('Username is required.')
      .min(3, 'Username must be at least 3 characters long.')
      .max(18, 'Username must be shorter than 18 characters.')
      .matches(/^[\w.-]*$/, 'Only letters, digits, dashes (-), and underscores (_) are allowed.'),
    tagline: yup.string().max(150, 'About me must be at most 150 characters.'),
    email: yup.string().required('Email is required.').email('Email address is not valid'),
  });

  let submitting = false;
  const { form, errors, data } = createForm<{
    firstName: string;
    lastName: string;
    tagline: string;
    username?: string;
    phoneNumber: string;
    email: string;
  }>({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      tagline: user.tagline || '',
      username: user.username || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || '',
    },
    onSubmit: async (values) => {
      // Backend API is failing if using the same username
      if (values.username === user.username) {
        let { username, ...rest } = values;
        values = rest;
      }
      try {
        submitting = true;
        await patchUser(values);
        toast.success('Your information was updated successfully!');
        submitting = false;
      } catch (error) {
        handleUserApiError(error);
        submitting = false;
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<div class="container flex flex-col items-center pt-14">
  <div class="sm:max-w-lg w-full">
    <div class="flex justify-between w-full mb-24">
      <div class="flex-1">
        <button class="mr-2" on:click={() => goto(routes.marketplace)}><ArrowLeft /></button>
      </div>
      <div class="text-3xl font-normal text-center" style="color:#282C2F">Account Settings</div>
      <div class="flex-1" style="min-width:2.5rem" />
    </div>
  </div>
</div>
<div class="sm:container flex justify-center">
  <div class="sm:max-w-lg w-full">
    <div class="border-y sm:border w-full sm:rounded-2xl" style="border-color: rgba(40,44,47,0.1)">
      <div class="flex justify-center relative ">
        <div class="absolute -top-16 px-2 bg-white" style="--edit-profile-picture-bottom-positioning:-0.5rem">
          <div
            class="relative flex justify-center items-center border rounded-full overflow-hidden w-28 h-28 z-10 bg-white"
            style="border-color: rgba(40,44,47,0.1)"
          >
            {#if user.profilePhotoUrl}
              <img
                src={`${user.profilePhotoUrl}?t=${user.updatedAt}`}
                alt={user.username}
                use:imageError={() => (user.profilePhotoUrl = undefined)}
              />
            {:else}
              <NoProfileImage />
            {/if}
          </div>
          <AccountPhotoUpload />
        </div>
      </div>
      <div class="pb-12 pt-14 sm:px-10 container ">
        <div class="text-2xl pb-8">Profile details</div>
        <form use:form autocomplete="off" class="flex flex-col gap-3">
          <FormElement label="First name *" name="firstName" />
          <FormElement label="Last name *" name="lastName" />
          <FormElement component={Textarea} label="About me" name="tagline" rows={$data.tagline.length / 52 + 1} />
          <div class="text-xs" style="color:rgba(40, 44, 47, 0.5);">{$data.tagline.length}/150</div>
          <FormElement label="Username *" name="username" />
          <FormElement label="Phone Number #" name="phoneNumber" />
          <FormElement label="Email *" name="email" />
          <div class="text-xl my-4">Forgot your password?</div>
          <Button variant="outline-brand" on:click={onResetPassword} class="text-sm">RESET PASSWORD</Button>
          <div class="flex flex-col gap-4 sm:pt-4 pt-5">
            <Button variant="brand" type="submit" class="text-sm" disabled={submitting}>SAVE CHANGES</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
