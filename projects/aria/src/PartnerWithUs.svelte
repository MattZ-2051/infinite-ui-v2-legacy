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
  import travisScottBg from '$static/travis-scott-bg.png?w=400;800;1200;&format=avif;webp;png&metadata';

  const socialMedia = [
    { id: 'instagram', path: mdiInstagram },
    { id: 'facebook', path: mdiFacebook },
    { id: 'youtube', path: mdiYoutube },
    { id: 'twitter', path: mdiTwitter },
    { id: 'tiktok', path: tiktok.path },
    { id: 'snapchat', path: mdiSnapchat },
    { id: 'linkedin', path: mdiLinkedin },
    { id: 'discord', path: mdiDiscord },
  ];

  const schema = yup.object({
    talent: yup
      .string()
      .required('Talent name is required.')
      .matches(/^[ A-Za-z]*$/, 'Please enter valid name.'),
    email: yup.string().email('Please enter valid email.').required('Email is required.'),
  });

  const { form, errors } = createForm({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
    validate: validateSchema(schema),
  });

  setContext('errors', errors);
</script>

<div class=" flex flex-col gap-8 text-white bg-black">
  <div class="flex flex-col gap-14 text-center container mt-8">
    <div class="text-4xl max-w-4xl mx-auto font-medium">
      ARIA Exchange creates exclusive NFTs for the world's most iconic athletes, entertainers, and brands.
    </div>
    <span class="text-3xl">Partner with us to reach your fans in a whole new way.</span>
  </div>

  <div class="relative flex flex-col">
    <Image src={travisScottBg} class="absolute h-full w-full z-0 object-cover" />
    <div class="z-1 flex flex-col gap-14">
      <div class="md:py-20  md:mt-16 bg-primary-dark">
        <div class="container text-2xl text-center py-10 max-w-6xl">
          We bring you closer to your favorite icons. Our mission is to deliver the most mind blowing and unique digital
          content in the hottest way possible. We’re obsessed with merging the physical and digital worlds in the most
          innovative way to give you unlimited access to the most in demand collectibles.
        </div>
      </div>

      <div class="container">
        <form use:form class="form flex flex-col gap-8  lg:mx-32 xl:mx-40 px-10 md:mb-16" autocomplete="off">
          <span class="border-b-2  py-4 text-2xl">Talent Details</span>
          <div class="flex justify-between flex-col md:flex-row  gap-16">
            <div class="flex flex-col gap-4 text-lg" style="flex-grow:6;">
              <FormInput name="talent" label="Talent Name *" placeholder="John Brown" />
              <FormInput name="email" label="Email Address *" placeholder="john.brown@example.com" />
              <FormInput name="expYear" label="Relationship to Talent" placeholder="Self or Other" />
              <FormInput name="industry" label="Industry" placeholder="Art,Music,Sport etc." />
            </div>
            <div class="flex flex-col flex-grow gap-1 text-lg">
              <span>Social Links</span>
              {#each socialMedia as social}
                <div class="flex gap-2 items-center">
                  <div class="rounded-full w-6 h-6 flex items-center justify-center bg-primary">
                    <Icon path={social.path} size="0.6" />
                  </div>
                  <FormInput name={social.id} class="flex-grow" />
                </div>
              {/each}
            </div>
          </div>
          <div class="text-right mb-8">
            <button type="submit" class="bg-primary px-10 rounded-lg py-1">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .form {
    background-color: #1d1a54;
  }
</style>
