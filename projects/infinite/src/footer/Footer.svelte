<script lang="ts">
  import routes from '$project/routes';
  import { SocialLinks, FooterLayout } from '$lib/layout/footer';
  import { links } from './social-links';
</script>

<FooterLayout>
  <svelte:fragment slot="start">
    <a href={routes.faq} target="_blank">FAQ</a>
    <a href={routes.careers}>Careers</a>
    <a href={routes.suku}>Suku</a>
    <a href={routes.help}>Help</a>
    <a href={routes.privacy}>Privacy Policy</a>
    <a href={routes.terms}>Terms & Conditions</a>
  </svelte:fragment>
  <svelte:fragment slot="copyright">© 2021 Infinite Assets, Inc.</svelte:fragment>
  <SocialLinks slot="end" {links} />
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
