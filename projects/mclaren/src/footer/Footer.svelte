<script lang="ts">
  import routes from '$project/routes';
  import { CLIENT_COMPANY_NAME_LEGAL } from '$project/variables';
  import poweredByInfinite from '$project/poweredByInfiniteLogo';
  import Icon from '$ui/icon/Icon.svelte';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import { links } from './social-links';
</script>

<FooterLayout>
  <svelte:fragment slot="start">
    <a href={routes.faq} target="_blank" rel="noreferrer">FAQ</a>
    <a href={routes.careers}>Careers</a>
    <a href={routes.help}>Help</a>
    <a href={routes.privacy}>Privacy Policy</a>
    <a href={routes.terms}>Terms & Conditions</a>
    <a href="https://infiniteworld.com" class="flex items-center">
      <Icon path={poweredByInfinite} class="-mr-1" />
      <span class="sm:hidden lg:block"> Powered by infiniteworld </span>
    </a>
  </svelte:fragment>
  <svelte:fragment slot="copyright">
    {CLIENT_COMPANY_NAME_LEGAL}© {new Date().getFullYear()} All rights reserved.
  </svelte:fragment>
  <SocialLinks slot="end" {links} />
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
