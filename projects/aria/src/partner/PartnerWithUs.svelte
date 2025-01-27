<script lang="ts">
  import { setContext } from 'svelte';
  import { mdiTwitter, mdiInstagram, mdiDiscord, mdiFacebook, mdiLinkedin, mdiSnapchat, mdiYoutube } from '@mdi/js';
  import { siTiktok } from 'simple-icons/icons';
  import { createForm } from 'felte';
  import { validateSchema } from '@felte/validator-yup';
  import * as yup from 'yup';
  import { FormElement } from '$lib/components/form';
  import { Seo } from '$lib/seo';
  import Icon from '$ui/icon/Icon.svelte';
  import Image from '$ui/image/Image.svelte';
  import tooltip from '$ui/tooltip';
  import { toast } from '$ui/toast';
  import Button from '$lib/components/Button.svelte';
  import { subscribe } from './partner.api';
  import travisScottBg from './travis-scott-bg.png?w=400;800;1200;&format=avif;webp;png&metadata=src;format;width;height';

  const socialMedia = [
    { id: 'instagram', label: 'Instagram', path: mdiInstagram },
    { id: 'facebook', label: 'Facebook', path: mdiFacebook },
    { id: 'youtube', label: 'YouTube', path: mdiYoutube },
    { id: 'twitter', label: 'Twitter', path: mdiTwitter },
    { id: 'tiktok', label: 'TikTok', path: siTiktok.path },
    { id: 'snap', label: 'Snapchat', path: mdiSnapchat },
    { id: 'linkedin', label: 'LinkedIn', path: mdiLinkedin },
    { id: 'discord', label: 'Discord', path: mdiDiscord },
  ];

  const contactFields = [
    { name: 'firstName', label: 'What is your First Name? *', placeholder: 'John' },
    { name: 'lastName', label: 'What is your Last Name? *', placeholder: 'Doe' },
    { name: 'email', label: 'What is your email address? *', placeholder: 'john.brown@example.com' },
    { name: 'phone', label: 'What is your phone number? *', placeholder: '+1 202 555 0156' },
    { name: 'industry', label: 'What is your industry? *', placeholder: 'Art, Music, Sports, etc.' },
    { name: 'talent', label: 'Who do you represent? *', placeholder: 'John Brown' },
    { name: 'relationship', label: 'What is your role? *', placeholder: 'Manager, etc.' },
  ];

  const schema = yup.object({
    firstName: yup.string().required('First Name is required.'),
    lastName: yup.string().required('Last Name is required.'),
    email: yup.string().email('Please enter valid email.').required('Email is required.'),
    phone: yup
      .string()
      .matches(/^\+?\d+?[\W\d]{1,17}$/, { message: 'Please enter a valid phone number.' })
      .required('Phone number is required.'),
    industry: yup.string().required('Industry is required.'),
    talent: yup.string().required('Brand/talent name is required.'),
    relationship: yup.string().required('Role is required.'),
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

<Seo title="Partner with us" />

<section data-style="container" class="flex flex-col gap-8 text-white bg-black">
  <div class="flex flex-col gap-12 text-center container mt-8">
    <h2 class="text-4xl max-w-4xl mx-auto font-medium section-title">A Collaborative Community</h2>
    <div class="mx-auto text-2xl text-center max-w-6xl space-y-4">
      <p>
        ARIA Exchange creates and sells innovative, culturally driven collectibles for the world’s most iconic athletes,
        entertainers, artists, and brands. We’re experts at merging the digital universe with unforgettable physical
        experiences to deliver the most cutting-edge collectibles ever created.
      </p>
      <p>Let us help you bring your vision into the future.</p>
    </div>
  </div>

  <div class="relative flex flex-col">
    <Image src={travisScottBg} class="absolute h-full w-full z-0 object-cover" />
    <div class="z-1 flex flex-col gap-14">
      <div class="container md:mt-16">
        <form use:form class="form flex flex-col gap-8 lg:mx-32 xl:mx-40 px-10 md:mb-16" autocomplete="off">
          <div class="border-b-2 pb-4 pt-7 text-3xl">
            <h3>Let’s collaborate!</h3>
            <p class="text-base">Please fill out the form below:</p>
          </div>
          <div class="flex justify-between flex-col md:flex-row gap-16">
            <div class="flex flex-col gap-6" style="flex-grow:6;">
              {#each contactFields as contactField}
                <FormElement class="form-element-rounded-white" variant="rounded" {...contactField} />
              {/each}
            </div>
            <div class="flex flex-col flex-grow gap-1.5">
              <span class="text-lg">Social Links</span>
              {#each socialMedia as { id, label, path } (id)}
                <div class="flex gap-2 items-center">
                  <label
                    use:tooltip={label}
                    for={id}
                    class="rounded-full w-6 h-6 flex items-center justify-center bg-primary"
                  >
                    <Icon {path} size="0.6" />
                    <span class="sr-only">{label}</span>
                  </label>
                  <FormElement class="form-element-rounded-white" variant="rounded" {id} name={id} />
                </div>
              {/each}
            </div>
          </div>
          <div class="text-right mb-8">
            <Button variant="brand" type="submit" disabled={$isSubmitting}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  [data-style='container'] {
    /* TODO: enable passing label as slot properly to avoid having these vars */
    --form-element-label-color: #ffffff;
    --form-element-label-font-size: 1.125rem;
    --button-padding: 5px 40px;
    --button-border-radius: 8px;
  }
  .form {
    background-color: #1d1a54;
  }
</style>
