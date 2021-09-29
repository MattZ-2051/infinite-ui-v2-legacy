<script lang="ts">
  import { setContext } from 'svelte';
  import { mdiTwitter, mdiInstagram, mdiDiscord, mdiFacebook, mdiLinkedin, mdiSnapchat, mdiYoutube } from '@mdi/js';
  import tiktok from 'simple-icons/icons/tiktok.js';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import FormInput from '$lib/components/form/FormInput.svelte';
  import Icon from '$ui/icon/Icon.svelte';
  import Image from '$ui/image/Image.svelte';
  import tooltip from '$ui/tooltip';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { subscribe } from './partner.api';
  import travisScottBg from './travis-scott-bg.png?w=400;800;1200;&format=avif;webp;png&metadata';

  const socialMedia = [
    { id: 'instagram', label: 'Instagram', path: mdiInstagram },
    { id: 'facebook', label: 'Facebook', path: mdiFacebook },
    { id: 'youtube', label: 'YouTube', path: mdiYoutube },
    { id: 'twitter', label: 'Twitter', path: mdiTwitter },
    { id: 'tiktok', label: 'TikTok', path: tiktok.path },
    { id: 'snap', label: 'Snapchat', path: mdiSnapchat },
    { id: 'linkedin', label: 'LinkedIn', path: mdiLinkedin },
    { id: 'discord', label: 'Discord', path: mdiDiscord },
  ];

  const schema = yup.object({
    talent: yup.string().required('Talent name is required.'),
    name: yup.string().required('Name is required.'),
    email: yup.string().email('Please enter valid email.').required('Email is required.'),
  });

  const { form, errors, reset, isSubmitting } = createForm<{ email: string }>({
    onSubmit: async (values) => {
      const toastId = 'partner-form';
      try {
        await subscribe(values);
        toast.success(`Thank you for your interest! We've received your submission and will be in touch shortly.`, {
          toastId,
        });
        reset();
      } catch {
        toast.danger(
          `Whoops! There was an issue with your submission. Please double-check your answers or reach out to support@ARIAexchange.com if this continues.`,
          { toastId }
        );
      }
    },
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<div data-style="container" class="flex flex-col gap-8 text-white bg-black">
  <div class="flex flex-col gap-12 text-center container mt-8">
    <div class="text-4xl max-w-4xl mx-auto font-medium">
      ARIA Exchange creates exclusive NFTs for the world's most iconic athletes, entertainers, and brands.
    </div>
    <div class="mx-auto text-2xl text-center max-w-6xl">
      We bring you closer to your favorite icons. Our mission is to deliver the most mind blowing and unique digital
      content in the hottest way possible. We’re obsessed with merging the physical and digital worlds in the most
      innovative way to give you unlimited access to the most in demand collectibles.
    </div>
  </div>

  <div class="relative flex flex-col">
    <Image src={travisScottBg} class="absolute h-full w-full z-0 object-cover" />
    <div class="z-1 flex flex-col gap-14">
      <div class="container md:mt-16">
        <form use:form class="form flex flex-col gap-8 lg:mx-32 xl:mx-40 px-10 md:mb-16" autocomplete="off">
          <span class="border-b-2 pb-4 pt-7 text-2xl">Talent Details</span>
          <div class="flex justify-between flex-col md:flex-row gap-16">
            <div class="flex flex-col gap-6 text-lg" style="flex-grow:6;">
              <FormInput name="talent" label="Talent Name *" placeholder="John Brown" />
              <FormInput name="name" label="Your Name *" placeholder="John Doe" />
              <FormInput name="email" label="Your Email Address *" placeholder="john.brown@example.com" />
              <FormInput name="relationship" label="Relationship to Talent" placeholder="Self, Manager, etc." />
              <FormInput name="industry" label="Industry" placeholder="Art, Music, Sport, etc." />
            </div>
            <div class="flex flex-col flex-grow gap-1.5 text-lg">
              <span>Social Links</span>
              {#each socialMedia as { id, label, path } (id)}
                <div class="flex gap-2 items-center">
                  <label
                    use:tooltip={label}
                    for={id}
                    class="rounded-full w-6 h-6 flex items-center justify-center bg-primary"
                  >
                    <Icon {path} size="0.6" />
                  </label>
                  <FormInput {id} name={id} class="flex-grow" />
                </div>
              {/each}
            </div>
          </div>
          <div class="text-right mb-8">
            <Button
              variant="brand"
              type="submit"
              --button-padding="5px 40px"
              --button-border-radius="8px"
              disabled={$isSubmitting}>Submit</Button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  [data-style='container'] {
    --input-label-color: var(--color);
    --input-label-font-size: 18px;
  }
  .form {
    background-color: #1d1a54;
  }
</style>
