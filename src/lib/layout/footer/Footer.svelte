<script lang="ts">
  import { CLIENT_COMPANY_NAME } from '$scope/variables';
  import routes from '$lib/routes';
  import SocialLinks from './SocialLinks.svelte';
</script>

<div class="bg-black py-6 md:py-3">
  <div
    class="container flex flex-col gap-y-12 justify-evenly items-center text-lg font-black italic text-gray-500 md:flex-row md:justify-between md:text-sm md:font-normal md:not-italic"
  >
    <div class="flex flex-wrap items-center justify-center gap-4 md:order-last md:gap-4 md:justify-end">
      <SocialLinks />
    </div>
    <div class="flex flex-wrap items-center justify-center text-center gap-x-8 gap-y-4 md:gap-5">
      <a href={routes.faq} class="hover:text-white">FAQ</a>
      <a href={routes.help} class="hover:text-white">Help</a>
      <a href={routes.privacy} class="hover:text-white">Privacy Policy</a>
      <a href={routes.terms} class="hover:text-white">Terms & Conditions</a>
    </div>
    <span class="text-sm px-4 flex flex-wrap gap-1 justify-center"
      ><span>{CLIENT_COMPANY_NAME} © 2021</span><span>All rights reserved.</span></span
    >
  </div>
</div>
