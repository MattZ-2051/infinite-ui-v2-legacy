<script lang="ts">
  import bucketAssets from '$project/assets/aws-bucket-assets';
  import Divider from '../common/Divider.svelte';
</script>

<div class="w-full h-full relative">
  <div class="h-72 relative w-full mt-32 sm:mt-72">
    <Divider class="max-w-full absolute bottom-0" />
    <div class="h-full flex flex-col items-center justify-end container pb-14">
      <p class="font-light second-font text-3xl sm:text-5xl text-white text-center uppercase tracking-widest">
        Coming Soon
      </p>
    </div>
  </div>
  <div class="pb-24 sm:pb-72 bg-black">
    <video
      class="content-height w-full relative container flex justify-center max-w-5xl hidden md:block"
      autoplay
      loop
      muted
      playsinline
    >
      <source src={bucketAssets.landing.comingSoon} type="video/mp4" class="h-full w-full" />
    </video>
    <video class="w-full object-cover h-full md:hidden" autoplay loop muted playsinline>
      <source src={bucketAssets.landing.comingSoon} type="video/mp4" />
    </video>
  </div>
</div>

<style lang="postcss">
  .content-height {
    height: 40rem;
    margin-bottom: -2.5rem;
  }
</style>
