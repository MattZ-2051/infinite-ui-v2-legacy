<script lang="ts">
  import routes from '$project/routes';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import { links } from './social-links';
</script>

<FooterLayout>
  <svelte:fragment slot="start">
    <a href={routes.faq} target="_blank">FAQ</a>
    <a href={routes.help}>Help</a>
    <a href={routes.privacy}>Privacy Policy</a>
    <a href={routes.terms}>Terms & Conditions</a>
  </svelte:fragment>
  <svelte:fragment slot="copyright">SEVA.LOVE© 2021 All rights reserved.</svelte:fragment>
  <SocialLinks slot="end" {links} />
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
