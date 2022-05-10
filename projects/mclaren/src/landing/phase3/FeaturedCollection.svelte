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
  <div class="pb-24 sm:pb-64 bg-black">
    <video class="w-full object-cover h-full md:h-[40rem] md:container md:max-w-5xl" autoplay loop muted playsinline>
      <source src={bucketAssets.landing.comingSoon} type="video/mp4" />
    </video>
  </div>
</div>
