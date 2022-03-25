<script lang="ts">
  import type { User } from '$lib/user/types';
  import routes from '$project/routes';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import Image from '$ui/image/Image.svelte';
  import ariaLogo from '$project/assets/logo_purpleglow.png?w=560&format=avif;webp;png&metadata=src;format;width;height';
  import SubscribeForm from '$project/subscribe/SubscribeForm.svelte';
  import Button from '$lib/components/Button.svelte';
  import { CLIENT_COMPANY_NAME_LEGAL } from '$project/variables';
  import { links } from './social-links';

  export let user: User;

  const infoLink = `mailto:support@goinfinite.io?subject=Do Not Sell My Personal Information (ARIA Exchange)`;
</script>

<div class="container">
  <div class="mx-auto my-10 md:my-18">
    <div class="max-w-xs mx-auto">
      <Image src={ariaLogo} alt="Aria" />
    </div>
    {#if !user}
      <div class="mt-6">
        <SubscribeForm />
      </div>
    {/if}
  </div>

  <div
    class="flex flex-col md:flex-row gap-y-4 justify-center items-center md:justify-end text-sm text-white font-medium my-4"
  >
    Ready to partner with us and create unforgettable collectibles?
    <Button variant="brand" href={routes.partner} class="md:ml-4 whitespace-nowrap text-base font-normal"
      >Partner With Us</Button
    >
  </div>
</div>

<FooterLayout>
  <SocialLinks slot="start" {links} />
  <svelte:fragment slot="copyright"
    >© {new Date().getFullYear()} {CLIENT_COMPANY_NAME_LEGAL} All Rights Reserved</svelte:fragment
  >
  <svelte:fragment slot="end">
    <a href={routes.help} target="_blank" rel="noreferrer">Help</a>
    <a href={routes.about}>About Us</a>
    <a href={routes.careers} target="_blank" rel="noreferrer">Careers</a>
    <a href={routes.terms}>Terms & Conditions</a>
    <a href={routes.privacy}>Privacy Policy</a>
    <a href={routes.cookies}>Cookie Policy</a>
    <a href={infoLink} target="_blank" rel="noreferrer">Do Not Sell My Personal Information</a>
  </svelte:fragment>
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
