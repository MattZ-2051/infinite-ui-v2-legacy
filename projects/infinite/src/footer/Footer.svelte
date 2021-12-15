<script lang="ts">
  import routes from '$project/routes';
  import Icon from '$ui/icon/Icon.svelte';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import { CLIENT_COMPANY_NAME_LEGAL } from '$project/variables';
  import hedera from '$lib/components/icons/hedera';
  import { links } from './social-links';
</script>

<FooterLayout>
  <svelte:fragment slot="start">
    <a href={routes.faq} target="_blank" rel="noreferrer">FAQ</a>
    <a href={routes.careers}>Careers</a>
    <a href={routes.suku}>Suku</a>
    <a href={routes.help}>Help</a>
    <a href={routes.privacy}>Privacy Policy</a>
    <a href={routes.terms}>Terms & Conditions</a>
    <span class="flex flex-wrap items-center icon-hedera">
      <Icon path={hedera} size="" />
    </span>
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

  .icon-hedera {
    background-color: var(--footer-icon-bg-color);
    color: var(--footer-icon-color);
    border-radius: var(--footer-icon-border-radius);
    height: 1.5rem;
    width: 1.5rem;
    padding: 0.4rem;
  }

  .icon-hedera:hover {
    background-color: var(--footer-icon-bg-color-hover);
    color: var(--footer-icon-color-hover);
  }
</style>
