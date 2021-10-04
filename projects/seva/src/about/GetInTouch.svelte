<script>
  import { media } from '$lib/media-query.store';
</script>

<div style="background:#5739C1" class="w-full">
  <div class="container flex flex-col items-center justify-center py-52 lg:py-0 lg:pt-52 w-full lg:w-1/2 px-6">
    <div class="text-4xl text-white text-center mb-8 sm:text-6xl">
      Get in touch to {#if !$media.sm} <br /> {/if} create your unique NFT for good.
    </div>
    <div class="text-xl text-white text-center mb-4 font-light">
      Have an awesome idea? We can help you bring it to life!
    </div>
    <a href="mailto:info@sevalove.com" class="text-2xl text-white text-center font-light">info@sevalove.com</a>
  </div>
</div>
