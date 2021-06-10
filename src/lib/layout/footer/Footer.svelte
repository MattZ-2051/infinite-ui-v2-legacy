<script lang="ts">
  import Icon from '$ui/icon/Icon.svelte';
  import { mdiTwitter, mdiYoutube, mdiInstagram, mdiDiscord } from '@mdi/js';
</script>

<div class="bg-black py-6 md:py-3">
  <div
    class="container flex flex-col gap-y-12 justify-evenly items-center  text-lg font-black italic text-gray-500 md:flex-row md:justify-between md:text-sm md:font-normal md:not-italic"
  >
    <div class="flex items-center justify-between gap-7 md:order-last md:gap-4 md:justify-end">
      <a href="youtube.com"
        ><Icon
          path={mdiYoutube}
          size="1.33"
          class="flex justify-center items-center px-2 text-white rounded-xl bg-gray-800 hover:bg-white hover:text-black"
        /><span class="sr-only">Youtube</span></a
      >
      <a href="twitter.com"
        ><Icon
          path={mdiTwitter}
          size="1.33"
          class="flex justify-center items-center px-2 rounded-xl text-white bg-gray-800 hover:bg-white hover:text-black"
        /><span class="sr-only">Twitter</span></a
      >
      <a href="instagram.com"
        ><Icon
          path={mdiInstagram}
          size="1.33"
          class="flex justify-center items-center px-2 rounded-xl text-white bg-gray-800 hover:bg-white hover:text-black"
        /><span class="sr-only">Instagram</span></a
      >
      <a href="tiktok.com">
        <Icon
          path="M8.3014 0.0135C9.1739 0 10.0414 0.008 10.9079 0C10.9604 1.0205 11.3274 2.06 12.0744 2.7815C12.8199 3.521 13.8744 3.8595 14.9004 3.974V6.6585C13.9389 6.627 12.9729 6.427 12.1004 6.013C11.7204 5.841 11.3664 5.6195 11.0199 5.393C11.0154 7.341 11.0279 9.2865 11.0074 11.2265C10.9554 12.1585 10.6479 13.086 10.1059 13.854C9.2339 15.1325 7.7204 15.966 6.1659 15.992C5.2124 16.0465 4.2599 15.7865 3.4474 15.3075C2.1009 14.5135 1.1534 13.06 1.0154 11.5C0.998018 11.1696 0.995349 10.8386 1.0074 10.508C1.1274 9.2395 1.7549 8.026 2.7289 7.2005C3.8329 6.239 5.3794 5.781 6.8274 6.052C6.8409 7.0395 6.8014 8.026 6.8014 9.0135C6.1399 8.7995 5.3669 8.8595 4.7889 9.261C4.36602 9.53958 4.04645 9.94945 3.8794 10.4275C3.7414 10.7655 3.7809 11.141 3.7889 11.5C3.9474 12.594 4.9994 13.5135 6.1224 13.414C6.8669 13.406 7.5804 12.974 7.9684 12.3415C8.0939 12.12 8.2344 11.8935 8.2419 11.633C8.3074 10.4405 8.2814 9.253 8.2894 8.0605C8.2949 5.373 8.2814 2.693 8.3019 0.014L8.3014 0.0135Z"
          size="1.33"
          class="flex justify-center items-center pl-2 pt-2 rounded-xl text-white bg-gray-800 hover:bg-white hover:text-black"
        /><span class="sr-only">TikTok</span>
      </a>
      <a href="discord.com"
        ><Icon
          path={mdiDiscord}
          size="1.33"
          class="flex justify-center items-center px-2 rounded-xl bg-gray-800 text-white hover:bg-white hover:text-black"
        /><span class="sr-only">Discord</span></a
      >
    </div>
    <div class="flex flex-wrap items-center justify-center text-center gap-x-8 gap-y-4 md:gap-5">
      <a sveltekit:prefetch href="/faq" class="hover:text-white">FAQ</a>
      <a sveltekit:prefetch href="/help" class="hover:text-white">Help</a>
      <a sveltekit:prefetch href="/privacy" class="hover:text-white">Privacy Policy</a>
      <a sveltekit:prefetch href="/terms" class="hover:text-white">Terms & Conditions</a>
    </div>
    <span class="text-sm px-4 flex flex-wrap gap-1 justify-center"
      ><span>ARIA© 2021</span><span>All rights reserved.</span></span
    >
  </div>
</div>
