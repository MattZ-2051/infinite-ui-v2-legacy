<script lang="ts">
  import routes from '$lib/routes';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import { user } from '$lib/user';
  import Image from '$ui/image/Image.svelte';
  import ariaLogo from '$static/logo_purpleglow.png?w=560&format=avif;webp;png&metadata';
  import SubscribeForm from '$project/SubscribeForm.svelte';
  import Button from '$lib/components/Button.svelte';
  import { links } from './social-links';
</script>

<div class="container">
  <div class="mx-auto my-10 md:my-18">
    <div class="max-w-xs mx-auto">
      <Image src={ariaLogo} alt="Aria" />
    </div>
    {#if !$user}
      <div class="mt-10">
        <SubscribeForm />
      </div>
    {/if}
  </div>

  <div class="flex flex-col md:flex-row gap-y-4 justify-center items-center md:justify-end text-base text-white my-4">
    Ready to create NFTs with ARIA Exchange?
    <Button
      href={routes.partner}
      --button-padding="0.5rem 1.25rem"
      --button-text-size="1rem"
      --button-line-height="1.5rem"
      class="w-min ml-4 whitespace-nowrap">Partner With Us</Button
    >
  </div>
</div>

<FooterLayout>
  <SocialLinks slot="start" {links} />
  <svelte:fragment slot="copyright">© 2021 Virtual Rights Management, LLC All Rights Reserved</svelte:fragment>
  <svelte:fragment slot="end">
    <a href={routes.faq} target="_blank">FAQ</a>
    <a href={routes.help}>Help</a>
    <a href={routes.about}>About Us</a>
    <a href={routes.careers}>Careers</a>
    <a href={routes.terms}>Terms & Conditions</a>
    <a href={routes.privacy}>Privacy Policy</a>
  </svelte:fragment>
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
