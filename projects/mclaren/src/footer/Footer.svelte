<script lang="ts">
  import routes from '$project/routes';
  import poweredByInfinite from '$project/poweredByInfiniteLogo';
  import Icon from '$ui/icon/Icon.svelte';
  import { FooterLayout } from '$lib/layout/footer';
  import FooterLogo from './assets/FooterLogo.svelte';
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

  <FooterLogo slot="end" />
</FooterLayout>

<style>
  a:hover {
    color: var(--footer-color-hover);
  }
</style>
