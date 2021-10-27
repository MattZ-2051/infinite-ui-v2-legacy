<script lang="ts">
  import routes from '$project/routes';
  import Icon from '$ui/icon/Icon.svelte';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import infiniteWorld from '$project/assets/infiniteWorld';
  import { CLIENT_COMPANY_NAME_LEGAL } from '$project/variables';
  import { links } from './social-links';
</script>

<FooterLayout>
  <svelte:fragment slot="start">
    <a href={routes.resources} target="_blank">Resources</a>
    <a href={routes.help}>Help</a>
    <a href={routes.about}>About</a>
    <a href={routes.privacy}>Privacy Policy</a>
    <a href={routes.terms}>Terms & Conditions</a>
    <span class="flex flex-wrap items-center"><Icon path={infiniteWorld} size="1.25em" />Powered by InfiniteWorld</span>
  </svelte:fragment>
  <svelte:fragment slot="copyright"
    >© {new Date().getFullYear()} {CLIENT_COMPANY_NAME_LEGAL} All rights reserved.</svelte:fragment
  >
  <SocialLinks slot="end" {links} />
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
